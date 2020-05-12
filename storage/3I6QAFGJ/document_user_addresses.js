const ADDRESS_MOVE_UP_ACTION_ID = 1;
const ADDRESS_MOVE_DOWN_ACTION_ID = 2;
const ADDRESS_DELETE_ACTION_ID = 3;
const ADDRESS_ADD_MORE_ACTION_ID = 4;

var gSelectedOptionClass = 'P-Select-Value';
var tempDocumentAddress;
var gUserAjaxSrv_ = gAjaxUrlsPrefix;
function setDesignSelectValue(pHolderId, pThis) {
	var lValue = $("#" + pHolderId + " option[value='" + $(pThis).val() + "']").text();
	if(lValue)
		$("#" + pHolderId).siblings( '.' + gSelectedOptionClass ).html( lValue );
}

function getCountries(pActionWithData, lUserAjaxSrv){
	var lData = (typeof pActionWithData !== "undefined" ? pActionWithData : '');
	var dfd = $.ajax({
		url: lUserAjaxSrv,
		dataType: 'json',
		async: false,
		data: lData,
		success: function (pAjaxResult) {
			return pAjaxResult;
		}
	});
	return dfd.promise();
}

initDocumentUserAddresses = function(pActionWithData, pSelIn, pSelFieldCnt, pFormName, pPlatform){
	this.list = [];
	this.m_UserAjaxSrv = '';
	this.m_SelIn = pSelIn;
	$(this.m_SelIn).empty();
	this.m_SelFieldCnt = pSelFieldCnt;
	this.m_FormName = pFormName;
	this.m_Platform = pPlatform;
	this.m_Data = (typeof pActionWithData !== "undefined" ? pActionWithData : '');
	this.m_LangCode = getParameterByName('lang_code', this.m_Data);
	this.temp = _.template($(this.m_SelFieldCnt).html());
	this.init(false);
	this.render(false);
};

initDocumentUserAddresses.prototype.initActions = function () {
	var lThis = this;
	$('form[name="' + this.m_FormName + '"]').find('.action_btn').each(function(){
		$(this).unbind('click').bind('click', function(){
			switch($(this).data('action-id')) {
				case ADDRESS_MOVE_UP_ACTION_ID:
					lThis.moveObject('up', $(this).data('ord'));
					break;
				case ADDRESS_MOVE_DOWN_ACTION_ID:
					lThis.moveObject('down', $(this).data('ord'));
					break;
				case ADDRESS_DELETE_ACTION_ID:
					if (confirm(LANG['js.pjs.confirm.deleteAffiliation'])) {
						lThis.deleteObject($(this).data('ord'));
					}
					break;
				case ADDRESS_ADD_MORE_ACTION_ID:
					lThis.appendObject({"affiliation": "", "city": "", "country": "", "ord": null, "actions": [ADDRESS_MOVE_UP_ACTION_ID, ADDRESS_MOVE_DOWN_ACTION_ID, ADDRESS_DELETE_ACTION_ID],});
					break;
			}
		});
	});
};

initDocumentUserAddresses.prototype.init = function (refresh) {
	var dfd = $.Deferred();
	if (refresh) {
		res = {"json": this.list};
		dfd.dua = this;
		dfd.resolve(res);
		return dfd.promise();
	}
	switch (this.m_Platform) {
		case 'pwt':
			this.m_UserAjaxSrv = gUserAjaxSrv_ + 'authors_srv.php';
			break;
		case 'pjs':
			this.m_UserAjaxSrv = gUserAjaxSrv_ + 'usr_autocomplete_srv.php';
			break;
	}
	dfd = $.ajax({
		url: this.m_UserAjaxSrv,
		dataType: 'json',
		async: false,
		data: this.m_Data,
		dua: this,
		success: function (pAjaxResult) {
			return pAjaxResult['json'];
		}
	});

	return dfd.promise();
};

initDocumentUserAddresses.prototype.appendObject = function (obj) {
	var getLastOrd;
	if (_.isEmpty(this.list)) {
		getLastOrd = obj;
	} else {
		getLastOrd = _.last(this.list);
	}
	if (typeof obj.ord != "undefined") {
		obj.ord = getLastOrd.ord + 1;
	}
	if (this.list.length == 0) {
		this.list.push(obj);
	} else {
		this.list = _.union(this.list, [obj]);
	}
	this.render(true);
	return this.list;
};

initDocumentUserAddresses.prototype.update = function (pOrd, key, val) {
	obj = _.findWhere(this.list, {ord: pOrd});
	key = _.first(key.split("_"));
	obj[key] = val;
	newList = jQuery.extend(true, {}, this.list);
	$('form[name="' + this.m_FormName + '"] input[name="json_output"]').val(JSON.stringify(this.removeCountriesFromList(newList))).trigger("change");
};

initDocumentUserAddresses.prototype.removeCountriesFromList = function (list) {
	return _.map(list, function (el) {
		el.countries = [];
		return el;
	});
};

initDocumentUserAddresses.prototype.render = function (refresh) {
	var lThis = this;
	this.init(refresh).then(function (response) {
		fThis = this.dua;
		fThis.list = response["json"];
		fThis.sort("ord");
		fThis.setControlls();
		// handle country
		getCountries("&action=get_country_list&lang_code=" + lThis.m_LangCode, lThis.m_UserAjaxSrv).then(
				function (response) {
					fThis.list = _.map(fThis.list, function (el, i) {
						el.countries = response.countries;
						return el;
					});
					newList = jQuery.extend(true, {}, fThis.list);
					$('form[name="' + lThis.m_FormName + '"] input[name="json_output"]').val(JSON.stringify(fThis.removeCountriesFromList(newList))).trigger("change");
					fThis.show();
				}
		);
		$(lThis.m_SelIn + " input, " + lThis.m_SelIn + " select").change(function (event) {
			event.stopPropagation();
			lThis.update($(this).data('ord'), this.name, $(this).val());
		});
		lThis.initActions();
	}, function () {
		alert('ajax error');
	});
};

initDocumentUserAddresses.prototype.show = function () {
	var lThis = this;
	$(this.m_SelIn).html('');
	// this.temp = _.template($(pTemplateSel).html());
	_.map(this.list, function (el) {
		$(lThis.m_SelIn).append(lThis.temp(el));
		return lThis.temp(el);
	});
};

initDocumentUserAddresses.prototype.sort = function (param) {
	this.list = _.sortBy(this.list, param)
};

initDocumentUserAddresses.prototype.setControlls = function () {
	var firstElement = _.first(this.list);
	var lastElement = _.last(this.list);

	if (this.list.length > 1) {
		this.list = _.map(this.list, function (el, k) {
			if (el == firstElement) {
				el.actions = [2, 3];
			} else if (el == lastElement) {
				el.actions = [1, 3];
			} else {
				el.actions = [1, 2, 3];
			}
			return el;
		});
	} else {
		this.list = _.map(this.list, function (el) {
			el.actions = [];
			return el;
		})
	}
};

initDocumentUserAddresses.prototype.moveObject = function (destination, ord) {
	var curIndex, curOrd, prevObj, nextObj, prevOrd, nextOrd;
	obj = _.findWhere(this.list, {ord: ord});

	if (destination == 'up') {
		curOrd = ord;
		curIndex = _.findIndex(this.list, function (item) {
			return item == obj
		});
		if (obj != _.first(this.list)) {
			prevObj = this.list[(curIndex - 1)];

			this.list = _.map(this.list, function (el, i) {
				if (el == prevObj) {
					prevOrd = el.ord;
					el.ord = curOrd;
				}
				return el;
			});
			this.list = _.without(this.list, obj);
			obj.ord = prevOrd;
			this.list.splice((curIndex - 1), 0, obj);
		}
	} else if (destination == 'down') {

		curOrd = obj.ord;
		curIndex = _.findIndex(this.list, function (item) {
			return item == obj
		});
		if (obj != _.last(this.list)) {
			nextObj = this.list[(curIndex + 1)];

			this.list = _.map(this.list, function (el, i) {
				if (el == nextObj) {
					nextOrd = el.ord;
					el.ord = curOrd;
				}
				return el;
			});
			this.list = _.without(this.list, obj);
			obj.ord = nextOrd;
			this.list.splice((curIndex + 1), 0, obj);
		}

	}
	this.render(true);
};

initDocumentUserAddresses.prototype.deleteObject = function (pOrd) {
	this.list = _.without(this.list, _.findWhere(this.list, {ord: pOrd}));
	this.list = _.map(this.list, function (el, i) {
		if (el.ord > pOrd) {
			el.ord -= 1;
		}
		return el;
	});
	this.render(true);
};

/*
function initDocumentUserAddresses(pActionWithData, pSelIn, pSelFieldCnt, pFormName, pPlatform) {
	$(pSelIn).empty();
	var documentAddress = getDocumentUserAddresses(pActionWithData, pSelIn, pSelFieldCnt, pFormName, pPlatform);
	tempDocumentAddress = documentAddress;
}

function getDocumentUserAddresses(pAction, pContainerSel, pTemplateSel, pFormName, pPlatform) {
	this.list = [];
	var lUserAjaxSrv;
	this.lData = (typeof pAction !== "undefined" ? pAction : '');
	var lLangCode = getParameterByName('lang_code', this.lData);
	this.init = function (refresh) {
		var dfd = $.Deferred();
		if (refresh) {
			res = {"json": this.list};
			dfd.dua = this;
			dfd.resolve(res);
			return dfd.promise();
		}
		switch (pPlatform) {
			case 'pwt':
				lUserAjaxSrv = gUserAjaxSrv_ + 'authors_srv.php';
				break;
			case 'pjs':
				lUserAjaxSrv = gUserAjaxSrv_ + 'usr_autocomplete_srv.php';
				break;
		}
		dfd = $.ajax({
			url: lUserAjaxSrv,
			dataType: 'json',
			async: false,
			data: this.lData,
			dua: this,
			beforeSend: function () {
			},
			success: function (pAjaxResult) {
				return pAjaxResult['json'];
			},
			complete: function () {
			}
		});

		return dfd.promise();
	};

	this.appendObject = function (obj) {
		if (_.isEmpty(this.list)) {
			getLastOrd = obj;
		} else {
			getLastOrd = _.last(this.list);
		}
		if (typeof obj.ord != "undefined") {
			obj.ord = getLastOrd.ord + 1;
		}
		if (this.list.length == 0) {
			this.list.push(obj);
		} else {
			this.list = _.union(this.list, [obj]);
		}
		this.render(true);
		return this.list;
	};
	this.update = function (pOrd, key, val) {
		obj = _.findWhere(this.list, {ord: pOrd});
		key = _.first(key.split("_"));
		obj[key] = val;
		newList = jQuery.extend(true, {}, this.list);
		$('form[name="' + pFormName + '"] input[name="json_output"]').val(JSON.stringify(this.removeCountriesFromList(newList))).trigger("change");
	};
	this.deleteObject = function (pOrd) {
		this.list = _.without(this.list, _.findWhere(this.list, {ord: pOrd}));
		this.list = _.map(this.list, function (el, i) {
			if (el.ord > pOrd) {
				el.ord -= 1;
			}
			return el;
		});
		this.render(true);
	};
	this.moveObject = function (destination, ord) {
		var curIndex, curOrd, prevObj, nextObj, prevOrd, nextOrd;
		obj = _.findWhere(this.list, {ord: ord});

		if (destination == 'up') {
			curOrd = ord;
			curIndex = _.findIndex(this.list, function (item) {
				return item == obj
			});
			if (obj != _.first(this.list)) {
				prevObj = this.list[(curIndex - 1)];

				this.list = _.map(this.list, function (el, i) {
					if (el == prevObj) {
						prevOrd = el.ord;
						el.ord = curOrd;
					}
					return el;
				});
				this.list = _.without(this.list, obj);
				obj.ord = prevOrd;
				this.list.splice((curIndex - 1), 0, obj);
			}
		} else if (destination == 'down') {

			curOrd = obj.ord;
			curIndex = _.findIndex(this.list, function (item) {
				return item == obj
			});
			if (obj != _.last(this.list)) {
				nextObj = this.list[(curIndex + 1)];

				this.list = _.map(this.list, function (el, i) {
					if (el == nextObj) {
						nextOrd = el.ord;
						el.ord = curOrd;
					}
					return el;
				});
				this.list = _.without(this.list, obj);
				obj.ord = nextOrd;
				this.list.splice((curIndex + 1), 0, obj);
			}

		}
		this.render(true);
	};
	this.sort = function (param) {
		this.list = _.sortBy(this.list, param)
	};
	this.setControlls = function () {

		var firstElement = _.first(this.list);
		var lastElement = _.last(this.list);

		if (this.list.length > 1) {
			this.list = _.map(this.list, function (el, k) {
				if (el == firstElement) {
					el.actions = [2, 3];
				} else if (el == lastElement) {
					el.actions = [1, 3];
				} else {
					el.actions = [1, 2, 3];
				}
				return el;
			});
		} else {
			this.list = _.map(this.list, function (el) {
				el.actions = [];
				return el;
			})
		}

	};
	this.temp = _.template($(pTemplateSel).html());
	this.show = function () {
		$(pContainerSel).html('');
		_.map(this.list, function (el) {
			$(pContainerSel).append(this.temp(el));
			return this.temp(el);
		});
	};
	this.removeCountriesFromList = function (list) {
		return _.map(list, function (el) {
			el.countries = [];
			return el;
		});
	};
	this.render = function (refresh) {
		this.init(refresh).then(function (response) {
			fThis = this.dua;
			fThis.list = response["json"];
			fThis.sort("ord");
			fThis.setControlls();
			// handle country
			getCountries("&action=get_country_list&lang_code=" + lLangCode, lUserAjaxSrv).then(
					function (response) {
						fThis.list = _.map(fThis.list, function (el, i) {
							el.countries = response.countries;
							return el;
						});
						newList = jQuery.extend(true, {}, fThis.list);
						$('form[name="' + pFormName + '"] input[name="json_output"]').val(JSON.stringify(fThis.removeCountriesFromList(newList))).trigger("change");
						fThis.show();
					}
			);


			$(pContainerSel + " input, " + pContainerSel + " select").change(function (event) {
				event.stopPropagation();
				tempDocumentAddress.update($(this).data('ord'), this.name, $(this).val());
			});
		}, function () {
			alert('ajax error');
		});
	};
	this.render(false);
	return this;
}
*/
var gArticleAjaxSrvUrl = gAjaxUrlsPrefix + 'article_ajax_srv.php'
var gArticleId = 0;
var gActiveMenuClass = 'P-Active-Menu';
var gArticlePreviewIframeId = 'articleIframe';
var gMapHolderId = 'localitiesMap';
var gBaloonId = 'ArticleBaloon';
var gArticleMap = false;
var gContentsMenuElementType = 1;
var gLocalitiesMenuElementType = 6;
var gReferencesMenuElementType = 4;
var gEndnotesMenuElementType = 18;
var gMenuActiveElementType = false;
var gTaxonParsedNameAttributeName = 'data-taxon-parsed-name';
var gInstCodeParsedNameAttributeName = 'data-institutional-code-parsed-name';
var gTraitParsedNameAttributeName = 'data-trait-parsed-name';
var gTaxonParsedNameAttributePrefix = 'data-taxon-parsed-name-';
var gTraitParsedNameAttributePrefix = 'data-trait-parsed-name-';
var gTaxonNameHolderNamesCountAttributeName = 'data-taxon-names-count';
var gTraitNameHolderNamesCountAttributeName = 'data-trait-names-count';
var gCitationElementInstanceIdAttributeName = 'rid';

var gLocalitiesAreLoaded = false;
var gLocalitiesList = {};
var gActiveLocalityIds = [];
var gLocalityByCoordinatesArr = {};
var gLocalityByInstanceIdArr = {};
var gLocalitySelectAllInputValue = -2;
var gLocalitySelectAllInstancesInputValue = -1;

var gCurrentTaxonOccurrenceNavigationTaxonNamesNode = false;
var gCurrentTaxonOccurrenceNavigationTaxonNode = false;
var gCurrentInstCodeOccurrenceNavigationInstCodeNamesNode = false;
var gCurrentInstCodeOccurrenceNavigationInstCodeNode = false;
var gCurrentTraitOccurrenceNavigationTraitNamesNode = false;
var gCurrentTraitOccurrenceNavigationTraitNode = false;
var gCurrentCitatedElementNavigationNode = false;
var gCurrentHighlightElementNavigationNode = false;
var gCurrentHighlightElementNavigationClass = '';
var gHighlightedElementClass = 'P-Highlighted-Element';

var gTaxonDataUsageTypeTreatment = 1;
var gTaxonDataUsageTypeChecklist = 2;
var gTaxonDataUsageTypeIdKey = 3;
var gTaxonDataUsageTypeFigure = 4;
var gTaxonDataUsageTypeInline = 5;

var gInstCodeDataUsageTypeTreatment = 6;
var gInstCodeDataUsageTypeChecklist = 7;
var gInstCodeDataUsageTypeIdKey = 8;
var gInstCodeDataUsageTypeFigure = 9;
var gInstCodeDataUsageTypeInline = 10;

var gTraitDataUsageTypeTreatment = 11;
var gTraitDataUsageTypeChecklist = 12;
var gTraitDataUsageTypeIdKey = 13;
var gTraitDataUsageTypeFigure = 14;
var gTraitDataUsageTypeInline = 15;



Locality = function(pId, pLongitude, pLatitude, pInstanceIds){
	this.latitude = pLatitude;
	this.longitude = pLongitude;
	this.instanceIds = pInstanceIds;
	this.id = pId;
	this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(pLatitude,pLongitude),
      map: null,
      title: pLatitude + ', ' + pLongitude
  });
};

Locality.prototype.showMarker = function(){
	this.marker.setMap(gArticleMap);
};

Locality.prototype.hideMarker = function(){
	this.marker.setMap(null);
};

function SetArticleId(pArticleId){
	gArticleId = pArticleId;
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}
function initArticlePreviewOnLoadEvents(){
	resizePreviewIframe(gArticlePreviewIframeId);	
	InitCollapseEvents();
	InitCollapseIOEvents();
	LoadArticleLocalities();
	LoadArticleReferences();
	LoadArticleEndnotes();
	LoadArticleFilebaseEndnotes();
	LoadArticleFootnotes();
	LoadArticleJATSFootnotes();
	InitContentsCustomElementsEvents();
	InitContentsCustomElementsEvents(1);
	InitClearHighlightedElementsEvents();	
	fixArticleExternalLinks();	
}

function InitCollapseEvents(){
	GetArticlePreviewContent().find( ".toCollapse" ).removeClass("plus");
	GetArticlePreviewContent().find( ".toCollapse" ).addClass("minus");
	
	// if(window.innerWidth < 601){
	// 	GetArticlePreviewContent().find( ".toCollapse" ).removeClass("plus");
	// 	GetArticlePreviewContent().find( ".toCollapse" ).addClass("minus");
	// 	GetArticlePreviewContent().find("div.P-Article-Preview-Block-Content ul.references").toggle();
	// 	GetArticlePreviewContent().find("div.P-Article-Preview-Block ul.references").toggle();
	// 	GetArticlePreviewContent().find(".toCollapse").parent().nextAll("div").toggle();
	// }
	GetArticlePreviewContent().find( ".toCollapse" ).click(function() {
		$(this).parent().next("div.P-Article-Preview-Block ul.references").toggle(); //references
		$(this).parent().nextAll("div").toggle(); //all others	
		if($(this).hasClass("plus")){
	        $(this).removeClass("plus");
			$(this).addClass("minus");			
			resizePreviewIframe(gArticlePreviewIframeId);
		}else{			
	        $(this).removeClass("minus");
			$(this).addClass("plus");
			resizePreviewIframe(gArticlePreviewIframeId);
		}
		
	});
	resizePreviewIframe(gArticlePreviewIframeId);
}

function resizeContentHolders(){
	resizePreviewIframe(gArticlePreviewIframeId);
	var previewHolder = $('#article-preview');
	var barHolder = $('.P-Info-Content');
	var poweredByHolder = $('.poweredBy');
	var previewPageSubscribeHolder = $('.previewPageSubscribe');
	
	var containerHolder = $('#container');	
	var footerHolder = $('.footerContentWrapper');
	containerHolder.height($(window).height() + footerHolder.outerHeight());
	containerHolder.css('overflow-y', 'auto');
	
	previewHolder.height($(window).height() - previewHolder.offset().top);
	if (previewPageSubscribeHolder.height()) {
		barHolder.height($(window).height() - barHolder.offset().top - previewPageSubscribeHolder.outerHeight() - poweredByHolder.outerHeight());
	} else {
		barHolder.height($(window).height() - barHolder.offset().top - poweredByHolder.outerHeight());
	}

	poweredByHolder.width(barHolder.width() - 20);
	previewPageSubscribeHolder.width(barHolder.width() - 20);
}

function fixArticleExternalLinks(){
	var lLinks = GetArticlePreviewContent().find('a[href]').not('[type="other"]');
	lLinks.each(function(pIdx, pLink){
		$(pLink).attr('target', '_blank');
	});
}

function InitArticleMenuEvents(){
	$('.P-Info-Menu li, .PostPubRevButton li').each(function(pIdx, pElement){
		var lElementType = $(this).attr('data-info-type');
		$(this).bind('click', function(){
			LoadArticleMenuMainElement(lElementType);
		});
	});
}

function LoadArticleMenuMainElement(pElementType){
	PerformAOFCommentFormAutosave();

	$.ajax({
		url : gArticleAjaxSrvUrl,
		async : false,
		data : {
			action : 'get_main_list_element',
			element_type : pElementType,
			article_id : gArticleId
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg']);
				return;
			}
			pAjaxResult['element_type'] = pElementType;
			InsertNewHistoryState(pAjaxResult);
			//required for Dimensions badge
			if(typeof window.__dimensions_embed !== 'undefined') {
				window.__dimensions_embed.addBadges();
			}
		}
	});
}


function LoadElementInfo(pActionName, pElementId, pElementName){
	$.ajax({
		url : gArticleAjaxSrvUrl,
		data : {
			action : pActionName,
			article_id : gArticleId,
			element_id : pElementId,
			element_name : pElementName
		},
		success : function(pAjaxResult) {

			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg']);
				return;
			}
			InsertNewHistoryState(pAjaxResult);
		}
	});
}

function InsertNewHistoryState(pStateData){
	History.pushState(pStateData, document.title, pStateData['url_link']);
}

function RegisterInitialState(pContentHtml, pActiveElementId, pTitle, pQueryString){
	pStateData = {
		'html' : pContentHtml,
		'element_type' : pActiveElementId
	};
	
	if(pActiveElementId == gLocalitiesMenuElementType){
		LoadArticleLocalities();
	}
	History.replaceState(pStateData, document.title, location.search + location.hash);
		History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
	    var lStateData = History.getState(); // Note: We are using History.getState() instead of event.state
	    LoadInfoContent(lStateData['data']['html'], lStateData['data']['element_type']);
	});
}


function MarkActiveMenuElement(){
	$('.P-Info-Menu li.' + gActiveMenuClass).removeClass(gActiveMenuClass);
	$('.P-Info-Menu li[data-info-type="' + gMenuActiveElementType + '"]').addClass(gActiveMenuClass);
	$('.PostPubRevButton li.' + gActiveMenuClass).removeClass(gActiveMenuClass);
	$('.PostPubRevButton li[data-info-type="' + gMenuActiveElementType + '"]').addClass(gActiveMenuClass);
}

function LoadInfoContent(pContent, pActiveMenuType){
	gMenuActiveElementType = (typeof pActiveMenuType !== "undefined" ? pActiveMenuType : 1);
	
	$('.P-Info-Content').html(pContent);
	var holder = $('.P-Info-Content');
	var pweredByWidth = holder.width() - 20;
	$('.poweredBy').width(pweredByWidth);
	$('.previewPageSubscribe').width(pweredByWidth);

	MarkActiveMenuElement();
	InitContentsCustomElementsEvents();
}

function LoadArticleLocalities(){
	if(gLocalitiesAreLoaded){
		return;
	}
	$.ajax({
		url : gArticleAjaxSrvUrl,
		async : false,
		data : {
			action : 'get_article_localities',
			article_id : gArticleId
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg']);
				return;
			}
			for(var lLocalityId in pAjaxResult['localities']){
				lLocalityId = parseInt(lLocalityId);
				var lLocalityData = pAjaxResult['localities'][lLocalityId];
				var lLocalityLongitude = parseFloat(lLocalityData['longitude']);
				var lLocalityLatitude = parseFloat(lLocalityData['latitude']);
				var lLocalityInstanceIds = lLocalityData['instance_ids'];

				var lLocality = new Locality(lLocalityId, lLocalityLongitude, lLocalityLatitude, lLocalityInstanceIds);
				gLocalitiesList[lLocalityId] = lLocality;
				if(!gLocalityByCoordinatesArr[lLocalityLatitude]){
					gLocalityByCoordinatesArr[lLocalityLatitude] = {};
				}
				if(!gLocalityByCoordinatesArr[lLocalityLatitude][lLocalityLongitude]){
					gLocalityByCoordinatesArr[lLocalityLatitude][lLocalityLongitude] = lLocalityId;
				}
				for(var i = 0; i < lLocalityInstanceIds.length; ++i){
					var lInstanceId = parseInt(lLocalityInstanceIds[i]);
					if(!gLocalityByInstanceIdArr[lInstanceId]){
						gLocalityByInstanceIdArr[lInstanceId] = [];
					}
					gLocalityByInstanceIdArr[lInstanceId].push(lLocalityId);
				}
			}
			gLocalitiesAreLoaded = true;
			PlaceLocalitiesMenuEvents();
		}
	});
}

function LoadArticleReferences(){
	$.ajax({
		url : gArticleAjaxSrvUrl,
		async : false,
		data : {
			action : 'get_main_list_element',
			element_type : gReferencesMenuElementType,
			article_id : gArticleId
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['err_cnt']){
				return;
			}
			$('.P-Article-References-For-Baloon').html(pAjaxResult['html']);
		}
	});
	GetArticlePreviewContent().find('xref.bibr[rid]').each(function (pIdx, pReferenceNode) {
		var lReferenceId = $(pReferenceNode).attr('rid');
		/**
		 * in case of multiple ids e.g. (B1 B2 B3) in one xref
		 */
		var referenceIds = lReferenceId.trim().split(" ");
		if(referenceIds.length > 1) {
			lReferenceId = referenceIds[0];
		}
		/**
		 * in case of multiple ids e.g. (B1-B3) in one xref
		 */
		var multipleIds = lReferenceId.trim().split("-");
		if(multipleIds.length > 1) {
			referenceIds = rangeIds (parseInt(multipleIds[0].substring(1)), parseInt(multipleIds[1].substring(1) - multipleIds[0].substring(1)) + 1, String(gReferencesMenuElementType));
			lReferenceId = referenceIds[0];
		}
		var lBaloon = $('#' + gBaloonId);
		var lReferenceContent = $('.P-Article-References-For-Baloon').find('.bibr[rid="' + lReferenceId + '"]');
		if(!lReferenceContent.length) {
			return;
		}
		$(pReferenceNode).hover(function () {
			var html = '';
			if(referenceIds.length > 1) {
				for (var i in referenceIds) {
					lReferenceContent = $('.P-Article-References-For-Baloon').find('.bibr[rid="' + referenceIds[i] + '"]');
					if(!lReferenceContent.length) {
						continue;
					}
					html += lReferenceContent.html() + "<br/>";
				}
			} else {
				html = lReferenceContent.html();
			}
			lBaloon.html(html);
			lBaloon.find('span.reflabel').show();
			var lReferenceOffsetTop = $(pReferenceNode).offset().top + $(pReferenceNode).outerHeight();
			var lReferenceOffsetLeft = $(pReferenceNode).offset().left;
			var rightOffset = ($('#' + gArticlePreviewIframeId).contents().find('#P-Article-Preview-Content').innerWidth() - $(pReferenceNode).offset().left);
			if(rightOffset < 250) {
				lReferenceOffsetLeft = lReferenceOffsetLeft - 200;
			}
			lBaloon.css('top', lReferenceOffsetTop);
			lBaloon.css('left', lReferenceOffsetLeft);
			lBaloon.show();
		},
			function () {
				lBaloon.hide();
			}
		);
	});
}

function LoadArticleEndnotes(){
	GetArticlePreviewContent().find('xref.endnote[rid]').each(function(pIdx, pEndnoteNode){
		var lEndnoteId = $(pEndnoteNode).attr('rid');
		var lBaloon = $('#' + gBaloonId);
		var lEndnoteContent = GetArticlePreviewContent().find('[instance_id="' + lEndnoteId + '"] div');
		if(!lEndnoteContent.length){
			return;
		}
		var hoverElem = $(pEndnoteNode).closest('.P-Endnotes-Citation-Holder, .citations-holder');
		if(!hoverElem.length){
			return;
		}
		$(hoverElem).closest('.P-Endnotes-Citation-Holder, .citations-holder').hover(function(pEvent){
				lBaloon.html(lEndnoteContent.html());
				var lEndnoteOffsetTop = $(hoverElem).offset().top + $(hoverElem).outerHeight();
				var lEndnoteOffsetLeft = $(hoverElem).offset().left;
				lBaloon.css('top', lEndnoteOffsetTop);
				lBaloon.css('left', lEndnoteOffsetLeft);
				lBaloon.show();
			},
			function(pEvent){
				lBaloon.hide();
			}
		);
	});
}

function LoadArticleFilebaseEndnotes() {
	GetArticlePreviewContent().find('xref[ref-type="endnote"]').each(function (pIdx, pEndnoteNode) {
		var lEndnoteId = $(pEndnoteNode).attr('rid');
		var lBaloon = $('#' + gBaloonId);
		var lEndnoteContent = GetArticlePreviewContent().find('[id="' + lEndnoteId + '"]').next().text();
		if(!lEndnoteContent) {
			return;
		}
		$(pEndnoteNode).hover(function (pEvent) {
				lBaloon.html($.trim(lEndnoteContent));
				var rt = ($('#article-preview').width() - ($(this).offset().left + $(this).outerWidth()));
				var lEndnoteOffsetTop = $(this).offset().top + $(this).outerHeight();
				var lEndnoteOffsetLeft = $(this).offset().left;
				lBaloon.css('top', lEndnoteOffsetTop);
				if(rt < 100) {
					lEndnoteOffsetLeft = lEndnoteOffsetLeft - 300;
				} else if(rt < 200) {
					lEndnoteOffsetLeft = lEndnoteOffsetLeft - 200;
				}
				lBaloon.css('left', lEndnoteOffsetLeft);
				lBaloon.show();
			},
			function (pEvent) {
				lBaloon.hide();
			}
		);
	});
}

function LoadArticleJATSFootnotes(){
	GetArticlePreviewContent().find('xref.fn[rid]').each(function(pIdx, pEndnoteNode){
		var lEndnoteId = $(pEndnoteNode).attr('rid');
		var lBaloon = $('#' + gBaloonId);
		var lEndnoteContent = GetArticlePreviewContent().find('.footwrap fn[id="' + lEndnoteId + '"]');
		if(!lEndnoteContent.length){
			return;
		}
		var hoverElem = $(pEndnoteNode);
		if(!hoverElem.length){
			return;
		}
		$(hoverElem).hover(function(pEvent){
				lBaloon.html(lEndnoteContent.html());
				var lEndnoteOffsetTop = $(hoverElem).offset().top + $(hoverElem).outerHeight();
				var lEndnoteOffsetLeft = $(hoverElem).offset().left;
				lBaloon.css('top', lEndnoteOffsetTop);
				lBaloon.css('left', lEndnoteOffsetLeft);
				lBaloon.show();
			},
			function(pEvent){
				lBaloon.hide();
			}
		);
	});
}
function LoadArticleFootnotes(){
	GetArticlePreviewContent().find('xref.footnote[rid]').each(function(pIdx, pReferenceNode){
		var lReferenceId = $(pReferenceNode).attr('rid');
		var lBaloon = $('#' + gBaloonId);
		var lReferenceContent = GetArticlePreviewContent().find('.footwrap p[id="' + lReferenceId + '"]');
		if(!lReferenceContent.length){
			return;
		}
		$(pReferenceNode).hover(function(pEvent){
				lBaloon.html(lReferenceContent.html());
				var lReferenceOffsetTop = $(pReferenceNode).offset().top + $(pReferenceNode).outerHeight();
				var lReferenceOffsetLeft = $(pReferenceNode).offset().left;
				lBaloon.css('top', lReferenceOffsetTop);
				lBaloon.css('left', lReferenceOffsetLeft);
				lBaloon.show();
			},
			function(pEvent){
				lBaloon.hide();
			}
		);
	});
}


function LoadFigureInfo(pElementId){
	LoadElementInfo('get_figure_element', pElementId);
//	console.log('Fig ' + pElementId);
	//LoadElementInfo('get_figure_element', 1);
}

function LoadTableInfo(pElementId){
	LoadElementInfo('get_table_element', pElementId);
//	console.log('Table ' + pElementId);
	//LoadElementInfo('get_table_element', 5);
}

function LoadSupFileInfo(pElementId){
	LoadElementInfo('get_sup_file_element', pElementId);
//	console.log('Sup file ' + pElementId);
	//LoadElementInfo('get_sup_file_element', 4);
}

function LoadReferenceInfo(pElementId){
	LoadElementInfo('get_reference_element', pElementId);
//	console.log('Reference ' + pElementId);
	//LoadElementInfo('get_reference_element', 9);
}

function LoadTaxonInfo(pTaxonName){
	pTaxonName = PrepareTaxonName(pTaxonName);
//	LoadElementInfo('get_taxon_element', '', pTaxonName);
//	console.log('Taxon ' + pTaxonName);
	LoadElementInfo('get_taxon_element', '', pTaxonName);
}

function LoadAuthorInfo(pElementId){
	LoadElementInfo('get_author_element', pElementId);
//	console.log('Author ' + pElementId);
//	LoadElementInfo('get_author_element', 4);
}

function ScrollInfoBarToTop(){
	$('.P-Article-Info-Bar').scrollTop(0);
}

function InitContentsCustomElementsEvents(pInPreviewIframe){	
	var imagesLoadCb = null;
	if(pInPreviewIframe){
		imagesLoadCb = function(){
			resizePreviewIframe(gArticlePreviewIframeId);	
		};
	}
	
	HideMenuLeftBar();
	loadLazyImages(GetCustomElementsContents(pInPreviewIframe), imagesLoadCb);		
	PlaceTaxonNameEvents(pInPreviewIframe);
	
	PlaceFigureEvents(pInPreviewIframe);
	PlaceTableEvents(pInPreviewIframe);	
	PlaceReferencesEvents(pInPreviewIframe);
	PlaceFootnoteEvents(pInPreviewIframe);
	PlaceEndnoteEvents(pInPreviewIframe);
	PlaceSupFilesEvents(pInPreviewIframe);
	PlaceLocalitiesEvents(pInPreviewIframe);
	PlaceAnchorXrefEvents(pInPreviewIframe);
	PlaceAuthorEvents(pInPreviewIframe);	
	PlaceTaxonUsageIconsEvents(pInPreviewIframe);
	PlaceTaxonNavigationLinkEvents(pInPreviewIframe);
	PlaceInstCodeUsageIconsEvents(pInPreviewIframe);
	PlaceInstCodeNavigationLinkEvents(pInPreviewIframe);
	PlaceTraitUsageIconsEvents(pInPreviewIframe);
	PlaceTraitNavigationLinkEvents(pInPreviewIframe);
	PlaceCitatedElementsNavigationEvents(pInPreviewIframe);
	
	ResetTaxonOccurrenceNavigation();
	ResetCitatedElementNavigation();
	ResetHighlightElementNavigation();
	ResetHighlightsDisplay();	
	PlaceBaloonEvents(pInPreviewIframe);	
	if(gMenuActiveElementType != gLocalitiesMenuElementType){
		ClearActiveLocalities();
	}	
	PlaceHighlightEvents(pInPreviewIframe);	
	PlaceHighligtsElementsNavigationEvents(pInPreviewIframe);
	ScrollInfoBarToTop();
}

function InitClearHighlightedElementsEvents(){
	var lClearActiveElementsHighlight = function(){
		RemoveCurrentTaxonNavigationNodeHighlight();
		RemoveCurrentCitatedElementNavigationNodeHighlight();
	};
	GetArticlePreviewContent().bind('mouseup', function(pEvent){
		lClearActiveElementsHighlight();
		return true;
	});
	GetArticlePreviewContent().bind('keyup', function(pEvent) {
		lClearActiveElementsHighlight();
	});
	GetArticlePreviewContent().bind('selectionchange', function(pEvent) {
		lClearActiveElementsHighlight();
	});

	$(document).bind('mouseup', function(pEvent){
		lClearActiveElementsHighlight();
	});
	$(document).bind('keyup', function(pEvent) {
		lClearActiveElementsHighlight();
	});
	$(document).bind('selectionchange', function(pEvent) {
		lClearActiveElementsHighlight();
	});
}

function SetArticleOnLoadEvents(pInstanceId){
	$('#' + gArticlePreviewIframeId).load(function(){
		initArticlePreviewOnLoadEvents();
		if(pInstanceId) {
			ScrollArticleToInstance(pInstanceId);
		} else if(window.location.hash){
			ScrollArticleToAnchor(window.location.hash.substr(1));
		}
	});	
	
//	$(window).resize(function(){SetLocalitiesHolderHeight();});
}

function GetArticlePreviewContent(){
	return $('#' + gArticlePreviewIframeId).contents();
}


function GetCustomElementsContents(pInPreviewIframe){
	if(pInPreviewIframe){
		return GetArticlePreviewContent();
	}
	return $('.P-Article-Info-Bar');
}


function PlaceTaxonNameEvents(pInPreviewIframe){
	var lPartsThatLeadToSelf = [
		'kingdom',
		'regnum',
		'subkingdom',
		'subregnum',
		'division',
		'phylum',
		'clade',
		'subdivision',
		'subphylum',
		'superclass',
		'superclassis',
		'class',
		'classis',
		'subclass',
		'subclassis',
		'infraclass',
		'infraclassis',
		'superorder',
		'superordo',
		'order',
		'ordo',
		'suborder',
		'subordo',
		'infraorder',
		'infraordo',
		'superfamily',
		'superfamilia',
		'family',
		'familia',
		'subfamily',
		'subfamilia',
		'tribe',
		'tribus',
		'subtribe',
		'subtribus',
		'genus',
		'subgenus',
		'section',
		'series',
		'supersection',
		'subsection',
		'above-genus',
		'fake-taxon-name-part'
	];
	var lPartsThatDontLeadToSelf = {
		'species' : ['genus', 'species'],
		'subspecies' : ['genus', 'species', 'subspecies'],
		'variety' : ['genus', 'species', 'variety'],
		'varietas' : ['genus', 'species', 'varietas'],
		'subvariety' : ['genus', 'species', 'variety', 'subvariety'],
		'subvarietas' : ['genus', 'species', 'varietas', 'subvarietas'],
		'form' : ['genus', 'species', 'form'],
		'forma' : ['genus', 'species', 'forma'],		
		'stage' : ['genus', 'species', 'stage'],
		'race' : ['genus', 'species', 'race'],		
		'aberration' : ['genus', 'species', 'aberration'],
	};
	var lPartsThatLeadToSelfSelector = '.' + lPartsThatLeadToSelf.join(',.');
	var lAttributeThatHoldsPartFullName = 'full-name';
	GetCustomElementsContents(pInPreviewIframe).find('.tn').each(function(pIdx, pTaxonNode){
		$(pTaxonNode).find(lPartsThatLeadToSelfSelector).each(function(pIdx1, pTaxonNamePartNode){
			$(pTaxonNamePartNode).bind('click', function(pEvent){
				showInfoBar(1);
				PerformAOFCommentFormAutosave();
				pEvent.stopPropagation();
				var lTaxonName = $(pTaxonNamePartNode).attr(lAttributeThatHoldsPartFullName);
				if(typeof lTaxonName === 'undefined' || lTaxonName == ''){
					lTaxonName = $(pTaxonNamePartNode).text();
				}
				LoadTaxonInfo(lTaxonName);
			});
		});
		for(var lPartName in lPartsThatDontLeadToSelf){
			var lParts = $(pTaxonNode).find('.' + lPartName);
			var lNamePartsOrder = lPartsThatDontLeadToSelf[lPartName];
			if(lParts.length > 0){
				var lTaxonName = '';
				for(var i = 0; i < lNamePartsOrder.length; ++i){
					var lCurrentPart = lNamePartsOrder[i];
					var lCurrentPartText = $(pTaxonNode).find('.' + lCurrentPart).attr(lAttributeThatHoldsPartFullName);
					if(typeof lCurrentPartText === 'undefined' || lCurrentPartText == ''){
						lCurrentPartText = $(pTaxonNode).find('.' + lCurrentPart).text();
					}
					if(lTaxonName != ''){
						lTaxonName += ' ';
					}
					lTaxonName += lCurrentPartText;
				}
				lParts.each(function(pIdx1, pTaxonNamePartNode){
					$(pTaxonNamePartNode).bind('click', function(pEvent){
						showInfoBar(1);
						PerformAOFCommentFormAutosave();
						pEvent.stopPropagation();
						LoadTaxonInfo(lTaxonName);
					});
				});
			}
		}
	});
}

/**
 * Strips and removes multiple whitespaces from the taxon name
 * @param pTaxonName
 */
function PrepareTaxonName(pTaxonName){
	pTaxonName = $.trim(pTaxonName);
	pTaxonName = pTaxonName.replace(/\s+/, ' ');
	return pTaxonName;
}

function PlaceFigureEvents(pInPreviewIframe){
	GetCustomElementsContents(pInPreviewIframe).find('.fig[rid]').each(function(pIdx, pFigureNode){
		$(pFigureNode).bind('click', function(pEvent){
			showInfoBar(1);
			PerformAOFCommentFormAutosave();
			pEvent.stopPropagation();
			LoadFigureInfo($(pFigureNode).attr('rid'));
		});
	});
}

function PlaceTableEvents(pInPreviewIframe){
	GetCustomElementsContents(pInPreviewIframe).find('.table[rid]').each(function(pIdx, pTableNode){
		$(pTableNode).bind('click', function(pEvent){
			showInfoBar(1);
			PerformAOFCommentFormAutosave();
			pEvent.stopPropagation();
			LoadTableInfo($(pTableNode).attr('rid'));
		});
	});
}

function PlaceSupFilesEvents(pInPreviewIframe){
	GetCustomElementsContents(pInPreviewIframe).find('.suppl[rid]').each(function(pIdx, pSupFileNode){
		$(pSupFileNode).bind('click', function(pEvent){
			showInfoBar(1);
			PerformAOFCommentFormAutosave();
			pEvent.stopPropagation();
			LoadSupFileInfo($(pSupFileNode).attr('rid'));
		});
	});
}

function PlaceReferencesEvents(pInPreviewIframe){
	GetCustomElementsContents(pInPreviewIframe).find('.bibr[rid]').each(function(pIdx, pReferenceNode){
		$(pReferenceNode).bind('click', function(pEvent){
			showInfoBar(1);
			PerformAOFCommentFormAutosave();
			pEvent.stopPropagation();
			LoadReferenceInfo($(pReferenceNode).attr('rid'));
		});
	});
}

function PlaceFootnoteEvents(pInPreviewIframe){
	GetCustomElementsContents(pInPreviewIframe).find('.fn[rid],.table-fn[rid]').each(function(pIdx, pXrefNode){
		$(pXrefNode).bind('click', function(pEvent){			
			showInfoBar(1);
			ScrollArticleToAnchor($(pXrefNode).attr('rid'));
		});
	});
	GetCustomElementsContents(pInPreviewIframe).find('.fn-label[id]').each(function(pIdx, pLabelNode){
		$(pLabelNode).bind('click', function(pEvent){
			showInfoBar(1);
			var lAnchor = GetArticlePreviewContent().find('.fn[rid="' + $(pLabelNode).attr('id') + '"],.table-fn[rid="' + $(pLabelNode).attr('id') + '"]').first();
			ScrollArticleToNode(lAnchor[0], 10);
		});
	});
}

function PlaceEndnoteEvents(pInPreviewIframe) {
	GetCustomElementsContents(pInPreviewIframe).find('.endnote[rid]').each(function (pIdx, pXrefNode) {
		$(pXrefNode).bind('click', function (pEvent) {
			showInfoBar(1);
			ScrollArticleToAnchor($(pXrefNode).attr('rid'));
		});
	});
	GetCustomElementsContents(pInPreviewIframe).find('.fn-label[id]').each(function (pIdx, pLabelNode) {
		$(pLabelNode).bind('click', function (pEvent) {
			showInfoBar(1);
			var lAnchor = GetArticlePreviewContent().find('.endnote[rid="' + $(pLabelNode).attr('id') + '"]').first();
			ScrollArticleToNode(lAnchor[0], 10);
		});
	});
}

function PlaceAuthorEvents(pInPreviewIframe){
	GetCustomElementsContents(pInPreviewIframe).find('*[data-author-id]').each(function(pIdx, pAuthorNode){
		$(pAuthorNode).bind('click', function(pEvent){
			showInfoBar(1);
			PerformAOFCommentFormAutosave();
			pEvent.stopPropagation();
			LoadAuthorInfo($(pAuthorNode).attr('data-author-id'));
		});
	});
}

function PlaceAnchorXrefEvents(pInPreviewIframe){
	GetCustomElementsContents(pInPreviewIframe).find('xref[ref-type="app"],xref[ref-type="anchor"]').each(function(pIdx, pXrefNode){
		$(pXrefNode).bind('click', function(pEvent){
			showInfoBar(1);
			ScrollArticleToAnchor($(pXrefNode).attr('rid'));
		});
	});
}



function PlaceLocalitiesEvents(pInPreviewIframe){
	GetCustomElementsContents(pInPreviewIframe).find('*[data-is-locality-coordinate]').each(function(pIdx, pLocalityNode){
		$(pLocalityNode).bind('click', function(pEvent){
			showInfoBar(1);
			PerformAOFCommentFormAutosave();
			pEvent.stopPropagation();
			ShowSingleCoordinate($(pLocalityNode).attr('data-latitude'), $(pLocalityNode).attr('data-longitude'));
		});
	});
}

function PlaceTaxonUsageIconsEvents(pInPreviewIframe){	
	var lTreatmentTitleSelector = '*[data-taxon-treatment-title]';
	var lChecklistTitleSelector = '*[data-checklist-taxon-title]';
	var lIDKeySelector = '*[data-id-key-taxon-name]';
	var lFigureSelector = '.figure';
	var lUsageSelects = {};
	lUsageSelects[gTaxonDataUsageTypeTreatment] = lTreatmentTitleSelector;
	lUsageSelects[gTaxonDataUsageTypeChecklist] = lChecklistTitleSelector;
	lUsageSelects[gTaxonDataUsageTypeIdKey] = lIDKeySelector;
	lUsageSelects[gTaxonDataUsageTypeFigure] = lFigureSelector;
	lUsageSelects[gTaxonDataUsageTypeInline] = '';
	GetCustomElementsContents(pInPreviewIframe).find('.taxon-usage').each(function(pIdx, pNode){
		var lTaxonNameHolder = $(pNode).closest('*[' + gTaxonNameHolderNamesCountAttributeName + ']');
		var lTaxonNamesCount = lTaxonNameHolder.attr(gTaxonNameHolderNamesCountAttributeName);
		var lTaxonNames = [];
		var gTaxonNodeSelector = '';
		for(var i = 0; i < lTaxonNamesCount; ++i){
			var lName = lTaxonNameHolder.attr(gTaxonParsedNameAttributePrefix + i);
			if(lName != ''){
				lTaxonNames.push(lName);
				if(gTaxonNodeSelector != ''){
					gTaxonNodeSelector +=',';
				}
				gTaxonNodeSelector += '*[' + gTaxonParsedNameAttributeName + '="' + lName + '"]';
			}
		}


		var lUsageType = parseInt($(pNode).attr('data-usage-type'));
		var lNodeResult = false;
		var lItemsToSearchIn = false;
		var lSearchHasBeenPerformed = false;
		var lSelector = '';



		if(gTaxonNodeSelector != '' ){
			$(pNode).bind('click', function(pEvent){
				PerformAOFCommentFormAutosave();
				pEvent.stopPropagation();
				lSelector = lUsageSelects[lUsageType];
				if(lUsageType == gTaxonDataUsageTypeInline){
					lItemsToSearchIn = GetArticlePreviewContent();
					//For inline usage we have to check that the taxon node is not in any of the non-inline taxon holders
					var lOccurrences = lItemsToSearchIn.find(gTaxonNodeSelector).addBack(gTaxonNodeSelector);
					var lCombinedSelectors = lTreatmentTitleSelector + ',' + lChecklistTitleSelector + ',' + lIDKeySelector + ',' + lFigureSelector;
					lOccurrences.each(function(){
						if($(this).parents(lCombinedSelectors).length == 0){
							//The node is not in any of the non-inline taxon holders - we dont have to search any more
							lNodeResult = this;
							return false;
						}
					});
					lSearchHasBeenPerformed = true;
				}

				if(!lSearchHasBeenPerformed){
					if(lUsageType == gTaxonDataUsageTypeTreatment){
						console.log(1);
					}
					if(lUsageType == gTaxonDataUsageTypeChecklist){
						console.log(2);
					}
					lItemsToSearchIn = GetArticlePreviewContent().find(lSelector);
					var lOccurrences = lItemsToSearchIn.find(gTaxonNodeSelector).addBack(gTaxonNodeSelector);
					if(lOccurrences.length){
						lNodeResult = lOccurrences.first()[0];
					}
				}

				if(lNodeResult != false){
						SetCurrentTaxonNavigationNode(lNodeResult, lTaxonNameHolder[0]);
				}
			});
		}
	});
}

var lTreatmentSelector = '.taxonTreatment';
var lChecklistSelector = '*[data-is-checklist-taxon]';
var lIDKeySelector = '*[data-id-key-taxon-name]';
var lFigureSelector = '.figure';

var gSpecialElementsUsageSelectors = {
	combinedSelector : lTreatmentSelector + ',' + lChecklistSelector + ',' + lIDKeySelector + ',' + lFigureSelector
};
gSpecialElementsUsageSelectors[gInstCodeDataUsageTypeTreatment] = gSpecialElementsUsageSelectors[gTraitDataUsageTypeTreatment] = lTreatmentSelector;
gSpecialElementsUsageSelectors[gInstCodeDataUsageTypeChecklist] = gSpecialElementsUsageSelectors[gTraitDataUsageTypeChecklist] = lChecklistSelector;
gSpecialElementsUsageSelectors[gInstCodeDataUsageTypeIdKey] = gSpecialElementsUsageSelectors[gTraitDataUsageTypeIdKey] = lIDKeySelector;
gSpecialElementsUsageSelectors[gInstCodeDataUsageTypeFigure] = gSpecialElementsUsageSelectors[gTraitDataUsageTypeFigure] = lFigureSelector;
var gFirstCitationFilter = function(pCitations){
	if(pCitations.length){
		return pCitations[0];
	}
};
var gInlineCitationFilter = function(pCitations){
	for(var i = 0; i < pCitations.length; ++i){
		var lCurCitation = pCitations[i];
		if($(lCurCitation).parents(gSpecialElementsUsageSelectors['combinedSelector']).length == 0){
			return lCurCitation;
		}
	};
};

function PlaceInstCodeUsageIconsEvents(pInPreviewIframe){	
	if(pInPreviewIframe){
		return;
	}		
	GetCustomElementsContents(pInPreviewIframe).find('*[' + gInstCodeParsedNameAttributeName + ']').each(function(pIdx, pNode){
		var $pNode = $(pNode);
		var instCodeName = $pNode.attr(gInstCodeParsedNameAttributeName);
		var lNodeSelector = '*[' + gInstCodeParsedNameAttributeName + '="' + instCodeName + '"]';
		$pNode.find('.inst-code-usage').each(function(pIdx, pUsageNode){
			var lUsageType = parseInt($(pUsageNode).attr('data-usage-type'));
			$(pUsageNode).bind('click', function(pEvent){
				if(lUsageType == gInstCodeDataUsageTypeTreatment){
					$(pNode).find('.treatment-usage').toggle();
				}
				if(lUsageType == gInstCodeDataUsageTypeChecklist){
					$(pNode).find('.checklist-usage').toggle();
				}
			});
			var searchInFunction = GetArticlePreviewContent;
			var citationFilter = gInlineCitationFilter;
			if(lUsageType !== gInstCodeDataUsageTypeInline){
				searchInFunction = function(){
					return GetArticlePreviewContent().find(gSpecialElementsUsageSelectors[lUsageType]);
				};
				citationFilter = gFirstCitationFilter
			}
			PlaceCitedElementsUsageLink(pNode, pUsageNode, searchInFunction, lNodeSelector, citationFilter, SetCurrentInstCodeNavigationNode);			
		});
		$pNode.find('.taxon-name-inst-code-usage').each(function(pIdx, pTaxonNode){
			var $pTaxonNode = $(pTaxonNode);
			var treatmentName = $pTaxonNode.attr('data-taxon-parsed-name');			
			PlaceCitedElementsUsageLink(pNode, pTaxonNode, function(){
				return GetArticlePreviewContent().find('*[data-is-taxon-treatment] *[data-taxon-treatment-title][data-taxon-parsed-name="' + treatmentName + '"] ').closest('*[data-is-taxon-treatment]');
			}, lNodeSelector, gFirstCitationFilter, SetCurrentInstCodeNavigationNode);			
		});
		$pNode.find('.checklist-taxon-name-inst-code-usage').each(function(pIdx, pChecklistNode){
			var $pChecklistNode = $(pChecklistNode);
			var treatmentName = $pChecklistNode.attr('data-taxon-parsed-name');			
			PlaceCitedElementsUsageLink(pNode, pChecklistNode, function(){
				return GetArticlePreviewContent().find('*[data-is-checklist-taxon] *[data-checklist-taxon-title] *[data-taxon-parsed-name="' + treatmentName + '"] ').closest('*[data-is-checklist-taxon]');
			}, lNodeSelector, gFirstCitationFilter, SetCurrentInstCodeNavigationNode);
		});
	});
}

/**
 * Places the onclick handler for usage (e.g. treatment name/checklist taxon name links of inst codes/traits)
 * @param pCitedElementNode - the citated element node (i.e. the node containing the inst code/trait
 * @param pUsageLinkNode - the node of the link for which the click handler is placed 
 * @param pSearchInFunction - a function which returns the nodes in which to look for citations
 * @param pCitationsSelector - the selector which returns the citations
 * @param pCitationFilter - a filter function which returns the citation node to be used
 * @param pSetFunction - the function to be called with params the citation and cited element
 */
function PlaceCitedElementsUsageLink(pCitedElementNode, pUsageLinkNode, pSearchInFunction, pCitationsSelector, pCitationFilter, pSetFunction){
	$(pUsageLinkNode).bind('click', function(pEvent){

		PerformAOFCommentFormAutosave();
		pEvent.stopPropagation();				
		var lItemsToSearchIn = pSearchInFunction();
		var lOccurrences = lItemsToSearchIn.find(pCitationsSelector).addBack(pCitationsSelector);
		var lCitation = pCitationFilter(lOccurrences);
		if(lCitation){
			pSetFunction(lCitation, pCitedElementNode);					
		}
	});
}

function PlaceTraitUsageIconsEvents(pInPreviewIframe){	
	if(pInPreviewIframe){
		return;
	}		
	GetCustomElementsContents(pInPreviewIframe).find('*[' + gTraitParsedNameAttributeName + ']').each(function(pIdx, pNode){
		var $pNode = $(pNode);
		var traitName = $pNode.attr(gTraitParsedNameAttributeName);
		var lNodeSelector = '*[' + gTraitParsedNameAttributeName + '="' + traitName + '"]';
		$pNode.find('.trait-usage').each(function(pIdx, pUsageNode){
			var lUsageType = parseInt($(pUsageNode).attr('data-usage-type'));
			$(pUsageNode).bind('click', function(pEvent){
				if(lUsageType == gTraitDataUsageTypeTreatment){
					$(pNode).find('.treatment-usage').toggle();
				}
				if(lUsageType == gTraitDataUsageTypeChecklist){
					$(pNode).find('.checklist-usage').toggle();
				}
			});
			var searchInFunction = GetArticlePreviewContent;
			var citationFilter = gInlineCitationFilter;
			if(lUsageType !== gTraitDataUsageTypeInline){
				searchInFunction = function(){
					return GetArticlePreviewContent().find(gSpecialElementsUsageSelectors[lUsageType]);
				};
				citationFilter = gFirstCitationFilter;
			}
			PlaceCitedElementsUsageLink(pNode, pUsageNode, searchInFunction, lNodeSelector, citationFilter, SetCurrentTraitNavigationNode);			
		});
		$pNode.find('.taxon-name-trait-usage').each(function(pIdx, pTaxonNode){
			var $pTaxonNode = $(pTaxonNode);
			var treatmentName = $pTaxonNode.attr('data-taxon-parsed-name');			
			PlaceCitedElementsUsageLink(pNode, pTaxonNode, function(){
				return GetArticlePreviewContent().find('*[data-is-taxon-treatment] *[data-taxon-treatment-title][data-taxon-parsed-name="' + treatmentName + '"] ').closest('*[data-is-taxon-treatment]');
			}, lNodeSelector, gFirstCitationFilter, SetCurrentTraitNavigationNode);			
		});
		$pNode.find('.checklist-taxon-name-trait-usage').each(function(pIdx, pChecklistNode){
			var $pChecklistNode = $(pChecklistNode);
			var treatmentName = $pChecklistNode.attr('data-taxon-parsed-name');			
			PlaceCitedElementsUsageLink(pNode, pChecklistNode, function(){
				return GetArticlePreviewContent().find('*[data-is-checklist-taxon] *[data-checklist-taxon-title] *[data-taxon-parsed-name="' + treatmentName + '"] ').closest('*[data-is-checklist-taxon]');
			}, lNodeSelector, gFirstCitationFilter, SetCurrentTraitNavigationNode);
		});
	});
}

function ScrollArticleToInstance(pInstanceId){
	var lFirstInstanceElement = GetArticlePreviewContent().find('*[instance_id=' + pInstanceId + ']').first();
	ScrollArticleToNode(lFirstInstanceElement[0], 10);
}


function ScrollArticleToAnchor(pAnchor){
	pAnchor = $.trim(pAnchor);
	var lAnchor = GetArticlePreviewContent().find('#' + pAnchor).first();
	if(!lAnchor.length){
		lAnchor = GetArticlePreviewContent().find('a[name="' + pAnchor + '"]').first();
		if(!lAnchor.length){
			return;
		}
	}
	ScrollArticleToNode(lAnchor[0], 10);
    showInfoBar();
}

function ScrollArticleToNode(pNode, pOffset){
	if(!pNode){
		return;
	}
	var lTopOffset = $(pNode).offset().top;
	$('#article-preview').scrollTop(lTopOffset - pOffset);
}

function ScrollToRid(pRid) {
	ScrollArticleToNode(GetArticlePreviewContent().find('[rid=' + pRid + ']').first(), 10);
}

function PlaceTaxonNavigationLinkEvents(pInPreviewIframe){
	GetCustomElementsContents(pInPreviewIframe).find('.P-Taxon-Navigation-Link-Prev,.P-Taxon-Navigation-Link-Next').each(function(pIdx, pNode){
		var lTaxonNamesNode= $(pNode).closest('*[' + gTaxonNameHolderNamesCountAttributeName + ']');
		if(lTaxonNamesNode.length){
			$(pNode).bind('click', function(pEvent){
				PerformAOFCommentFormAutosave();
				pEvent.stopPropagation();
				NavigateToPrevNextTaxonOccurrence(lTaxonNamesNode[0], $(pNode).hasClass('P-Taxon-Navigation-Link-Prev'));
			});
		}
	});
}

function PlaceInstCodeNavigationLinkEvents(pInPreviewIframe){
	GetCustomElementsContents(pInPreviewIframe).find('.P-InstCode-Navigation-Link-Prev,.P-InstCode-Navigation-Link-Next').each(function(pIdx, pNode){
		var lInstCodeNamesNode= $(pNode).closest('*[' + gInstCodeParsedNameAttributeName + ']');
		if(lInstCodeNamesNode.length){
			$(pNode).bind('click', function(pEvent){
				PerformAOFCommentFormAutosave();
				pEvent.stopPropagation();
				NavigateToPrevNextInstCodeOccurrence(lInstCodeNamesNode[0], $(pNode).hasClass('P-InstCode-Navigation-Link-Prev'));
			});
		}
	});
}

function NavigateToPrevNextInstCodeOccurrence(pTaxonNamesNode, pPrevious){
	if(gCurrentInstCodeOccurrenceNavigationInstCodeNode != false && gCurrentInstCodeOccurrenceNavigationInstCodeNamesNode != pTaxonNamesNode){
		ResetInstCodeOccurrenceNavigation();
	}

	var lTaxonNamesCount = $(pTaxonNamesNode).attr(gInstCodeParsedNameAttributeName);	
	var gTaxonNodeSelector = '*[' + gInstCodeParsedNameAttributeName + '="' + $(pTaxonNamesNode).attr(gInstCodeParsedNameAttributeName) + '"]';
	
	var lOccurrences = GetArticlePreviewContent().find(gTaxonNodeSelector);
	if(!lOccurrences.length){
		return;
	}
	var lResult = false;
	if(gCurrentInstCodeOccurrenceNavigationInstCodeNode == false){
		if(pPrevious){
			lResult = lOccurrences.last()[0];
		}else{
			lResult = lOccurrences.first()[0];
		}
	}else{
		var lNodeFoundBefore = false;
		lOccurrences.each(function(pIdx, pNode){
			if(!$(pNode).is(':visible')){
				return 1;//continue
			}
			var lNodePositionRelativeToCurrentNavigationTaxonNode = compareNodesOrder(gCurrentInstCodeOccurrenceNavigationInstCodeNode, pNode);

			if(pPrevious){
				if(lNodePositionRelativeToCurrentNavigationTaxonNode >= 0 && lNodeFoundBefore){
					// If the node is after the selection and we have found one
					// before the selection - stop processing the other nodes
					return false;
				}
				lResult = pNode;
				if(lNodePositionRelativeToCurrentNavigationTaxonNode < 0 && !lNodeFoundBefore){
					lNodeFoundBefore = true;
				}
			}else{
				if(!lResult){
					lResult = pNode;
				}

				if(lNodePositionRelativeToCurrentNavigationTaxonNode > 0){
					// If the comment is after the selection - it is the first after it
					lResult = pNode;
					return false;
				}
			}
		});
	}
	if(lResult){
		SetCurrentInstCodeNavigationNode(lResult, pTaxonNamesNode);
	}
}

function PlaceTraitNavigationLinkEvents(pInPreviewIframe){
	GetCustomElementsContents(pInPreviewIframe).find('.P-Trait-Navigation-Link-Prev,.P-Trait-Navigation-Link-Next').each(function(pIdx, pNode){
		var lTraitNamesNode= $(pNode).closest('*[' + gTraitParsedNameAttributeName + ']');
		if(lTraitNamesNode.length){
			$(pNode).bind('click', function(pEvent){
				PerformAOFCommentFormAutosave();
				pEvent.stopPropagation();
				NavigateToPrevNextTraitOccurrence(lTraitNamesNode[0], $(pNode).hasClass('P-Trait-Navigation-Link-Prev'));
			});
		}	
	});
	
	
}

function NavigateToPrevNextTraitOccurrence(pTaxonNamesNode, pPrevious){
	if(gCurrentTraitOccurrenceNavigationTraitNode != false && gCurrentTraitOccurrenceNavigationTraitNamesNode != pTaxonNamesNode){
		ResetTraitOccurrenceNavigation();
	}

		
	var gTaxonNodeSelector = '*[' + gTraitParsedNameAttributeName + '="' + $(pTaxonNamesNode).attr(gTraitParsedNameAttributeName) + '"]';

	var lOccurrences = GetArticlePreviewContent().find(gTaxonNodeSelector);
	if(!lOccurrences.length){
		return;
	}
	var lResult = false;
	if(gCurrentTraitOccurrenceNavigationTraitNode == false){
		if(pPrevious){
			lResult = lOccurrences.last()[0];
		}else{
			lResult = lOccurrences.first()[0];
		}
	}else{
		var lNodeFoundBefore = false;
		lOccurrences.each(function(pIdx, pNode){
			if(!$(pNode).is(':visible')){
				return 1;//continue
			}
			var lNodePositionRelativeToCurrentNavigationTaxonNode = compareNodesOrder(gCurrentTraitOccurrenceNavigationTraitNode, pNode);

			if(pPrevious){
				if(lNodePositionRelativeToCurrentNavigationTaxonNode >= 0 && lNodeFoundBefore){
					// If the node is after the selection and we have found one
					// before the selection - stop processing the other nodes
					return false;
				}
				lResult = pNode;
				if(lNodePositionRelativeToCurrentNavigationTaxonNode < 0 && !lNodeFoundBefore){
					lNodeFoundBefore = true;
				}
			}else{
				if(!lResult){
					lResult = pNode;
				}

				if(lNodePositionRelativeToCurrentNavigationTaxonNode > 0){
					// If the comment is after the selection - it is the first after it
					lResult = pNode;
					return false;
				}
			}
		});
	}
	if(lResult){
		SetCurrentTraitNavigationNode(lResult, pTaxonNamesNode);
	}
}

function NavigateToPrevNextTaxonOccurrence(pTaxonNamesNode, pPrevious){
	//A taxon names node may contain many names because we group the similar together.
	//When we look for a taxon - we look for a taxon with any of the names in the taxon names node
	//That is why we keep a reference to the node with names as well to the current taxon name
	//The attribute 'data-taxon-names-count' of this node contains the number of names which are present in the node
	if(gCurrentTaxonOccurrenceNavigationTaxonNode != false && gCurrentTaxonOccurrenceNavigationTaxonNamesNode != pTaxonNamesNode){
		ResetTaxonOccurrenceNavigation();
	}

	var lTaxonNamesCount = $(pTaxonNamesNode).attr(gTaxonNameHolderNamesCountAttributeName);
	var lTaxonNames = [];
	var gTaxonNodeSelector = '';
	for(var i = 0; i < lTaxonNamesCount; ++i){
		var lName = $(pTaxonNamesNode).attr(gTaxonParsedNameAttributePrefix + i);
		if(lName != ''){
			lTaxonNames.push(lName);
			if(gTaxonNodeSelector != ''){
				gTaxonNodeSelector +=',';
			}
			gTaxonNodeSelector += '*[' + gTaxonParsedNameAttributeName + '="' + lName + '"]';
		}
	}

	var lOccurrences = GetArticlePreviewContent().find(gTaxonNodeSelector);
	if(!lOccurrences.length){
		return;
	}
	var lResult = false;
	if(gCurrentTaxonOccurrenceNavigationTaxonNode == false){
		if(pPrevious){
			lResult = lOccurrences.last()[0];
		}else{
			lResult = lOccurrences.first()[0];
		}
	}else{
		var lNodeFoundBefore = false;
		lOccurrences.each(function(pIdx, pNode){
			if(!$(pNode).is(':visible')){
				return 1;//continue
			}
			var lNodePositionRelativeToCurrentNavigationTaxonNode = compareNodesOrder(gCurrentTaxonOccurrenceNavigationTaxonNode, pNode);

			if(pPrevious){
				if(lNodePositionRelativeToCurrentNavigationTaxonNode >= 0 && lNodeFoundBefore){
					// If the node is after the selection and we have found one
					// before the selection - stop processing the other nodes
					return false;
				}
				lResult = pNode;
				if(lNodePositionRelativeToCurrentNavigationTaxonNode < 0 && !lNodeFoundBefore){
					lNodeFoundBefore = true;
				}
			}else{
				if(!lResult){
					lResult = pNode;
				}

				if(lNodePositionRelativeToCurrentNavigationTaxonNode > 0){
					// If the comment is after the selection - it is the first after it
					lResult = pNode;
					return false;
				}
			}
		});
	}
	if(lResult){
		SetCurrentTaxonNavigationNode(lResult, pTaxonNamesNode);
	}
}

function ResetTaxonOccurrenceNavigation(){
	RemoveCurrentTaxonNavigationNodeHighlight();
	gCurrentTaxonOccurrenceNavigationTaxonNode = false;
	gCurrentTaxonOccurrenceNavigationTaxonNamesNode = false;
}

function ResetInstCodeOccurrenceNavigation(){
	RemoveCurrentInstCodeNavigationNodeHighlight();
	gCurrentInstCodeOccurrenceNavigationInstCodeNode = false;
	gCurrentInstCodeOccurrenceNavigationInstCodeNamesNode = false;
}

function ResetTraitOccurrenceNavigation(){
	RemoveCurrentTraitNavigationNodeHighlight();
	gCurrentTraitOccurrenceNavigationTraitNode = false;
	gCurrentTraitOccurrenceNavigationTraitNamesNode = false;
}

function SetCurrentTaxonNavigationNode(pNode, pNamesNode){
	ScrollArticleToNode(pNode, 150);
	RemoveCurrentTaxonNavigationNodeHighlight();
	gCurrentTaxonOccurrenceNavigationTaxonNode = pNode;
	gCurrentTaxonOccurrenceNavigationTaxonNamesNode = pNamesNode;
	$(gCurrentTaxonOccurrenceNavigationTaxonNode).addClass(gHighlightedElementClass);
}

function SetCurrentInstCodeNavigationNode(pNode, pNamesNode){
	ScrollArticleToNode(pNode, 150);
	RemoveCurrentInstCodeNavigationNodeHighlight();
	gCurrentInstCodeOccurrenceNavigationInstCodeNode = pNode;
	gCurrentInstCodeOccurrenceNavigationInstCodeNamesNode = pNamesNode;
	$(gCurrentInstCodeOccurrenceNavigationInstCodeNode).addClass(gHighlightedElementClass);
}

function SetCurrentTraitNavigationNode(pNode, pNamesNode){
	ScrollArticleToNode(pNode, 150);
	RemoveCurrentTraitNavigationNodeHighlight();
	gCurrentTraitOccurrenceNavigationTraitNode = pNode;
	gCurrentTraitOccurrenceNavigationTraitNamesNode = pNamesNode;
	$(gCurrentTraitOccurrenceNavigationTraitNode).addClass(gHighlightedElementClass);
}

function RemoveCurrentTaxonNavigationNodeHighlight(){
	$(gCurrentTaxonOccurrenceNavigationTaxonNode).removeClass(gHighlightedElementClass);
}

function RemoveCurrentTraitNavigationNodeHighlight(){
	$(gCurrentTraitOccurrenceNavigationTraitNode).removeClass(gHighlightedElementClass);
}

function RemoveCurrentInstCodeNavigationNodeHighlight(){
	$(gCurrentInstCodeOccurrenceNavigationInstCodeNode).removeClass(gHighlightedElementClass);
}

function PlaceCitatedElementsNavigationEvents(pInPreviewIframe){
	GetCustomElementsContents(pInPreviewIframe).find('.P-Citation-Navigation-Link-Prev,.P-Citation-Navigation-Link-Next').each(function(pIdx, pNode){
		var lInstanceIdNode= $(pNode).closest('*[data-cited-element-instance-id]');
		var lInstanceId = parseInt(lInstanceIdNode.attr('data-cited-element-instance-id'));
		if(lInstanceId > 0){

			$(pNode).bind('click', function(pEvent){
				PerformAOFCommentFormAutosave();
				pEvent.stopPropagation();
				NavigateToPrevNextElementCitation(lInstanceId, $(pNode).hasClass('P-Citation-Navigation-Link-Prev'));
			});
		}
	});
	GetCustomElementsContents(pInPreviewIframe).find('.P-Citation-Navigation-Link-First').each(function(pIdx, pNode){
		var lInstanceIdNode= $(pNode).closest('*[data-cited-element-instance-id]');
		var lInstanceId = parseInt(lInstanceIdNode.attr('data-cited-element-instance-id'));
		if(lInstanceId > 0){

			$(pNode).bind('click', function(pEvent){
				PerformAOFCommentFormAutosave();
				pEvent.stopPropagation();
				NavigateToFirstElementCitation(lInstanceId);
			});
		}
	});
}

function PlaceBaloonEvents(pInPreviewIframe){
	var lBaloon = $('#' + gBaloonId);
	GetCustomElementsContents(pInPreviewIframe).find('.Baloon-Wrapper').each(function(pIdx, pNode){
		var lIdx = $(pNode).attr('data-baloon-idx');		
//		if(lContent.length){
			$(pNode).hover(						
				function(pEvent){
					if(!pNode.baloonContentNode){
						pNode.baloonContentNode = GetCustomElementsContents(pInPreviewIframe).find('.Baloon-Content[data-baloon-idx="' + lIdx + '"]'); 
					}
					var lContent = pNode.baloonContentNode;
					lBaloon.html($(lContent).html());
					var lOffsetTop = $(pNode).offset().top + $(pNode).outerHeight();
					var lOffsetLeft = $(pNode).offset().left;
					lBaloon.css('top', lOffsetTop);
					lBaloon.css('left', lOffsetLeft);
					lBaloon.show();
				},
				function(pEvent){
					lBaloon.hide();
				}
			);
//		}
	});
}

function NavigateToFirstElementCitation(lInstanceId){
	ResetCitatedElementNavigation();
	NavigateToPrevNextElementCitation(lInstanceId, false);
}

function NavigateToPrevNextElementCitation(lInstanceId, pPrevious){
	if(gCurrentCitatedElementNavigationNode != false && GetCurrentCitatedElementNavigationNodeInstanceId() != lInstanceId){
		ResetCitatedElementNavigation();
	}

	var lOccurrences = GetArticlePreviewContent().find('xref[' + gCitationElementInstanceIdAttributeName + '="' + lInstanceId + '"]');
	if(!lOccurrences.length){
		return;
	}
	var lResult = false;
	if(gCurrentCitatedElementNavigationNode == false){
		if(pPrevious){
			lResult = lOccurrences.last()[0];
		}else{
			lResult = lOccurrences.first()[0];
		}
	}else{
		var lNodeFoundBefore = false;
		lOccurrences.each(function(pIdx, pNode){
			var lNodePositionRelativeToCurrentNavigationNode = compareNodesOrder(gCurrentCitatedElementNavigationNode, pNode);

			if(pPrevious){
				if(lNodePositionRelativeToCurrentNavigationNode >= 0 && lNodeFoundBefore){
					// If the node is after the selection and we have found one
					// before the selection - stop processing the other nodes
					return false;
				}
				lResult = pNode;
				if(lNodePositionRelativeToCurrentNavigationNode < 0 && !lNodeFoundBefore){
					lNodeFoundBefore = true;
				}
			}else{
				if(!lResult){
					lResult = pNode;
				}

				if(lNodePositionRelativeToCurrentNavigationNode > 0){
					// If the node is after the selection - it is the first after it
					lResult = pNode;
					return false;
				}
			}
		});
	}
	if(lResult){
		SetCurrentCitatedElementNavigationNode(lResult);
	}
}

function GetCurrentCitatedElementNavigationNodeInstanceId(){
	if(gCurrentCitatedElementNavigationNode != false){
		return $(gCurrentCitatedElementNavigationNode).attr(gCitationElementInstanceIdAttributeName);
	}
	return 0;
}

function ResetCitatedElementNavigation(){
	RemoveCurrentCitatedElementNavigationNodeHighlight();
	gCurrentCitatedElementNavigationNode = false;
}

function SetCurrentCitatedElementNavigationNode(pNode){
	ScrollArticleToNode(pNode, 10);
	RemoveCurrentCitatedElementNavigationNodeHighlight();
	gCurrentCitatedElementNavigationNode = pNode;
	$(gCurrentCitatedElementNavigationNode).addClass(gHighlightedElementClass);
}

function RemoveCurrentCitatedElementNavigationNodeHighlight(){
	$(gCurrentCitatedElementNavigationNode).removeClass(gHighlightedElementClass);
}

function LoadMapScript() {
	InitLocalitiesMap();
}

function SetLocalitiesHolderHeight(){
	var lHolder = $('.P-Localities-Menu');
	if(!lHolder.length){
		return;
	}
	var lWindowHeight = $(window).height();
	var lLocalitiesHolderOffset = $('.P-Localities-Menu').offset().top;
	$('.P-Localities-Menu').height(lWindowHeight - lLocalitiesHolderOffset);
}

function InitLocalitiesMap(){
	google.maps.visualRefresh = true;
	var lMapCenterCorrdinates = new google.maps.LatLng(0, 0);
	var lMapOptions = {
		zoom : 1,
		tileSize: new google.maps.Size(401, 512),
		center : lMapCenterCorrdinates
	};
//	SetLocalitiesHolderHeight();
	gArticleMap = new google.maps.Map(document.getElementById(gMapHolderId), lMapOptions);

}

function getNormalizedCoord(coord, zoom) {
	  var y = coord.y;
	  var x = coord.x;
	
	  // tile range in one direction range is dependent on zoom level
	  // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
	  var tileRange = 1 << zoom;
	
	  // don't repeat across y-axis (vertically)
	  if (y < 0 || y >= tileRange) {
	    return null;
	  }
	
	  // repeat across x-axis
	  if (x < 0 || x >= tileRange) {
	    x = (x % tileRange + tileRange) % tileRange;
	  }
	
	  return {
	    x: x,
	    y: y
	  };
}

function LoadTaxonMapScript(pGBIFTaxonId){
	google.maps.visualRefresh = true;
	gTaxonMapHolderId = 'taxonGBIFMap';
	var lMapCenterCorrdinates = new google.maps.LatLng(0, 0);
	var lMapOptions = {
		zoom : 1,
		tileSize: new google.maps.Size(401, 512),
		center : lMapCenterCorrdinates
	};
	var gbifMapTypeOptions = {
	  getTileUrl: function(coord, zoom) {
	      var normalizedCoord = getNormalizedCoord(coord, zoom);
	      if (!normalizedCoord) {
	        return null;
	      }
	      return 'http://api.gbif.org/v1/map/density/tile?type=TAXON&key=' + pGBIFTaxonId + '&x='+normalizedCoord.x + '&y='+ normalizedCoord.y + '&z=' + zoom;	      
	  },
	  tileSize: new google.maps.Size(256, 256),
	  maxZoom: 9,
	  minZoom: 0,
	  radius: 1738000,
	  name: 'gbif'
	};

	var gbifMapType = new google.maps.ImageMapType(gbifMapTypeOptions);
	
//	SetLocalitiesHolderHeight();
	gTaxonMap = new google.maps.Map(document.getElementById(gTaxonMapHolderId), lMapOptions);
	gTaxonMap.overlayMapTypes.push(gbifMapType);
}

function ShowSingleCoordinate(pLatitude, pLongitude){
	if(gMenuActiveElementType != gLocalitiesMenuElementType){
		LoadArticleMenuMainElement(gLocalitiesMenuElementType);
	}
	ClearActiveLocalities();
	var lLocalityId = gLocalityByCoordinatesArr[pLatitude][pLongitude];
	if(!lLocalityId){
		return;
	}
	var lLocality = gLocalitiesList[lLocalityId];
	if(!lLocality){
		return;
	}
	gActiveLocalityIds.push(lLocalityId);
	lLocality.showMarker();
}

function PlaceLocalitiesMenuEvents(){
	$('.P-Clear-Localities').bind('click', function(){ClearActiveLocalities();});
	$('input[name="active-localities"]').bind('change', function(){
		var lInputValue = parseInt($(this).val());
		var lInputIsChecked = $(this).is(':checked');
		if(lInputIsChecked && lInputValue < 0){
			var lFollowingInputs = $('input[name="active-localities"]').filter(function(pIdx){
				var lCurrentValue = parseInt($(this).val());
				return lCurrentValue > lInputValue;
			});
			lFollowingInputs.each(function(pIdx, pElement){
				$(pElement).attr('disabled', 'disabled');
				$(pElement).attr('checked', 'checked');
			});
		}
		if(!lInputIsChecked && lInputValue < 0){
			var lFollowingInputs = $('input[name="active-localities"]').filter(function(pIdx){
				var lCurrentValue = parseInt($(this).val());
				if(lInputValue == gLocalitySelectAllInputValue){
					return lCurrentValue > lInputValue && lCurrentValue < 0;
				}else{
					return lCurrentValue > lInputValue;
				}
			});
			lFollowingInputs.each(function(pIdx, pElement){
				$(pElement).removeAttr('disabled');
			});
		}
		GetActiveLocalitiesFromMenuSelection();
	});
	 $('#all').prop('checked', true);
	 $('#all').trigger('change');
}

function correctIframeLinks(pIframeId, pLinkPrefix){
	document.getElementById(pIframeId).contentWindow.changeRootLocation = function(pLocation){
		parent.location.href = pLinkPrefix + encodeURIComponent(pLocation);
	};
	var lLinks = $('#' + pIframeId).contents().find('a');
	for( var i = 0; i < lLinks.length; ++i ){
		var lLink = lLinks[i];
		var lLinkHref = lLink.getAttribute('href');
		lLink.setAttribute('href', pLinkPrefix + encodeURIComponent(lLinkHref));
	}
}


function GetActiveLocalitiesFromMenuSelection(){
	var lSelectedInputs = $('input[name="active-localities"]:checked');
	var lNewActiveLocalities = [];
	if(lSelectedInputs.filter('*[value="' + gLocalitySelectAllInputValue + '"]').length > 0){
		for(var lLocalityId in gLocalitiesList){
			lNewActiveLocalities.push(lLocalityId);
		}
	}else if(lSelectedInputs.filter('*[value="' + gLocalitySelectAllInstancesInputValue + '"]').length > 0){
		for(var lInstanceId in gLocalityByInstanceIdArr){
			for(var i = 0; i < gLocalityByInstanceIdArr[lInstanceId].length; ++i){
				var lLocalityId = gLocalityByInstanceIdArr[lInstanceId][i];
				if(lNewActiveLocalities.indexOf(lLocalityId) == -1){
					lNewActiveLocalities.push(lLocalityId);
				}
			}
		}
	}else{
		lSelectedInputs.each(function(pIdx, pElement){
			var lInstanceId = parseInt($(pElement).val());
			for(var i = 0; i < gLocalityByInstanceIdArr[lInstanceId].length; ++i){
				var lLocalityId = gLocalityByInstanceIdArr[lInstanceId][i];
				if(lNewActiveLocalities.indexOf(lLocalityId) == -1){
					lNewActiveLocalities.push(lLocalityId);
				}
			}
		});
	}
	var lLocalitiesToRemove = arrayDiff(gActiveLocalityIds, lNewActiveLocalities);
	//Hide all the markers which should not be visible
	for(var i = 0; i < lLocalitiesToRemove.length; ++i){
		var lLocalityId = lLocalitiesToRemove[i];
		var lLocality = gLocalitiesList[lLocalityId];
		if(!lLocality){
			continue;
		}
		lLocality.hideMarker();
	}
	//Show all the markers which should be visible
	for(var i = 0; i < lNewActiveLocalities.length; ++i){
		var lLocalityId = lNewActiveLocalities[i];
		var lLocality = gLocalitiesList[lLocalityId];
		if(!lLocality){
			continue;
		}
		lLocality.showMarker();
	}
	gActiveLocalityIds = lNewActiveLocalities;

}

function ClearActiveLocalities(){
	for(var i = 0; i < gActiveLocalityIds.length; ++i){
		var lLocalityId = gActiveLocalityIds[i];
		if(!lLocalityId){
			continue;
		}
		var lLocality = gLocalitiesList[lLocalityId];
		if(!lLocality){
			continue;
		}
		lLocality.hideMarker();
	}
	gActiveLocalityIds = [];
	var lInputs = $('input[name="active-localities"]');
	lInputs.removeAttr('checked');
	lInputs.removeAttr('disabled');
}

function callFormattingService(){
	var style = $('#chosen-select').val().toLowerCase().replace(/ /g, '-');
	var oReq  = new XMLHttpRequest();
		oReq.onload = function(){ $('#formattedRef').html( $('<div/>').html(this.responseText).text() ); };
		oReq.open("get", server +'/format?ref=' + ref + '&style=' + style, true);
		oReq.send();
}

function ScrollToTaxonCategory(pCategoryName){
	var lCategoryLink = $('#category_' + pCategoryName);
	var lPosition = lCategoryLink.position().top;
	$('.P-Info-Content').scrollTop($('.P-Info-Content').scrollTop() + lPosition - 56);
}

function InitCommentForm(pDiv, pJournalId, pArticleId, pAction) {
	if(typeof pAction == 'undefined'){
		pAction = 0;
	}

	$.ajax({
		url : '/article_comment_form.php',
		async : false,
		data : {
			journal_id : pJournalId,
			article_id : gArticleId,
			show_form : pAction
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg']);
				return;
			}
			$('#' + pDiv).html(pAjaxResult['html']);
		}
	});
}

function submitArticleNewComment(pOper, pFormName, pId) {
	if(pOper == 1){
		CKEDITOR.instances['textarea_message'].updateElement();
	}
	var lJqFormSel = $('form[name="' + pFormName + '"]')
	var lFormData = lJqFormSel.formSerialize();
	if(pOper == 1){
		if(!confirm('Your comment will be posted directly on the website. We reserve the rights to remove the comment if it contains offending or inflamattory language.')) {
			PerformAOFCommentFormAutosave();
			return false;
		}
		lFormData += '&tAction=comment';
	}

	if(typeof pId != 'undefined' && pId){
		lFormData += '&id=' + pId;
	}

	if(pOper == 2){
		lFormData += '&tAction=approve';
	}
	if(pOper == 3){
		lFormData += '&tAction=reject';
	}

	if(pOper == 4){
		CKEDITOR.instances['textarea_message'].destroy();
		lFormData += '&tAction=delete';
	}

	if(pOper == 5){
		lFormData += '&tAction=new';
	}
	//console.log(lFormData);
	$.ajax({
		url : '/article_comment_form.php',
		type : 'POST',
		async : false,
		data : lFormData,
		success : function(pAjaxResult) {
			if(pAjaxResult['success'] == 1){
				/*LoadCommentList('article_messages_wrapper_content');*/
				location.reload();
			} else {
				if(pAjaxResult['err_cnt']){
					alert(pAjaxResult['err_msg']);
					return false;
				}
			}
		}
	});
}

function LoadCommentList(pHolder) {
	$.ajax({
		url : gArticleAjaxSrvUrl,
		async : false,
		data : {
			action : 'get_main_list_element',
			element_type : 13,
			article_id : gArticleId,
			comment_list_flag : 1
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg']);
			} else {
				$('#' + pHolder).html(pAjaxResult['html']);
			}
		}
	});
}

function SetCommentDateLabel(pHolderId, pDateInSeconds, pDateString){
	var lCurrentDate = new Date();
	var lYear = lCurrentDate.getUTCFullYear();
	var lMonth = lCurrentDate.getUTCMonth();
	var lDays = lCurrentDate.getUTCDate();
	var lHours = lCurrentDate.getUTCHours();
	var lMinutes = lCurrentDate.getUTCMinutes();
	var lSeconds = lCurrentDate.getUTCSeconds();
	var lMilliseconds = lCurrentDate.getUTCMilliseconds();
	var lCurrentSeconds = Math.floor(Date.UTC(lYear, lMonth, lDays, lHours, lMinutes, lSeconds, lMilliseconds) / 1000);
	var lLabel = '';
	var lTimeoutSeconds = 0;
	var lDiff = lCurrentSeconds - pDateInSeconds;
	//Remove the offset of the current time to UFC time because pDateInSeconds is in UFC time
	lDiff -= lCurrentDate.getTimezoneOffset() * 60;//The offset is in minutes
	if(lDiff < 60){
		lLabel = 'less than a minute ago';
		lTimeoutSeconds = 60 - lDiff;
	}else if(lDiff < 3600){
		lLabel = Math.floor(lDiff / 60);
		if(lLabel == 1){
			lLabel += ' minute';
		}else{
			lLabel += ' minutes';
		}
		lLabel += ' ago';
		lTimeoutSeconds = 60 - (lDiff % 60);
	}else if(lDiff < 3600 * 24){
		lLabel = Math.floor(lDiff / 3600);
		if(lLabel == 1){
			lLabel += ' hour';
		}else{
			lLabel += ' hours';
		}
		lLabel += ' ago';
		lTimeoutSeconds = 3600 - (lDiff % 3600);
	}else{
		lLabel = pDateString;
	}
	$('#' + pHolderId).html(lLabel);
	if(lTimeoutSeconds > 0){
		setTimeout(function(){SetCommentDateLabel(pHolderId, pDateInSeconds, pDateString);}, lTimeoutSeconds * 1000);
	}
}

function PerformAOFCommentFormAutosaveTimeout(){
	setTimeout("PerformAOFCommentFormAutosave();PerformAOFCommentFormAutosaveTimeout()", 30 * 1000);
}

function PerformAOFCommentFormAutosave(){
	var lForm = $('form[name="article_comments_form"]');
	if(lForm.length){
		CKEDITOR.instances['textarea_message'].updateElement();
		lForm.ajaxSubmit({'data' : {'tAction' : 'save'}});
	}
}

function LayerViewPoll(pElem, pElementId, pElementType) {
	if(typeof pElementType == 'undefined' || !pElementType) {
		pElementType = 1;
	}

	$.ajax({
		url : '/view_poll.php',
		data : {
			rel_element_id : pElementId,
			rel_element_type: pElementType
		},
		success : function(pAjaxResult) {
			//console.log(pAjaxResult);
			if(pAjaxResult['err_cnt']) {
				alert(pAjaxResult['err_msg']);
				return;
			}

			$('#' + pElem).html(pAjaxResult['html']);

			$('#' + pElem).modal({
				autoResize : true,
				position : ["10%", ],
				minHeight : 430,
				maxHeight : 430,
				overlayClose : true,
				//close : false,
				onShow : function(dialog) {
					var doch = $(window).height();
					if(doch <= 430){
						var calh = doch - 2 * 80;
						$('#simplemodal-container').height(calh);
						//$('#simplemodal-container .taskspopup-rightcol').height((calh - 20));
					} else {
						var docw = $('#simplemodal-container').width();
						var modalh = $('#P-Post-Review-Form-Poll').height();
						//$('#simplemodal-container .taskspopup-rightcol').height(430);
						if(modalh > 430) {
							$('#simplemodal-container').width(docw + 15);
						}
					}
					$(".simplemodal-wrap").css('overflowX', 'hidden');
				},
				onClose : function(dialog) {
					$.modal.close();
				}
			});
		}
	});
}

var showPostReviewForm = false;
function tooglePostReviewForm(){
	showPostReviewForm = !showPostReviewForm;
	if (showPostReviewForm) {
		$('.review_form_table').show();
		$('#arrow2').attr("src", 'http://pwt.pensoft.net/i/arrow-up-icon.png');
	} else {
		$('#arrow2').attr("src", 'http://pwt.pensoft.net/i/arrow-down-icon.png');
		$('.review_form_table').hide();
	}
}

function PlaceHighlightEvents(pInPreviewIframe){
	GetCustomElementsContents(pInPreviewIframe).find('input.highlight-input').change(function(){
		var isChecked = $(this).prop('checked');
		var lStyle = this.id + '-display';
		var lElement = GetArticlePreviewContent().find('.P-Article-Preview');
		if(isChecked){
			lElement.addClass(lStyle);
		}else{
			lElement.removeClass(lStyle);
		}
	});
}

function ResetHighlightsDisplay(){
	var lElement = GetArticlePreviewContent().find('.P-Article-Preview');
	lElement.attr('class', 'P-Article-Preview');
	
}

function PlaceHighligtsElementsNavigationEvents(pInPreviewIframe){
	GetCustomElementsContents(pInPreviewIframe).find('.P-Highlights-Navigation-Link-Prev,.P-Highlights-Navigation-Link-Next').each(function(pIdx, pNode){
		var lInstanceIdNode= $(pNode).closest('*[data-highlight-class]');
		var lHighlightClass = lInstanceIdNode.attr('data-highlight-class');
		if(lHighlightClass != ''){
			$(pNode).bind('click', function(pEvent){				
				pEvent.stopPropagation();
				NavigateToPrevNextElementHighlight(lHighlightClass, $(pNode).hasClass('P-Highlights-Navigation-Link-Prev'));
			});
		}
	});	
}

function NavigateToPrevNextElementHighlight(pClass, pPrevious){
	if(gCurrentHighlightElementNavigationNode != false && gCurrentHighlightElementNavigationClass != pClass){
		ResetHighlightElementNavigation();
	}

	var lOccurrences = GetArticlePreviewContent().find('.' + pClass);
	if(!lOccurrences.length){
		return;
	}
	var lResult = false;
	if(gCurrentHighlightElementNavigationNode == false){
		if(pPrevious){
			lResult = lOccurrences.last()[0];
		}else{
			lResult = lOccurrences.first()[0];
		}
	}else{
		var lNodeFoundBefore = false;
		lOccurrences.each(function(pIdx, pNode){
			var lNodePositionRelativeToCurrentNavigationNode = compareNodesOrder(gCurrentHighlightElementNavigationNode, pNode);

			if(pPrevious){
				if(lNodePositionRelativeToCurrentNavigationNode >= 0 && lNodeFoundBefore){
					// If the node is after the selection and we have found one
					// before the selection - stop processing the other nodes
					return false;
				}
				lResult = pNode;
				if(lNodePositionRelativeToCurrentNavigationNode < 0 && !lNodeFoundBefore){
					lNodeFoundBefore = true;
				}
			}else{
				if(!lResult){
					lResult = pNode;
				}

				if(lNodePositionRelativeToCurrentNavigationNode > 0){
					// If the node is after the selection - it is the first after it
					lResult = pNode;
					return false;
				}
			}
		});
	}
	if(lResult){
		SetCurrentHighlightElementNavigationNode(lResult, pClass);
	}
}


function ResetHighlightElementNavigation(){
	RemoveCurrentHighlightElementNavigationNodeHighlight();
	gCurrentHighlightElementNavigationNode = false;
	gCurrentHighlightElementNavigationClass = '';
}

function SetCurrentHighlightElementNavigationNode(pNode, pClass){
	ScrollArticleToNode(pNode, 10);
	RemoveCurrentHighlightElementNavigationNodeHighlight();
	gCurrentHighlightElementNavigationNode = pNode;
	gCurrentHighlightElementNavigationClass = pClass;
	$(gCurrentHighlightElementNavigationNode).addClass(gHighlightedElementClass);
}

function RemoveCurrentHighlightElementNavigationNodeHighlight(){
	$(gCurrentHighlightElementNavigationNode).removeClass(gHighlightedElementClass);
}

function HideMenuLeftBar(){
	if( $('.P-Info-Menu.bottomBar').length == 0 ) {
		//$('.P-Article-Info-header').css('height', '57px');
		resizeContentHolders();
	}	
}


function buildMetricsPlot(pHolderId, pSeriesData, pClassToAdd, pLabelInstanceIds) {
	var maxSeriesValue = 0;
	for(var i = 0; i < pSeriesData.length; ++i){
		var curSeries = pSeriesData[i];
		for(var j = 0; j < curSeries.length; ++j){
			var xVal = curSeries[j][0];
			maxSeriesValue = xVal > maxSeriesValue ? xVal : maxSeriesValue;
		}
	}
	var options = {
		// Turns on animatino for all series in this plot.
		animate : true,
		// Will animate plot on calls to plot1.replot({resetAxes:true})
		animateReplot : false,
		cursor : {
			zoom : false,
			looseZoom : false,
			showTooltip : false
		},
		series : [

		{
			label : 'Unique downloads',
		}, {
			label : 'Total downloads',
		}, {
			label : 'Unique views',
		}, {
			label : 'Total views',
		}, ],
		// stackSeries: true,
		seriesDefaults :

		{

			renderer : $.jqplot.BarRenderer,
			pointLabels : {
				show : true,
				location : 'e',
				edgeTolerance : -15
			},
			showHighlight : true,
			rendererOptions : {
				// Speed up the animation a little bit.
				// This is a number of milliseconds.  
				// Default for bar series is 3000.  
				barDirection : 'horizontal',
				barMargin : 30,
				barWidth : 10,
				highlightMouseOver : true,
			/*animation: {
			                speed: 2000
			            }*/
			}
		},

		axesDefaults : {},
		axes : {
			// These options will set up the x axis like a category axis.
			xaxis : {
				min:0,				
				showMinorTicks : false,
				tickInterval: maxSeriesValue < 10 ? 1 : null, 
			    tickOptions: { 			    	
		            formatString: '%d',		            
//			            showGridline: false
		        } 
			},
			yaxis : {
				renderer : $.jqplot.CategoryAxisRenderer,
				tickOptions: { 
					mark: '',
					show: true,         // wether to show the tick (mark and label),
		            showLabel: true,
			    	showMark: false,				    	
		        } 
			},
		},
		cursor : {
			style : 'default', // A CSS spec for the cursor type to change the
			// cursor to when over plot.
			show : true,
			showTooltip : false,
		},
		highlighter : {
			show : true,
			showLabel : true,
			showMarker : false,
            tooltipContentEditor: function(str, seriesIndex, pointIndex, plot){
                return plot.series[seriesIndex].label;
            },
            tooltipLocation: 'w',
		},
		legend : {
			show : false,
			location : 's',
			xoffset : 20,
			yoffset : 20,
			placement : 'outside',
		}
	};
	var plot = $.jqplot(pHolderId, pSeriesData, options);		
	$('#' + pHolderId + ' .jqplot-yaxis-tick').each(function(){
		var lNode = $(this);
		var lLabel = lNode.text();
		lNode.addClass(pClassToAdd);
		lNode.attr('rid', pLabelInstanceIds[lLabel]);
	});
	//var plot = $.jqplot(pHolderId, pSeriesData, options);
	
}

function buildAlmMetricsPlot(pHolderId, pSeriesData, pSourceLinks) {
	var maxSeriesValue = 0;
	for(var i = 0; i < pSeriesData.length; ++i){
		var curSeries = pSeriesData[i];
		for(var j = 0; j < curSeries.length; ++j){
			var xVal = curSeries[j][0];
			maxSeriesValue = xVal > maxSeriesValue ? xVal : maxSeriesValue;
		}
	}
	var options = {
		// Turns on animatino for all series in this plot.
		animate : true,
		// Will animate plot on calls to plot1.replot({resetAxes:true})
		animateReplot : false,
		cursor : {
			zoom : false,
			looseZoom : false,
			showTooltip : false
		},	
		// stackSeries: true,
		seriesDefaults :

		{

			renderer : $.jqplot.BarRenderer,
			pointLabels : {
				show : true,
				location : 'e',
				edgeTolerance : -15
			},
			showHighlight : true,
			rendererOptions : {
				// Speed up the animation a little bit.
				// This is a number of milliseconds.  
				// Default for bar series is 3000.  
				barDirection : 'horizontal',
				barMargin : 30,
				barWidth : 10,
				highlightMouseOver : true,
			/*animation: {
			                speed: 2000
			            }*/
			}
		},

		axesDefaults : {},
		axes : {
			// These options will set up the x axis like a category axis.
			xaxis : {
				min:0,				
				showMinorTicks : false,
				tickInterval: maxSeriesValue < 10 ? 1 : null, 
			   
			},
			yaxis : {
				renderer : $.jqplot.CategoryAxisRenderer,
				tickOptions: { 
					mark: '',
					show: true,         // wether to show the tick (mark and label),
		            showLabel: true,
			    	showMark: false,				    	
		        } 
			},
		},
		cursor : {
			style : 'pointer', // A CSS spec for the cursor type to change the
			// cursor to when over plot.
			show : true,
			showTooltip : false,
		},
		highlighter : {
			show : false,
			showLabel : false,
			tooltipAxes : 'x',
			tooltipLocation : 'ne'
		},
		legend : {
			show : false,
//			location : 's',
//			xoffset : 20,
//			yoffset : 20,
//			placement : 'outside',
		}
	};
	var plot = $.jqplot(pHolderId, pSeriesData, options);		
	$('#' + pHolderId + ' .jqplot-yaxis-tick').each(function(){
		var lNode = $(this);
		var lLabel = lNode.text();	
		var lLink = pSourceLinks[lLabel];
		if(lLink){
			lNode.click(function(){
				window.open(lLink);
			});
		}
		
	});
	//var plot = $.jqplot(pHolderId, pSeriesData, options);
	
}

function buildMetricsSummaryPlot(pHolderId, pSeriesData) {
	var options = {
		seriesDefaults : {
			// make this a donut chart.
			renderer : $.jqplot.DonutRenderer,
			rendererOptions : {
				thickness : 34,
				fill : true,
				padding : 5,
				ringMargin	: 10,
				sliceMargin : 3,
				// Pies and donuts can start at any arbitrary angle.
				startAngle : -90,
				showDataLabels : true,
				// By default, data labels show the percentage of the donut/pie.
				// You can show the data 'value' or data 'label' instead.
				dataLabels : 'value'
			},
		},
		//Place the legend here....
		legend : {
			show : false,
			location : 'e',
			showSwatch : true
		},
		grid: {
		 drawGridlines: false,
		 borderColor: 'transparent',
		 shadow: false,
		 drawBorder: false,
		 shadowColor: 'transparent'
		}
	};
	var plot = $.jqplot(pHolderId, pSeriesData, options);	
	var tooltipHolder = $('#' + pHolderId + '_tooltip');
	var tooltipParentOffset = $('#' + pHolderId).offsetParent().offset();
	$('#' + pHolderId ).bind('jqplotDataHighlight', function (ev, seriesIndex, pointIndex, data, radius) {    
	      tooltipHolder.css({left:ev.pageX + 20 - tooltipParentOffset.left, top:ev.pageY - tooltipParentOffset.top + $('#' + pHolderId).offsetParent().scrollTop()});
	      tooltipHolder.html('<span class="jqplot-cursor-tooltip">' + data[0] + '</span>');
	      tooltipHolder.show();
	    });
	   
	  // Bind a function to the unhighlight event to clean up after highlighting.
	  $('#' + pHolderId ).bind('jqplotDataUnhighlight', function (ev, seriesIndex, pointIndex, data) {
	         tooltipHolder.empty();
	         tooltipHolder.hide();
	      });
}

function InitReviewForm(pDiv, pJournalId, pArticleId, pAction, pHide) {
	if(typeof pAction === 'undefined'){
		pAction = 0;
	}
	if(typeof pHide === 'undefined'){
		pHide = 0;
	}

	$.ajax({
		url : '/article_review_form.php',
		async : false,
		data : {
			journal_id : pJournalId,
			article_id : gArticleId,
			show_form : pAction,
			hide_form : pHide
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg']);
				return;
			}
			$('#' + pDiv).html(pAjaxResult['html']);
		}
	});
}

function submitArticleNewReview(pOper, pFormName, pId) {
	var lJqFormSel = $('form[name="' + pFormName + '"]');
	var lFormData = lJqFormSel.formSerialize();
	if (pOper === 1) { //save
		lFormData += '&tAction=save';
	}

	if (typeof pId !== 'undefined' && pId) {
		lFormData += '&id=' + pId;
	}

	if (pOper === 2) {
		lFormData += '&tAction=review';
	}
	if (pOper === 3) {
		lFormData += '&tAction=reject';
	}

	if (pOper === 4) {
		lFormData += '&tAction=delete';
	}

	if (pOper === 5) {
		lFormData += '&tAction=new';
	}
//	console.log(lFormData);
//	return;
	$.ajax({
		url: '/article_review_form.php',
		type: 'POST',
		async: false,
		data: lFormData,
		success: function (pAjaxResult) {
			if (pAjaxResult['success'] === 1) {
				location.reload();
			} else {
				if (pAjaxResult['err_cnt']) {
					$('#review_form').html(pAjaxResult['html']);
					return false;
				}
				if (pAjaxResult['err_msg']) {
					alert(pAjaxResult['err_msg']);
					return false;
				}
				if (typeof pAjaxResult['eval_js'] !== "undefined" && pAjaxResult['eval_js'] !== "") {
					eval(pAjaxResult['eval_js']);
					return;
				}
			}
		}
	});
}

function filterArticleReviews(pDiv, pElementType) {
	$.ajax({
		url: gArticleAjaxSrvUrl,
		async : false,
		data : {
			action : 'filter_reviews_list_element',
			element_type : pElementType,
			article_id : gArticleId,
			filter_type : $("#filter_option_field").val() || '',
			filter_date : $("#filter_date_field").val() || ''
		},
		success: function (pAjaxResult) {
			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg']);
				return;
			}
			$('#' + pDiv).html(pAjaxResult['html']);
		}
	});
}

function changeArticleReviewState(pReviewId, pState) {
	$.ajax({
		url : gArticleAjaxSrvUrl,
		type : 'POST',
		async : false,
		data : {
			action : 'change_review_state',
			article_id : gArticleId,
			element_id : pReviewId,
			state_id : pState
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['success'] == 1){
				location.reload();
			} else {
				if(pAjaxResult['err_cnt']){
					alert(pAjaxResult['err_msg']);
					return false;
				}
			}
		}
	});
}

function PerformArticleReviewFormAutosaveTimeout(pInitBlurEvents) {
	if (pInitBlurEvents) {
		$('form[name="article_review_form"] textarea').blur(function () {
			PerformArticleReviewFormAutosave();
		});
		$('form[name="article_review_form"] input').blur(function () {
			PerformArticleReviewFormAutosave();
		});
	}

	setTimeout("PerformArticleReviewFormAutosave();PerformArticleReviewFormAutosaveTimeout()", 30 * 1000);
}

function PerformArticleReviewFormAutosave() {
	var lForm = $('form[name="article_review_form"]');
	if (!lForm.length) {
		return;
	}
	lForm.ajaxSubmit({
		'data': {
			'tAction': 'save',
			'ajax_form_submit': 1
		}
	});
}

function LoadArticleContentsSection(pUrl, pInstanceId) {
	History.replaceState({}, document.title, pUrl);
//	History.pushState({}, document.title, pUrl);
	ScrollArticleToInstance(pInstanceId);
	showInfoBar();
}

function InitAuthorReviewForm(pDiv, pJournalId, pParentReviewId, pAction, pHide) {
	if (typeof pAction === 'undefined') {
		pAction = 0;
	}
	if (typeof pHide === 'undefined') {
		pHide = 0;
	}

	$.ajax({
		url: '/article_author_review_form.php',
		async: false,
		data: {
			journal_id: pJournalId,
			article_id: gArticleId,
			parent_id: pParentReviewId,
			show_form: pAction,
			hide_form: pHide
		},
		success: function (pAjaxResult) {
			if (pAjaxResult['err_cnt']) {
				alert(pAjaxResult['err_msg']);
				return;
			}
			$('#' + pDiv).html(pAjaxResult['html']);
		}
	});
}

function PerformArticleAuthorReviewFormAutosaveTimeout(pInitBlurEvents) {
	if (pInitBlurEvents) {
		$('form[name="article_review_form"] textarea').blur(function () {
			PerformArticleReviewFormAutosave();
		});
		$('form[name="article_review_form"] input').blur(function () {
			PerformArticleReviewFormAutosave();
		});
	}

	setTimeout("PerformArticleAuthorReviewFormAutosave();PerformArticleAuthorReviewFormAutosaveTimeout()", 30 * 1000);
}

function PerformArticleAuthorReviewFormAutosave() {
	var lForm = $('form[name="article_author_review_form"]');
	if (!lForm.length) {
		return;
	}
	lForm.ajaxSubmit({
		'data': {
			'tAction': 'save',
			'ajax_form_submit': 1
		}
	});
}

function submitArticleAuthorReview(pOper, pFormName, pId) {
	var lJqFormSel = $('form[name="' + pFormName + '"]');
	var lFormData = lJqFormSel.formSerialize();
	if (pOper === 1) { //save
		lFormData += '&tAction=save';
	}

	if (typeof pId !== 'undefined' && pId) {
		lFormData += '&id=' + pId;
	}

	if (pOper === 2) {
		lFormData += '&tAction=review';
	}

	if (pOper === 5) {
		lFormData += '&tAction=new';
	}
//	console.log(lFormData);
//	return;
	$.ajax({
		url: '/article_author_review_form.php',
		type: 'POST',
		async: false,
		data: lFormData,
		success: function (pAjaxResult) {
			if (pAjaxResult['success'] === 1) {
				location.reload();
			} else {
				if (pAjaxResult['err_cnt']) {
					$('#author_review_form').html(pAjaxResult['html']);
					return false;
				}
				if (pAjaxResult['err_msg']) {
					alert(pAjaxResult['err_msg']);
					return false;
				}
				if (typeof pAjaxResult['eval_js'] !== "undefined" && pAjaxResult['eval_js'] !== "") {
					eval(pAjaxResult['eval_js']);
					return;
				}
			}
		}
	});
}

function InitSEReviewForm(pDiv, pJournalId, pAction, pHide) {
	if(typeof pAction === 'undefined'){
		pAction = 0;
	}
	if(typeof pHide === 'undefined'){
		pHide = 0;
	}

	$.ajax({
		url : '/article_se_review_form',
		async : false,
		data : {
			journal_id : pJournalId,
			article_id : gArticleId,
			show_form : pAction,
			hide_form : pHide
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg']);
				return;
			}
			$('#' + pDiv).html(pAjaxResult['html']);
		}
	});
}

function submitArticleSEReview(pOper, pFormName, pId) {
	var lJqFormSel = $('form[name="' + pFormName + '"]');
	var lFormData = lJqFormSel.formSerialize();
	if (pOper === 1) { //save
		lFormData += '&tAction=save';
	}

	if (typeof pId !== 'undefined' && pId) {
		lFormData += '&id=' + pId;
	}

	if (pOper === 2) {
		lFormData += '&tAction=review';
	}

	if (pOper === 5) {
		lFormData += '&tAction=new';
	}
//	console.log(lFormData);
//	return;
	$.ajax({
		url: '/article_se_review_form.php',
		type: 'POST',
		async: false,
		data: lFormData,
		success: function (pAjaxResult) {
			if (pAjaxResult['success'] === 1) {
				location.reload();
			} else {
				if (pAjaxResult['err_cnt']) {
					$('#author_review_form').html(pAjaxResult['html']);
					return false;
				}
				if (pAjaxResult['err_msg']) {
					alert(pAjaxResult['err_msg']);
					return false;
				}
				if (typeof pAjaxResult['eval_js'] !== "undefined" && pAjaxResult['eval_js'] !== "") {
					eval(pAjaxResult['eval_js']);
					return;
				}
			}
		}
	});
}
function resubmitArticle(pText) {
	if(confirm(pText)) {
		$('#P-Resubmit-Article').hide();
		$('#P-Resubmit-Article-Loading').show();
		$.ajax({
			url: gArticleAjaxSrvUrl,
			data: {
				action: 'resubmit_pjs_article',
				article_id: gArticleId
			},
			success: function (pAjaxResult) {
				$('#P-Resubmit-Article').show();
				$('#P-Resubmit-Article-Loading').hide();
				if (typeof pAjaxResult['eval_js'] !== "undefined" && pAjaxResult['eval_js'] !== "") {
					eval(pAjaxResult['eval_js']);
					return;
				}
			}
		});
	}
}

function InitCollapseIOEvents(){
	GetArticlePreviewContent().find(".toCollapseio").click(function () {
		$(this).next().closest('.protocolsioIframe').toggle();
		if($(this).hasClass("plus")){
	        $(this).removeClass("plus");
			$(this).addClass("minus");			
			resizePreviewIframe(gArticlePreviewIframeId);
		}else{			
	        $(this).removeClass("minus");
			$(this).addClass("plus");
			resizePreviewIframe(gArticlePreviewIframeId);
		}
	});
}

function clickOutSideOfInfoBar(){
	$(window).click(function(event) {
		if(!$(event.target).closest('#P-Article-Info-Bar').length && !$(event.target).closest("#info_menu-id").length) {
			showInfoBar(0)
		}
	});
}

function showInfoBar(pProp){
		if($( window ).width() > 950){
			return;
		}
		var infoBar = $('#P-Article-Info-Bar');
		var articlePreview = $('#article-preview');
		var pathName = window.location.pathname;
		var pathNameArray = pathName.split('/');

		if(pProp == 1){
			var toggle = $('#P-Article-Info-Bar').addClass('P-Article-Info-Bar-hide');
			$("#info_menu-id").addClass('icon-mobile-menu-close');
		}else if(pProp == 0){
			var toggle = $('#P-Article-Info-Bar').removeClass('P-Article-Info-Bar-hide');
			$("#info_menu-id").removeClass('icon-mobile-menu-close');
		}else if(pProp == 2){
			if(pathNameArray.indexOf('list') != -1 || pathNameArray.indexOf('element') != -1){
				var toggle = $('#P-Article-Info-Bar').addClass('P-Article-Info-Bar-hide');
				$("#info_menu-id").addClass('icon-mobile-menu-close');
			}
		}else{
			var toggle = $('#P-Article-Info-Bar').toggleClass('P-Article-Info-Bar-hide');
			$("#info_menu-id").toggleClass('icon-mobile-menu-close');
		}

		var barHolder = $('.P-Info-Content');
		// debugger;
		var left = '102%';
		if(toggle && toggle.hasClass('P-Article-Info-Bar-hide')){
			var articlePreviewLeft = articlePreview.position().left;
			left = articlePreviewLeft + 30;
		}

		barHolder.height($( window ).height() -  barHolder.offset().top);

		if(barHolder.height() == 0){
			setInterval(function(){
				barHolder.height($( window ).height() -  barHolder.offset().top);
			}, 1000);
		}

		infoBar.css({
			top: articlePreview.position().top,
			left:left
		});

}

function rangeIds(start, count, prefix) {
	return Array.apply(0, Array(count))
			.map(function (element, index) {
				return prefix + parseInt(index + start);
			});
}

function deleteReview(pElementType) {
	$.ajax({
		url: gArticleAjaxSrvUrl,
		async: false,
		data: {
			action: 'delete_review_element',
			element_type: pElementType,
			article_id: gArticleId
		},
		success: function (pAjaxResult) {
			if (pAjaxResult['err_cnt']) {
				alert(pAjaxResult['err_msg']);
				return;
			}
			pAjaxResult['element_type'] = pElementType;
			InsertNewHistoryState(pAjaxResult);
		}
	});
}

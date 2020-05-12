var AOP=AOP||{};var recommendModal=$('#recommendProduct');var recommendEventsBound=false;$(document).ready(function(){var initRecommend=function(opts){var color={highlight:{color:'red'},none:{color:''}};var recommendSubmitButton=recommendModal.find('#recommend-submit');var organisationOptionLabel=recommendModal.find('.organisation-option');var availableOrganisations=recommendModal.find('.yourOrganisations input[type=checkbox]');var administratorEmail={email:recommendModal.find('input[name=administratorEmail]'),selectedValues:recommendModal.find('#selected-values'),selectedEmails:recommendModal.find('#selected-administrator-emails'),highlightError:function(){recommendModal.find('#administrator-email label').css(color.highlight);},clearError:function(){recommendModal.find('#administrator-email label').css(color.none);recommendModal.find('#administrator-email span.error').hide();organisationOptionLabel.removeClass('error');organisationOptionLabel.css(color.none);},errors:recommendModal.find('#administrator-email .error'),errorMessages:{added:recommendModal.find('#emailaddress-added'),invalid:recommendModal.find('#emailaddress-invalid')},addButton:recommendModal.find('#add-administrator'),form:recommendModal.find('form'),};recommendSubmitButton.prop('disabled',false);var productLink=recommendModal.find('input[name=productLink]').val();if(productLink.length===0){recommendModal.find('input[name=productLink]').val(window.location.pathname.replace(AOP.baseUrl,''));}
var productType=recommendModal.find('input[name=productType]').val();if(productType==='book'){var authors=[];$.each(recommendModal.find('.author'),function(key,val){authors.push($(val).text().trim().replace(/ +/g,' ').replace(/\n/g,''));});recommendModal.find('input[name=productAuthors]').val(authors.join('\r\n'));}
var setUpModal=function(){var prefillFields=['yourName','yourEmail'];recommendModal.find('input[type=text], textarea, select').val('');recommendModal.find('input[type=checkbox]').prop('checked',false);administratorEmail.selectedEmails.find('>div').remove();administratorEmail.selectedValues.val('');$.each(prefillFields,function(key,fieldName){recommendModal.find('input[name='+ fieldName+']').val(recommendModal.find('input[name='+ fieldName+'Prefill]').val());});recommendModal.find('.columns.error').removeClass('error');recommendModal.find('#ajaxMessages').hide();administratorEmail.clearError();};var administratorEmailExists=function(emailValue){var emailExists=false;$.each(administratorEmail.selectedValues.val().split(','),function(key,val){if(emailValue===val){emailExists=true;}});return emailExists;};var validateAdministratorEmail=function(){var emailValue=administratorEmail.email.val().toLowerCase();var cssBlock={display:'block'};if(!emailValue){return false;}
if(administratorEmailExists(emailValue)){administratorEmail.errorMessages.invalid.hide();administratorEmail.errorMessages.added.css(cssBlock);administratorEmail.highlightError();return false;}
if(AOP.emailRegex&&!AOP.emailRegex.test(emailValue)){administratorEmail.errorMessages.added.hide();administratorEmail.errorMessages.invalid.css(cssBlock);administratorEmail.highlightError();return false;}
administratorEmail.clearError();return true;};var addAdministratorEmail=function(){var emailValue=administratorEmail.email.val().toLowerCase();var vals;var newAdministratorEmail;if(validateAdministratorEmail()===false){return;}
newAdministratorEmail='<div class="row collapse" id="'+ emailValue+'">'+'<div class="large-10 small-10 columns">'+'<p>'+ emailValue+'</p>'+'</div>'+'<div class="large-2 small-2 columns">'+'<a rel="'+ emailValue+'" class="deleteAdministratorEmail button alert radius right postfix">Delete</a>'+'</div>'+'<input type="hidden" name="administratorEmails" value="'+ emailValue+'"/>'+'</div>';administratorEmail.selectedEmails.append(newAdministratorEmail);if(administratorEmail.selectedEmails.is(':hidden')){administratorEmail.selectedEmails.show();}
vals=administratorEmail.selectedValues.val().split(',');vals.push(emailValue);administratorEmail.selectedValues.val(vals.join());administratorEmail.email.val('');administratorEmail.clearError();};if(opts.html){if(opts.html.input){recommendModal.find('#inputs').html(opts.html.input);}
if(opts.html.typeDisplay){recommendModal.find('#type-display').html(opts.html.typeDisplay);}}
if(opts.productType&&opts.productType==='journal'){recommendModal.find('.meta-info.url > span').text(window.location.origin);}
if(opts.reset){setUpModal();}
if(!recommendEventsBound){$('form','#recommendProduct').find('input, textarea, select').not('[data-abide-ignore]').on('blur.fndtn.abide change.fndtn.abide',function(e){Foundation.libs.abide.validate([this],e);});recommendModal.click(function(){if(administratorEmail.email.val().length===0&&administratorEmail.errors.is(':visible')){administratorEmail.clearError();}});availableOrganisations.on('click',function(){organisationOptionLabel.css(color.none);});administratorEmail.selectedEmails.on('click','.deleteAdministratorEmail',function(){var seperator=',';var vals=administratorEmail.selectedValues.val().split(seperator);var emailToDelete=$(this).attr('rel');var emailToDeleteID=encodeEmail(emailToDelete);$('#'+ emailToDeleteID).remove();vals.splice(vals.indexOf(emailToDelete),1);administratorEmail.selectedValues.val(vals.join(seperator));if(administratorEmail.selectedEmails.find('>div').length===0){administratorEmail.selectedEmails.hide();}});administratorEmail.addButton.on('click',function(e){e.preventDefault();addAdministratorEmail();});administratorEmail.email.on('keydown',function(e){organisationOptionLabel.css(color.none);if(e.keyCode===13){e.preventDefault();addAdministratorEmail();}});administratorEmail.email.on('blur',function(e){e.preventDefault();validateAdministratorEmail();});administratorEmail.form.on('valid.fndtn.abide',function(){recommendSubmitButton.prop('disabled',true);$('.alert-box').remove();var _self=$(this);var ajaxMessages=recommendModal.find('#ajaxMessages');var errorMessage;var validAdminContact=false;if(_self.find('#selected-administrator-emails > div').length>0||_self.find('input[name=yourOrganisations]').is(':checked')){validAdminContact=true;}
if(!validAdminContact){if(!$('.yourOrganisations').length){errorMessage='Please enter your administrator\'s email address.';}else{errorMessage='Please select an organisation or enter your administrator\'s email address.';}
createAlertBox(_self,ajaxMessages,'error',errorMessage);ajaxMessages.show();recommendSubmitButton.prop('disabled',false);organisationOptionLabel.css(color.highlight);return false;}
submitAjaxForm(this,$('#ajaxMessages, #recommendProduct #ajaxMessages'),function(res){ajaxMessages.hide();if(res&&res.success){recommendModal.foundation('reveal','close');$('#ajaxMessages').show();}else{$('#ajaxMessages').hide();ajaxMessages.show();}
recommendSubmitButton.prop('disabled',false);});});recommendEventsBound=true;}};var clearToolTip=function(){$('a.hasTooltipCustom-top').each(function(k,el){$(el).qtip().toggle(false);});};$('.recommend').on('click',function(e){e.preventDefault();initRecommend({reset:true});});$('body').on('click','.recommend-product.parent-product',function(e){e.preventDefault();initRecommend({reset:true});clearToolTip();recommendModal.foundation('reveal','open');});$('body').on('click','.recommend-product.search',function(e){e.preventDefault();var initObj;var productId=$(this).attr('data-prod-id');clearToolTip();$.post(AOP.baseUrl+'/services/aop-cambridge-core/recommend/get-product-data',{productId:productId}).done(function(resp){if(!resp.success){createAlertBox(null,$('#ajaxMessages'),'error','Unable to recommend this product. Please <a href="'+ AOP.baseUrl+'/contact">contact customer services</a>.');return;}
initObj={reset:true,html:{input:resp.data.html.input,typeDisplay:resp.data.html.typeDisplay},productType:resp.data.productType};initRecommend(initObj);recommendModal.foundation('reveal','open');});});});
webpackJsonp([58],{0:function(t,a,e){e(440)},440:function(t,a,e){"use strict";function n(t,a,e){a.data.version=e,t.updateFolder(null,a)}function o(t,a,e){t.stopPropagation(),window.location=b.buildTreeBeardDownload(a)}function s(t){var a=new p(t.data.nodeUrl);window.location=a.segment("files").segment(t.data.provider).segment(t.data.extra.fileId).query({version:t.data.extra.datasetVersion}).toString()}function i(t,a){if(t.data.isAddonRoot&&t.connected===!1)return h.Utils.connectCheckTemplate.call(this,t);var e="latest-published"===t.data.version?"Published":"Draft";if(t.data.addonFullname){var n=[c("dataverse-name",t.data.name+" ("+e+")")];if(t.data.hasPublishedFiles)if(t.data.permissions.edit){var o=v.urlParams();o.version&&o.version!==t.data.version&&(t.data.version=o.version)}else n.push(c("span.text-muted","[Published]"));else n.push(c("span.text.text-muted","[Draft]"));return c("span",n)}return c("span",[c("dataverse-name.fg-file-links",{onclick:function(){s(t)}},t.data.name)])}function d(t){var a=this,e=[];return e.push({data:"name",folderIcons:!0,filter:!0,custom:i}),"project-files"===a.options.placement&&(e.push({data:"size",sortInclude:!1,filter:!1,custom:function(){return c("")}}),e.push({data:"downloads",sortInclude:!1,filter:!1,custom:function(){return c("")}}),e.push({data:"version",filter:!1,sortInclude:!1,custom:function(){return c("")}})),"fileview"!==a.options.placement&&e.push({data:"modified",filter:!1,custom:function(){return c("")}}),e}function l(t){if(t.data.iconUrl)return c("img",{src:t.data.iconUrl,style:{width:"16px",height:"auto"}}," ")}function r(t){return b.buildTreeBeardMetadata(t,{version:t.data.version})}function u(t){return t.data.provider&&"folder"===t.kind&&t.data.permissions.edit&&"latest"===t.data.version}var c=e(5),p=e(85),f=e(1),m=e(6),h=e(15).Fangorn,b=e(234),v=e(2),g={view:function(t,a,e){function i(t,a,e){t.stopPropagation(),r.dropzone.hiddenFileInput.click(),r.dropzoneItemCache=a}function d(t,a,e){function n(){r.modal.dismiss(),a.notify.update("Publishing "+d,"info",1,1),f.osf.putJSON(s,{publish_both:o}).done(function(t){a.notify.update();var e=[c("p.m-md","Your content has been published.")],n=[c("button.btn.btn-primary",{onclick:function(){r.modal.dismiss()}},"Got it")];r.modal.update(e,n,c("h3.break-word.modal-title","Successfully published")),a.data.dataverseIsPublished=!0,a.data.datasetIsPublished=!0,a.data.datasetDraftModified=!1,a.data.hasPublishedFiles=a.children.length>0,a.data.version=a.data.hasPublishedFiles?"latest-published":"latest";for(var o=0;o<a.children.length;o++)a.children[o].data.extra.datasetVersion=a.data.version}).fail(function(t,e,n){var o,i=t.responseJSON.code;switch(i){case 405:o="Error: This dataset cannot be published until "+a.data.dataverse+" Dataverse is published.";break;case 409:o="This dataset version has already been published.";break;default:o="Error: Something went wrong when attempting to publish your dataset.",m.captureMessage("Could not publish dataset",{extra:{url:s,textStatus:e,error:n}})}var d=[c("p.m-md",o)],l=[c("button.btn.btn-primary",{onclick:function(){r.modal.dismiss()}},"Okay")];r.modal.update(d,l)})}var o=!a.data.dataverseIsPublished,s=a.data.urls.publish,i=a.data.host,d=o?"Dataverse and dataset":"dataset",l=[c("p.m-md",c.trust(a.data.hostCustomPublishText)),c("p.m-md",o?"This dataset cannot be published until the "+a.data.dataverse+" Dataverse is published. ":""),c("p.m-md","By publishing this "+d+", all content will be made available through "+i+" using their internal privacy settings, regardless of your OSF project settings. "),c("p.font-thick.m-md",o?"Do you want to publish this Dataverse AND this dataset?":"Are you sure you want to publish this dataset?")],u=[c("button.btn.btn-default",{onclick:function(){r.modal.dismiss()}},"Cancel"),c("button.btn.btn-primary",{onclick:function(){n()}},"Publish")];r.modal.update(l,u,c("h3.break-word.modal-title","Publish this "+d+"?"))}var l=[],r=a.treebeard,u=a.item;if(u.data.addonFullname){var p=[c("option",{selected:"latest"===u.data.version,value:"latest"},"Draft")];u.data.datasetIsPublished&&p.push(c("option",{selected:"latest-published"===u.data.version,value:"latest-published"},"Published")),l.push(c.component(h.Components.dropdown,{label:"Version: ",onchange:function(t){n(r,u,t.target.value)},icon:"fa fa-external-link",className:"text-info"},p))}return"fileview"!==r.options.placement&&("folder"===u.kind&&u.data.addonFullname&&"latest"===u.data.version&&u.data.permissions.edit?(l.push(c.component(h.Components.button,{onclick:function(t){i.call(r,t,u)},icon:"fa fa-upload",className:"text-success"},"Upload")),u.data.datasetDraftModified&&l.push(c.component(h.Components.button,{onclick:function(t){d.call(r,t,u)},icon:"fa fa-globe",className:"text-primary"},"Publish"))):"folder"!==u.kind||u.data.addonFullname?"file"===u.kind&&(l.push(c.component(h.Components.button,{onclick:function(t){o.call(r,t,u)},icon:"fa fa-download",className:"text-primary"},"Download")),"latest"===u.parent().data.version&&u.data.permissions.edit&&l.push(c.component(h.Components.button,{onclick:function(t){h.ButtonEvents._removeEvent.call(r,t,[u])},icon:"fa fa-trash",className:"text-danger"},"Delete")),u.data.permissions&&u.data.permissions.view&&l.push(c.component(h.Components.button,{onclick:function(t){s(u)},icon:"fa fa-external-link",className:"text-info"},"View"))):l.push(c.component(h.Components.button,{onclick:function(t){i.call(r,t,u)},icon:"fa fa-upload",className:"text-success"},"Upload"))),c("span",l)}};h.config.dataverse={folderIcon:l,resolveRows:d,lazyload:r,canDrop:u,itemButtons:g}}});
//# sourceMappingURL=files.4ca09108479c4342c04c.js.map
function positionLegendAnnotation(fixToTop,enlargedLinks,twoRowsFormat){if(jQuery(window).width()<=870){jQuery("#annotation_legend_container").css("position","relative");jQuery("#annotation_legend_container").css("top","0");jQuery(".vertmenu.formats").css("position","relative");jQuery(".vertmenu.formats").css("top","0");}if(jQuery(window).width()>852){if(fixToTop){var scroll=jQuery(document).scrollTop();var topPosition=320;if(scroll>topPosition){var top=(scroll-topPosition)+95;var topLegend=top+70;jQuery(".vertmenu.formats").css("top","0px");jQuery(".vertmenu.formats").css("position","fixed");if(jQuery("#annotation_legend_container")!=undefined&&jQuery("#annotation_legend_container").length>0){var annotationContainerTop;if((jQuery(window).width()>1110)||(enlargedLinks==false)){if(twoRowsFormat){annotationContainerTop=115;}else{annotationContainerTop=70;}}else{if(twoRowsFormat){annotationContainerTop=150;}else{annotationContainerTop=105;}}jQuery("#annotation_legend_container").css("top",annotationContainerTop+"px");jQuery("#annotation_legend_container").css("position","fixed");}}else{if(jQuery("#annotation_legend_container")!=undefined&&jQuery("#annotation_legend_container").length>0){var annotationContainerTop;if((jQuery(window).width()>1110)||(enlargedLinks==false)){if(twoRowsFormat){annotationContainerTop=195;}else{annotationContainerTop=150;}}else{if(twoRowsFormat){annotationContainerTop=230;}else{annotationContainerTop=185;}}jQuery("#annotation_legend_container").css("top",annotationContainerTop+"px");jQuery("#annotation_legend_container").css("position","absolute");}jQuery(".vertmenu.formats").css("top","80px");jQuery(".vertmenu.formats").css("position","absolute");}}else{if(jQuery("#annotation_legend_container")!=undefined&&jQuery("#annotation_legend_container").length>0){jQuery("#annotation_legend_container").css("position","fixed");jQuery("#annotation_legend_container").css("top","385px");}jQuery(".vertmenu.formats").css("position","fixed");jQuery(".vertmenu.formats").css("top","305px");}}}
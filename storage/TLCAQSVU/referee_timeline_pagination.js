$(function(){
	timelineHelper.handlePagniation();
});
var timelineHelper = {
		handlePagniation: function(){
			$(".referee-reports-container").each(function(){
				var numReferees = $(this).find(".timeline-referee").length,
					numPages = Math.ceil(numReferees / 5);
				if( numPages > 1) {
					$(this).append(
						'<div class="timeline-page-counter">' +
							'<div class="page-control prev-page"></div>' +
							'<span class="current-page">1</span>' +
							'<span class="sperator">/</span>' +
							'<span class="total-pages">' + numPages + '</span>' +
							'<div class="page-control next-page"></div>' +
						'</div>'
					);
					var columnWidth = $(this).find(".timeline-referee").first().width(),
						numVersions = $(this).find(".timeline-referee").first().find(".referee-status").length,
						dummyMarkup = '<div class="timeline-referee" style="width:'+(columnWidth * (numPages*5 - numReferees))+'px;">' +
							'<div class="timeline-referee-label">&nbsp;</div>';
					for(var i = 0; i < numVersions; i++){
						dummyMarkup += '<div class="referee-status">&nbsp;</div>';
					}
					dummyMarkup += '</div>';
					$(this).find(".timeline-pagination-container").append(dummyMarkup);
					$(this).find(".timeline-pagination-container")
						.width(columnWidth*numPages*5);
				}
			});
			$(".timeline-page-counter .page-control").on("click", timelineHelper.changePage);
		},
		changePage: function(){
			var wrapper = $(this).parents(".referee-reports-container"),
				pageContainer = wrapper.find(".timeline-pagination-container"),
				width = wrapper.find(".timeline-referees-wrapper").width(),
				isNext = $(this).hasClass("next-page"),
				currentPage = parseInt(wrapper.find(".current-page").html(), 10),
				numPages = parseInt(wrapper.find(".total-pages").html(), 10);
			if(isNext && currentPage === numPages) {
				wrapper.find(".current-page").html(1);
				pageContainer.animate({left: 0});
			} else if ( !isNext && currentPage === 1) {
				wrapper.find(".current-page").html(numPages);
				pageContainer.animate({left: -(width * (numPages - 1))});
			} else {
				var newPageCount = (isNext) ? currentPage + 1 : currentPage - 1;
				wrapper.find(".current-page").html(newPageCount);
				if(isNext) {
					pageContainer.animate({left: ("-=" + width)});
				} else {
					pageContainer.animate({left: ("+=" + width)});
				}
			}
		}
	};
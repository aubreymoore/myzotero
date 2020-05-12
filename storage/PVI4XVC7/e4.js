/* Added 9/23/2014 - Allows Bootstrap modals to use a single div to load content from multiple sources within the same page */
$(document).on("hidden.bs.modal", function (e) {
    $(e.target).removeData("bs.modal").find(".modal-content").empty();
});
jQuery.noConflict();

jQuery(document).ready(function ($) {
    $('.more-link').each(function() {
    var $this = $(this);
    $this.html($this.html().replace(/(\S+)\s*$/, '<span class="more-link__last-word">$1</span>'));
});
});
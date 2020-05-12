/*custom js code*/

//update counter with JS so we can turn on page cache
Drupal.behaviors.articleViewCount = {
  attach: function() {
        //construct endpoint URL with basePath and nid from Drupal.settings (set in template.php)
        var count_url = Drupal.settings.basePath + "/count/up/update?nid=" + Drupal.settings.nid;
        var xhr = new XMLHttpRequest();
        //make http request to endpoint
        xhr.open("GET", count_url, true);
        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
            } else {
              console.error(xhr.statusText);
            }
          }
        };
        xhr.onerror = function (e) {
          console.error(xhr.statusText);
        };
        xhr.send(null);
  }
}

Drupal.behaviors.clickableRowsOnViews = {
  attach: function() {

    jQuery('.front-slides').each(function() {
      if (jQuery(this).find('a').length) {
	jQuery(this).css('cursor','pointer');
        jQuery(this).click(function() {
          window.location = jQuery(this).find('a').attr('href');
          return false;
        });
      }
    });
    jQuery('.front-thumb').each(function() {
      if (jQuery(this).find('a').length) {
	jQuery(this).css('cursor','pointer');
        jQuery(this).click(function() {
          window.location = jQuery(this).find('a').attr('href');
          return false;
        });
      }
    });
    jQuery('.news-wrapper').each(function() {
      if (jQuery(this).find('a').length) {
	jQuery(this).css('cursor','pointer');
        jQuery(this).click(function() {
          window.location = jQuery(this).find('a').attr('href');
          return false;
        });
      }
    });
    jQuery('.featured-wrapper').each(function() {
      if (jQuery(this).find('a').length) {
	jQuery('.featured-img').css('cursor','pointer');
        jQuery('.featured-img').click(function() {
          window.location = jQuery('.featured-wrapper').find('a').attr('href');
          return false;
        });
      }
    });
  }
}

Drupal.behaviors.hoverMenuExpand = {
  attach: function() {

    jQuery('ul li.expanded').hover(function() {
	jQuery(this).addClass('open');
    },
	function() {
		jQuery(this).removeClass('open');
	    });
  }
}
Drupal.behaviors.searchClickExpand = {
  attach: function(e) {

	//change button type to 'button'(from 'submit') so that it's not clickable
    jQuery('.form-search .input-group .btn').prop('type', 'button');

	//on button click expand and shrink the input field by adding/removing 'active' class on form input-group
    jQuery('.form-search .input-group .btn').on( "click", function() {

	jQuery('.form-search .input-group').toggleClass('active');
	e.preventDefault();
	});

	//when input field is in focus, chage the button type back to 'submit'
    jQuery('input#edit-search-block-form--2').focus(function() {
	       jQuery('.form-search .input-group .btn').prop('type', 'submit');
	});
	

  }
}

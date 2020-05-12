var t2p = (function() {

   var TOUT = 15000;

   function init( s ) {
      //load footer
      $.get('/html/footer.html',function(data){
         $('#section-footer-inner').html(data);
      },'html');

      //load header
      $.get('/html/header-menu.html',function(data){
         $('#section-header-menu-container').html(data);
         
         if( s === true ) {
            var m = 'Notice: This site will be down for maintenance Friday Oct 10, 2014 at 6:00pm PST to Sunday Oct 12, 2014 at 5:00pm PST.';
            $( "#notice_message" ).html( m );
            $( "#notice_box" ).show();
         }
      },'html');
   }

   function send_search() {
      var q = $( "#search_box" ).val();
          q = $.trim(q);

      if( q === '' ) {
         alert( "Please enter a search term." );
         return ;
      }

      //var u = "/search/" + encodeURIComponent( $( "#d" ).val() ) + "/" + encodeURIComponent( q );
      var u = "/database/?k=" + encodeURIComponent( q );
      //remove wildcard
      u = u.split('*').join('_wc_');

      //double quote fix
      u = u.split('%22').join('_dq_');

      window.location.href = u;
   }

   function category( cat, page, key ) {
      cat = cat.split('_').join(' ');

      $.ajax({
         url: "/svr/search.php?r=category&q=" + key + "&p=" + page + "&c=" + cat,
         success: function ( r ) { render_results(r, "spinoff", key, page, cat); },
         timeout: TOUT,
         error: timeout_error,
         dataType: "json"
      });

      var c = map_cat( cat );

      //category title and def
      $( "#cname" ).html( c.full );
      $( "#cdef" ).html( c.def );
      $( "#catimg" ).html( '<img src="/img/cat/' + c.ico + '" align="left" alt="' + c.full + ' Icon" title="' + c.full + '" />' );
      $( "#results" ).html( '<div style="padding-left: 10px;" id="loading"><img src="/img/loading.gif" /> loading...</div>' );

      if( page != 0 ) {
         $( "#cpage" ).html( "(Page " + page + ")" );
      }
   }

   function search() {
      var q = document.URL.split('/')[5];
          q = q.split('_dq_').join('%22');
          q = q.split('_wc_').join('*');

      $( "#results" ).html( '<div style="position: relative; top: -40px; padding-left: 15px;" id="loading"><img src="/img/loading.gif" /> loading...</div>' );
      $.ajax({
         url: "/svr/search.php?d="
               + document.URL.split('/')[4]
               + "&q=" + q
               + "&p=" + document.URL.split('/')[6],
         success: function ( r ) {
                     render_results(r, document.URL.split('/')[4],
                                       q,
                                       document.URL.split('/')[6],
                                       "" );
                  },
         timeout: TOUT,
         error: timeout_error,
         dataType: "json"
      });
   }

   function render_results( r, d, q, p, c ) {
      var  h = '',
           l = '',
          hp = '';

      if(r.count === 0) {
         $( "#results" ).html( '<div class="count">0 results found for ' + q + '.</div>');
         return;
      }

      //set the page
      p = parseInt( p );
      if ( p === 0 || isNaN(p) ) {
         p = 1;
      }

      //pulldown
      $( 'select' ).val( d );

      //search box
      $( "#search_box" ).val( decodeURIComponent( q ) );

      //display page number and result count
      $( "#count" ).html( r.count + " results found for "
            + decodeURIComponent( q ) + " (page " + p + ")." );

      //render each result to HTML
      $.each( r.results, function( i, a ) {
         h += '<div class="r">';
         h += '<div class="r_title"><a href="/spinoff/' + a[1] + '" target="_self">' +a[2] + '</a></div>';
         h += '<div class="r_id">' + a[1] + '</div>';
         h += '<div class="r_description">' + clean_abs( a[3] ) + '</div>';
         h += '</div>';
      });

      //display results
      $( "#results" ).html( h );

      //create search link for pagination
      //remove wildcard
      q = q.split('*').join('_wc_');
      //double quote fix
      q = q.split('%22').join('_dq_');

      if( c !== "" ) { //category search
         l = '/' + c.split(' ').join('_') + '/' + q;
      }
      else { //keyword search
         l = '/search/' + d + '/' + q;
      }

      // create pagination links
      hp = pagination(l, p, Math.ceil( r.count / r.page_ln ));
      $( "#pagination" ).html( hp );
   }

   function pagination (l, p, last) {
      var chunk = 20;

      //smaller devices, shrink down the chunk
      if ( jQuery(window).width() < 500 ) {
         chunk = 5;
      }

      if( last === 1 ) {
         return '';
      }

      var html = '', start = 0, end = 0;

      // 1) create previous link
      if( p !== 1 ) {
         html += "<a href='" + l + "/" + (p - 1) + "' id='previous'>Previous</a>";
      }

      // 2) create page number links
      //set start end end points
      start = p;
      end   = p + chunk;

      //adjust start and end point
      if( end > last ) {
         end = last;
         start = last - chunk;
      }
      else if(last < chunk) {
         end = last;
         start = 1;
      }
      else {
         ;
      }

      //reset to start at 1 if negative
      if(start < 1) {
         start = 1;
      }

      //create links
      for (i = start; i <= end; i++) {
         if(p === i) {
            html += "<span class='current'>" + i + "</span>";
         }
         else {
            html += "<a href='"+ l + "/" + i + "'>" + i + "</a>";
         }
      }

      // 3) create right link
      if( (p + 1) <= last ) {
         html += "<a href='"+ l + "/" + (p + 1) + "' id='next'>Next</a>";
      }

      return html;
   }


   function formatNTTSdate(d) {
      if( d === undefined || d === '') {
         return '';
      }
      d = d.split(" ");
      var r = d[0].split("-");
      return r[1] + "/" + r[2] + "/" + r[0];
   }


   function clean_abs( a ) {
      if (a === undefined) {
         return '';
      }
      //clean up larc abstract
      a = a.replace(/[-]*as filed in application[ s:-]*/i, "");
      a = a.replace(/[-]*as filed in patent application[s:-]*/i, "");
      a = a.replace(/[-]*as filed in the patent application[s:-]*/i, "");
      a = a.replace(/[-]*patent application as filed[:-]*/i, "");
      a = a.replace(/-------------------------------[-]*/, "");
      a = a.replace(/[-]*as filed[-]*/i, ""); //needs to be last in the list

      return a;
   }

   function map_cat(c) {
      var ret = {};
      c = c.toLowerCase(c);

      switch (c) {
         case "computer technology":
            ret.ico = 'aero.png';
            ret.full = "Computer Technology";
            ret.def = ""; //"The design, construction and operation of aircraft based on the<br />scientific study or art of flight.";
            break;
         case "consumer home recreation":
            ret.ico = 'itsw.png';
            ret.full = "Consumer / Home / Recreation";
            ret.def = ""; //"The development, implementation and maintenance of computer hardware and software systems to produce, store, organize, analyze, model, simulate and communicate information electronically.";
            break;
         case "environment and resource management":
            ret.ico = 'manu.png';
            ret.full = "Environment and Resource Management";
            ret.def = ""; //"The development of processes, devices and systems to make goods and wares by manual labor or machinery on a large or small scale.";
            break;
         case "health and medicine":
            ret.ico = 'mate.png';
            ret.full = "Health and Medicine";
            ret.def = ""; //"The development of substances as raw matter to be composed of or to be used as<br />a constituent element in the processing of various products.";
            break;
         case "industrial productivity manufacturing technology":
            ret.ico = 'sens.png';
            ret.full = "Industrial Productivity and Manufacturing Technology";
            ret.def = ""; //"Mechanical or electronic devices used to measure or receive stimulus in the form of light, temperature, pressure, sound, radiation level, or the like, convert that stimulus into an electronic signal and transmit the signal to a measuring or control instrument.";
            break;
         case "public safety":
            ret.ico = 'heal.png';
            ret.full = "Public Safety";
            ret.def = ""; //"The development and manufacture of a technique or product to provide for the maintenance of a healthy level of physical, mental, and psychological fitness, the use of organic substances that are only existing in or derived from plants, animals or other living tissue, organisms or microorganisms to biologically engineer a compound or substance to improve lives, and the use of inorganic substances to perform chemical processing or to produce other materials that improve lives, industrial processes, and the environment."
            break;
         case "transportation":
            ret.ico = 'comm.png';
            ret.full = "Transportation";
            ret.def = "";
            break;
         default:
            ret.ico = '';
            ret.full = '';
            ret.def = '';
      }

      return ret;
   }

   function map_center(c) {
      var full;
      c = c.toLowerCase(c);

      switch (c) {
         case "arc":
            full = "Ames Research Center";
            break;
         case "afrc":
            full = "Armstrong Flight Research Center";
            break;
         case "dfrc":
            full = "Armstrong Flight Research Center";
            break;
         case "grc":
            full = "Glenn Research Center";
            break;
         case "gsfc":
            full = "Goddard Space Flight Center";
            break;
         case "hq":
            full = "Headquarters";
            break;
         case "hdqs":
            full = "Headquarters";
            break;
         case "jpl":
            full = "Jet Propulsion Laboratory";
            break;
         case "jsc":
            full = "Johnson Space Center";
            break;
         case "ksc":
            full = "Kennedy Space Center";
            break;
         case "larc":
            full = "Langley Research Center";
            break;
         case "msfc":
            full = "Marshall Space Flight Center";
            break;
         case "ssc":
            full = "Stennis Space Center";
            break;
         default:
            full = '';
      }
      return full;
   }

   function display_spinoff() {
      $( "#pabstract" ).html( '<div style="padding-left: 10px;" id="loading"><img src="/img/loading.gif" /> loading...</div>' );
      $.ajax({
         url: "/svr/search.php?r=geturl&q="
               + document.URL.split('/')[4],
         success: render,
         timeout: TOUT,
         error: timeout_error,
         dataType: "json"
      });

      function render( r ) {
         r.results = r.results[0]; //transition to new webserver fix 1/26/15

         //category
         var c = map_cat( r.results.category );

         //abstract
         var abs = clean_abs( r.results.abstract );
         if( abs === undefined || abs === "" ) {
            abs = "<div class='itc'>A description of this spinoff is not currently available. See the linked article below for details.</div>";
         }

         //patent of patent app
         /*if (format_pnum( r.results.patent_number ) === '' ) {
            $( "#pdh" ).html( "Patent Application" );
         }
         */
         $( "#ptitle" ).html( dsp_title( r.results.title ) );
         $( "#pabstract" ).html( abs );
         $( "#cat" ).html( c.full ); 
         $( "#refnum" ).html( r.results.reference_number );
         $( "#center" ).html( map_center( r.results.center ) );
         $( "#year" ).html( r.results.public_release_date );
         $( "#origin" ).html( r.results.origin );
         $( "#full_article" ).html( "<a href='" + r.results.full_article + "'>Full Article</a>");
   
         // use default contact info
        /* if( r.results.cname === undefined || r.results.cemail === undefined || r.results.cphone === undefined )
         {
               $( "#contact_info" ).html( get_pcon(r.results.center) );
         }
         else // use TOPS contact info
         {
            $( "#contact_info" ).html('<div class="contact">'+ r.results.cname + '<br/>'+ r.results.cphone + '<br/>'+ r.results.cemail + '</div>');
         }

         if(r.results.trl !== undefined) {
            var trl = parseInt(r.results.trl.charAt(0));
            if( trl > 0 && trl< 10 ) {
               $( "#trl_image" ).html( "<img src='/img/trl/" + trl + ".jpg' title='TRL " + trl + "' alt='TRL " + trl + "' />" );
               $( "#trl" ).show();
            }
         }

         // TOPS subtitle
         if(r.results.subtitle !== undefined) {
           $( "#sub" ).html(r.results.subtitle);
                $( "#psubtitle" ).show();
               }

         // TOPS tech description
         if(r.results.tech_desc !== undefined) {
           $( "#ptechdesc" ).html("<br/>Technology Description");
               $( "#techdesc" ).html( r.results.tech_desc );
               }

         // TOPS benefits
         if(r.results.benefit !== undefined) {

            $( "#bentitle" ).html("Benefits");
            var b = '<ul>';
            var allbens = r.results.benefit;
            for (var e in allbens)
            {
               b += '<li>';
               b += allbens[e].tops_benefit;
               b += '</li>';
            }
            b += '</ul>';
            $( "#benefitlist" ).html(b);

            $( "#benbox" ).show();
               }

         // TOPS applications
         if(r.results.application !== undefined) 
         {
            $( "#apptitle" ).html("Applications");
            var apps = '<ul>';
            var allapps = r.results.application;
            for (var e in allapps)
            {
               apps += '<li>';
               apps += allapps[e].tops_application;
               apps += '</li>';
            }
            apps += '</ul>';
            $( "#applicationlist" ).html(apps);

            $( "#appbox" ).show();
               
         }
*/
         //$( "#catico" ).html( '<a href="/' + r.results.category.split(' ').join('_') + '"><img src="/img/cat/' + c.ico + '" class="ico" alt="' + c.full + '" title="' + c.full + '" /></a>' );
      }
   }
   
   function dsp_title ( t ) {

      if( t.length > 50) {
         t = "<div style='font-size: 35px; line-height: 50px;'><div id='over'>" + t + "</div></div>";
      }
      else if( t.length > 35) {
         t = "<div style='font-size: 40px; line-height: 55px;'><div id='over'>" + t + "</div></div>";
      }
      else {
         ;
      }

      return t;
   }

   function load_features() {
      $.getJSON( "/svr/feature.php", function(d) {
         var feat = [];
         $.each(d, function(i,f) {
            feat.push('<li><a href="'+f[0]+'" target="'+f[3]+'"><img src="'+f[1]+'" title="' + f[2] + '" /></a></li>');
         });
         $( "<ul/>", {"class": "bxslider", html: feat.join( "" )}).appendTo( "#feature_content" );

         //exe slider
         $('.bxslider').bxSlider({
            mode: 'fade',
            speed: 1000,
            captions: true,
            auto: true,
            autoControls: true,
            pause: 7000
          });
      });
   }

   function load_archives() {
      $.getJSON( "/svr/feature.php?archive=true", function(d) {
         var html = "";
         $.each(d, function(i,f) {
            html += '<div id="af">';
            html += '<div id="left">';
            html += '<a href="'+f[0] +'" target="'+f[3]+'"><img src="'+f[1]+'" title="' + f[2] + '" /></a>';
            html += "</div>";
            html += '<div id="right">';
            html += '<div class="date">' + f['dateF']+ '</div>';
            html += '<div class="title">' + f[2] + '</div>';
            html += '<a href="'+f[0] + '" target="'+f[3]+'">Read More</a>';
            html += "</div>";
            html += "</div><br clear='all' />"
         });

         $( "#archives" ).html( html );
      });
   }

   function timeout_error() {
      $( "#loading" ).html( "" );
      alert("Sorry, the connection timed out. Please try again.");

      $.get('/html/timeout.html');
   }

   /*
    * public functions
    * 
    */
   return {
      init: function ( s ) { init( s ); },
      loadf: function () { load_features(); },
      archives: function () { load_archives(); },
      category: function ( c, p, k ) { category( c, p, k ); },
      search: function () { search(); },
      send_search: function () { send_search(); },
      display_spinoff: function () { display_spinoff(); },
   }
}());

<html>
<head><title>Store Cookieless RTB Data</title></head>
<body>
<script type="text/javascript">
  var BI_LS_KEY = 'OX_BI';
  try {
    var browserId = localStorage.getItem(BI_LS_KEY),
        BI_QS = 'bi',
        urlPrefix = 'http://eu-u.openx.net',
        path = '/w/1.0/sd',
        qa = 'id=537147487&val=R19_83149D2A_1680881FE',
        urlList = [ urlPrefix, path ];

    if ( qa ) {
      urlList = urlList.concat([ '?', qa ]);
      if ( browserId ){
        urlList =  urlList.concat([ '&', BI_QS, '=', browserId ]);
      }
      var url = urlList.join('');
      (new Image()).src = url;
    }
  } catch(err) {
    // fail to trigger cookieless sd request
  }
</script>
</body>
</html>
function showID(id) {
 document.getElementById(id).style.display = '';
}

function hideID(id) {
 document.getElementById(id).style.display = 'none';
}

function toggleMap(mapnum) {
 var prefix = "state";

 for (i = 1; i <= 3; i++) {
  if (i != mapnum)
   hideID(prefix+i);
 }
 showID(prefix+mapnum);
}

function togglePPQ() {
 var m = document.getElementById("state2");
 if (m.style.display == '') {
  m.style.display = 'none';
  toggleMap(1);
 } else {
  m.style.display = '';
  toggleMap(2);
 }
}

function togglePB() {
 var m = document.getElementById("state3");
 if (m.style.display == '') {
  m.style.display = 'none';
  toggleMap(1);
 } else {
  m.style.display = '';
  toggleMap(3);
 }
}

/**/

function getXHRObject() {
 if (window.XMLHttpRequest) {
  return new XMLHttpRequest();
 } else if(window.ActiveXObject) {
  return new ActiveXObject("Microsoft.XMLHTTP");
 } else {
  return null;
 }
}

var x = getXHRObject();

function _loadPestTable() {
 var pestTable = document.getElementById("pests");
 
 if (x.readyState == 4 && x.status == 200) {
  var rows = x.responseXML.getElementsByTagName("row");
  for (var i = 0; i < rows.length; i++) {
   var row = pestTable.insertRow();
   row.insertCell().innerText = rows[i].getElementsByTagName("commonName")[0].childNodes[0].nodeValue;
   row.insertCell().innerText = rows[i].getElementsByTagName("scientificName")[0].childNodes[0].nodeValue;
   row.insertCell().innerText = rows[i].getElementsByTagName("Classification")[0].childNodes[0].nodeValue;
  }
 }
}

function loadPestTable() {
 x.open("GET", "query.php?from=pest_tracker_universe&order=2,3");
 x.send(null);
 x.onreadystatechange = _loadPestTable;
}

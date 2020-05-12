function bn_onClickHandler(clicked, exitInfo) {
	if(clicked === undefined) 
		return false; // Check if clicked is not being called explicitly
	var clickProdId = "";
	if(typeof(bnObserver) != 'undefined' && typeof(bnObserver.defaultExitConfirmation) != 'undefined') {
		exitResult = bnObserver.defaultExitConfirmation(clicked,exitInfo);
		if (!exitResult) 
			return false;
	}
	// Idenitfying a guide click. Please update as per Customer's website.
	while (clicked && clicked.tagName && clicked.tagName != "A" && clicked.parentNode) {
		clicked = clicked.parentNode;
	}

	if ((BaynoteAPI.isNotEmpty(clicked.tagName) && clicked.tagName == "A")) {
		clickProdId = clicked.getAttribute("data-baynote-pid") || clicked.getAttribute("baynote_pid");
	}
	if (BaynoteAPI.isNotEmpty(clickProdId)) {
		if (typeof exitInfo != 'undefined' && exitInfo != null) {
			exitInfo.attrs = exitInfo.attrs || {}; // Append and not replace the existing exitInfo.attrs
		}
		exitInfo.attrs.prodId = clickProdId;
	}
	return true;
}

function myPreHandler(tag) { 

	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.OBSERVER_TAG)   {	
		// code that runs before the observer fires
		
		tag.exitConfirmation = bn_onClickHandler;
	}
/*  
	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.GUIDE_TAG)   {	
		// code that runs before the recs have loaded

	}
*/	
    return true;      
} 


function myPostHandler(tag) {
/*
	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.GUIDE_TAG) {
		// code that runs after recs have loaded
	}
*/
	return true;
}

// register the event handler
baynote_globals.onBeforeTagShow.push(myPreHandler);
baynote_globals.onTagShow.push(myPostHandler); 
bnResourceManager.registerResource(baynote_globals.ScriptResourceId); 
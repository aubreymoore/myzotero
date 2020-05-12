$(document).ready(function(){			
	$("#shopPostage").change(function(){ 	   	   
		$("#shopPostageForm").submit();
	});
	$("#ddpositform1").hide();
	$("#paymentType").change(function(){ 	   	
		$("#paymentType").submit();
		if (this.value == "CCD-DirectDeposit") {			
			$("#ddpositform1").show();
			$("#ewayform1").hide();
		} else {
			$("#ddpositform1").hide();
			$("#ewayform1").show();			
		}
	});
	$("#btnEditCart").click(function(){ 	   	   
		window.location.href='/cart';
	});
	
	if (typeof(useDeliveryAddr) !== "undefined") {	
		if (useDeliveryAddr == 'sameAsMain'){
			$("#alt_title").removeAttr('required');
			$("#alt_first_name").removeAttr('required');
			$("#alt_last_name").removeAttr('required');
			$("#alt_address").removeAttr('required');
	    	$("#alt_city").removeAttr('required');
	    	$("#alt_state").removeAttr('required');
	    	$("#alt_postcode").removeAttr('required');
	    	$("#alt_countrycode").removeAttr('required');
	    	$("#deliveryAddr").hide();
	    } else {
	    	$("#deliveryAddr").show();
	    	$("#alt_title").attr('required', true);
	    	$("#alt_first_name").attr('required', true);
	    	$("#alt_last_name").attr('required', true);
	    	$("#alt_address").attr('required', true);
	    	$("#alt_city").attr('required', true);
	    	$("#alt_state").attr('required', true);
	    	$("#alt_postcode").attr('required', true);
	    	$("#alt_countrycode").attr('required', true);
	    }
	}
	$("input[name$='useDeliveryAddr']").click(function() {		
        if (this.value == 'sameAsMain') {
        	$("#alt_title").removeAttr('required');
    		$("#alt_first_name").removeAttr('required');
    		$("#alt_last_name").removeAttr('required');
        	$("#alt_address").removeAttr('required');
        	$("#alt_city").removeAttr('required');
        	$("#alt_state").removeAttr('required');
        	$("#alt_postcode").removeAttr('required');
        	$("#alt_countrycode").removeAttr('required');
        	$("#deliveryAddr").hide();
        } else {
        	$("#deliveryAddr").show();
        	$("#alt_title").attr('required', true);
        	$("#alt_first_name").attr('required', true);
        	$("#alt_last_name").attr('required', true);
        	$("#alt_address").attr('required', true);
        	$("#alt_city").attr('required', true);
        	$("#alt_state").attr('required', true);
        	$("#alt_postcode").attr('required', true);
        	$("#alt_countrycode").attr('required', true);
        }
	}); 	
	$("#state").change(function(){ 	   		
		if (this.value == "OTHER") {			
			$("#state_nonaus").show();	
			$("#state_nonaus").attr('required', true);
		} else {
			$("#state_nonaus").removeAttr('required');
			$("#state_nonaus").hide();					
		}
	});
	$("#alt_state").change(function(){ 	   		
		if (this.value == "OTHER") {			
			$("#alt_state_nonaus").show();
			$("#alt_state_nonaus").attr('required', true);
		} else {
			$("#alt_state_nonaus").removeAttr('required');
			$("#alt_state_nonaus").hide();					
		}
	});	
}); 


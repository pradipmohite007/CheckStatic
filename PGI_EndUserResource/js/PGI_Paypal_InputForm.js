function updateLicenseRequest(){
	Visualforce.remoting.Manager.invokeAction(UpdateLicenseRequest,
		 licenseRequestId, isRecurring, paymentGatewayId,  
		 function(result, event) {                  
			 var res = JSON.parse(result);
			 if(res){ 
			 } else {
			 }
		 }, {
			 escape:false
		 }
	 );
}
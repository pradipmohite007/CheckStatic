window.onload = function(){
	verifyInstallationSteps();
	handlePromotionPopup();  //v1.2 
}
function verifyInstallationSteps(){
	Visualforce.remoting.Manager.invokeAction(verifySteps,
		function(result1, event) {
			if(result1){  
			   var result = parseResult(result1);
			   if(result.paymentConfigured  == true) {
					var paymentConfigureDiv = document.getElementById('paymentConfigurationDiv');
					paymentConfigureDiv.style.display = "block";
					var paymentConfigStatus = document.getElementById('paymentConfigStatus');
					var paymentConfigCompletedImgSpan = document.getElementById('paymentConfigCompletedImg'); 
					if(paymentConfigureDiv){
						paymentConfigureDiv.className = "slds-box slds-box--small  slds-text-align--center green-box";
					}
					if(paymentConfigStatus){
						paymentConfigStatus.innerHTML = installationStepsCompletedLabel;
					}
					if(paymentConfigCompletedImgSpan){
						paymentConfigCompletedImgSpan.className = "svg-icon-green slds-icon_container slds-icon-action-approval slds-icon_container--circle";
					}
					$("[id$=paymentConfigImage]").prop("src", pgiEndUserResourcePath +'/images/img_Payment_completed.png');
					$("[id$=paymentConfigCheck]").attr("xlink:href",pgiLDSPath+'/assets/icons/action-sprite/svg/symbols.svg#approval');
			   }
			   
			   else if(result.paymentConfigured  == false) {
					var paymentConfigureDiv = document.getElementById('paymentConfigurationDiv');
					paymentConfigureDiv.style.display = "block";
					var paymentConfigStatus = document.getElementById('paymentConfigStatus');
					var paymentConfigCompletedImgSpan = document.getElementById('paymentConfigCompletedImg'); 
					if(paymentConfigureDiv){
						paymentConfigureDiv.className = "slds-box slds-box--small  slds-text-align--center grey-box";
					}
					if(paymentConfigStatus){
						paymentConfigStatus.innerHTML = installationStepsDefaultStatusLabel;
					}
					if(paymentConfigCompletedImgSpan){
						paymentConfigCompletedImgSpan.className = "svg-icon-orange slds-icon_container slds-icon-action-approval slds-icon_container--circle";
					}
					$("[id$=paymentConfigImage]").prop("src",pgiEndUserResourcePath +'/images/img_Payment_pending.png');
					$("[id$=paymentConfigCheck]").attr("xlink:href",pgiLDSPath+'/assets/icons/utility-sprite/svg/symbols.svg#clock');
			   }
			   
			   if(result.pricingConfigured  == true) {
					var pricingRuleConfigDiv = document.getElementById('pricingRuleConfigDiv');
					pricingRuleConfigDiv.style.display = "block";
					var pricingRuleConfigStatus = document.getElementById('pricingRuleConfigStatus');
					var pricingConfigCompletedImgSpan = document.getElementById('pricingConfigCompletedImg'); 
					if(pricingRuleConfigDiv){
						pricingRuleConfigDiv.className = "slds-box slds-box--small  slds-text-align--center green-box";
					}
					if(pricingRuleConfigStatus){
						pricingRuleConfigStatus.innerHTML = installationStepsCompletedLabel;
					}
					if(pricingConfigCompletedImgSpan){
						pricingConfigCompletedImgSpan.className = "svg-icon-green slds-icon_container slds-icon-action-approval slds-icon_container--circle";
					}
					$("[id$=pricingRuleConfigImage]").prop("src",pgiEndUserResourcePath +'/images/img_Pricing_completed.png');
					$("[id$=pricingConfigCheck]").attr("xlink:href",pgiLDSPath+'/assets/icons/action-sprite/svg/symbols.svg#approval');
			   }
			   
			   else if(result.pricingConfigured  == false) {
					var pricingRuleConfigDiv = document.getElementById('pricingRuleConfigDiv');
					pricingRuleConfigDiv.style.display = "block";
					var pricingRuleConfigStatus = document.getElementById('pricingRuleConfigStatus');
					var pricingConfigCompletedImgSpan = document.getElementById('pricingConfigCompletedImg'); 
					if(pricingRuleConfigDiv){
						pricingRuleConfigDiv.className = "slds-box slds-box--small  slds-text-align--center grey-box";
					}
					if(pricingRuleConfigStatus){
						pricingRuleConfigStatus.innerHTML = installationStepsDefaultStatusLabel;
					}
					if(pricingConfigCompletedImgSpan){
						pricingConfigCompletedImgSpan.className = "svg-icon-orange slds-icon_container slds-icon-action-approval slds-icon_container--circle";
					}
					$("[id$=pricingRuleConfigImage]").prop("src",pgiEndUserResourcePath +'/images/img_Pricing_pending.png');
					$("[id$=pricingConfigCheck]").attr("xlink:href",pgiLDSPath+'/assets/icons/utility-sprite/svg/symbols.svg#clock');
			   }
									  
			   if(result.brandingConfigured  == true) {
					var brandingConfigDiv = document.getElementById('brandingConfigDiv');
					brandingConfigDiv.style.display = "block";
					var brandingConfigStatus = document.getElementById('brandingConfigStatus');
					var brandingConfigCompletedImgSpan = document.getElementById('brandingConfigCompletedImage');
					if(brandingConfigDiv){
						brandingConfigDiv.className = "slds-box slds-box--small  slds-text-align--center green-box";
					}
					if(brandingConfigStatus){
						brandingConfigStatus.innerHTML = installationStepsCompletedLabel;
					}
					if(brandingConfigCompletedImgSpan){
						brandingConfigCompletedImgSpan.className = "svg-icon-green slds-icon_container slds-icon-action-approval slds-icon_container--circle";
					}
					$("[id$=brandingConfigImage]").prop("src",pgiEndUserResourcePath +'/images/img_branding_completed.png');
					$("[id$=brandingConfigCheck]").attr("xlink:href",pgiLDSPath+'/assets/icons/action-sprite/svg/symbols.svg#approval');
			   }
			   else if(result.brandingConfigured  == false){
					var brandingConfigDiv = document.getElementById('brandingConfigDiv');
					brandingConfigDiv.style.display = "block";
					var brandingConfigStatus = document.getElementById('brandingConfigStatus');
					var brandingConfigCompletedImgSpan = document.getElementById('brandingConfigCompletedImage');
					if(brandingConfigDiv){
						brandingConfigDiv.className = "slds-box slds-box--small  slds-text-align--center grey-box";
					}
					if(brandingConfigStatus){
						brandingConfigStatus.innerHTML = installationStepsDefaultStatusLabel;
					}
					if(brandingConfigCompletedImgSpan){
						brandingConfigCompletedImgSpan.className = "svg-icon-orange slds-icon_container slds-icon-action-approval slds-icon_container--circle";
					}
					$("[id$=brandingConfigImage]").prop("src",pgiEndUserResourcePath +'/images/img_branding_pending.png');
					$("[id$=brandingConfigCheck]").attr("xlink:href",pgiLDSPath+'/assets/icons/utility-sprite/svg/symbols.svg#clock');
			   }
			} 
		}, {
			escape:false
		}
	);
//v1.2 start here
}

function handlePromotionPopup(){
	Visualforce.remoting.Manager.invokeAction(getPromotionData,
		function(result, event) {
			var response = JSON.parse(result);
			var daysLeft = response.trialRemainingDays;
			expirydateAlert(daysLeft);            
		},{
			escape:false
		} 
	);
}

function expirydateAlert(daysLeft){
	if(daysLeft && daysLeft != null){
		$("#subscribeSpan").show();
		$('#expiryMsg').text(daysLeft);
	}else{
		$("#subscribeSpan").hide();
	}
//v1.2 ends here
}
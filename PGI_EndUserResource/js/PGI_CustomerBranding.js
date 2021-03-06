window.onload = function()
{  
   getRemoteBranding();
   //v1.2 start here
   handlePromotionPopup();
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
	var subscribeSpan = document.getElementById('subscribeSpan');
	if(daysLeft && daysLeft != null){
		if(subscribeSpan){
			var expiryMsg = document.getElementById('expiryMsg');
			if(expiryMsg){
				expiryMsg.innerHTML = daysLeft;
			}
			subscribeSpan.style.display = 'block';
		}
	}else{
		if(subscribeSpan){
			subscribeSpan.style.display = 'none';
		} 
	}
	//v1.2 ends here
}

function uploadFile(logo ) {
  var file = document.getElementById(logo).files[0];
  if(file != undefined && file) {
	if(file.size <= maxFileSize) {
	  attachmentName = file.name;
	  var fileReader = new FileReader();
	  fileReader.onloadend = function(e) {
		attachment = window.btoa(this.result);  //Base 64 encode the file before sending it
		positionIndex=0;
		fileSize = attachment.length;
		doneUploading = false;
		if(fileSize < maxStringSize) {
		  uploadAttachment(null,logo); 
		  
		} else {
		  alert(maximumFileSizeError + fileSize + maximumFileSizeError2 + maxStringSize + ".");
		}  
	  }
	  fileReader.onerror = function(e) {
		alert(fileReadingError);
	  }
	  fileReader.onabort = function(e) {
		alert(fileReadingError);
	  }
	 
	  fileReader.readAsBinaryString(file);  //Read the body of the file
	 
	} else {
	  alert(fileSizeError);
	}
  } else {
	alert(fileUploadError);
  }
}

function uploadAttachment(fileId,logo) {
  var attachmentBody = "";
  if(fileSize <= positionIndex + chunkSize) {
	attachmentBody = attachment.substring(positionIndex);
	doneUploading = true;
  } else {
	attachmentBody = attachment.substring(positionIndex, positionIndex + chunkSize);
  }
  Visualforce.remoting.Manager.invokeAction(
  uploadBrandLogo,
  document.getElementById('brandid').value, attachmentBody, attachmentName, fileId, 
	function(result, event) {
	  if(event.type === 'exception') {
	  } else if(event.status) {
	  
		if(result.substring(0,3) == '00P') {
		  if(doneUploading == true) {    
			// False Positive - Here we are not doing URL encode for Product logo because Only Id will be returned from controller so no need to encode parameter
			if(logo == 'companylogo') {
				document.getElementById('complogo').src = '/servlet/servlet.FileDownload?file='+result;
				refreshPreview();
			}
			if(logo == 'productlogo') {
				// False Positive - Here we are not doing URL encode for Product logo because Only Id will be returned from controller so no need to encode parameter
				document.getElementById('prodlogo').src = '/servlet/servlet.FileDownload?file='+result;
				setProductFrame();
			}
			alert(fileUploadSuccessfulMessage);
		  } else {
			positionIndex += chunkSize;
			uploadAttachment(result);
		  }
		}
	  } 
	},
	{buffer: true, escape: true, timeout: 120000}
  );
}

function getRemoteBranding() {
	Visualforce.remoting.Manager.invokeAction(getBranding,
		'', 
		function(result1, event){
			if (event.status) {
				var result = parseResult(result1);
				if(result.Id !=null)
					document.getElementById('brandid').value = result.Id;
				if(result.title !=null) {
					document.getElementById('title').value = result.title;
					document.getElementById('title1').value = result.title;
				}else{
					document.getElementById('title').value = ''; 
					document.getElementById('title1').value = '';
				}
				if(result.companytitlecolor !=null) {
					document.getElementById('company-title-color').value = result.companytitlecolor ;
					document.getElementById('company-title-colorPalet').value = result.companytitlecolor ;
				}
				if(result.AddressLine1 !=null)
					document.getElementById('Address-Line-01').value = result.AddressLine1;
				if(result.AddressLine2 !=null)
					document.getElementById('Address-Line-02').value = result.AddressLine2;
				if(result.city !=null)
					document.getElementById('select-city').value = result.city;
				if(result.contactno !=null)
					document.getElementById('contact-no').value = result.contactno;
				if(result.email !=null)
					document.getElementById('email').value = result.email;
				if(result.state !=null)
					document.getElementById('select-state').value = result.state;
				if(result.zip !=null)
					document.getElementById('zip').value = result.zip; 
				if(result.country !=null)
					document.getElementById('Country').value = result.country; 
					
				if(result.headercolor !=null) {
					document.getElementById('Header').value = result.headercolor ;
					 document.getElementById('HeaderPalet').value = result.headercolor ;
				}
				if(result.footercolor !=null) {
					document.getElementById('Footer').value = result.footercolor ;
					document.getElementById('FooterPalet').value = result.footercolor ;
				}
				if(result.bodybackgroundcolor !=null) {
					document.getElementById('Background').value = result.bodybackgroundcolor ;
					document.getElementById('BackgroundPalet').value = result.bodybackgroundcolor ;
				}
				if(result.brandcolor !=null) {
					document.getElementById('Brand').value = result.brandcolor ;
					document.getElementById('BrandPalet').value = result.brandcolor ;
				}
				if(result.fontfootercolor !=null) {
					document.getElementById('font-footer').value = result.fontfootercolor ;
					document.getElementById('font-footerPalet').value = result.fontfootercolor ;
				}
				
				if(result.contenttitlecolor !=null) {
					document.getElementById('content-title').value = result.contenttitlecolor ; 
					document.getElementById('content-titlePalet').value = result.contenttitlecolor ; 
				}
				if(result.attachmentId !=null){
					// False Positive - Here we are not doing URL encode for Product logo because Only Id will be returned from controller so no need to encode parameter
					document.getElementById('complogo').src = '/servlet/servlet.FileDownload?file='+result.attachmentId;
				}
				if(result.terms !=null){
					document.getElementById('terms').value = result.terms;
				}
				if(result.copyrightText != null){
					document.getElementById('copyrightText').value = result.copyrightText;
				}
				
			   setCompanyFrame();
			   refreshPreview();
			}       
		}, 
		{escape: true}
	);
}

function setRemoteBranding1() {
	
	var map = {"brandid":document.getElementById('brandid').value,"title":document.getElementById('title').value,"AddressLine1":document.getElementById('Address-Line-01').value,
				"AddressLine2":document.getElementById('Address-Line-02').value,"selectcity":document.getElementById('select-city').value,"contactno":document.getElementById('contact-no').value,
				"email":document.getElementById('email').value,"selectstate":document.getElementById('select-state').value,"zip":document.getElementById('zip').value,
				"country":document.getElementById('Country').value} 
	var brandingJson = JSON.stringify(map);
	Visualforce.remoting.Manager.invokeAction(
		setBranding1,
		brandingJson, document.getElementById('terms').value,
		function(result, event){
			if (event.status) {
				alert(saveSuccessfulMessage);
			}       
		}, 
		{escape: true}
	);
}

function setRemoteBranding2() {
	
	var map = {"brandid":document.getElementById('brandid').value,"copyrightText":document.getElementById('copyrightText').value,"title":document.getElementById('title1').value,
				"companytitlecolor":document.getElementById('company-title-color').value,"Header":document.getElementById('Header').value,"Footer":document.getElementById('Footer').value,
				"Background":document.getElementById('Background').value,"Brand":document.getElementById('Brand').value,"fontheader":document.getElementById('company-title-color').value,
				"fontfooter":document.getElementById('font-footer').value,"contenttitle":document.getElementById('content-title').value} 
	var brandingJson = JSON.stringify(map);
	Visualforce.remoting.Manager.invokeAction(
		setBranding2, brandingJson,            
		function(result, event){
			if (event.status) {
				alert(saveSuccessfulMessage);
			}       
		}, 
		{escape: true}
	);
}

function resetCompanyInformation() {
	
	var brandId = document.getElementById('brandid').value;        
	Visualforce.remoting.Manager.invokeAction(
		reSetCompanyInformation,
		brandId,
		function(result, event){
			if (event.status) {
			   getRemoteBranding();
			   alert(resetSuccessfulMessage);
			}       
		}, 
		{escape: true}
	);
}

function resetBranding() {
	
	var brandId = document.getElementById('brandid').value;        
	Visualforce.remoting.Manager.invokeAction(
		reSetBranding,
		brandId,
		function(result, event){
			if (event.status) {
			   getRemoteBranding();
			   alert(resetSuccessfulMessage);
			}       
		}, 
		{escape: true}
	);
}

function resetProductBranding() {
	
	var brandId = document.getElementById('brandid').value;        
	Visualforce.remoting.Manager.invokeAction(
		reSetProductBranding,
		brandId,
		function(result, event){
			if (event.status) {
			   getProducts();
			   alert(resetSuccessfulMessage);
			}       
		}, 
		{escape: true}
	);
}

function previewSiteBranding() {
	window.open('/apex/PGI_VerificationPage?previewMode=true&isFullScreenPreviewModeOn=true&titleColor='+document.getElementById('company-title-color').value+
					'&headerColor='+document.getElementById('Header').value+'&footerColor='+document.getElementById('Footer').value+
					'&headerFontColor='+document.getElementById('company-title-color').value+'&footerFontColor='+document.getElementById('font-footer').value+
					'&backColor='+document.getElementById('Background').value+'&brandColor='+document.getElementById('Brand').value
					+'&contentTitleFontColor='+document.getElementById('content-title').value);
	
}
   
function getProducts() {
	//Change dynamic Id 
	clearProductValues();
	Visualforce.remoting.Manager.invokeAction(
		getBrandingProducts,
		document.getElementById('productName').value, 
		function(result1, event){
			var result = parseResult(result1);
			if (event.status && result!=null) {
			if(result.Id !=null) {
				document.getElementById('brandid').value = result.Id;
				document.getElementById('productUpload').disabled = false;
			}
			if(result.Id == '') {
				document.getElementById('productUpload').disabled = true;
				document.getElementById('brandid').value = '';
			}
			if(result.fontheadercolor !=null) {
				document.getElementById('pheaderF').value = result.fontheadercolor ;
				document.getElementById('pheaderPaletF').value = result.fontheadercolor ;
			}
			if(result.headercolor !=null) {
				document.getElementById('pheader').value = result.headercolor ;
				document.getElementById('pheaderPalet').value = result.headercolor ;
			}
			if(result.pagetitlecolor !=null) {
				document.getElementById('page-title').value = result.pagetitlecolor ;
				document.getElementById('page-titlePalet').value = result.pagetitlecolor ;
			}
			
			if(result.fontfootercolor !=null) {
				document.getElementById('pfooter').value = result.fontfootercolor ;     
				document.getElementById('pfooterPalet').value = result.fontfootercolor ;     
			}
			if(result.footercolor !=null) {
				document.getElementById('pfooter1').value = result.footercolor ;
				document.getElementById('pfooterPalet1').value = result.footercolor ;
			}
			
			if(result.attachmentId !=null){
				// False Positive - Here we are not doing URL encode for Product logo because Only Id will be returned from controller so no need to encode parameter
				document.getElementById('prodlogo').src = '/servlet/servlet.FileDownload?file='+result.attachmentId;
			}
			 if(result.attachmentId == null) 
				document.getElementById('prodlogo').src = '';        
			}  
		}, 
		{escape: true}
	);
	setProductFrame();
}

function clearProductValues(){
	document.getElementById('pheaderF').value = '';
	document.getElementById('pheaderPaletF').value = '';
	document.getElementById('pheader').value = '';
	document.getElementById('pheaderPalet').value = '';
	document.getElementById('page-title').value = '';
	document.getElementById('page-titlePalet').value = '';
	document.getElementById('pfooter').value = '';
	document.getElementById('pfooterPalet').value = '';
	document.getElementById('pfooter1').value = '';
	document.getElementById('pfooterPalet1').value = '';
}

function setProducts() {
	//Remove Dynamic Id 
	var map = {"prodid":document.getElementById('productName').value,"brandid":document.getElementById('brandid').value,
				"HeaderFont":document.getElementById('pheaderF').value,"Header":document.getElementById('pheader').value,"pagetitle":document.getElementById('page-title').value,
				"FooterFont":document.getElementById('pfooter').value, "Footer":document.getElementById('pfooter1').value};
	var brandingJson = JSON.stringify(map);
	Visualforce.remoting.Manager.invokeAction(
		setBrandingProducts,
		brandingJson,
		function(result, event){
			if (event.status) {
				getProducts();
				alert(saveSuccessfulMessage);
			}       
		}, 
		{escape: true}
	);
}

function PreviewProductBranding() {
	window.open('/apex/PGI_Order_Details?previewMode=true&isFullScreenPreviewModeOn=true&packageId='+document.getElementById('productName').value +
				'&headerFontColor='+document.getElementById('pheaderF').value+'&headerColor='+document.getElementById('pheader').value+'&pageTitleFontColor='+document.getElementById('page-title').value+
				'&footerFontColor='+document.getElementById('pfooter').value+'&footerColor='+document.getElementById('pfooter1').value);
}

function updatePaletColor(palet) {
	var textboxId = palet.id.substring( 0, palet.id.indexOf( "Palet" ) );
	document.getElementById(textboxId).value = palet.value;
}

function updateInputTexFromPaletColor(palet, textInput){
	document.getElementById(textInput).value = palet.value;
}

function updatePaletValue(inputColor, paletColorBoxId){
	var colorPaleteElement = document.getElementById(paletColorBoxId);
	colorPaleteElement.value = inputColor.value;
}
function setCompanyFrame() {
	document.getElementById('previewFrame1').src = '';
	var parameters = '/apex/PGI_Invoice_Preview?previewMode=true&title='+document.getElementById('title').value+'&address1='+document.getElementById('Address-Line-01').value+
					'&address2='+document.getElementById('Address-Line-02').value+'&city='+document.getElementById('select-city').value+'&state='+document.getElementById('select-state').value+
					'&zip='+document.getElementById('zip').value+'&companyName='+document.getElementById('title').value+'&country='+document.getElementById('Country').value+
					'&contactNumber='+document.getElementById('contact-no').value+'&email='+document.getElementById('email').value+'&contentTitleFontColor='+document.getElementById('content-title').value;
	var param = parameters.replace(/#/g, '%23');
	document.getElementById('previewFrame1').src = param;
}
function PreviewCompanyFrame() {
	var logoWidth, logoHeight = 100 ;
	if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
		logoWidth = sessionStorage.logoWidth;
		logoHeight = sessionStorage.logoHeight;
	}
	window.open('/apex/PGI_Invoice?previewMode=true&title='+document.getElementById('title').value+'&address1='+document.getElementById('Address-Line-01').value+
						'&address2='+document.getElementById('Address-Line-02').value+'&city='+document.getElementById('select-city').value+'&state='+document.getElementById('select-state').value+
						'&zip='+document.getElementById('zip').value+'&companyName='+document.getElementById('title').value+'&country='+document.getElementById('Country').value+
						'&contactNumber='+document.getElementById('contact-no').value+'&email='+document.getElementById('email').value+
						'&logoWidth='+logoWidth+'&logoHeight='+logoHeight);
}
function refreshPreview() {
	document.getElementById('previewFrame2').src = '';
	var parameters = '/apex/PGI_VerificationPage?previewMode=true&title='+document.getElementById('title1').value+'&titleColor='+document.getElementById('company-title-color').value+
					'&headerColor='+document.getElementById('Header').value+'&footerColor='+document.getElementById('Footer').value+
					'&headerFontColor='+document.getElementById('company-title-color').value+'&footerFontColor='+document.getElementById('font-footer').value+
					'&copyrighttext='+document.getElementById('copyrightText').value+'&backColor='+document.getElementById('Background').value+'&brandColor='+document.getElementById('Brand').value
					+'&contentTitleFontColor='+document.getElementById('content-title').value;
	var param = parameters.replace(/#/g, '%23');
	document.getElementById('previewFrame2').src = param;
} 
function setProductFrame() {
	var srcF = '/apex/PGI_Order_Details?previewMode=true&packageId='+document.getElementById('productName').value +'&headerFontColor='+document.getElementById('pheaderF').value+
				'&headerColor='+document.getElementById('pheader').value+'&pageTitleFontColor='+document.getElementById('page-title').value+
				'&footerFontColor='+document.getElementById('pfooter').value+'&footerColor='+document.getElementById('pfooter1').value;
	var param = srcF.replace(/#/g, '%23');
	document.getElementById('previewFrame3').src = param; 
}

function toggleBody(bodyElement){
	var bodyClassName = document.getElementById(bodyElement).className;
	var showClassName = document.getElementById(bodyElement+'-show').className;
	var hideClassName = document.getElementById(bodyElement+'-hide').className;
	var bodyNewClassName, showNewClassName, hideNewClassName;
	if(bodyClassName.includes("slds-hide"))
	{
		 bodyNewClassName = bodyClassName.replace('slds-hide', 'slds-show');
		 showNewClassName = showClassName.replace('slds-hide', 'slds-show');
		 hideNewClassName = hideClassName.replace('slds-show', 'slds-hide');
	}
	if(bodyClassName.includes('slds-show'))
	{
		bodyNewClassName = bodyClassName.replace('slds-show', 'slds-hide');
		showNewClassName = showClassName.replace('slds-show', 'slds-hide');
		hideNewClassName = hideClassName.replace('slds-hide', 'slds-show');
	}
	document.getElementById(bodyElement+'-show').className = showNewClassName;
	document.getElementById(bodyElement+'-hide').className = hideNewClassName;
	document.getElementById(bodyElement).className = bodyNewClassName;
}

function validateCharactersLimit(inputElement, noOfCharacters){
	var inputValue = inputElement.value;
	if(!isNaN(noOfCharacters)){
		if(inputValue && inputValue.length > parseInt(noOfCharacters)){
			inputElement.value = inputValue.substring(0, parseInt(noOfCharacters));
		}
	}
//v1.2 start here
}

function validateNumbers(inputElement, noOfCharacters){
	validateCharactersLimit(inputElement, noOfCharacters);
	var inputValue = inputElement.value;
	if (inputValue.match(/[a-z]/i)) {
		// alphabet letters found
		inputElement.value = inputValue.replace(/[^0-9]+/g, "");
	}
}

function validateAlphabets(inputElement, noOfCharacters){
	validateCharactersLimit(inputElement, noOfCharacters);
	var inputValue = inputElement.value;
	if(hasNumbers(inputValue)){
		inputElement.value = inputValue.replace(/[0-9]/g, "");
	}
}
function hasNumbers(t){
	var regex = /\d/g;
	return regex.test(t);
//v1.2 ends here
}
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
	function(m,key,value) {
	  vars[key] = value;
	});
	return vars;
}
getSubcribedListOfProducts();
function getSubcribedListOfProducts(){
  //v1.2 start
	updateBrandingTheme();
	//v1.2 end
	Visualforce.remoting.Manager.invokeAction(getInstalledProduct, 
	OrgID,
	function(result1, event) {
		if(result1){  
			var result = parseResult(result1);                  
			 productHTML +='<ul class="list-unstyled prod-listing">'+
							'<li class="hidden-xs">'+
				   ' <div class="product-list-wrapper-heading">'+
					  ' <div class="box text-left">'+
							//'<h4> '+productSelectionProductLabel+ ' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h4>'+
						'</div>'+
						//v1.3 removed pricing column from here
					   ' <div class="box">'+
							'<div class="form-buttons" style="visibility:hidden;">'+
								'<div class="input-label">'+
									'<input type="submit" class="btn save-btn" value="'+productSelectionSubscribeButton+'" />'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</li>';
			 for(var i=0; i<result.length;i++){
				var licenseId = result[i].LicenseId;
				productHTML += '<li>'+
								'<div class="product-list-wrapper">'+
									'<div class="box product-logo-box">'+
										// False Positive - Here we are not doing URL encode for Product logo because Only Id will be returned from controller so no need to encode parameter
										'<img src="'+communityURL+'/servlet/servlet.FileDownload?file='+result[i].ProductLogo+'" class="product-logo" />'+
										'<h4 class="product-name">'+result[i].ProductName+'</h4>'+
									'</div>'+
										
										'<div class="box subscription-box">'+
											'<div class="form-buttons">'+
												'<div class="input-label">'+
													'<button style="background:'+brandColor+'" class="btn save-btn" value="'+productSelectionSubscribeButton+'" onclick="subscribeAction(\''+licenseId+'\')">'+productSelectionSubscribeButton+'</button>'+
												'</div>'+
											'</div>'+
										'</div>'+
								'</div>'+
							 '</li>';
				}
			productHTML +='</ul>';
			
			document.getElementById('productList').innerHTML  = productHTML;
			 
		} else {
		}
	}
);
}

function subscribeAction(LicenceId){
	$("[id$=theHiddenInput]").prop("value",LicenceId);
	Subscribe();
}
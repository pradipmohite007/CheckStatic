window.onload = function(){
	if(previewMode == 'true'){
		$("[id$=OrgId]").prop("disabled",true);
		$("[id$=generateOTPBtn]").prop("disabled",true);
	}
}

function generateOTP(){
	var orgId = document.getElementById('OrgId').value;
	if(orgId == '' || orgId == null) {      
		 $( "#OrgInputDiv" ).addClass( "has-error" );
		 $( "#helpBlock2" ).css('display','block');
	}
	else {
		Visualforce.remoting.Manager.invokeAction(GenerateAndEmailOTP,
			orgId, 
			function(result1, event) {
				var result = parseResult(result1);  
				if(result){
					$( "#helpBlock2" ).css('display','none');
					$( "#OTPDiv" ).css('display','block');
					$( "#OrgInputDiv" ).removeClass( "has-error" );
					$("[id$=generateOTPBtn]").prop("disabled",true);
					$("[id$=OrgId]").prop("disabled",true);
				} else {
					$( "#helpBlock2" ).css('display','block');
					$( "#OrgInputDiv" ).addClass( "has-error" );
					$( "#OTPDiv" ).css('display','none');
				}
			}, {
				escape:false
			}
		);
	}
}

function verifyOTP(){
	var orgId =  $('#OrgId').val();
	var OTP = $('#OTPInput').val();
	
	Visualforce.remoting.Manager.invokeAction(verifyOTPRemote,
		orgId, OTP, 
		function(result, event) {
			
			var parsedResult = parseResult(result); 
			if(parsedResult == true){                            
				$( "#span1" ).css('display','none');
				$("[id$=theHiddenInput]").prop("value",orgId);
				redirectToProductPage(orgId);
				$( "#OTPDiv" ).removeClass( "has-error" );
			}
			else {
				$( "#span1" ).css('display','block');
				$( "#OTPDiv" ).addClass( "has-error" );
			} 
		}, {
			escape:false
		}
	);
}

function clearErrorMessage(elementID, errorBlockId){
	$("#"+elementID).removeClass( "has-error" );
	$("#"+errorBlockId).css('display','none');
}

function resendOTP(){
	generateOTP();
	alert(resendMsg);
}
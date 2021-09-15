window.onload = function(){
	var previewMode = isPreviewModeOn;
	if(previewMode != 'true'){
		updateBrandingTheme();
		var users = $("[id$=seatsValue]").val();
		noOfUsers = users;
		if(noOfUsers != undefined && noOfUsers){
			calculateTotalAmount(noOfUsers);
		}
	}
}
 
function calculateTotalAmount(noOfUser){
	noOfUsers = noOfUser.toString();      
	var errorMessage = document.getElementById('noOfUserErrorMessage');   
	if(errorMessage){   
		errorMessage.innerHTML = '';
	}
	var termSelected = document.getElementsByClassName('term-list')[0].value;//v1.3
	var packageName = document.getElementById('PackageName').innerHTML;//v1.3
	if(noOfUsers && termSelected){
		totalNoOfUsers = noOfUsers;
		if(validateNumberOfUsers(noOfUsers)){
			Visualforce.remoting.Manager.invokeAction(calculateTotalPrice,
				termSelected, noOfUsers, packageName,
				function(responseResult, event) {
					var res;
					//var result1 = JSON.parse(responseResult)
					var result1 = responseResult;
					if(result1){ 
						var result =  result1.toString();
						res = result.split(",");
						result = res[0];                     
						var totalPrice = document.getElementById('totalPrice');
						if(totalPrice){
							totalPrice.innerHTML = '$'+result;
						}
						var totalAmount = document.getElementById('totalAmount');
						if(totalAmount){
							totalAmount.innerHTML = '$'+result;
						}
						var userInputDiv = document.getElementById('userInputDiv');
						if(res.length > 2){
							$("[id$=seatsValue]").prop("disabled",true);
							noOfUsers = 0;
						}else{
							$("[id$=seatsValue]").prop("disabled",false);
							$("[id$=seatsValue]").prop("value",noOfUsers);
						}
						
					} else {
					   
					}
				}, {
					escape:false
				}
			);
		}
	}
	else{
		setTotalValueZero();
	}
}

function updateSelectedTerms(term){
	$("[id$=seatsValue]").prop("value",'');
	noOfUsers = '';
	//this is the function name which calls our action function from java Script.
	UpdatePricingInJavascript(); 
	if(term && term.value) {
		selectedTerms = term.value.toString();  
	}   
	if(noOfUsers != undefined && noOfUsers){
		calculateTotalAmount(noOfUsers);
	}
	else{
		setTotalValueZero();
	}
}

function setTotalValueZero(){
	var totalPrice = document.getElementById('totalPrice');
	var totalAmount = document.getElementById('totalAmount');
	if(totalPrice){
		totalPrice.innerHTML = '$0.00';
	}
	if(totalAmount){
		totalAmount.innerHTML = '$0.00';
	}
}
// Validate input - Number of Users entered by user. Maximum 999 and do not accept text
function validateNumberOfUsers(noOfUser,maxValue){
	var errorMessage = document.getElementById('noOfUserErrorMessage'); 
	if(errorMessage){   
		errorMessage.innerHTML = '';
	}
	if(isNaN(noOfUser)){ 
		if(errorMessage){   
			errorMessage.innerHTML = numberOfUserDigitValidationError;
			errorMessage.style.color='red';
			$("[id$=seatsValue]").prop("value",noOfUser.slice(0, -1));
			return false;
		}
	}
	else if(noOfUser.indexOf(".") != -1){
		errorMessage.innerHTML = numberOfUserValidationError
		errorMessage.style.color='red';
		$("[id$=seatsValue]").prop("value",noOfUser.slice(0, -1));
		return false;
	}                                   
	else if(parseInt(noOfUser) > 999 || parseInt(noOfUser) <= 0){
		if(errorMessage){   
			errorMessage.innerHTML = noOfUsersValidationError;
			errorMessage.style.color='red';
		}
		if(parseInt(noOfUser) > 999)
			$("[id$=seatsValue]").prop("value",noOfUser.substring(0, 3));
		else if(parseInt(noOfUser) <= 0)
			$("[id$=seatsValue]").prop("value",'');
		return false;
	}
	else if(parseInt(noOfUser) > parseInt(maxValue)){
		errorMessage.innerHTML = 'Required User Licenses can not be greater than max value';
		errorMessage.style.color='red';
		$("[id$=seatsValue]").prop("value",noOfUser.substring(0, 3));

		return false;
	}
	else if (/\s/.test(noOfUser)) {
		errorMessage.innerHTML = numberOfUserValidationError;
	}
	isNoOfUsersCorrect = true;
	return true;  
}
function callValidateuser(){
	var users = $("[id$=seatsValue]").val();
	var errorMessage = document.getElementById('noOfUserErrorMessage'); 
	if(errorMessage){   
		errorMessage.innerHTML = '';
	}
	if(users != undefined && !users && errorMessage){
		errorMessage.innerHTML = numberOfUserValidationError;
		errorMessage.style.color='red';
		return false;
	}
	else{
		GoToNextPage();
	}
	
}
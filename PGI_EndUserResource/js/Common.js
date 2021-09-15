function parseResult(result){
	var response;
	var convertString = function(str){
		if(str){
			str = str.replace(/>/g, "&gt;");
			str = str.replace(/</g, "&lt;");
			str = str.replace(/(&quot\;)/g,'\\"');
			return str;
		} else {
			return str;
		}
	};
	if(typeof(result) === "string"){
		result = convertString(result);
		try{
			response = JSON.parse(result);                                                  
		}catch(err){
		}
	} else {
		result = JSON.stringify(result);
		result = convertString(result);
		response = JSON.parse(result);
	}
	return response;
}
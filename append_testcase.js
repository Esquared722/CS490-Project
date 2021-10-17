var i = 2;
function add_tc_entry() {
	var div = document.getElementById('testcases');
	var tc = "<div class=\"form-group\" id=\'tc" + i + "'>\n" +
		"<label class=\"control-label col-sm-2\">Testcase " + i + ":</label><br>" +	
		"<label class=\"control-label col-sm-2\">Input (func(...)):</label>" +
		"<div class=\"col-sm-2\">" +
		"<input type=\"text\" class=\"form-control\" name=\"test[]\" placeholder=\"fun(1,2)\">" +
		"</div>" +
		"<label class=\"control-label col-sm-2\">Expected Output:</label>" +
		"<div class=\"col-sm-2\">" +
		"<input type=\"text\" class=\"form-control\" name=\"expected[]\" placeholder=\"3\">" +
		"</div>" +
		"</div>"; 
	div.insertAdjacentHTML('beforeend', tc);
	i++;
}
var i = 2;
function add_tc_entry() {
	var div = document.getElementById('testcases');
	var tc = "<div id=\'tc" + i + "'>\n" +
		"Testcase " + i + ":<br />\n" +	
		"Input (func(...)): <input type=&quottext&quot name=&quot tc" + i + "[] />\n" +
		"<br />\n" +
		"Expected Output: <input type=text name=tc" + i + "[] />\n" +
		"<br />\n" +
		"Points: <input type=text name=tc" + i + "[] />\n"+
		"</div>"; 
	div.insertAdjacentHTML('beforeend', tc);
	i++;
}

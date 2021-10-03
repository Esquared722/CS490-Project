var re = new XMLHttpRequest();

window.onload = () => {
	re.onreadystatechange = load_exams_completed;
//	re.open("GET", 'get_exams_completed.php', true);
	re.send();
};
	
function load_exams_completed() {
	if(re.readyState == 4) {
		console.log(JSON.parse(re.responseText));
	}
}

var re = new XMLHttpRequest();

window.onload = () => {
	re.onreadystatechange = load_questions;
	re.open("POST", 'questions.php', true);
};
	
function load_questions() {
	if(re.readyState == 4) {
		console.log(JSON.parse(re.responseText));
	}
}


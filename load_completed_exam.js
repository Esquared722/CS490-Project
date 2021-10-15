const urlParams = new URLSearchParams(window.location.search);
var re = new XMLHttpRequest();

function get_exam_answers() {
	document.getElementById('exam_title').textContent = urlParams.get('title');
	re.readystatechange = load_exam_submission();
	re.open('GET', 'get_exam_submission.php', true);
	//re.send('eid=' + urlParams.get('eid') + '&uid=' + urlParams.get('uid'));
}

function load_exam_submission() {
	if (re.readyState === 4) {
		list_exam_submission(re.responseText);
	} else if(re.readyState === 1) {
		// Stand-in text
}

function list_exam_submission() {
	var submission table, question_title, 


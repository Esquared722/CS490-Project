var re = new XMLHttpRequest();
var question_list;
function get_exam() {
	// Creating Form Template for loading data
	

	// Getting GET parameter sent from client.html
	var eid = (() => {return new URLSearchParams(window.location.search);})().get('id');	
	document.getElementById('eid').value = eid; // setting hidden input

	// send GET for exam JSON
	re.onreadystatechange = load_exam_questions;
	re.open('GET', 'get_exam_questions.php?eid=' + eid, true);
	re.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	re.send();
};

// callback for loading exam JSON
function load_exam_questions() {
	if(re.readyState === 4) {
		list_exam_questions(JSON.parse(re.responseText));
	} else if(re.readState === 1) {
		// Stand-in text
	}
}

// Iterate through question data in JSON, and using form template to add form elements
function list_exam_questions(exam_json) {
	document.getElementById('exam_title').textContent = exam_json.title;
	question_list = document.getElementById('question_list');
	for (var i = 0; i < exam_json.questions.length; i++) {
		// Set Template
		var question = exam_json.questions[i],
		question_li_tree = document.createElement('li'),
		question_title = document.createElement('h3'),
		question_prompt = document.createElement('p'),
		question_answer = document.createElement('textarea'),
		question_id = document.createElement('input');	
		question_id.type = 'hidden';
		question_id.name = 'qid[]';
		question_answer.name = 'answer[]';

		// Fill Template
		question_id.value = question.qid;
		question_title.textContent = question.title + " (" + question.pts + 'pts)';
		question_prompt.textContent = question.prompt;
		question_answer.placeholder = "Input answer here...";
		question_answer.cols = 50;
		question_answer.rows = 5;

		// Generate List Item
		question_li_tree.appendChild(question_title);
		question_li_tree.appendChild(question_prompt);
		question_li_tree.appendChild(question_answer);
		question_li_tree.appendChild(question_id);
		question_list.appendChild(question_li_tree);
	}
}




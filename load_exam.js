var re = new XMLHttpRequest();
var question_list, 
    question_li_tree = document.createElement('li'),
	question_title = document.createElement('h3'),
	question_prompt = document.createElement('p'),
	question_answer = document.createElement('textarea'),
	question_id = document.createElement('input');

window.onload = () => {
	question_id.type = 'hidden';
	question_id.name = 'qid[]';
	question_answer.name = 'answer[]';
	question_li_tree.appendChild(question_title);
	question_li_tree.appendChild(question_prompt);
	question_li_tree.appendChild(question_answer);
	question_li_tree.appendChild(question_id);
	var eid = decodeURIComponent(window.location.search.substr(1).split('=')[1]);	
	document.getElementById('eid').value = eid;
	re.onreadystatechange = load_exam_questions;
	re.open('GET', 'get_exam_questions.php', true);
	re.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//re.send('eid=' + eid);
};

function load_exam_questions() {
	if(re.readyState === 4) {
		list_exam_questions(JSON.parse(re.responseText));
	} else if(re.readState === 1) {
		// Stand-in text
	}
}

function list_exam_questions(exam_json) {
	document.getElementById('exam_title').textContent = exam_json.title;
	question_list = document.getElementById('question_list');
	for (var i = 0; i < exam_json.questions.length; i++) {
		var question = exam_json.questions[i];
		question_id.value = question.qid;
		question_title.textContent = question.title;
		question_prompt.textContent = question.prompt;
		question_list.appendChild(question_li_tree);
	}
}




var re = new XMLHttpRequest();

window.onload = () => {
	re.onreadystatechange = load_questions;
	re.open("GET", 'questions.php', true);
//	re.send();
};

// loads_questions from DB as JSON
function load_questions() {
	if(re.readyState == 4) {
		list_questions(JSON.parse(re.responseText));
	}
}

// Lists Out Questions, separated by divs
function list_questions(questions_json) {
	var div = document.getElementById('question_list');
	for(var i = 0; i < questions_json.length; i++) {
		var question = questions_json[i],
			question_div = document.createElement('div'),
			p = document.createElement('p');
		p.textContent = "Title: " + question.title;
		question_div.appendChild(p);
		p.textContent = "Prompt: " + question.prompt;
		question_div.appendChild(p);
		p.textContent = "Testcase(s): ";
		question_div.appendChild(p);
		for (var j = 0; j < question.testcases.length; j++) {
			let testcase = question.testcases[j];
			p.textContent = "Testcase " + i + ":";
			question_div.appendChild(p);
			p.textContent = "Input:\n" + testcase.test;
			question_div.appendChild(p);
			p.textContent = "Expected Output: " + testcase.expected;
			question_div.appendChild(p);
			p.textContent = "Points: " + testcase.pts;
			question_div.appendChild(p);
		}
		div.appendChild(question_div);
	}
}


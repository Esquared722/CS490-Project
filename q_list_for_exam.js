var re = new XMLHttpRequest();
var div;
window.onload = () => {
	div = document.getElementById('question_list');
	re.onreadystatechange = load_questions;
	re.open("GET", 'get_questions.php', true);
	re.send();
};

// loads_questions from DB as JSON
function load_questions() {
	if(re.readyState == 4) {
		console.log(JSON.parse(re.responseText));;
		div.removeChild(div.childNodes[3]);
		list_questions(JSON.parse(re.responseText));
	} else if(re.readyState == 1) {
		div.appendChild(document.createTextNode("Loading Question Bank..."));
	}
}

// Lists Out Questions, separated by divs
function list_questions(questions_json) {
	for(var i = 0; i < questions_json.length; i++) {
		var question = questions_json[i],
			question_div = document.createElement('div'),
			title = document.createElement('h2'),

			checkbox = document.createElement('input'),
			points = document.createElement('input'),

			prompt = document.createElement('p'),
			testcase_header = document.createElement('h3'),
			testcase_list = document.createElement('ol');
		title.textContent = "Title: " + question.title;
		
		checkbox.type = 'checkbox';
		checkbox.value = question.qid;
		checkbox.id = 'q' + question.qid;
		checkbox.name = 'qid[]';
		question_div.appendChild(checkbox);

		var hidePts = function() {
			var ptsTxt = document.getElementById('p' + this.id.substring(1));
			if(!this.checked) {
				ptsTxt.style.visibility = 'hidden';
				ptsTxt.value = '';
			} else {	
				ptsTxt.style.visibility = 'visible';
			}
		};
		checkbox.addEventListener('click', hidePts);

		points.type = 'text';
		points.id = 'p' + question.qid;
		points.name = 'points[]';
		points.style.visibility = 'hidden';
		question_div.appendChild(points);


		question_div.appendChild(title);
		prompt.textContent = "Prompt: " + question.prompt;
		question_div.appendChild(prompt);
		testcase_header.textContent = "Testcase(s): ";
		question_div.appendChild(testcase_header);
		for (var j = 0; j < question.testcases.length; j++) {
			var testcase_li = document.createElement('li'),
			tc_input = document.createElement('p'),
			tc_expected = document.createElement('p'),
			testcase = question.testcases[j];
			tc_input.textContent = "Input:\n" + testcase.test;
			testcase_li.appendChild(tc_input);
			tc_expected.textContent = "Expected Output: " + testcase.expected;
			testcase_li.appendChild(tc_expected);
			testcase_list.appendChild(testcase_li);
		}
		question_div.appendChild(testcase_list);
		div.appendChild(question_div);
	}
}


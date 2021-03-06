var re = new XMLHttpRequest();
var div;
function get_questions() {
	div = document.getElementById('question_list');
	re.onreadystatechange = load_questions;
	re.open("GET", 'get_questions.php', true);
	re.send();
}

// loads_questions from DB as JSON
function load_questions() {
	if(re.readyState == 4) {
		list_questions(JSON.parse(re.responseText));
	}
}

// Lists Out Questions, separated by divs
function list_questions(questions_json) {
	for(var i = 0; i < questions_json.length; i++) {
		var question = questions_json[i],
			card_div = document.createElement('div'),
			head_div = document.createElement('div'),
			body_div = document.createElement('div'),
			title = document.createElement('h2'),
			attributes = document.createElement('p'),
			prompt = document.createElement('p'),
			question_constraints = document.createElement('p'),
			testcase_header = document.createElement('h3'),
			testcase_list = document.createElement('ol');
		card_div.className = "panel panel-default";
		card_div.style.width = "34rem"
		head_div.className = "panel-heading";
		body_div.className = "panel-body";
		title.textContent = "Title: " + question.title;
		attributes.innerHTML = "Topic: " + question.category + " &nbsp &nbsp &nbsp &nbsp Difficulty: " + question.difficulty; 
		head_div.appendChild(title);
		head_div.appendChild(attributes);
		card_div.appendChild(head_div);
		prompt.textContent = "Prompt: " + question.prompt;
		question_constraints.textContent = "Constraint: " + question.restriction;
		body_div.appendChild(prompt);
		body_div.appendChild(question_constraints);
		testcase_header.textContent = "Testcase(s): ";
		body_div.appendChild(testcase_header);
		for (var j = question.restriction === 'None' ? 1 : 2; j < question.testcases.length; j++) {
			var testcase_li = document.createElement('li'),
				tc_input = document.createElement('p'),
				tc_expected = document.createElement('p'),
				testcase = question.testcases[j];
			tc_input.textContent = "Input:\n" + testcase.input;
			testcase_li.appendChild(tc_input);
			tc_expected.textContent = "Expected Output: " + testcase.expected;
			testcase_li.appendChild(tc_expected);
			testcase_list.appendChild(testcase_li);
		}
		body_div.appendChild(testcase_list);
		card_div.appendChild(body_div);
		div.appendChild(card_div);
	}
}


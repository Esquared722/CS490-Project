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
		//console.log(JSON.parse(re.responseText));;
		list_questions(JSON.parse(re.responseText));
	}
}

// Lists Out Questions, separated by divs
function list_questions(questions_json) {
	for(var i = 0; i < questions_json.length; i++) {
		var question = questions_json[i],
			card_div = document.createElement('div'),
			question_div = document.createElement('div'),
			title = document.createElement('h2'),
			prompt = document.createElement('p'),
			testcase_header = document.createElement('h3'),
			testcase_list = document.createElement('ol');
		card_div.className = "card";
		question_div.className = "card-body";
		title.textContent = "Title: " + question.title;
		title.className = "card-title";
		question_div.appendChild(title);
		prompt.textContent = "Prompt: " + question.prompt;
		prompt.className = "card-text";
		question_div.appendChild(prompt);
		testcase_header.textContent = "Testcase(s): ";
		testcase_header.className = "card-title";
		question_div.appendChild(testcase_header);
		testcase_list.className = "list-group list-group-flush";
		for (var j = 0; j < question.testcases.length; j++) {
			var testcase_li = document.createElement('li'),
				tc_input = document.createElement('p'),
				tc_expected = document.createElement('p'),
				testcase = question.testcases[j];
			testcase_li.className = "list-group-item";
			tc_input.textContent = "Input:\n" + testcase.test;
			tc_input.className = "card-text";
			testcase_li.appendChild(tc_input);
			tc_expected.textContent = "Expected Output: " + testcase.expected;
			tc_expected.className = "card-text";
			testcase_li.appendChild(tc_expected);
			testcase_list.appendChild(testcase_li);
		}
		question_div.appendChild(testcase_list);
		card_div.appendChild(question_div)
		div.appendChild(card_div);
	}
}


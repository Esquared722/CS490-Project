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
			tabs_list = document.createElement('ul'),
			active_tab_li = document.createElement('li'),
			active_tab_a = document.createElement('a'),
			tcs_tab_li = document.createElement('li'),
			tcs_tab_a = document.createElement('a'),
			body_div = document.createElement('div'),
			tab_content_div = document.createElement('div'),
			prompt_div = document.createElement('div'),
			tcs_div = document.createElement('div'),
			title = document.createElement('h2'),
			attributes = document.createElement('p'),
			prompt = document.createElement('pre'),
			question_constraints = document.createElement('p'),
			testcase_list = document.createElement('ol');
		card_div.className = "panel panel-default";
		card_div.style.width = "36rem";
		tab_content_div.className = "tab-content";
		head_div.className = "panel-heading";
		tabs_list.className = "nav nav-tabs";
		active_tab_li.className = "active";
		active_tab_a.dataset.toggle = "tab";
		active_tab_a.href = "#q" + question.qid;
		active_tab_a.textContent = "Question";
		active_tab_li.appendChild(active_tab_a);
		tabs_list.appendChild(active_tab_li);
		tcs_tab_a.dataset.toggle = "tab";
		tcs_tab_a.href = "#tcs" + question.qid;
		tcs_tab_a.textContent = "Testcase(s)"
		tcs_tab_li.appendChild(tcs_tab_a);
		tabs_list.appendChild(tcs_tab_li);
		head_div.appendChild(tabs_list);
		card_div.appendChild(head_div);
		body_div.className = "panel-body";
		title.textContent = question.title;
		attributes.innerHTML = "Topic: " + question.category + " &nbsp &nbsp &nbsp &nbsp Difficulty: " + question.difficulty;
		prompt_div.className = "tab-pane fade in active";
		prompt_div.id = "q" + question.qid;
		prompt.textContent = question.prompt;
		question_constraints.textContent = "Constraint: " + question.restriction;
		prompt_div.appendChild(title);
		prompt_div.appendChild(attributes);
		prompt_div.appendChild(prompt);
		prompt_div.appendChild(question_constraints);
		tab_content_div.appendChild(prompt_div);
		tcs_div.className = "tab-pane fade";
		tcs_div.id = "tcs" + question.qid;
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
		tcs_div.appendChild(testcase_list);
		tab_content_div.appendChild(tcs_div);
		body_div.appendChild(tab_content_div);
		card_div.appendChild(body_div);
		div.appendChild(card_div);
	}
}


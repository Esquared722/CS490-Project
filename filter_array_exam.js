var re = new XMLHttpRequest();
function get_questions() {
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

function filter_question_list(q_list) {
    let category = document.getElementById('topic-list').value.toLowerCase(),
    difficulty = document.getElementById('difficulty-list').value.toLowerCase(),
    keyword = document.getElementById('search_bar').value.toLowerCase();

    const filtered_arr = q_list.filter((question) => {
        if((!keyword || question.title.toLowerCase().startsWith(keyword) || question.prompt.toLowerCase().includes(keyword)) 
	&& (!category || question.category.toLowerCase() === category) 
	&& (!difficulty || question.difficulty.toLowerCase() === difficulty))
            return question;
    });

    return filtered_arr;
}

function list_questions(question_list) {
    // List Questions with a given question_list (called on page load and filters)
    // Deletes div children for each listing

    let question_list_div = document.getElementById('question_list');
    while (question_list_div.firstChild) {
	    question_list_div.removeChild(question_list_div.firstChild);
    }
    filter_question_list(question_list).forEach(question_object => question_list_div.appendChild(
        create_question_div(question_object)
        )
    );
}

function create_question_div(question) {
    // Creates question div based on template
    let q_div = document.createElement('div'),
	add_button = document.createElement('input'),
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

    q_div.id = question.qid;
    add_button.type = "button";
    add_button.className = "btn btn-info";
    add_button.value = "Add";
    add_button.id = "button_" + question.qid;
    add_button.addEventListener('click', add_question);
    q_div.appendChild(add_button);

    card_div.className = "panel panel-default";
		card_div.style.width = "34rem";
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
	q_div.appendChild(card_div);
    return q_div;
}

var q_added_count = 0;
function add_question() {
    document.getElementById('send_question').disabled = false;
    q_added_count++;
    // disable add button
    this.disabled = true;
    let exam_q_list = document.getElementById('exam_question_list'),
	q_div = document.createElement('div'),
	q_form = document.createElement('div'),
	q_button_div = document.createElement('div'),
	q_remove_button = document.createElement('input'),
	q_qid = document.createElement('input'),
	q_pts_div = document.createElement('div'),
	q_pts_input = document.createElement('input');
    
    q_div.id = this.parentNode.id;
    q_form.className = "row";
    q_button_div.className = "col-sm-2";
    q_remove_button.type = "button";
    q_remove_button.className = "btn btn-info";
    q_remove_button.value = "Remove";
    q_remove_button.addEventListener('click', remove_question);
    q_button_div.appendChild(q_remove_button);
    q_qid.type = "hidden";
    q_qid.value = this.parentNode.id;
    q_qid.name = "qid[]";
    q_form.appendChild(q_button_div);
    q_form.appendChild(q_qid);

    q_pts_div.className = "col-sm-4";
    q_pts_input.type = "number";
    q_pts_input.min = 0;
    q_pts_input.className = "form-control form-control-lg";
    q_pts_input.name = "points[]";
    q_pts_input.required = true;
    q_pts_input.placeholder = "Enter Points Here";

    q_pts_div.appendChild(q_pts_input);
    q_form.appendChild(q_pts_div);
    q_div.appendChild(q_form);
    
    q_div.appendChild(this.parentNode.childNodes[1].cloneNode(true));
    exam_q_list.appendChild(q_div);
}


function remove_question() { 
    let exam_q_list = document.getElementById('exam_question_list'),
	q_div = this.parentNode.parentNode.parentNode;
    document.getElementById('button_' + q_div.id).disabled = false;
    exam_q_list.removeChild(q_div);
    if (--q_added_count == 0) 
	    document.getElementById('send_question').disabled = true;
}

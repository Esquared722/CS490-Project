var test_q_list = [
    {
        "qid": 1,
        "title": "sum(a, b, c)",
        "prompt": "Calculate the sum of three numbers, a, b, and c",
        "category": "Math",
        "difficulty": "medium",
        "constraint": "none",
        "total_pts": "20",
        "testcases":[
            {
                "input": "sum(1, 2, 3)",
                "expected": "6"
            },
            {
                "input": "sum(-1, -3, 4)",
                "expected": "0"
            }
        ]
    },
    {
        "qid": 2,
        "title": "factorial(n)",
        "prompt": "Calculate the nth factorial",
        "category": "recursion",
        "difficulty": "hard",
        "constraint": "recursion",
        "total_pts": "20",
        "testcases":[
            {
                "input": "factorial(1)",
                "expected": "1"
            },
            {
                "input": "factorial(4)",
                "expected": "24"
            }
        ]
    },
    {
        "qid": 3,
        "title": "factorial(n)",
        "prompt": "Calculate the nth factorial using a for-loop",
        "category": "Math",
        "difficulty": "medium",
        "constraint": "for",
        "total_pts": "20",
        "testcases":[
            {
                "input": "factorial(1)",
                "expected": "1"
            },
            {
                "input": "factorial(4)",
                "expected": "24"
            }
        ]
    }
];

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
    let category = document.getElementById('topic-list').value,
    difficulty = document.getElementById('difficulty-list').value;

    const filtered_arr = q_list.filter((question) => {
        if((!category || question.category.toLowerCase() === category.toLowerCase()) &&
            (!difficulty || question.difficulty.toLowerCase() === difficulty.toLowerCase()))
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
	q_panel = document.createElement('div'),
        panel_head = document.createElement('div'),
        panel_body = document.createElement('div'),
        question_title = document.createElement('h2'),
        question_attributes = document.createElement('p'),
        question_prompt = document.createElement('p'),
        question_constraints = document.createElement('p'),
        testcase_header = document.createElement('h3'),
        testcase_list = document.createElement('ol');

    q_div.id = question.qid;
    add_button.type = "button";
    add_button.className = "btn btn-info";
    add_button.value = "Add";
    add_button.id = "button_" + question.qid;
    add_button.addEventListener('click', add_question);
    q_div.appendChild(add_button);
    q_panel.className = "panel panel-default";
    q_panel.style.width = '34rem';

    panel_head.className = "panel-heading";
    question_title.textContent = "Title: " + question.title;
    question_attributes.innerHTML = "Topic: " + question.category + " &nbsp &nbsp &nbsp &nbsp Difficulty: " + question.difficulty;
    panel_head.appendChild(question_title);
    panel_head.appendChild(question_attributes);

    panel_body.className = "panel-body";
    question_prompt.textContent = "Prompt: " + question.prompt;
    question_constraints.textContent = "Constraint: " + question.constraint;
    testcase_header.textContent = "Testcase(s): ";
    panel_body.appendChild(question_prompt);
    panel_body.appendChild(question_constraints);
    panel_body.appendChild(testcase_header);
    
    for (var i = 0; i < question.testcases.length; i++) {
        let testcase_li = document.createElement('li'),
            testcase_input = document.createElement('p'),
            testcase_expected = document.createElement('p'),
            testcase = question.testcases[i];
        
        testcase_input.textContent = "Input: " + testcase.input;
        testcase_expected.textContent = "Expected Output: " + testcase.expected;
        testcase_li.appendChild(testcase_input);
        testcase_li.appendChild(testcase_expected);
        testcase_list.appendChild(testcase_li);
    }
    panel_body.appendChild(testcase_list);
    q_panel.appendChild(panel_head);
    q_panel.appendChild(panel_body);
    q_div.appendChild(q_panel);
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

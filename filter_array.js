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
   // question_list_div.childNodes.forEach(child => question_list_div.removeChild(child));
    filter_question_list(question_list).forEach(question_object => question_list_div.appendChild(
        create_question_div(question_object)
        )
    );
}

function create_question_div(question) {
    // Creates question div based on template
    let q_div = document.createElement('div'),
        panel_head = document.createElement('div'),
        panel_body = document.createElement('div'),
        question_title = document.createElement('h2'),
        question_attributes = document.createElement('p'),
        question_prompt = document.createElement('pre'),
        question_constraints = document.createElement('p'),
        testcase_header = document.createElement('h3'),
        testcase_list = document.createElement('ol');

    q_div.className = "panel panel-default";
    q_div.style.width = '34rem';

    panel_head.className = "panel-heading";
    question_title.textContent = "Title: " + question.title;
    question_attributes.innerHTML = "Topic: " + question.category + " &nbsp &nbsp &nbsp &nbsp Difficulty: " + question.difficulty;
    panel_head.appendChild(question_title);
    panel_head.appendChild(question_attributes);

    panel_body.className = "panel-body";
    question_prompt.textContent = "Prompt: " + question.prompt;
    question_constraints.textContent = "Constraint: " + question.restriction;
    testcase_header.textContent = "Testcase(s): ";
    panel_body.appendChild(question_prompt);
    panel_body.appendChild(question_constraints);
    panel_body.appendChild(testcase_header);
    
    for (var i = question.restriction == "None" ? 1 : 2; i < question.testcases.length; i++) {
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
    q_div.appendChild(panel_head);
    q_div.appendChild(panel_body);
    return q_div;
}

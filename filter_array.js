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
		//list_questions(JSON.parse(re.responseText));
		list_questions();
	}
}

function filter_question_list(q_list) {
    let category = '',
    difficulty = 'medium', // document.getElementById('difficulty')
    constraint = '';

    const filtered_arr = q_list.filter((question) => {
        if((!category || question.category === category) &&
            (!difficulty || question.difficulty === difficulty) &&
            (!constraint || question.constraint === constraint))
            return question;
    });

    return filtered_arr;
}

function list_questions(question_list) {
    // List Questions with a given question_list (called on page load and filters)
    // Deletes div children for each listing
    let question_list_div = document.getElementById('question_list');
    //question_list_div.childNodes.forEach(child => question_list_div.removeChild(child));
    filter_question_list(test_q_list).forEach(question_object => question_list_div.appendChild(
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
        question_prompt = document.createElement('p'),
        testcase_header = document.createElement('h3'),
        testcase_list = document.createElement('ol');

    q_div.className = "panel panel-default";
    q_div.style.width = '36rem';

    panel_head.className = "panel-heading";
    question_title.textContent = "Title: " + question.title;
    panel_head.appendChild(question_title);

    panel_body.className = "panel-body";
    question_prompt.textContent = "Prompt: " + question.prompt;
    testcase_header.textContent = "Testcase(s): ";
    panel_body.appendChild(question_prompt);
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
    q_div.appendChild(panel_head);
    q_div.appendChild(panel_body);
    return q_div;
}

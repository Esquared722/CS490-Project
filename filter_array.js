// Code for Filtering the Question List

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

    // console.log("filtered_arr:");
    // filtered_arr.forEach(question => console.log(question));
    // list_questions(filtered_arr)
    return filtered_arr;
}

function list_questions(question_list) {
    // List Questions with a given question_list (called on page load and filters)
    // Deletes div children for each listing
    let question_list_div = document.getElementById('q_list_div');
    question_list_div.childNodes.forEach(child => question_list_div.removeChild(child));
    filter_question_list(test_q_list).forEach(question_object => question_list_div.appendChild(
        create_question_div(question_object)
        )
    );
}

function create_question_div(question_object) {
    // Creates question div based on template
    let q_div = document.createElement('div');
    let p = document.createElement('p');
    p.textContent = question_object.title;
    q_div.appendChild(p);
    return q_div;
}

list_questions(test_q_list);

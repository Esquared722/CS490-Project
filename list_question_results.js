const urlParams = new URLSearchParams(window.location.search);
var re = new XMLHttpRequest();

// Send Request
function get_questions() {
	document.getElementById('exam_title').textContent = urlParams.get('title') + ": Questions";
	list_questions(test_json);
	re.onreadystatechange = load_questions;
	re.open("GET", "get_exam_student_questions.php?eid=" + urlParams.get('eid'), true);
	//re.send();
}

// Load Response Text
function load_questions() {
	if (re.readyState !== 4) return;
	list_questions(JSON.parse(re.responseText));
}

var test_json = [{qid: 1, title: "Test Q1", pts_earned: 10, pts_total: 10}, {qid: 2, title: "Test Q2", pts_earned: 5, pts_total: 10}];
// List Questions
function list_questions(questions_json) {
	var table = document.getElementById('question_grade_table');
	for (var i = 0; i < questions_json.length;) {
		var table_row = document.createElement('tr'),
		q_n = document.createElement('td'),
		q_title = document.createElement('a'),
		q_score = document.createElement('td');
		var question = questions_json[i];
		q_n.textContent = (++i) + '.';
		q_title.textContent = question.title;
		q_title.href = 'view_question_result.html?eid=' + urlParams.get('eid') + '&qid=' + question.qid;
		q_score.textContent = question.pts_earned + ' / ' + question.pts_total;
		table_row.appendChild(q_n);
		table_row.appendChild(q_title);
		table_row.appendChild(q_score);
		table.appendChild(table_row);
	}
	calc_grade();
}

function calc_grade() {
	var q_table = document.getElementById('question_grade_table');
	var grade, sum_earned = 0, grand_total = 0;

	for (var i = 1; i < q_table.childNodes.length; i++) {
		var values = q_table.childNodes[i].childNodes[2].textContent.split(' / ');
		sum_earned += parseInt(values[0]);
		grand_total += parseInt(values[1]);
	}
	grade = sum_earned / grand_total * 100;
	document.getElementById('total_grade').textContent = sum_earned + ' / ' + grand_total + ' = ' + grade + '%';
}


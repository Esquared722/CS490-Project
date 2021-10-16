const urlParams = new URLSearchParams(window.location.search);
var re = new XMLHttpRequest();

function get_exam_answer() {
	document.getElementById('qid').value = urlParams.get('qid');
	document.getElementById('uid').value = urlParams.get('uid');
	document.getElementById('eid').value = urlParams.get('eid');
	list_exam_submission(test_json);
	re.readystatechange = load_exam_submission();
	re.open('GET', 'get_exam_submission.php?eid=' + urlParams.get('eid') + '&uid=' + urlParams.get('uid') + '&qid=' + urlParams.get('qid'), true);
	//re.send();
}

function load_exam_submission() {
	if (re.readyState === 4) {
		list_exam_submission(re.responseText);
	} else if(re.readyState === 1) {
		// Stand-in text
	}
}
var test_json = {"title": "Final Exam", "student_name": "Eric", "question" : {"title": "diff(a, b)", "answer": "def diff(a, b):\n\treturn a - b;", "comment": "Great Job!", "points_earned": 10, "points_total": 10, "testcases": [{"input": "diff(3, 2)", "expected": "1", "output": "1", "result": true}, {"input": "diff(5, 1)", "expected": "4", "output": "4", "result": true}]}};
function list_exam_submission(eq_json) {
	document.getElementById('exam_title').textContent += eq_json.title;
	document.getElementById('q_title').textContent += eq_json.question.title;
	document.getElementById('student_name').textContent += eq_json.student_name;
	document.getElementById('grade').value = eq_json.question.points_earned;
	document.getElementById('grade').max = eq_json.question.points_total;
	document.getElementById('total_pts').value = eq_json.question.points_total;
	document.getElementById('answer').textContent = eq_json.question.answer;
	document.getElementById('comment').value = eq_json.question.comment;
	var tcs_table = document.getElementById('tcs_results');
	for (var i = 0; eq_json.question.testcases.length; i++) {
		var tc_expected = document.createElement('td'), tc_run = document.createElement('td'), tc_result = document.createElement('td');
		var tc_row = document.createElement('tr');
		const tc = eq_json.question.testcases[i];
		tc_expected.textContent = tc.input + ' → ' + tc.expected;
		tc_run.textContent = tc.output;
		tc_result.textContent = tc.result ? "Passed" : "Failed";

		tc_row.appendChild(tc_expected);
		tc_row.appendChild(tc_run);
		tc_row.appendChild(tc_result);
		tcs_table.appendChild(tc_row);
	}
}


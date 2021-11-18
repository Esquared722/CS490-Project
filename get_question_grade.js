const urlParams = new URLSearchParams(window.location.search);
var re = new XMLHttpRequest();

function get_exam_answer() {
	document.getElementById('back_button').addEventListener('click', () => {window.location = "view_exam_questions.html?title=" + encodeURIComponent(urlParams.get('title')) + "&eid=" + encodeURIComponent(urlParams.get('eid'));});
	//list_exam_submission(test_json);
	re.onreadystatechange = load_exam_submission;
	re.open('GET', 'get_exam_submission.php?eid=' + urlParams.get('eid') + '&uid=' + '&qid=' + urlParams.get('qid'), true);
	re.send();
}

function load_exam_submission() {
	if (re.readyState === 4) {
		list_exam_submission(JSON.parse(re.responseText));
	} else if(re.readyState === 1) {
		// Stand-in text
	}
}
var test_json = {"title": "Final Exam", "student_name": "Eric", "question" : {"title": "diff(a, b)", "answer": "def diff(a, b):\n\treturn a - b;", "comment": "Great Job!", "points_earned": 10, "points_total": 10, "testcases": [{"input": "diff(3, 2)", "expected": "1", "output": "1", "result": true}, {"input": "diff(5, 1)", "expected": "4", "output": "4", "result": true}]}};
function list_exam_submission(eq_json) {
	document.getElementById('exam_title').textContent += urlParams.get('title');
	document.getElementById('q_title').textContent += eq_json.title;
	document.getElementById('grade').textContent = eq_json.points_earned;
	document.getElementById('total_pts').textContent = eq_json.points_total;
	document.getElementById('answer').textContent = eq_json.answer;
	document.getElementById('comment').textContent = eq_json.comments,
	document.getElementById('difficulty').textContent = 'Difficulty: ' + eq_json.difficulty,
	document.getElementById('category').textContent = 'Category: ' + eq_json.category;

	var tcs_table = document.getElementById('tcs_results');
	for (var i = 0; eq_json.testcases.length; i++) {
		var tc_expected = document.createElement('td'), 
			tc_run = document.createElement('td'), 
			tc_result = document.createElement('td'), 
			tc_pts_earned_col = document.createElement('td'),
			tc_pts_total_col = document.createElement('td');
		var tc_row = document.createElement('tr');
		const tc = eq_json.testcases[i];
		if (i == 0) {
			tc_expected.textContent = 'Function Name';
		} else if (i == 1 && eq_json.restriction !== 'None') {
			tc_expected.textContent = 'Restriction: ' + eq_json.restriction;

		}
		if (eq_json.restriction !== 'None' && i < 2) {
			tc_run.textContent = '-';
		}else if(i > 0 && eq_json.restriction == 'None' || i > 1 && eq_json.restriction !== 'None'){
			tc_expected.textContent = tc.input + ' → ' + tc.expected;
			tc_run.textContent = tc.output;
		}
			tc_result.style.background = tc.result ? "green" : "red";
			tc_result.style.min_width = '22px';
			tc_pts_earned_col.textContent = tc.points_earned;
			tc_pts_total_col.textContent = tc.max_points;


		tc_row.appendChild(tc_expected);
		tc_row.appendChild(tc_run);
		tc_row.appendChild(tc_result);
		tc_row.appendChild(tc_pts_earned_col);
		tc_row.appendChild(tc_pts_total_col);
		tcs_table.appendChild(tc_row);
	}
}

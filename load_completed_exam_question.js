const urlParams = new URLSearchParams(window.location.search);
var re = new XMLHttpRequest();

function get_exam_answer() {
	document.getElementById('qid').value = urlParams.get('qid');
	document.getElementById('uid').value = urlParams.get('uid');
	document.getElementById('eid').value = urlParams.get('eid');
	document.getElementById('title').value = urlParams.get('title');
	document.getElementById('name').value = urlParams.get('name');
	//list_exam_submission(test_json);
	re.onreadystatechange = load_exam_submission;
	re.open('GET', 'get_exam_submission.php?eid=' + urlParams.get('eid') + '&uid=' + urlParams.get('uid') + '&qid=' + urlParams.get('qid'), true);
	re.send();
}

function load_exam_submission() {
	if (re.readyState === 4) {
		list_exam_submission(JSON.parse(re.responseText));
	} else if(re.readyState === 1) {
		// Stand-in text
	}
}

function list_exam_submission(eq_json) {
	document.getElementById('exam_title').textContent += urlParams.get('title');
	document.getElementById('q_title').textContent += eq_json.title;
	document.getElementById('student_name').textContent += eq_json.name;
	document.getElementById('grade').value = eq_json.points_earned;
	document.getElementById('grade').max = eq_json.points_total;
	document.getElementById('total_pts').value = eq_json.points_total;
	document.getElementById('answer').textContent = eq_json.answer;
	document.getElementById('comment').value = eq_json.comments;
	var tcs_table = document.getElementById('tcs_results');
	for (var i = 0; eq_json.testcases.length; i++) {
		var tc_expected = document.createElement('td'), tc_run = document.createElement('td'), tc_result = document.createElement('td');
		var tc_row = document.createElement('tr');
		const tc = eq_json.testcases[i];
		tc_expected.textContent = tc.input + ' → ' + tc.expected;
		tc_run.textContent = tc.output;
		tc_result.textContent = tc.result ? "Passed" : "Failed";

		tc_row.appendChild(tc_expected);
		tc_row.appendChild(tc_run);
		tc_row.appendChild(tc_result);
		tcs_table.appendChild(tc_row);
	}
}


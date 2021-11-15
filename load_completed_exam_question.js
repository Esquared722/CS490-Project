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
	document.getElementById('comment').value = eq_json.comments,
	document.getElementById('difficulty').textContent = 'Difficulty: ' + eq_json.difficulty,
	document.getElementById('category').textContent = 'Category: ' + eq_json.category;
	var tcs_table = document.getElementById('tcs_results');
	for (var i = 0; i < eq_json.testcases.length; i++) {
		var tc_expected = document.createElement('td'), 
			tc_run = document.createElement('td'), 
			tc_result = document.createElement('td'), 
			tc_pts_earned_col = document.createElement('td'),
			tc_pts_earned_input = document.createElement('input'),
			tc_pts_total_col = document.createElement('td'),
			tc_pts_total_input = document.createElement('input'),
			tcid_hidden_input = document.createElement('input');
		var tc_row = document.createElement('tr');
		const tc = eq_json.testcases[i];
		console.log(typeof(tc_expected));
		if (i == 0) {
			tc_expected.textContent = 'Function Name';
		} else if (i == 1 && tc.expected.indexOf('uses restriction') !== -1 && eq_json.restriction !== 'None') {
			tc_expected.textContent = 'Restriction: ' + eq_json.restriction;

		}
		if (i < 2) {
			tc_run.textContent = '-';
			tc_result.style.background = tc.result === '1' ? 'green' : 'red';
		} else {
			tc_expected.textContent = tc.input + ' → ' + tc.expected;
			tc_run.textContent = tc.output;
			tc_result.style.background = tc.result ? "green" : "red";
		}
			tc_pts_earned_input.type = "text";
			tc_pts_earned_input.name = "scores[]";
			tc_pts_earned_input.style.width = "5em";
			tc_pts_earned_input.value = tc.points_earned;
			tc_pts_earned_input.max = tc.max_points;

			tc_pts_total_input.type = "text";
			tc_pts_total_input.value = tc.max_points;
			tc_pts_total_input.disabled = true;
			tc_pts_total_input.style.width = "5em";

		tcid_hidden_input.type = "hidden";
		tcid_hidden_input.value = tc.tcid;
		tcid_hidden_input.name = "testcases[]";

		tc_pts_earned_col.appendChild(tc_pts_earned_input);
		tc_pts_total_col.appendChild(tc_pts_total_input);
		tc_row.appendChild(tc_expected);
		tc_row.appendChild(tc_run);
		tc_row.appendChild(tc_result);
		tc_row.appendChild(tc_pts_earned_col);
		tc_row.appendChild(tc_pts_total_col);
		tc_row.appendChild(tcid_hidden_input);
		tcs_table.appendChild(tc_row);
	}
}


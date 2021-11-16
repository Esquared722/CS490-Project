const urlParams = new URLSearchParams(window.location.search);
var re = new XMLHttpRequest();

// Send Request
function get_questions() {
	document.getElementById('exam_title').textContent = "Exam: " + urlParams.get('title');
	document.getElementById('student_name').textContent = "Student: " +  urlParams.get('name');
	re.onreadystatechange = load_questions;
	re.open("GET", "get_exam_student_questions.php?eid=" + urlParams.get('eid') + "&uid=" + urlParams.get('uid'), true);
	re.send();

	// Add Event Listener
	document.getElementById("back_button").addEventListener("click", () => {window.location = 'exam_students.html?eid=' + urlParams.get('eid') + '&title=' + urlParams.get('title');
	});
}

// Load Response Text
function load_questions() {
	if (re.readyState != 4) return;
	list_questions(JSON.parse(re.responseText));
}

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
		q_title.href = 'grade_exam_question.html?eid=' + urlParams.get('eid') + '&name=' + encodeURIComponent(urlParams.get('name')) + '&uid=' + urlParams.get('uid') + '&qid=' + question.qid + "&title=" + encodeURIComponent(urlParams.get('title'));
		q_score.textContent = question.pts_earned ? question.pts_earned + ' / ' + question.pts_total : "UNGRADED";
		table_row.appendChild(q_n);
		table_row.appendChild(q_title);
		table_row.appendChild(q_score);
		table.appendChild(table_row);
	}
	calc_grade();
}

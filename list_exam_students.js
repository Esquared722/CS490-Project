var re = new XMLHttpRequest();
const urlParams = new URLSearchParams(window.location.search);
var students_table, table_row, student_name, grade, n, completion_status;
function get_students() {
	const eid = urlParams.get('eid');
	re.onreadystatechange = load_students;
	//list_students(test_json);
	re.open('GET', 'get_exam_students.php?eid=' + eid);
	re.send();

	// add Event Listeners
	document.getElementById('auto_grade_button').addEventListener("click", () => {
	re.open("GET", "auto_grade.php?eid=" + urlParams.get('eid'));
	re.onreadystatechange = load_grades;
	re.send();
	});
	document.getElementById('release_button').addEventListener("click", () => {
	re.onreadystatechange = release_grades;
	re.open("GET", "release_exam.php?eid=" + urlParams.get('eid'), true);
	re.send()
	});
}

function load_students() {
	if (re.readyState === 4) {
		list_students(JSON.parse(re.responseText));
	}
}
//var test_json = [{uid: 1, name: 'Eric', completed: true, grade: 75}, {uid:2,name:'Richard', completed: false, grade: 'UNGRADED'}]
function list_students(students_json) {
	const eid = urlParams.get('eid');
	document.getElementById('exam_title').textContent = urlParams.get('title');
	students_table = document.getElementById('students_table');
	for (var i = 0; i < students_json.length; i++) {
		table_row = document.createElement('tr');
		n = document.createElement('span');
		n.textContent = (i + 1) + '.';
		table_row.appendChild(n);
		student_name = document.createElement('td');
		completion_status = document.createElement('td');
		grade = document.createElement('td');
		const student = students_json[i];
		if (student.completed) {
			var a_tag = document.createElement('a');
			a_tag.textContent = student.name;
			a_tag.href = "exam_student_questions.html?uid=" + student.uid + '&eid=' + eid + '&name=' + encodeURIComponent(student.name) + "&title=" + encodeURIComponent(urlParams.get('title'));
			student_name.appendChild(a_tag);
			completion_status.innerHTML = "&#10003";
		} else {
		student_name.textContent = student.name;
		completion_status.innerHTML = "&#10060";
		}
		typeof student.grade == "Number" ? grade.appendChild(document.createTextNode(student.grade + '%')) : grade.appendChild(document.createTextNode('UNGRADED'));
		table_row.appendChild(student_name);
		table_row.appendChild(completion_status);
		table_row.appendChild(grade);
		students_table.appendChild(table_row);

	}
}

function load_grades() {
	if (re.readyState !== 4) return;
	update_grades(JSON.parse(re.responseText));
}

function update_grades(grade_json) {
	student_table = document.getElementById("students_table");
	for (var i = 2; i < student_table.childNodes.length; i++) {
		var tr = student_table.childNodes[i],
			grade = tr.childNodes[2],
			name = tr.childNodes[1].textContent;
		grade.textContent = grade_json[name] + "%";
	}
}

function release_grades() {
	if (re.readyState !== 4) return;
	window.location = "exams.html";
}

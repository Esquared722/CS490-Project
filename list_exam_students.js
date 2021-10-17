var re = new XMLHttpRequest();
const urlParams = new URLSearchParams(window.location.search);
var students_table, table_row, student_name, grade;
function get_students() {
	const eid = urlParams.get('eid');
	re.readystatechange = load_students;
	list_students(test_json);
	re.open('GET', 'get_exam_students.php?eid=' + eid);
	//re.send();
}

function load_students(eid) {
	if (re.readyState === 4) {
		list_students(JSON.parse(re.responseText));
	}
}
var test_json = [{uid: 1, name: 'Eric', completed: true, grade: 75}, {uid:2,name:'Richard', completed: false, grade: 'UNGRADED'}]
function list_students(students_json) {
	const eid = urlParams.get('eid');
	document.getElementById('exam_title').textContent = urlParams.get('title');
	students_table = document.getElementById('students_table');
	for (var i = 0; i < students_json.length; i++) {
		table_row = document.createElement('tr');
		student_name = document.createElement('td');
		grade = document.createElement('td');
		const student = students_json[i];
		if (student.completed) {
			var a_tag = document.createElement('a');
			a_tag.textContent = student.name;
			a_tag.href = "exam_student_questions.html?uid=" + student.uid + '&eid=' + eid + '&name=' + encodeURIComponent(student.name);
			student_name.appendChild(a_tag);
		} else {
		student_name.textContent = student.name;
		}
		grade.appendChild(document.createTextNode('Grade: ' + student.grade + '%'));
		table_row.appendChild(student_name);
		table_row.appendChild(grade);
		students_table.appendChild(table_row);

	}
}

document.getElementById('auto_grade_button').addEventListener("click", () => {
	re.open("GET", "auto_grade.php?eid=" + urlParams.get('eid'));
	re.onreadystatechange = load_grades;
	re.send();
});

function load_grades() {
	if (re.readyState !== 4) return;
	update_grades(JSON.parse(re.responseText));
}

function update_grades(grade_json) {
	for (var i = 1; i < student_table.childNodes.length; i++) {
		var tr = student_table.childNodes[i],
			grade = tr.childNodes[1];
		grade.textContent = grade_json[tr.childNodes[0].textContent] + "%";
	}
}

document.getElementById('release_button').addEventListener("click", () => {
	re.open("GET", "release_exam.php", true);
	re.send()
});

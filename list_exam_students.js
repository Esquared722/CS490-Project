var re = new XMLHttpRequest();
var students_table, table_row, student_name, grade;
function get_students(eid) {
	re.readystatechange = (eid) => load_students;
	list_students(eid, test_json);
	re.open('GET', 'get_exam_students.php?eid=' + eid);
	//re.send();
}

function load_students(eid) {
	if (re.readyState === 4) {
		list_students(eid, JSON.parse(re.responseText));
	}
}
var test_json = [{uid: 1, name: 'Eric', completed: true, grade: 75}, {uid:2,name:'Richard', completed: false, grade: 'UNGRADED'}]
function list_students(eid, students_json) {
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

var re = new XMLHttpRequest();
var students_table, table_row, name, grade;
function get_students(eid) {
	re.readystatechange = (eid) => load_students;
	re.open('GET', 'get_exam_students.php');
	//re.send('eid=' + eid);
}

function load_students(eid) {
	if (re.readyState === 4) {
		list_students(eid, JSON.parse(re.responseText));
	}
}

function list_students(eid, students_json) {
	students_table = document.getElementById('students_table');
	for (var i = 0; i < students_json.students.length; i++) {
		table_row = document.createElement('tr');
		name = document.createElement('td');
		grade = document.createElement('td');
		const student = students_json.students[i];
		var a_tag = document.createElement('a');
		a_tag.textContent = student.name;
		a_tag.href = student_completed ? "grade_exam.html?" + encodeURIComponent('uid=' + student.uid + '&eid=' + eid) : '';
		name.appendChild(a_tag);
		grade.appendChild(document.createTextNode('Grade: ' + student.grade));
		table_row.appendChild(name);
		table_row.appendChild(grade);
		students_table.appendChild(table_row);
	}
}

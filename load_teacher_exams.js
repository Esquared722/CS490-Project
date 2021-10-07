var re = new XMLHttpRequest(),
	completed_exams_div,
	made_exams_div;
function load_teacher_exams() {
	load_made_exams();
}

function load_made_exams() {
	made_exams_div = document.getElementById('made_exams');
	re.open('GET', 'get_made_exams.php', true);
	re.onreadystatechange = () => {
		if (re.readyState == 4) {
			list_made_exams(JSON.parse(re.responseText));
			load_completed_exams();
		}
	};
	//re.send();
}

function list_made_exams(exams_json) {
	for (var i = 0; i < exams_json.length; i++) {
		var exam = exams_json[i];
		made_exams_div.appendChild(document.createTextNode(exam.title));
		made_exams_div.appendChild(document.createElement('br'));
		made_exams.div.appendChild(document.createElement('br'));
	}
}

function load_completed_exams() {
	completed_exams_div = document.getElementById('completed_exams');
	re.open('GET', 'get_completed_exams.php', true);
	re.onreadystatechange = () => {
		if (re.readyState == 4) {
			list_completed_exams(JSON.parse(re.responseText));
		}
	};
	//re.send();
}

function list_completed_exams(exams_json) {
	for(var i = 0; i < exams_json.length; i++) {
		var exam = exams_json[i];
		var a_tag = document.createElement('a');
		a_tag.textContent = exam.title + " - " + exam.student.name;
		var href = "grade_exam.html?" + 
			encodeURIComponent("uid=" + exam.student.id + 
				"&eid=" + exam.id);
		a_tag.href = href;

	}
}

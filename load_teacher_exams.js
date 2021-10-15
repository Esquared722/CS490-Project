var re = new XMLHttpRequest();
var in_progress_exams_div,
	released_exams_div;

function load_teacher_exams() {
	load_exams();
}

function load_exams() {
	in_progress_exams_div = document.getElementById('in_progress_exams');
	released_exams_div = document.getElementById('released_exams');
	re.open('GET', 'get_exams.php', true);
	re.onreadystatechange = () => {
		if (re.readyState == 4) {
			list_exams(JSON.parse(re.responseText));
		}
	};
	re.send();
}

function list_exams(exams_json) {
	for (var i = 0; i < exams_json.length; i++) {
		var exam = exams_json[i];
		var div = exam.released ? released_exams_div : in_progress_exams_div
		var child;
		if (exam.released) {
			child = document.createTextNode(exam.title);
		} else {
			var a_tag = document.createElement('a');
			a_tag.textContent = exam.title;
			var href = "exam_students.html?" + 
				encodeURIComponent("eid=" + exam.id + 
				"&title=" + exam.title);
			a_tag.href = href;
			child = a_tag;
		}
		div.appendChild(child);
		div.appendChild(document.createElement('br'));
		div.appendChild(document.createElement('br'));
	}
}

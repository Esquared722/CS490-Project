var re = new XMLHttpRequest();
function load_student_exams() {
	re.open('GET', 'get_student_exams.php', true);
	re.onreadystatechange = list_exam_hrefs;
	re.send();
}

function list_exam_hrefs() {
	if (re.readyState == 4) {
		var json_exams = JSON.parse(re.responseText),
		div = document.getElementById('exam_list');
		for (var i = 0; i < json_exams.length; i++) {
			var exam = json_exams[i];
			div.appendChild((() => {
  				var exam_link = document.createElement('a');
  				exam_link.textContent = exam.title;
				if (exam.released === "1") {
					exam_link.textContent += ": Graded";
					exam_link.href = 'exam_results.html?id=' + exam.EID;
				} else if (!exam.completed) {
					exam_link.textContent += ": TODO";
					exam_link.href ='exam.html?id=' + exam.EID;
				}
  			return exam_link;
			})());
			div.appendChild(document.createElement('br'));
		}
	}
}

var re = new XMLHttpRequest();
function load_student_exams() {
	re.open('GET', 'get_student_exams.php', true);
	re.onreadystatechange = list_exam_hrefs;
	re.send();
}

function list_exam_hrefs() {
	if (re.readyState === 4) {
		var json_exams = JSON.parse(re.responseText);
		for (var i = 0; i < json_exams.length; i++) {
			var exam = json_exams[i];
			var div; 			
			if (exam.released) {
				div = document.getElementById('graded_exams');
			} else if(!exam.completed) {
				div = document.getElementById('not_completed_exams');
			} else {
				continue;
			}
			div.appendChild((() => {
  				var exam_link = document.createElement('a');
  				exam_link.textContent = exam.title;
				if (exam.released) {
					exam_link.href = 'view_exam_questions.html?eid=' + exam.EID + "&title=" + encodeURIComponent(exam.title);
					exam_link.textContent += " Grade:  " + exam.grade + "%"; 
				} else if (!exam.completed) {
					exam_link.href ='exam.html?id=' + exam.EID;
				}
  			return exam_link;
			})());
			div.appendChild(document.createElement('br'));
		}
	}
}


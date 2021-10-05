var re = new XMLHttpRequest();
window.onload = () => {
	re.open('GET', 'get_student_exams.php', true);
	re.onreadystatechange = list_exam_hrefs;
//	re.send();
};

function list_exam_hrefs() {
	if (re.readystate == 4) {
		json_exams = JSON.parse(re.responseText);
		var div = document.getElementById('exam_list');
		for (var i = 0; i < json_exams.length; i++) {
			var exam = json_exams[i];
			div.appendChild((() => {
  				var exam_link = document.createElement('a');
  				exam_link.textContent = exam.title;
  				exam_link.href = exam.graded ? 'exam.html?id=' + exam.id + 'graded=true' : 'exam.html?id=' + exam.id;
  			return exam_link;
			})());
		}
	}
}

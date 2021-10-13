function calc_grade() {
	var q_table = document.getElementById('question_grade_table');
	var grade, sum_earned = 0, grand_total = 0;

	for (var i = 1; i < q_table.childNodes.length; i++) {
		var values = q_table.childNodes[i].childNodes[2].textContent.split(' / ');
		sum_earned += parseInt(values[0]);
		grand_total += parseInt(values[1]);
	}
	grade = sum_earned / grand_total * 100;
	document.getElementById('grade_input').value = grade;
	document.getElementById('total_grade').textContent = sum_earned + ' / ' + grand_total + ' = ' + grade + '%';
}

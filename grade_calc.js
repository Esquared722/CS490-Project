function calc_grade() {
	var q_table = document.getElementById('question_grade_table');
	var grade, sum_earned = 0.0, grand_total = 0.0;

	for (var i = 2; i < q_table.childNodes.length; i++) {
		if (q_table.childNodes[i].childNodes[2].textContent == "UNGRADED") return;
		var values = q_table.childNodes[i].childNodes[2].textContent.split(' / ');
		sum_earned += parseFloat(values[0]);
		grand_total += parseFloat(values[1]);
	}
	grade = sum_earned / grand_total * 100;
	document.getElementById('total_grade').textContent += sum_earned + ' / ' + grand_total + ' = ' + grade + '%';
}

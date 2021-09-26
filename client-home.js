window.onload = () => {
	xhr = new XMLHttpRequest();
	xhr.open('GET', 'session.php', true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=(e)=>{
		if (xhr.readyState == 4 && xhr.status == 200) {
			const resp_obj = JSON.parse(xhr.responseText);
			if(resp_obj.user_name) {
				session_callback(resp_obj);
			} else {
				window.location = 'login.html'
			}
		}
	};
	xhr.send();
};
function session_callback(obj) {
	document.getElementById("header-fill").innerHTML = obj.user_name;
}

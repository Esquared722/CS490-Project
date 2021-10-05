function logout() {
	// destroy session
	window.location = "login.html"
}

function check_session(callback) {
	xhr = new XMLHttpRequest();
	xhr.open('GET', 'session.php', true);
	xhr.onreadystatechange=(e)=>{
		if (xhr.readyState == 4 && xhr.status == 200) {
			const resp_obj = JSON.parse(xhr.responseText);
			if(resp_obj.user_name) {
				if (typeof callback === "undefined") return
				callback(resp_obj);
			} else {
				window.location.replace = 'login.html';
			}
		}
	};
	xhr.send();
}

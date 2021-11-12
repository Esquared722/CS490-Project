function logout() {
	// destroy session
	window.location = "index.html"
}

function check_session(callback, role) {
	xhr = new XMLHttpRequest();
	xhr.open('GET', 'session.php', true);
	xhr.onreadystatechange=(e)=>{
		if (xhr.readyState == 4 && xhr.status == 200) {
			const resp_obj = JSON.parse(xhr.responseText);
			if(resp_obj.user_name && resp_obj.role === role) {
				if (typeof callback === "undefined") return
				callback(resp_obj);
			} else {
				window.location = 'index.html';
			}
		}
	};
	xhr.send();
}

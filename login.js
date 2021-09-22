// Login Script


function login(raw_data) {
	const data = raw_data.trim();
    	if(data == 'Invalid Credentials') { 
        } else if (data == 'client') {
		window.location = 'client.html';
        } else if (data == 'admin') {
		window.location = 'admin.html';
	}
}

function validate() {
	const user = encodeURIComponent(document.getElementById('user').value);
	const passwd = encodeURIComponent(document.getElementById('passwd').value);
	let xhr = new XMLHttpRequest();
	const payload = "user=" + user + "&passwd=" + passwd;
	xhr.open("POST", "login.php", true);
    	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=(e)=>{
	if (xhr.readyState == 4 && xhr.status == 200) {
	    login(xhr.responseText); 
	}
    	};
	xhr.send(payload);
}

window.onload = () => {
const submit = document.getElementById('login_button');
submit.addEventListener('click', validate, false);
};

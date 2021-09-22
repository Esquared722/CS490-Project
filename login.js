// Login Script


function login(raw_data) {
	const data = raw_data.trim();
    	if(data == 'Invalid Credentials') {
		document.getElementById('invalid').innerHTML = 'INVALID CREDENTIALS'
		document.getElementById('user').disabled = false;
		document.getElementById('passwd').disabled = false;
		document.getElementById('login_button').disabled = false;
        } else if (data == 'client') {
		window.location = 'client.html';
        } else if (data == 'admin') {
		window.location = 'admin.html';
	}
}

function validate() {
	const user = encodeURIComponent(document.getElementById('user').value);
	document.getElementById('user').disabled = true;
	const passwd = encodeURIComponent(document.getElementById('passwd').value);
	document.getElementById('passwd').disabled = true;
	document.getElementById('login_button').disabled = true;
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

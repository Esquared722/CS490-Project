// Login Script


function login(raw_data) {
	//alert(data)
	let data = raw_data.trim();
    	if(data == 'Invalid Credentials') {
		window.location.replace('login.html'); 
        } else if (data == 'client') {
		window.location.replace('client.html');
        } else if (data == 'admin') {
		window.location.replace('admin.html');
	}
}

function validate(callback) {
	let user = encodeURIComponent(document.getElementById('user').value);
	let passwd = encodeURIComponent(document.getElementById('passwd').value);
	let xhr = new XMLHttpRequest();
	let payload = "user=" + user + "&passwd=" + passwd;
	xhr.open("POST", "login.php", true);
    	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=(e)=>{
	if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.responseText);
	}
    	};
	xhr.send(payload);
}



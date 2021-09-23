			window.onload = () => {
				xhr = new XMLHttpRequest();
				xhr.open('GET', 'session.php', true);
				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhr.onreadystatechange=(e)=>{
				if (xhr.readyState == 4 && xhr.status == 200) {
	    				session_callback(xhr.responseText); 
				}
    				};
				xhr.send();
			};
			function session_callback(json) {
				const myObj = JSON.parse(json);
  				document.getElementById("header-fill").innerHTML = myObj.user_name;
			}

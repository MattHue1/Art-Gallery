async function login() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    let userInfo = {"username": user, "password": pass};

    const res = await fetch("/user", {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    })

    document.getElementById('formErrors').innerHTML = "";
    document.getElementById('formErrors').classList.remove('hide');

    let data = await res.json()
    if(res.ok){
        alert("Login succefully!");
        window.location.href = "/user";
    }else{
        if(data.login){
                alert("You are currently login");
        }else{
            if(!data.uValid){
                document.getElementById('formErrors').innerHTML += "Username does not exist!!";
                document.getElementById("user").classList.add('error');
            }

            if(!data.pValid){
                document.getElementById('formErrors').innerHTML += "Password does not exist!!";
                document.getElementById("pass").classList.add('error');
            }
        }
    }
}
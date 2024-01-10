async function newAcc() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    let userInfo = {"username": user, "password": pass};

    const res = await fetch("/user", {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    })

    document.getElementById('formErrors').innerHTML = "";
    document.getElementById('formErrors').classList.remove('hide');

    if(res.ok){
        let data = await res.json()
        alert("New account created succefully!");
        window.location.href = "/user";
    }else{
        let text = await res.text();
        document.getElementById('formErrors').innerHTML += text;
        document.getElementById("user").classList.add('error');
    }
}
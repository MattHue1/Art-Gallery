async function add(){
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let cost = document.getElementById("cost").value;
    let description = document.getElementById("description").value;
    document.getElementById("name").value = '';
    document.getElementById("age").value = '';
    document.getElementById("cost").value = '';
    document.getElementById("description").value = '';
    let valid = true;
    let dig = /[0-9]/;

    document.getElementById("formErrors").innerHTML = "";
    document.getElementById("age").classList.remove('error');
    document.getElementById("cost").classList.remove('error');

    if(!dig.test(age)){
      document.getElementById("age").classList.add('error');
      document.getElementById("formErrors").innerHTML += "Age is not a numeber!!"
      valid = false;
   }
   if(!dig.test(cost)){
      document.getElementById("cost").classList.add('error');
      document.getElementById("formErrors").innerHTML += "Cost is not a numeber!!"
      valid = false;
   }


    if(valid){
        //User imfo
        let data = {"name": name, "age": parseFloat(age), "cost": parseFloat(cost),"description": description}
        const res = await fetch("/workshop", {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if(res.ok){
            console.log("successful")
            alert("The workshop have been created successfully!");
            let url = `/workshop`;
            window.location.href = url
        }else{
            let text = await res.text();
            alert(text);
        }
    }else{
        alert("Please enter a valid input!!");
    }
}
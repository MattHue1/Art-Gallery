async function enroll(){
    let currentURL = new URL(window.location.href);
    let workshopID = currentURL.pathname.toString().split("/") ;

    //User imfo
    let data = {"workshop": workshopID[2]}
    const res = await fetch("/workshop", {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if(res.ok){
        console.log("successful")
        alert("You have enroll successfully!");
        window.location.href = window.location.href;
    }else{
        let text = await res.text();
        alert(text);
    }

}
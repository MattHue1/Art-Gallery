async function submit(){
    let content = document.getElementById("review").value;
    document.getElementById("review").value = '';

    let currentURL = new URL(window.location.href);
    let artID = currentURL.pathname.toString().split("/") ;
    console.log(artID[2])

    //User imfo
    let data = {"content": content, "art": artID[2]}
    const res = await fetch("/review", {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    

    if(res.ok){
        alert("The review have been submitted successfully!");
        window.location.href = window.location.href;
    }else{
        let text = await res.text();
        alert(text);
    }

}

async function like(){
    let currentURL = new URL(window.location.href);
    let artID = currentURL.pathname.toString().split("/") ;
    console.log(artID[2])

    //User imfo
    let data = {"art": artID[2]}
    const res = await fetch("/like", {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    console.log(res.body)
    if(res.ok){
        alert("The like have been submitted successfully!");
        window.location.href = window.location.href;
    }else{
        let text = await res.text();
        alert(text);
    }

}
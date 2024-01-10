async function follow(){
    let currentURL = new URL(window.location.href);
    let artistID = currentURL.pathname.toString().split("/") ;
    console.log(artistID[2])

    //User imfo
    let data = {"artist": artistID[2]}
    const res = await fetch("/follow", {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    console.log(res.body)
    if(res.ok){
        console.log("successful")
        alert("You have succefully followed the artist!");
    }else{
        let text = await res.text();
        alert(text);
    }

}
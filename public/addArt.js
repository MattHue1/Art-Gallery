function displayArt(){
    let result = "<div class = 'products'>";
    let art = document.getElementById("poster").value;
    let title = document.getElementById("title").value;
    result += `<img src="${art}" alt="${title}" width = 500 vw>`
    result += "</div>";
    document.getElementById("result").innerHTML = result;
}

async function submit(){
    let title = document.getElementById("title").value;
    let year = document.getElementById("year").value;
    let category = document.getElementById("category").value;
    let medium = document.getElementById("medium").value;
    let description = document.getElementById("description").value;
    let poster = document.getElementById("poster").value;
    document.getElementById("title").value = '';
    document.getElementById("year").value = '';
    document.getElementById("category").value = '';
    document.getElementById("medium").value = '';
    document.getElementById("description").value = '';
    document.getElementById("poster").value = '';

    //User imfo
    let data = {"Title": title, "Year": year, "Category": category, "Medium": medium, "Description": description, "Poster": poster}
    const res = await fetch("/gallery", {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if(res.ok){
        console.log("successful")
        alert("The art have been submitted successfully!");
        let id = await res.text();
        let url = `/gallery`;
        window.location.href = url
    }else{
        let text = await res.text();
        alert(text);
    }

}
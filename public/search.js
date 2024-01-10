let data = {"search": {}};
async function searchArt(page){
    let title = document.getElementById("title").value;
    let artist = document.getElementById("artist").value;
    let category = document.getElementById("category").value;
    let medium = document.getElementById("medium").value;
    document.getElementById("title").value = '';
    document.getElementById("artist").value = '';
    document.getElementById("category").value = '';
    document.getElementById("medium").value = '';
    let temp = {};


    data.type= "art";
    if(title != ""){
        temp["Title"] = title;
        data.search = temp;
    }
    if(artist != ""){
        temp["Artist"] = artist;
        data.search = temp;
    }
    if(category != ""){
        temp["Category"] = category;
        data.search = temp;
    }
    if(medium != ""){
        temp["Medium"] = medium;
        data.search = temp;
    }
    
    //User imfo
    const res = await fetch("/search"+`?page=${page}`, {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    let arts = await res.json();
    console.log(arts);
    if(res.ok){
        let result = "";
        for(let i = 0; i< arts.length; i++){
            result += "<div class = 'products'>"
            result += `<h3>${arts[i].Title}</h3>`
            result += `<a href="/gallery/${arts[i]._id}"><img src="${arts[i].Poster}" alt="${arts[i].Title}" width = 500 vw></a>`
            result += "</div>";
        }
        result += page == 0 ? " ": `<div class="button1"><button id="last" type="button" onclick="searchArt(${page-1})">Last Page</button></div>`;
        result+= `<div class="button1"><button id="next" type="button" onclick="searchArt(${page+1})">Next Page</button></div>`
        result += `<h1>Page number: ${page}</h1>`
        document.getElementById("result").innerHTML = result;
    }else{
        alert("The search for artwork has failed!\nPlease try again!");
    }
}
async function searchWorkshop(page){
    let artistW = document.getElementById("artistW").value;
    let age = document.getElementById("age").value;
    let cost = document.getElementById("cost").value;
    let name = document.getElementById("name").value;
    document.getElementById("name").value = '';
    document.getElementById("artistW").value = '';
    document.getElementById("age").value = '';
    document.getElementById("cost").value = '';
    let temp = {}

    data.type= "workshop";
    if(name != ""){
        temp["name"] = name;
        data.search = temp;
    }
    if(artistW != ""){
        temp["artist"] = artistW;
        data.search = temp;
    }
    if(age != ""){
        temp["age"] = {$gt: parseFloat(age)};
        data.search = temp;
    }
    if(cost != ""){
        temp["cost"] = {$gt: parseFloat(cost)};
        data.search = temp;
    }
    console.log(data)

    //User imfo
    const res = await fetch("/search"+`?page=${page}`, {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    let workshop = await res.json();
    console.log(workshop);
    if(res.ok){
        let result = "";
        for(let i = 0; i< workshop.length; i++){
            result += "<div class = 'products'>"
            result += `<div class = 'link'><a href="/workshop/${workshop[i]._id}">${workshop[i].name}</a></div>`
            result += "</div>";
        }
        result += page == 0 ? " ": `<div class="button1"><button id="last" type="button" onclick="searchWorkshop(${page-1})">Last Page</button></div>`;
        result+= `<div class="button1"><button id="next" type="button" onclick="searchWorkshop(${page+1})">Next Page</button></div>`
        result += `<h1>Page number: ${page}</h1>`
        document.getElementById("result").innerHTML = result;
    }else{
        alert("The search for workshop has failed!\nPlease try again!");
    }
}


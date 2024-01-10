async function remove(id){
    console.log(id);
    let data = {"id": id};
    const res = await fetch("/review", {  
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if(res.ok){
        alert("Review have been deleted");

        //Reload page
        window.location.href = window.location.href;
    }else{
        alert("Review failed to be deleted!!\n Please try again");
    }

}

async function unfollow(id){
    console.log(id);
    let data = {"id": id};
    const res = await fetch("/follow", {  
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    if(res.ok){
        alert("Artist have been unfollowed!");

        //Reload page
        window.location.href = window.location.href;
    }else{
        alert("Failed to unfollowed artist!\n Please try again");
    }

}

async function unlike(id){
    console.log(id);
    let data = {"id": id};
    const res = await fetch("/like", {  
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    if(res.ok){
        alert("Like have been removed!");

        //Reload page
        window.location.href = window.location.href;
    }else{
        alert("Failed to remove like!\n Please try again");
    }

}

async function change(){
    let data = {};
    const res = await fetch("/user/change", {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if(res.ok){
        alert("Account type have been change");

        //Reload page
        window.location.href = window.location.href;
    }else{
        if(confirm("Add a artwork to the gallery to become a artist!!!\nPress yes to add Art work!")){
            window.location.href = "/addArt";
        }
    }

}

async function logout(){
    let data = {};
    const res = await fetch("/user/logout", {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })


    let text = await res.text();
    if(res.ok){
        alert(text);

        //Reload page
        window.location.href = window.location.href;
    }else{
        alert(text);
    }

}
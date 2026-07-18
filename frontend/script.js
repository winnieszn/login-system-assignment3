async function login(){

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username,
            password
        })
    });

    const data = await response.json();

    const message = document.getElementById("message");

    message.innerHTML = data.message;

    if(data.success){
        message.style.color="green";
    }else{
        message.style.color="red";
    }
}
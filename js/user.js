document.addEventListener("DOMContentLoaded", function(e){
    let userInfo = localStorage.getItem('userInfo');
    let user = document.getElementById("userName");

    if(userInfo){
        userInfo = JSON.parse(userInfo);
        user.innerHTML = userInfo.email;
    }
    
    // if(loginNeed){
    //     loginNeed = JSON.parse(loginNeed);
    //     document.getElementById("alert").innerHTML = `
    //         <div class="alert alert-danger alert-dismissible w-50" id="mensaje" role="alert">
    //             <span id="msg">${loginNeed.msg}</span>
    //             <a href="#" class = "close" data-dismiss="alert">&times;</a>
    //         </div>
    //     `;
    // }
});

function saveData(emailAddress, password){
    if(emailAddress.trim()==="" || password.trim()===""){
        if(emailAddress.trim()===""){
            alert("Ingrese Nombre de Usuario");
        }else if(password.trim()===""){
            alert("Ingrese Contraseña");
        }
    }else{
        // localStorage.setItem("user", emailAddress.trim());
        // localStorage.setItem("pass", password.trim());
        let inputEmail = document.getElementById('emailAddress');
        let inputPass = document.getElementById('password');

        localStorage.setItem('userInfo',JSON.stringify({'email': inputEmail.value, 'pass': inputPass.value}));
        sessionStorage.setItem("email", emailAddress.trim());
        location.href="./home.html";
    }

};


function clearData(){
        localStorage.removeItem("userInfo");
        location.href = "./login.html";
};


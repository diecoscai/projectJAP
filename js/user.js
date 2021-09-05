document.addEventListener("DOMContentLoaded", function(e){
    let userLogged = localStorage.getItem('user-logged');
    let user = document.getElementById("userName");
  
    if(userLogged){
      userLogged = JSON.parse(userLogged);
      user.innerHTML = userLogged.user;
    }
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

        localStorage.setItem('user-logged',JSON.stringify({'user': inputEmail.value, 'pass': inputPass.value}));
        sessionStorage.setItem("user", emailAddress.trim());
        location.href="./home.html";
        alert (" Usuario : " + emailAddress + " Password : " + password ); 

    }

};


function clearData(){
        localStorage.removeItem("user-logged");
        location.href = "./login.html";
};


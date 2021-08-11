//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

function saveData(emailAddress, password){
    if(emailAddress.trim()==="" || password.trim()===""){
        if(emailAddress.trim()===""){
            alert("Ingrese Nombre de Usuario");
        }else if(password.trim()===""){
            alert("Ingrese Contraseña");
        }
    }else{
        localStorage.setItem("user",emailAddress.trim());
        localStorage.setItem("pass",password.trim());
        sessionStorage.setItem("user", emailAddress.trim());
//        alert("Usuario: " + emailAddress + " Contraseña: " + password);
        location.href="./home.html"

    }

}
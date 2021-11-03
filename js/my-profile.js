//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  let userInfo = localStorage.getItem('userInfo');
  if(userInfo){
    let user = {
      name: JSON.parse(localStorage.getItem('userInfo')).name,
      lastname: JSON.parse(localStorage.getItem('userInfo')).lastname,
      age: JSON.parse(localStorage.getItem('userInfo')).age,
      address: JSON.parse(localStorage.getItem('userInfo')).address,
      email: JSON.parse(localStorage.getItem('userInfo')).email,
      phone: JSON.parse(localStorage.getItem('userInfo')).phone


    }
    document.getElementById("name").value = user.name;
    document.getElementById("lastName").value = user.lastname;
    document.getElementById("age").value = user.age;
    document.getElementById("address").value = user.address;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
  }
});

function validar(){
    let inputName = document.getElementById("name");
    let inputLastName = document.getElementById("lastName");
    let inputAge = document.getElementById("age");
    let inputAddress = document.getElementById("address");
    let inputEmail = document.getElementById("email");
    let inputPhone = document.getElementById("phone");
    let formComplete = true;
  
    if (inputName.value == ""){
      inputName.classList.add("invalid");
      formComplete = false;
    }else if(inputLastName.value == ""){
      inputLastName.classList.add("invalid");
      formComplete = false;
    }else if(inputAddress.value == ""){
      inputAddress.classList.add("invalid");
      formComplete = false;
    }else if(inputEmail.value == ""){
      inputEmail.classList.add("invalid");
      formComplete = false;
    }else if(inputPhone.value == ""){
      inputPhone.classList.add("invalid");
      formComplete = false;
    }

    if(formComplete){
      localStorage.setItem('userInfo', JSON.stringify({
        name: inputName.value,
        lastname:  inputLastName.value,
        address: inputAddress.value,
        age: inputAge.value,
        email: inputEmail.value,
        phone: inputPhone.value

      }));
    }
  }
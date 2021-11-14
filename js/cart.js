var subTotalUni;
var subTotal;
var total;
var costoEnvio;

document.addEventListener("DOMContentLoaded", function(e){
    
    // Check Log In
    // let userLogged = localStorage.getItem('user-logged');
    
    // if(!userLogged){
    //     localStorage.setItem('login-need', JSON.stringify({
    //         from: "cart.html",
    //         msg: "You must sign in before buying"

    //     }));
    //     window.location = "login.html";
    // }


    getJSONData(CART_INFO_URL).then((resultado) => {
        if (resultado.status == "ok") {
            arrayProducts = resultado.data.articles;
            showProductData(arrayProducts);
        } else {
            alert(resultado.data);
        }



    });

    function showProductData(array){
        let i = 0;
        for(item of array){
            console.log(item);
            let cont = `
            <div class="row m-2 card-text boxbox">
            <div class="col-md-3 col-sm-12">
                <img class="w-100 center" src="${item.src}" />
            </div>
            <div class="col-md-9 col-sm-12">
                    <div class="row ">
                        <div class="col-md-6 col-sm-12">
                            <h2 class="font-weight-light">${item.name}</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            <span class="h2">${item.currency}${item.unitCost}</span>
                        </div>
                        <div class="col-sm-4">
                        <div class="row">
                            <div class="col-sm-12 mx-auto">
                                <input type="number" id="cant${i}" class="form-control input-number" onchange="calcSubCostUni(${item.unitCost}, ${i})" value="${item.count}" min="1" max="10">
                            </div>
                        </div>
                    </div>
                    
                    </div>
                </div>
            </div>
            `;
            document.getElementById("prodData").innerHTML += cont;

            let sub = item.unitCost * item.count;
            let conf = `
                <div class="row">
                    <div class="col-sm-8">
                        <span>${item.name} (x<span id="count${i}">${item.count}</span>):</span>
                    </div>
                    <div class="col-sm-2 d-flex justify-content-around">
                        <span>${item.currency}</span><span class="sub" id="sub${i}">${sub}</span>
                    </div>
                </div>
                `;

            document.getElementById("confirm").innerHTML += conf;
            i++;
        }

        calcSubTotal();
        calcularEnvio();
        calcTotal();
    }





    
});

//FORMA DE PAGO
function showDiv(){
    let select = document.getElementById("selectFormaDePago");
    let option = select.options[select.selectedIndex].value;
    if(option == 0){
        console.log("entra", option);
        document.getElementById("divEfectivo").style.display = 'block';
        document.getElementById("divCredito").style.display = 'none';

        
    } else if(option == 1){
        console.log("entra", option);

        document.getElementById("divCredito").style.display = 'block';
        document.getElementById("divEfectivo").style.display = 'none';


    }

}

function validar(){
    let dir = document.getElementById("inputDir");
    let tel = document.getElementById("inputTel");
    let formComplete = true;

    if (dir.value == ""){
        dir.classList.add("invalid");
        formComplete = false;
    }else if(tel.value == ""){
        tel.classList.add("invalid");
        formComplete = false;    
    }

    if(formComplete){
        localStorage.setItem('orderInfo', JSON.stringify({
            dir: inputDir.value,
            tel:  inputTel.value,

        }));
        alert("Orden Creada! :)");
    }
}

// CALCULAR SUB-TOTAL UNITARIO
function calcSubCostUni(cost, i){
    let cant = parseInt(document.getElementById(`cant${i}`).value);
    document.getElementById(`count${i}`).innerHTML = cant;
    subTotalUni = cost * cant;
    document.getElementById(`sub${i}`).innerHTML = subTotalUni;
    calcSubTotal();
    calcularEnvio();
    calcTotal();
}

// CALCULAR SUB-TOTAL
function calcSubTotal(){
    subTotal= 0;
    let subs = document.getElementsByClassName("sub");
        for(item of subs){
            subTotal += parseInt(item.innerHTML);
        }
        console.log(subTotal);
        document.getElementById("subTotal").innerHTML = subTotal;
        
}

// CALCULAR ENVIO
function calcularEnvio() {
    costoEnvio = 0;
    let select = document.getElementById("tipoEnv");
    let option = select.options[select.selectedIndex].value;

    if(option == '1'){
        costoEnvio = Math.round(subTotal * 0.05);
        console.log(costoEnvio);
        document.getElementById("costEnvio").innerHTML = costoEnvio;

    }else if(option == '2'){
        costoEnvio = Math.round(subTotal * 0.07);
        console.log(costoEnvio);
        document.getElementById("costEnvio").innerHTML = costoEnvio;
    }else if(option == '3'){
        costoEnvio = Math.round(subTotal * 0.15);
        console.log(costoEnvio);
        document.getElementById("costEnvio").innerHTML = costoEnvio;
    }
    calcTotal();
}


// CALCULAR TOTAL
function calcTotal(){
    total = 0;

    total = subTotal + costoEnvio;
    document.getElementById("total").innerHTML = total;
    
}






document.getElementById("tipoEnv").addEventListener("change", function(){
    calcularEnvio();
});

document.getElementById("selectFormaDePago").addEventListener("change", function(){
    showDiv();
});

document.getElementById("pagar").addEventListener("click", function () {
    validar();
});
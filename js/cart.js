//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
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
                        <div class="col-sm-12">
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
                                <input type="numer" id="cant${i}" class="form-control input-number" onchange="subCost(${item.unitCost}, ${i})" value="${item.count}" min="1" max="10">
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
        calcTotal();
    }





    
});

function subCost(cost, i){
    let cant = parseInt(document.getElementById(`cant${i}`).value);
    document.getElementById(`count${i}`).innerHTML = cant;
    subTotal = cost * cant;
    document.getElementById(`sub${i}`).innerHTML = subTotal;
    calcTotal();
}

function calcTotal(){
    let total = 0;
    let subs = document.getElementsByClassName("sub");
        for(item of subs){
            total += parseInt(item.innerHTML);
        }
        document.getElementById("total").innerHTML = total;
        console.log("hola");
}
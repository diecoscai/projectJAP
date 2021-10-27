var search;
var costMin;
var costMax;
var arrayProducts = [];

//FUNCIONES

function orderByCant(array) {
  let result = [];
  result = array.sort((a, b) => {
    if (a.soldCount > b.soldCount) {
      return -1;
    }
    if (a.soldCount > b.soldCount) {
      return 1;
    }
    return 0;
  });
  console.log(arrayProducts);

  return result;
}

function orderByCost(crit, array) {
  let result = [];
  if (crit == 1) {
    result = array.sort((a, b) => {
      if (a.cost > b.cost) {return 1;}
      if (a.cost < b.cost) {return -1;}
      return 0;
    });
    return result;
  }
  if (crit == 2) {
    result = array.sort((a, b) => {
      if (a.cost < b.cost) {return 1;}
      if (a.cost > b.cost) {return -1;}
      return 0;
    });
    return result;
  }
}





document.getElementById("search").addEventListener("input", function () {
  // search = document.getElementById("search").addEventListener('keydown', (e) => {
  //   console.log(`key=${e.key}, code=${e.code}`)
  // });
  search = document.getElementById("search").value.toLowerCase();
  showProductData(arrayProducts);
});

document.getElementById("btnFilterCost").addEventListener("click", function(){
  costMin = document.getElementById("costMin").value;
  costMax = document.getElementById("costMax").value;

  if((costMin != undefined) && (costMin != "") && (parseInt(costMin)) >= 0) {
    costMin = parseInt(costMin);
  }else{
    costMin = undefined;
  }
  if((costMax != undefined) && (costMax != "") && (parseInt(costMax)) >= 0){
    costMax = parseInt(costMax);
  }else{
    costMax = undefined;
  }
  showProductData(arrayProducts);
});

// show data on cards
function showProductData(array) {
  let cont = "";

  for (let product of array) {

    if(((costMin == undefined) || (costMin != undefined && product.cost >= costMin)) &&
      ((costMax == undefined) || (costMax != undefined && product.cost <= costMax))){
        //console.log("hola", {costMin,costMax, product});
        if((search == undefined || product.name.toLowerCase().indexOf(search) != -1)){
          
        cont += `
          
            <div class="card " style="width: 18rem;">
                <img class="card-img-top" src="${product.imgSrc}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title"><a>${product.name}</a></h5>
                    <h6 class="card-subtitle">( ${product.soldCount} vendidos )</h6>
                    <div class="card-body">
                      <p class="card-text">${product.description}</p>
                    </div>
                </div>
                <div class=" d-flex flex-row justify-content-center">
                  <div class="col">
                    <p class="card-cost">${product.currency} ${product.cost}</p>
                  </div>
                  <div class="col">
                    <a type="button" href="product-info.html?id=${product.id}" class="btn btn-primary btnComprar btnDetalle">Detalle</a>
                  </div>
                </div>
            </div>
            `;
    }
  }
  document.getElementById("data").innerHTML = cont;
}
}


document.getElementById("btnClearFilter").addEventListener("click", function(){
  document.getElementById("costMin").value = "";
  document.getElementById("costMax").value = "";

  costMin = undefined;
  costMax = undefined;
  showProductData(arrayProducts);
});

document.getElementById("sortByCount").addEventListener("click", function () {
  valorList = orderByCant(arrayProducts);
  showProductData(valorList);
});

document.getElementById("sortAsc").addEventListener("click", function () {
  sortAsc = orderByCost(1, arrayProducts);
  showProductData(sortAsc);
});
document.getElementById("sortDesc").addEventListener("click", function () {

  sortDesc = orderByCost(2, arrayProducts);
  showProductData(sortDesc);
});

document.addEventListener("DOMContentLoaded", function (event) {
  //get data && convert to array
  getJSONData(PRODUCTS_URL).then((resultado) => {
    if (resultado.status == "ok") {
      arrayProducts = resultado.data;
      showProductData(arrayProducts);
    } else {
      alert(resultado.data);
    }
  });
});




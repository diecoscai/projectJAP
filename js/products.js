//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (event) {

});

document.getElementById("data").innerHTML = "";


// function showProductData (){
//     let result = getJSONData(PRODUCTS_URL).then(result => {
//         let product = "";

//         for(let i=0; i < result.data.length; i++){
//             let product = result.data[i];
//             console.log(product);
//         }
//     });
// }

async function showProductData() {
  let result = await getJSONData(PRODUCTS_URL);

  for (let product of result.data) {
    let cont = "";
    cont +=
      `
      
        <div class="card " style="width: 18rem;">
            <img class="card-img-top" src="${product.imgSrc}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title"><a>${product.name}</a></h5>
                <h6 class="card-subtitle">( ${product.soldCount} vendidos )</h6>
                <div class="card-body">
                  <p class="card-text">${product.description}</p>
                  <p class="card-cost">${product.currency} ${product.cost}</p>
                  <button href="#" class="btnComprar btn">Agregar al Carrito <a class="bx bx-cart"></a></button>
                </div>
            </div>
        </div>
         `;

    document.getElementById("data").innerHTML += cont;
  }
}
showProductData();


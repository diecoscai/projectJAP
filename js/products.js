//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (event) {
  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId);

    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener("click", () => {
        // show navbar
        nav.classList.toggle("show");
        // change icon
        toggle.classList.toggle("bx-x");
        // add padding to body
        bodypd.classList.toggle("body-pd");
        // add padding to header
        headerpd.classList.toggle("body-pd");
      });
    }
  };

  showNavbar("header-toggle", "nav-bar", "body-pd", "header");

  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll(".nav_link");

  function colorLink() {
    if (linkColor) {
      linkColor.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    }
  }
  linkColor.forEach((l) => l.addEventListener("click", colorLink));

  // Your code to run since DOM is loaded and ready
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


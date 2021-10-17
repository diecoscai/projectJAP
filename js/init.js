const CATEGORIES_URL = "https://diecoscai.github.io/api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://diecoscai.github.io/api/category/0001.json";
const PRODUCTS_URL = "https://diecoscai.github.io/api/product/all.json";
const PRODUCT_INFO_URL = "https://diecoscai.github.io/api/product/0001.json";
const COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://diecoscai.github.io/api/123.json";
// const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

if(document.getElementById("btnLogOut")){
  document.getElementById("btnLogOut").addEventListener('click', function(){
    localStorage.removeItem("user-logged");
  });
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then((response) => {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
     // .then(function(response) {
    //       result.status = 'ok';
    //       result.data = response;
    //       hideSpinner();
    //       return result;
    // })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});


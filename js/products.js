
document.getElementById("data").innerHTML = "";

// let productList = getJSONData(PRODUCTS_URL);

// function showPorductList(productList){
//     let product = "";

//     for(let i=0; i < productList.length; i++){
//         let product = productList[i];
        
//     }
// }

// function showProductData (){
//     let result = getJSONData(PRODUCTS_URL).then(result => {
//         let product = "";

//         for(let i=0; i < result.data.length; i++){
//             let product = result.data[i];
//             console.log(product);
//         }
//     });
// }

async function showProductData (){
    let result = await getJSONData(PRODUCTS_URL);

    for(let product of result.data){
        console.log(product);
        
        let row="";
        row +=
         `
         <tr>
            <td class = "bodyTable">` + product.name + `</td>
            <td class = "bodyTable">` + product.description + `</td>
            <td class = "bodyTable">` + product.cost + `</td>
            <td class = "bodyTable">` + product.currency + `</td>
            <td class = "bodyTable"><img class = "imgProduct" height = "200" src="` + product.imgSrc + `"></td>
            <td class = "bodyTable">` + product.soldCount + `</td>
         </tr>
         `   
        ;

        document.getElementById("data").innerHTML += row;
    }

    

}


showProductData();

// console.log(productList);

// console.log(productData);

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});


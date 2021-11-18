var arrayCategories;

function showHomeCategoriesList(array){
    let cont = "";
    for(category of array){
        cont += `
            <div class="col-md-4">
            <a
            href="categories.html"
            class="card mb-4 shadow-sm custom-card"
            >
            <img
                class="bd-placeholder-img card-img-top"
                src="${category.imgSrc}"
            />
            <h3 class="m-3">${category.name}(${category.productCount})</h3>
            <div class="card-body">
                <p class="card-text">
                Los mejores precios en autos 0 kilómetro, de alta y
                media gama.
                </p>
            </div>
            </a>
        </div>
        `
        document.getElementById("data").innerHTML = cont;

    }
    
}

document.addEventListener("DOMContentLoaded", function (event) {
    //get data && convert to array
    getJSONData(CATEGORIES_URL).then((resultado) => {
    if (resultado.status == "ok") {
        arrayCategories = resultado.data;
        showHomeCategoriesList(arrayCategories);
    } else {
        alert(resultado.data);
    }
    });
});
var scoreComment = "";
var stars ="";
var producto ="";


document.addEventListener("DOMContentLoaded", function (e) {

    //GET ID FROM URL
    let url = document.location;
    let urlProd = url.search;
    let param = new URLSearchParams(urlProd);
    let id = parseInt(param.get("id"));
    let prod = `https://diecoscai.github.io/api/product/${id}.json`;
    let comments = `https://diecoscai.github.io/api/product/${id}-comments.json`;

    //Get api Data

    getJSONData(prod).then((resultado) => {
        if (resultado.status == "ok") {
            item = resultado.data;
            producto = item;

            getJSONData(PRODUCTS_URL).then((resultado) => {
                if (resultado.status == "ok") {
                    item = resultado.data;
                    showSimilarProducts(item);
                } else {
                    alert(resultado.data);
                }
            });

            showProductInfo(item);
        } else {
            alert(resultado.data);
        }
    });

    getJSONData(PRODUCTS_URL).then((resultado) => {
        if (resultado.status == "ok") {
            item = resultado.data;
            showSimilarProducts(item);
        } else {
            alert(resultado.data);
        }
    });

    getJSONData(comments).then((resultado) => {
        if (resultado.status == "ok") {
            com = resultado.data;
            // console.log(com);
            showProductComment(com);
        } else {
            alert(resultado.data);
        }
    });





    //Functions 

    function showProductInfo(obj) {
        let cont = `
        <div class="row">
            <div class="col">
                <h1>${obj.name}</h1> 
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h4>${obj.category}</h4>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src="img/${obj.id}/1.jpg" alt="First slide">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="img/${obj.id}/2.jpg" alt="Second slide">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="img/${obj.id}/3.jpg" alt="Third slide">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                    </div>
                </div>
                <div class="col">
                    <h3>Descripcion:</h3>
                    <div class="breakLine"></div>
                    <p class="descProd">${obj.description}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6"></div>
                <div class="col-md-6 costProd">
                    <div class="row">
                    <div class="col-md-3">
                        <span class="cost">${obj.currency}</span><span class="cost">${obj.cost}</span>
                    </div>
                </div>
                <div class="row">
                        <div class="col-md-6">
                            <button class="btn btn-primary btnComprar" type="button">Comprar Ahora</button>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-secondary btnComprar" type="button">Agregar al carrito</button>
                        </div>
                </div>   
            </div>
            `;
        document.getElementById("productData").innerHTML = cont;
    }

    function showSimilarProducts(array){
        let cont = "";
       //console.log("Similar Products",{producto,array})
        for(let item of array){
            if(item.id_category == producto.id_category && item.id !== producto.id){
                //console.log("carga if",producto);
                cont += 
                `       
                        <div class= "col col-md-4">
                            <span>${item.name}</span>
                            <img href="" class="img-thumbnail" src="${item.imgSrc}">
                        </div>
                        `;
            }
        }
        document.getElementById("similarProds").innerHTML = cont;

    }

});

function checkStar(score){
    scoreComment = 0;
    let stars = document.querySelectorAll('div.rate > span');
    // console.log(stars);

        for(let i = 0; i <= stars.length-1 ; i++){
            if(i <= score){
                stars[i].classList.add('checked');
                scoreComment ++;
            }else{
                stars[i].classList.remove('checked');
            }
        }
        //console.log(scoreComment);
    }

    function sendComment(){
        let comment = document.getElementById("textComment").value;
        let com = new Object;
        com.score = scoreComment;
        com.description = comment;
        com.user = "Pepito";
        com.dateTime = new Date();
        //console.log(com.score);
        showStars(com.score);
        let cont = `
                    <div class="col comment">
                        <div class="row upComment">
                            <div class="col-md-2">
                                <span class="userComment">${com.user}</span>
                            </div>
                            <div class="col-md-3">${stars}</div>
                                <div class="col">
                                    <span class="dateComment">${new Date(com.dateTime).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col descComment">${com.description}</div>
                            </div>
                            <div class="breakLine"></div>
                        </div>
                    </div>
                `
                document.getElementById('commentPost').innerHTML += cont;
                document.getElementById("textComment").value = "";

    }

    function showProductComment(array){
        let cont = "";
        for(let comentario of array){
            showStars(comentario.score);
            cont += `
                <div class="col comment">
                    <div class="row upComment">
                        <div class="col-md-2">
                            <span class="userComment">${comentario.user}</span>
                        </div>
                        <div class="col-md-3">${stars}</div>
                        <div class="col">
                            <span class="dateComment">${new Date(comentario.dateTime).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col descComment">${comentario.description}</div>
                    </div>
                    <div class="breakLine"></div>
                </div>
            `;
        }
        document.getElementById("comentSpot").innerHTML = cont;
    }

    function showStars(score){
        if(score == 1){
            stars =`
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            `;
        }else if(score == 2){
            stars =`
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            `;
        }else if(score == 3){
            stars =`
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            `;
        }else if(score == 4){
            stars =`
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            `;
        }else if(score == 5){
            stars =`
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            `;
        }
    }



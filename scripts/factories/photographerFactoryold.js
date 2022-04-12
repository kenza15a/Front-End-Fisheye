function photographerFactory(data) {
    const { id,name,city,country,tagline,price, portrait } = data;///--->nouveau;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.classList.add("card");
        /*creation de l'image*/
       // const img = document.createElement( 'img' );
        //img.setAttribute("src", picture)
        /*creation du nom
        const nameH2= document.createElement( 'h2' );
        nameH2.textContent = name;

        /* creation city****------------------nouveau/
        const cityH4 = document.createElement( 'h4' );
        cityH4.textContent=city;
        /*creation tagline------------>nouveau
        const taglineH3 = document.createElement( 'h5' );
        taglineH3.textContent=tagline;
       /*creation city*/

        /*article.appendChild(img);
        article.appendChild(nameH2);
        article.appendChild(cityH4);// ---------->nouveau
        article.appendChild(taglineH3);// ---------->nouveau*/
        article.innerHTML=`<img src="assets/photographers/Photographers ID Photos/${portrait}">
        <h2>${name}</h2>
        <h4 class="location">${city},${country}</h4>
        <h5>${tagline}</h5>
        <h6 class="price">${price}€/jours</h6>`
        return (article);
    }
    return { id,name, picture, getUserCardDOM }
}

//console.log(photographerFactory());
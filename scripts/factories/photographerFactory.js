function photographerFactory(data) {
    const { id,name,city,country,tagline,price, portrait } = data;///--->nouveau;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.classList.add("card");
        article.innerHTML=`
        <a href="photographer.html">
        <img src="assets/photographers/Photographers ID Photos/${portrait}">
        <h2>${name}</h2>
        <h4 class="location">${city},${country}</h4>
        <h5>${tagline}</h5>
        <h6 class="price">${price}€/jours</h6>
        </a>`
        return (article);
    }

   /* getPhotographerHeader(){
        const { id,name,city,country,tagline,price, portrait } = this._data;///--->nouveau;
        const divHeader = document.createElement( 'div' );
        divHeader.classList.add("card");
        divHeader.innerHTML=`
       
        <img src="assets/photographers/Photographers ID Photos/${portrait}">
        <h2>${name}</h2>
        <h4 class="location">${city},${country}</h4>
        <h5>${tagline}</h5>
        <h6 class="price">${price}€/jours</h6>`
    
        return (divHeader);
    }*/
    return { id,name, picture, getUserCardDOM }

}

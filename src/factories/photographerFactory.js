export default class photographerFactory {
  constructor(data) {
    this._data = data;

  }
  getUserCardDOM() {
    const { id, name, city, country, tagline, price, portrait } = this._data;///--->nouveau;
    const article = document.createElement('article');
    //accessibilté des articles
    let ariaLabel=`carte du photographe ${name}`;
    article.setAttribute("aria-label",ariaLabel);  
    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;
    //objet de type photographer
    article.classList.add("card");
    article.innerHTML = `<a   href="photographer.html?photographerId=${id}">
    <img role="img" src="assets/photographers/Photographers ID Photos/${portrait}" alt="photo de ${name}">
    <h2  aria-label="nom du photographe ${name}">${name}</h2>
    <h4 class="location" aria-label="ville ${city} et    pays ${country}" >${city},${country}</h4>
    <h5  aria-label="slogan ${tagline}" >${tagline}</h5>
    <h6 class="price" aria-label="prix ${price}€ par jour">${price}€/jours</h6></a>`


    return { id, name, picture, article }
  }



}

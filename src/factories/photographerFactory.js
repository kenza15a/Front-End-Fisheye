export default class photographerFactory {
  constructor(data) {
    this._data = data;

  }
  getUserCardDOM() {
    const { id, name, city, country, tagline, price, portrait } = this._data;///--->nouveau;
    const article = document.createElement('article');
    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;
    //objet de type photographer
    article.classList.add("card");
    article.innerHTML = `<a href="photographer.html?photographerId=${id}">
    <img role="img" src="assets/photographers/Photographers ID Photos/${portrait}" alt="photo de ${name}">
    <h2>${name}</h2>
    <h4 class="location">${city},${country}</h4>
    <h5>${tagline}</h5>
    <h6 class="price">${price}€/jours</h6></a>`


    return { id, name, picture, article }
  }



}

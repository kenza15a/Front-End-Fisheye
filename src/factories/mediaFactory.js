export default class mediaFactory {
    constructor(media) {
        this._media = media;

    }
    getMediaDom(pictureUrl) {
        const { id, photographerId, title, image, likes, date, price } = this._media;
        const article = document.createElement('article');
        article.classList.add("media-wrapper");
        // const thumbnail = `assets/photographers/Photographers ID Photos/${portrait}`;
        //trouver le chemin de la photo
        const mediaType = pictureUrl.split('.');
        // const mediaContent=
        if (mediaType[mediaType.length - 1] == 'jpg') {
            article.innerHTML = `
        <a href="${pictureUrl}">
        <img class="media" src="${pictureUrl}" alt="${title}">
        </a>
        <div class="media-infos">
         <p class="media-title">${title}</P>
         <span class="likes"><i class="fa-solid fa-heart"></i><i class="number_of_Likes">${likes}</i></span>
        </div>
       
       `

        } else {

        article.innerHTML = `
        <a href="${pictureUrl}">
        <video  preload="metadata" class="media">
           <source src="${pictureUrl}#t=0.5" type="video/mp4">
        </video>
       </a>
        <div class="media-infos">
         <p class="media-title">${title}</P>
         <span class="likes"><i class="fa-solid fa-heart"></i><i class="number_of_Likes">${likes}</i></span>
        </div>
       `

        }
        var likesButton = document.querySelector(".likes");
        return { id, photographerId, article, likesButton }
    }

}

export default class mediaFactory {
    constructor(media) {
        this._media = media;

    }
    getMediaDom(pictureUrl) {
        const { id, photographerId, title, image, likes, date, price } = this._media;
        const article = document.createElement('article');
        // const thumbnail = `assets/photographers/Photographers ID Photos/${portrait}`;
        //trouver le chemin de la photo
        const mediaType = pictureUrl.split('.');
       // const mediaContent=
       if(mediaType[mediaType.length-1]=='jpg') 
       {
        article.innerHTML = `
        <div class="media-wrapper">
        <img class="media" src="${pictureUrl}" alt="${title}">
        <div class="media-infos">
         <p class="media-title">${title}</P>
         <span class="likes"><i class="fa-solid fa-heart"></i>${likes}</span>
        </div>
        </div>
       `

       }else{
          
        article.innerHTML = `
        <div class="media-wrapper">
        <video  preload="metadata">
       <source src="${pictureUrl}#t=0.5" type="video/mp4">
       </video>
        <div class="media-infos">
         <p class="media-title">${title}</P>
         <span class="likes"><i class="fa-solid fa-heart"></i>${likes}</span>
        </div>
        </div>
       `

       }
      
        return { id, photographerId, article }
    }

}

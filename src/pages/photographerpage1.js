
import mediaFactory from "../factories/mediaFactory.js";
//impoter lapi pour un fetch des photographers
import photographerApi from "../api/photographerApi.js";
//impoter lapi pour un fetch des media
import mediaApi from "../api/mediaApi.js";
import contactForm from "../utils/contactForm.js";

export default class photographerPage {

    constructor() {   //recuperer lid de l'url
        const urlParams = new URLSearchParams(window.location.search);
        this.photographerId = urlParams.get("photographerId");

    }
    async generateHeader() {//genere le header

        const url = "../data/photographers.json";
        const api = new photographerApi(url);
        const photographersData = (await api.getAllPhotographer()).photographers;

        for (let i = 0; i < photographersData.length; i++) {

            if (photographersData[i].id == this.photographerId) {
                var infos = photographersData[i];
                break;
            }
        }

        const photographerHeader = document.querySelector(".photograph-header");
        const header = document.createElement('section');// creation de la section header 
        header.classList.add("headerCard");//css
        //insertion du html
        header.innerHTML = `
                <div class="photographer-infos">
                <h2>${infos.name}</h2>
                <h4 class="location">${infos.city},${infos.country}</h4>
                <h5 class="tagline">${infos.tagline}</h5>
                </div>
                <button class="contact_button">Contactez-moi</button>
                <img class="profile_pic" src="assets/photographers/Photographers ID Photos/${infos.portrait}">`;


        //recuperer le bouton contactez-moi
        const contactButton = document.querySelector(".contact_button");
        photographerHeader.appendChild(header);
        //var infos = { id, name, city, country, tagline, portrait };

        return { infos, contactButton };




    }

    getModal(contactButton) {
        contactButton.addEventListener("click", function (e) {
            alert("i'm clicked");
            const contact = new contactForm();
            contact.displayModal();
        });
    }

    //recuperer les media

    async getMedia(Photographername) {
        /*fetch*/
        const photographersSection = document.querySelector(".photographer_section");
        const url = "../data/photographers.json";
        const api2 = new mediaApi(url);//mediaapi
        const photographerMedia = (await api2.getAllMedia()).media;
        var tabMedia = [];
        for (let i = 0; i < photographerMedia.length; i++) {
            if (photographerMedia[i].photographerId == this.photographerId) {
                tabMedia.push(photographerMedia[i])
            }
        }
        console.log("Les medias du photographe \n :")
        console.log(tabMedia)
        return { tabMedia, Photographername };
    }

    async displayMedia(data) {
        //section media
        const mediaSection = document.querySelector('.photograph-media');
        var tabMedia = (await data).tabMedia;
        var name = (await data).Photographername;
        for (let i = 0; i < tabMedia.length; i++) {
            var NewMediafactory = new mediaFactory(tabMedia[i]);
            //verifier le type du media
            if ('image' in tabMedia[i]) {
                var url = "../public/assets/photographers/" + name + "/" + tabMedia[i].image;
            }
            else {
                var url = "../public/assets/photographers/" + name + "/" + tabMedia[i].video;
            }
            //console.log(url);
            var mediaDom = (await NewMediafactory.getMediaDom(url)).article;
            mediaSection.appendChild(mediaDom);
        }

    }
    /*print likes and price*/
    getCounters(tabMedia, infos) {
        const counterSection = document.querySelector('.bottom-counters');
        var likes = 0;
        for (let i = 0; i < tabMedia.length; i++) {

            likes = tabMedia[i].likes + likes;
        }
        const price = infos.price;
        const divCounter = document.createElement('div');
        divCounter.innerHTML = ` <i class="fa-solid fa-heart"></i> ${likes} , ${price}€/jours`;
        divCounter.classList.add("div-counter");
        counterSection.appendChild(divCounter);
        console.log("nombre total de likes");
        console.log(likes + " likes");
        console.log("prix du photographe actuel");
        console.log(price + "€/jours");
        return { likes, price };


    }

    /*methode renderPage*/
    async renderPage() {
        const header = await this.generateHeader()
        const info = header.infos;
        const contactButton = header.contactButton;
        this.getModal(contactButton);//addeventlistner
        const data = page.getMedia(info.name);
        const counters = (await data).tabMedia;
        this.displayMedia(data);
        this.getCounters(counters, info);
    }
}

const page = new photographerPage();
page.renderPage();




import mediaFactory from '../factories/mediaFactory.js';
//impoter lapi pour un fetch des photographers
import photographerApi from '../api/photographerApi.js';
//impoter lapi pour un fetch des media
import mediaApi from '../api/mediaApi.js';
import contactForm from '../utils/contactForm.js';
import lightbox from '../utils/lightbox.js';

export default class photographerPage {

    constructor() {   //recuperer lid de l'url
        const urlParams = new URLSearchParams(window.location.search);
        this.photographerId = urlParams.get('photographerId');

    }
    async generateHeader() {//genere le header

        const url = '../data/photographers.json';
        const api = new photographerApi(url);
        const photographersData = (await api.getAllPhotographer()).photographers;

        for (let i = 0; i < photographersData.length; i++) {

            if (photographersData[i].id == this.photographerId) {
                var infos = photographersData[i];
                break;
            }
        }

        const photographerHeader = document.querySelector('.photograph-header');
        const header = document.createElement('section');// creation de la section header 
        header.classList.add('headerCard');//css
        //insertion du html
        header.innerHTML = `
                <div class="photographer-infos" aria-label="infos du photographe">
                <h2>${infos.name}</h2>
                <h4 class="location">${infos.city},${infos.country}</h4>
                <h5 class="tagline">${infos.tagline}</h5>
                </div>
                <button  aria-label="bouton vers le modal de contact " class="contact_button">Contactez-moi</button>
                <img role="img" alt="photo de ${infos.name}"class="profile_pic" src="assets/photographers/Photographers ID Photos/${infos.portrait}">`;

        //append le header
        photographerHeader.appendChild(header);
        //var infos = { id, name, city, country, tagline, portrait };
        //recuperer le bouton contactez-moi
        const contactButton = document.querySelector('.contact_button');
        return { infos, contactButton };
    }

    getContactForm() {
        const contact = new contactForm();
        return contact;

    }

    //recuperer les media

    async getMedia(Photographername) {
        /*fetch*/
        const url = '../data/photographers.json';
        const api2 = new mediaApi(url);//mediaapi
        const photographerMedia = (await api2.getAllMedia()).media;
        var tabMedia = [];
        for (let i = 0; i < photographerMedia.length; i++) {
            if (photographerMedia[i].photographerId == this.photographerId) {
                tabMedia.push(photographerMedia[i])
            }
        }
        console.log('Les medias du photographe \n :')
        console.log(tabMedia)
        return { tabMedia, Photographername };
    }

    /**
     * 
     * @param {object} displayData displayData  composé de deux éléments le tableau des media et le nom du photographe
     */

    async displayMedia(displayData) {
        //section media
        const mediaSection = document.querySelector('.photograph-media');
        var tabMedia = (await displayData).tabMedia;
        var name = (await displayData).Photographername;

        for (let i = 0; i < tabMedia.length; i++) {
            var NewMediafactory = new mediaFactory(tabMedia[i]);
            //verifier le type du media
            if ('image' in tabMedia[i]) {
                var url = '../public/assets/photographers/' + name + '/' + tabMedia[i].image;
            }
            else {
                 url = '../public/assets/photographers/' + name + '/' + tabMedia[i].video;
            }
            //console.log(url);
            var mediaDom = (await NewMediafactory.getMediaDom(url)).article;
            /*var a = document.createElement("a");
            a.href = url;
            a.appendChild(mediaDom);*/
            mediaSection.appendChild(mediaDom);

        }
        //likes
        let likesButtons = document.querySelectorAll('.fa-heart');
        this.getLikes(likesButtons, tabMedia);
        //initialiser le lightbox
        lightbox.init();
        return mediaSection;



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
        divCounter.innerHTML = ` <i class="fa-solid fa-heart"></i><i id="likes_counter" > ${likes}</i> , ${price}€/jours`;
        divCounter.classList.add('div-counter');
        counterSection.appendChild(divCounter);
        return { likes, price };


    }
    //method add likes when clicked*/
    /**
     * 
     * @param {array} likesButtons   l'ensemble des boutons likes
     * @param {array} tabMedia   tabmedia tableau des media
     */
    getLikes(likesButtons, tabMedia) {
        //var isClicked = [];
        let numberOfLikes = document.querySelectorAll('.number_of_Likes');
        let likesCounterDom = document.getElementById('likes_counter');
        // var tempObj = {};
        var tempTab = [];
        // Ajout d'une propriété cliqué dans les objets de type Media pour maintenir l'état de clique
        // et éviter des doubles cliques en cas de sort 

        for (let i = 0; i < tabMedia.length; i++) {
            var tempObj = tabMedia[i];
            //verification de la presence de la propriété clickstate 
            // pour garder l'etat du click apres le tri
            if (!('clickState' in tempObj)) {
                Object.assign(tempObj, { clickState: false });
            }
            tempTab.push(tempObj);
            //likesCounter.push((await counters[i]).likes);          

        }

        tabMedia = [];
        tabMedia = tempTab;
        //console.log(tabMedia);

        for (let i = 0; i < likesButtons.length; i++) {

            likesButtons[i].addEventListener('click', function () {
                //alert("clicked");
                if (tabMedia[i].clickState == false) {

                    tabMedia[i].clickState = true;
                    tabMedia[i].likes = tabMedia[i].likes + 1;

                    numberOfLikes[i].innerHTML = `<i class="number_of_Likes">${tabMedia[i].likes}</i>`;
                    // Somme des likes après incrémentation dûe à un clique
                    let likesCounter = 0;
                    for (let i = 0; i < tabMedia.length; i++) {

                        likesCounter = tabMedia[i].likes + likesCounter;
                    }

                    likesCounterDom.innerHTML = `<i class="number_of_Likes">${likesCounter}</i>`;

                }
            });
        }
    }
    //sort media
    sortBylikes(tabMedia) {
        tabMedia.sort(function byLikes(a, b) {
            return parseInt(b.likes) - parseInt(a.likes); //inversed the a and b to make the sort descendent

        });
        return tabMedia;

    }
    sortByTitle(tabMedia) {
        tabMedia.sort(function byTitle(a, b) {

            if (a.title > b.title) {
                return 1;
            } else if (a.title < b.title) {
                return -1;
            } else {
                return 0;
            }
        });
        return tabMedia;

    }
    sortByDate(tabMedia) {
       
        tabMedia.sort(function byDate(a, b) {
            return new Date(a.date).valueOf() - new Date(b.date).valueOf();
        });
        return tabMedia;

    }
    /*methode renderPage*/
    async renderPage() {
        const header1 = await this.generateHeader();
        const info = header1.infos;
        const contactButton = header1.contactButton;
        let data = page.getMedia(info.name);
        this.displayMedia(data);
        //affichichage de prix et likes en bas
        let counters = (await data).tabMedia;
         this.getCounters(counters, info).likes;
        //contact form
        const contactF = this.getContactForm();//instance du formulaire
        const Modal = await contactF.buildModal();
        contactButton.addEventListener('click', function () { 
            contactF.displayModal() });
        const sendButton = Modal.sendButton;
        contactF.sendInfos(sendButton);




        // traitement du sort --------------->les filtres
        //selectionner le dom du select
        let filters = document.getElementById('tri');


        filters.addEventListener('change', (e) => {
            e.preventDefault();
            let filterOprion = document.getElementById('tri').value;
            if (filterOprion == 'popularité') {
                console.log('popularité choisi');
                this.sortBylikes(counters);

                console.log(counters);
            } else if (filterOprion == 'titre') {
                console.log('titre choisi');
                this.sortByTitle(counters);
                console.log(counters);

            } else {
                console.log('date choisi');
                this.sortByDate(counters);
                console.log(counters);

            }

            console.log('tableau trié par ' + filterOprion);
            console.log(counters);
            data.tabMedia = counters;
            /* console.log("data tabmedia ");
             console.log(data.tabMedia);*/
            const mediaSection = document.querySelector('.photograph-media');
            mediaSection.innerText = '';
            this.displayMedia(data);



        });


    }
}

const page = new photographerPage();
page.renderPage();




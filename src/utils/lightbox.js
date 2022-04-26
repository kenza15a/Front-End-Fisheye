

/***
 * * @property {HtmlElement} element 
 * @property {string[]} images  chemin des images dans la lightbox
 *  * @property {string} url  chemin de l'image actuellemnt affichée
 * **/
export default class lightbox {
    static init() {
        //slectionner le liens qui mennents vers des images
        var links = Array.from(document.querySelectorAll('.photograph-media a[href$=".jpg"],a[href$=".mp4"]'));
        var titlesHtml = Array.from(document.querySelectorAll('.media-title'));
        var titles = [];
        //afficher le titre 
        titlesHtml.forEach(title => {
            //  console.log(title.innerText);
            titles.push(title.innerText);


        });
        //recuperer les liens des images dans un map 
        const gallery = links.map(link => link.getAttribute('href'));
        links.forEach(link => link.addEventListener("click", function (e) {
            e.preventDefault();

            //recuperer le lien de l'elemt cliqué
            new lightbox(e.currentTarget.getAttribute('href'), gallery, titles);
        }));
    }

    //constructor les proprietés de la classe
    /**
     
     * @param {string } url url de l'image
     * @param {string[]} images  chemin des images dans la lightbox
     */
    constructor(url, images, titles) {
        //chemin des images
        this.images = images;
        this.url = url;
        this.titles = titles;
        /*lancer l'venement keyup au constructeur*/
        document.addEventListener('keyup', this.onKeyUp);
        //--------------ajouter le titre du media au lightbox
        this.element = this.buildDom(url);
        document.body.appendChild(this.element);
        this.onKeyUp = this.onKeyUp.bind(this);


    }

    //fermer le lightbox
    /***
     * @param {Mousevent/keyboardevent} e
     */
    close(e) {
        e.preventDefault();
        const lightboxOpendened = document.querySelector(".lightbox");
        lightboxOpendened.classList.add("close__lightbox");
        //forcer l'arret au bout de 500ms
        window.setTimeout(() => { lightboxOpendened.remove() }, 500);
        //supprime levent keyup apres avooir fermer la fenetre
        document.removeEventListener('keyup', this.onKeyUp);
    }
    //image suivante
    /***
     * @param {Mousevent/keyboardevent} e
     */
    next(e) {
        e.preventDefault();
        //trouver l'indice de l'image affichée 
        var i = this.images.findIndex(image => image === this.url);
        // verifier si on a pas depasser le nombre des images dans la lightbox pour revenir au 0
        if (i === this.images.length - 1) {
            i = -1;
        }
        let newUrl = this.images[i + 1];
        //vider le container avant de l'inserer de nouveau
        const lightboxContainer = this.element.querySelector(".lightbox__container");
        lightboxContainer.innerHTML = "";
        //this.buildDom(newUrl);
        new lightbox(newUrl, this.images, this.titles);

    }
    //image precedente
    /***
     * @param {Mousevent} e
     */
    prev(e) {

        e.preventDefault();
        var i = this.images.findIndex(image => image === this.url);
        if (i === 0) {
            i = this.images.length;
        }
        let newUrl = this.images[i - 1];
        //vider le container avant de l'inserer de nouveau
        const lightboxContainer = this.element.querySelector(".lightbox__container");
        lightboxContainer.innerHTML = "";
        /*this.buildDom(newUrl);*/
        new lightbox(newUrl, this.images, this.titles);

    }
      /***
     * @param {Mousevent/keyboardevent} e
     */
       onKeyUp(e) {
        if (e.key === "Escape") {
            this.close(e);
        }
        if (e.keyCode == '39') {
            // right arrow
            this.next(e);
        }
        if (e.keyCode == '37') {
            // left arrow
            this.prev(e);
        }
    }

    buildDom(url) {
        // this.url = url;
        let title = "";
        for (let i = 0; i < this.images.length; i++) {
            if (this.images[i] == url) {
                title = this.titles[i];
                break;
            }
        }

        const domLightbox = document.createElement("div");
        domLightbox.classList.add("lightbox");
        domLightbox.innerHTML = `
        <button class="lightbox__Close"><i class="fa-solid fa-xmark"></i></button>
        <button class="lightbox__next"><i class="fa-solid fa-angle-right"></i></button>
        <button class="lightbox__prev"><i class="fa-solid fa-angle-left"></i></button>
        `;

        const lightboxContainer = document.createElement("div");
        lightboxContainer.classList.add("lightbox__container");

        //verifier si le fichier est une image ou une video
        if (/\.(jpg)$/.test(url))//(url.match(/\.(jpg)$/)) { ///faq$/.test
        //put image in container
        {
            lightboxContainer.innerHTML = `<img src="${url}" alt="image lightbox" title="${title}"></br>
            <h4 class="image__title">${title}</h4>`;

        }
        else {
            //alert("it's a video");
            lightboxContainer.innerHTML = `
            <video class="lightbox__video" controls="controls" role="video">
            <source src="${url}" type="video/mp4">
            </video></br>
            <h4 class="image__title">${title}</h4>`;
        }
        //append le container
        domLightbox.appendChild(lightboxContainer);

        //close
        domLightbox.querySelector('.lightbox__Close').addEventListener('click',
            this.close.bind(this));

        //next
        domLightbox.querySelector('.lightbox__next').addEventListener('click',
            this.next.bind(this));

        //previous
        domLightbox.querySelector('.lightbox__prev').addEventListener('click',
            this.prev.bind(this));

        return domLightbox;
    }

}
//lightbox.init();


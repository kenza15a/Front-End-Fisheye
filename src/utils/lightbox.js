export default class lightbox {
    static init() {
        //slectionner le liens qui mennents vers des images
        var links = document.querySelectorAll('.photograph-media a')
            .forEach(link => link.addEventListener("click", function (e) {
                e.preventDefault();
                //recuperer le lien de l'elemt cliqué
                new lightbox(e.currentTarget.getAttribute('href'));
            }));
    }

    //constructor
    /**
     * @param {string } url url de l'image
     */
    constructor(url) {
        const element = this.buildDom(url);
        document.body.appendChild(element);
        this.onKeyUp=this.onKeyUp.bind(this);
        /*lancer l'venement keyup au constructeur*/
        document.addEventListener('keyup', this.onKeyUp);

    }

    //fermer le lightbox
    /***
     * @param {Mousevent} e
     */
    close(e) {
        e.preventDefault();
        const lightboxOpendened = document.querySelector(".lightbox");
        lightboxOpendened.classList.add("close__lightbox");
        //forcer l'arret au bout de 500ms
        window.setTimeout(() => { lightboxOpendened.remove() }, 500);
        //supprime levent keyup apres avooir fermer la fenetre
        document.removeEventListener('keyup',this.onKeyUp);

    }

    /***
     * @param{keyboard event} e
     */
    onKeyUp(e) {
        if (e.key === "Escape") {
            this.close(e);
        }
    }

    buildDom(url) {

        const domLightbox = document.createElement("div");
        domLightbox.classList.add("lightbox");
        domLightbox.innerHTML = `
   
            <button class="lightbox__Close"><i class="fa-solid fa-xmark"></i></button>
            <button class="lightbox__next"><i class="fa-solid fa-angle-right"></i></button>
            <button class="lightbox__prev"><i class="fa-solid fa-angle-left"></i></button>

            <div class="lightbox__container">
                <img src="${url}" alt="image lightbox">
        

            </div>`
        domLightbox.querySelector('.lightbox__Close').addEventListener('click',
            this.close.bind(this));

        return domLightbox;
    }

}
//lightbox.init();


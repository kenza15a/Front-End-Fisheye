export default class lightbox {
    static init() {
        //slectionner le liens qui mennents vers des images
        let links = document.querySelectorAll('[href$=".jpg"],[href$=".mp4"]')
            .forEach(link => link.addEventListener("click", function (e) {
                e.preventDefault();
                //recuperer le lien de l'elemt cliqué
                new lightbox(e.currentTarget.getAttribute('href'));
            }));

        console.log("les liens des images");
        console.log(links);
    }

    //constructor
    /**
     * @param {string } url url de l'image
     */
    constructor(url) {
        const element = this.buildDom(url);
        document.body.appendChild(element);


    }

    buildDom(url) {

        const dom = document.createElement("div");
        dom.classList.add("lightbox");
        dom.innerHTML = `
   
            <button class="lightbox__Close"><i class="fa-solid fa-xmark"></i></button>
            <button class="lightbox__next"><i class="fa-solid fa-angle-right"></i></button>
            <button class="lightbox__prev"><i class="fa-solid fa-angle-left"></i></button>

            <div class="lightbox__container">
                <img src="${url}" alt="image lightbox">

            </div>`


        return dom;
    }

}


//lightbox.init();


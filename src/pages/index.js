
/*imports*/
import photographerApi from "../api/photographerApi.js";
import photographerFactory from "../factories/photographerFactory.js";

export default class index {
    constructor() {

    }
    async getPhotographers() {

        /*fetch*/
        const photographersSection = document.querySelector(".photographer_section");
        const url = "../data/photographers.json";
        const api2 = new photographerApi(url);
        const photographersData = api2.getAllPhotographer();

        return photographersData;
    }

    async displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        photographers.forEach((photographer) => {
            const photographersF = new photographerFactory(photographer);
            const userCardDOM = photographersF.getUserCardDOM().article;
            photographersSection.appendChild(userCardDOM);
        });
    }

    async init() {
        // Récupère les datas des photographes
        const { photographers } = await this.getPhotographers();
        this.displayData(photographers);
    }
    //init();
}

const indexhtml = new index();
//indexhtml.getPhotographers(); //dupplicate
indexhtml.init();
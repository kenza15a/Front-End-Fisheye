
async function getPhotographers() {


    // fetch('')

    const url = "./data/photographers.json";
    let response = await fetch(url);
    const { photographers, media } = await response.json(); //recuperer les data dans deux arrays photographers et media

    //const data= await response.json();
    //console.log(data);
    console.log(photographers);
    console.log(media);
    //creation des element html
    //const section = document.querySelector(".photographer_section");

    //remplir la section---->display dta 
    //remplir photographes
    /* photographers.forEach((photographer) => {//parcourir l'objet
 
         //recuperer les elements 
         const name = photographer.name;
         const city = photographer.city;
         const tagline = photographer.tagline;
         //const coma=",";
         //creation des elements html
         const divPhotographer = document.createElement("div");//div pour caque photographer
         section.appendChild(divPhotographer);
         //append name
         const nameH2 = document.createElement("h2");
         nameH2.innerText = name;
         divPhotographer.appendChild(nameH2);
         //append city
         const cityh3 = document.createElement("h3");
         cityh3.innerText = city;
         nameH2.parentNode.insertBefore(cityh3, nameH2.nextSibling);
 
         //append tagline
         const taglineH6 = document.createElement("h6");
         taglineH6.innerText = tagline;
         divPhotographer.insertBefore(taglineH6, cityh3.nextSibling);
 
 
     });*/

    return {
        photographers,
    }


}

const photographers = getPhotographers();
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};
init();

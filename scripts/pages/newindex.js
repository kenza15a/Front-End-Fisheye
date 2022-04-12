async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json

    // fetch('')

    /*fetch('./data/photographers.json')
        .then(response => response.json())
        .then(data => console.log(data));*/
    const url = "./data/photographers.json";
    const response = await fetch(url);
    const { photographers, media } = await response.json(); //recuperer les data dans deux arrays photographers et media

    //const data= await response.json();
    //console.log(data);
    console.log(photographers);
    console.log(media);
    //creation des element html
    const section = document.querySelector(".photographer_section");
    const divPhotographer = document.createElement("div");//div pour caque photographer
    const nameH2 = document.createElement("h2");
    const cityh3 = document.createElement("h3");
    const taglineH6 = document.createElement("h6");
    var name="";
    var city="";
    var tagline="";
    //remplir la section
    //remplir photographes
    photographers.forEach((photographer) => {//parcourir l'objet

        //recuperer les elements 
         name = photographer.name;
         city = photographer.city;
         tagline = photographer.tagline;
        //const coma=",";
        //creation des elements html

        //append name
        nameH2.innerText = name;
        divPhotographer.appendChild(nameH2);
        //append city

        cityh3.innerText = city;
        nameH2.parentNode.insertBefore(cityh3, nameH2.nextSibling);

        //append tagline

         taglineH6.innerText = tagline;
          cityh3.parentNode.insertBefore(taglineH6, cityh3.nextSibling);
          section.appendChild(divPhotographer);

    });
    

    return {
        photographers,
    }
    // for (const iterator of object) {
    //return photographers;

}


//we need to reurn data in photographers-----------------

//.then (data => (photographers = data.photographers));
// const photographers = data.getPhotographers();
/* const photographers = [
     {
         "name": "Ma data test",

         "id": 1,
         "city": "Paris",
         "country": "France",
         "tagline": "Ceci est ma data test",
         "price": 400,
         "portrait": "account.png"
     },
     {
         "name": "Autre data test",
         "id": 2,
         "city": "Londres",
         "country": "UK",
         "tagline": "Ceci est ma data test 2",
         "price": 500,
         "portrait": "account.png"
     },
 ]*/

// et bien retourner le tableau photographers seulement une fois
/*return ({
    photographers: [...photographers, ...photographers, ...photographers]
})*/
//}

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

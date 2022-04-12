/*imports*/
import  photographerApi  from "./api/photographerApi.js";
import  photographerFactory  from "./factories/photographerFactory1.js";  

/*fetch*/
const photographersSection = document.querySelector(".photographer_section");
const url = "./data/photographers.json";
const api2=new photographerApi(url);
const photographersData=api2.getAllPhotographer();
/*printdata*/
photographersData.forEach((photographer)=> {
const photographerCards=new photographerFactory(photographersData);
//const userCardDOM= photographers.getUserCardDOM();
photographersSection.appendChild(photographerCards.getUserCardDOM());
});


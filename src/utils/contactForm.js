export default class contactForm{
    constructor(){

    }
     displayModal() {
         alert("modal a afficher");
        const modal = document.getElementById("contact_modal");
        modal.style.display = "block";
    }
    
     closeModal() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";
    }
}




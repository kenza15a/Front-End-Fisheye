

//impoter lapi pour un fetch des photographers
import photographerApi from "../api/photographerApi.js";
export default class contactForm {
    constructor() {

        //recuperer l'identifiant du photographe
        const urlParams = new URLSearchParams(window.location.search);
        this.photographerId = urlParams.get("photographerId");
    }
    //recuperer le nom du photographe
    async getPhotographerName() {
        const url = "../data/photographers.json";
        const api = new photographerApi(url);
        const photographersData = (await api.getAllPhotographer()).photographers;

        for (let i = 0; i < photographersData.length; i++) {

            if (photographersData[i].id == this.photographerId) {
                var infos = photographersData[i];
                var name = infos.name;
                break;
            }
        }
        return name;
    }

    displayModal() {
        //  this.buildModal();
        const modal = document.getElementById("contact_modal");
        modal.style.display = "block";
    }

    closeModal() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";
    }
    //imprimer le contenu du formulaire
    printContactInfo(contactInfos) {
        console.log("informations de contact");
        console.log("Prénom" + contactInfos[0]);
        console.log("Nom" + contactInfos[1]);
        console.log("E-mail" + contactInfos[2]);
        console.log("Message" + contactInfos[3]);
    }

    async buildModal() {
        const id = this.photographerId;
        const photographerName = await this.getPhotographerName();
        /*console.log('photographers name');
        console.log(photographerName);*/
        const modalContent = document.getElementById("contact_modal");
        const contactFormDiv = document.createElement("div");
        contactFormDiv.classList.add("modal");
        contactFormDiv.setAttribute("role","dialog"); //accessiblité
        contactFormDiv.innerHTML = `
       
        <header>
          <img class="closebutton" src="assets/icons/close.svg" />
          <h2>Contactez-moi</br> ${photographerName}</h2> 
          
        </header>
        <form action="photographer.html?photographerId=${id}" method="post" target="photograph-media">

    <div>

      <label for="first">Prénom</label><br>
      <input type="text" id="first" name="first" /><br>
      <label for="last">Nom</label><br>
      <input type="text" id="last" name="last" /><br>
      <label for="email">E-mail</label><br>
      <input id="email" name="email" /><br>
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="5" cols="33"></textarea>
    </div>
    <button id="sendButton" class="contact_button">Envoyer</button>
  </form>

`;
        //apendchild
        modalContent.appendChild(contactFormDiv);

        //recuperer les composant du formulaire
        const firstName = document.getElementById("first").value;
        const lastName = document.getElementById("last").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;


        //tableau des informations de contact
        const contactInfos = [firstName, lastName, email, message];
        const closeButton = document.querySelector(".closebutton");
        closeButton.addEventListener("click", () => {
            this.closeModal()
        });
        /*("click",
            function () { modalContent.style.display = "none"; });*/
        const sendButton = document.getElementById("sendButton");
        return { modalContent, contactInfos, sendButton };
    }

    sendInfos(contactInfos, sendButton) {
        sendButton.addEventListener("click", (e) => {
        e.preventDefault();
            this.printContactInfo(contactInfos);
        });


    }

    //ajouter le onclick du bouton envoyer un cosole log des champs
}




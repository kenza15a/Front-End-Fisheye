

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
        //accéssibilité
        //document.body.setAttribute('aria-hidden', 'true')

        //ajouter hidder true to body 
        //  this.buildModal();
        const modal = document.getElementById("contact_modal");
        modal.style.display = "block";
    }

    closeModal() {
        //   document.body.setAttribute('aria-hidden', 'false')

        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";
    }

    async buildModal() {
        const id = this.photographerId;
        const photographerName = await this.getPhotographerName();
        /*console.log('photographers name');
        console.log(photographerName);*/
        const modalContent = document.getElementById("contact_modal");
        const contactFormDiv = document.createElement("div");
        contactFormDiv.classList.add("modal");
        // contactFormDiv.setAttribute("role", "dialog"); //accessiblité
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
        const closeButton = document.querySelector(".closebutton");
        closeButton.addEventListener("click", () => {
            this.closeModal()
        });
        /*("click",
            function () { modalContent.style.display = "none"; });*/
        const sendButton = document.getElementById("sendButton");
        return { modalContent, sendButton };
    }

    sendInfos(sendButton) {
        sendButton.addEventListener("click", (e) => {
            e.preventDefault();
            //recuperer les composant du formulaire
            const contactObj = {
                firstName: document.getElementById("first").value,
                lastName: document.getElementById("last").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            }
            //console.log(contactObj);
            //imprimer le contenu du formulaire

            console.log("informations de contact ");
            console.log("Prénom " + contactObj.firstName);
            console.log("Nom " + contactObj.lastName);
            console.log("E-mail " + contactObj.email);
            console.log("Message " + contactObj.message);

        });


    }

    //ajouter le onclick du bouton envoyer un cosole log des champs
}




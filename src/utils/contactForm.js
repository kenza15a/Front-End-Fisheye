/* eslint-disable no-undef */


//impoter lapi pour un fetch des photographers
import photographerApi from '../api/photographerApi.js';
export default class contactForm {
    constructor() {

        //recuperer l'identifiant du photographe
        const urlParams = new URLSearchParams(window.location.search);
        this.photographerId = urlParams.get('photographerId');
        this.onKeyUp = this.onKeyUp.bind(this);
        document.addEventListener('keyup', this.onKeyUp);
    }
    //recuperer le nom du photographe
    async getPhotographerName() {
        const url = '../data/photographers.json';
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
        const modal = document.getElementById('contact_modal');
        const modalDiv = document.querySelector('.modal');
        modal.style.display = 'block';
        //accéssibilité
        //ajouter no scroll au body
        document.body.classList.add('no-scrol');
        document.body.setAttribute('aria-hidden', 'true');
        modal.setAttribute('aria-hidden', 'false');
        modal.focus();
        modalDiv.setAttribute('aria-hidden', 'false');
        modal.setAttribute('tabindex', '0');
    }

    closeModal() {
        const modal = document.getElementById('contact_modal');
        modal.style.display = 'none';
        //accéssibilité
        //ajouter hidden false to body 
        document.body.classList.remove('no-scrol');
        document.body.setAttribute('aria-hidden', 'false');
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('tabindex', '-1');

    }
    onKeyUp(e) {
        if (e.key === 'Escape') {
            this.closeModal();
        }

    }

    async buildModal() {
        const id = this.photographerId;
        const photographerName = await this.getPhotographerName();
        /*console.log('photographers name');
        console.log(photographerName);*/
        const modalContent = document.getElementById('contact_modal');
        const contactFormDiv = document.createElement('div');
        contactFormDiv.classList.add('modal');
        /* contactFormDiv.setAttribute("role", "dialog");*/
        contactFormDiv.setAttribute('aria-hidden', 'true');
        contactFormDiv.innerHTML = `
       
        <header id="modal_de_contact"role="header" aria-label="header du contact modal"  >
          <img class="closebutton" src="assets/icons/close.svg" alt="Fermer le modal de contact" />
          <h2 aria-label="${photographerName}">Contactez-moi</br> ${photographerName}</h2> 
          
        </header>
        <form action="photographer.html?photographerId=${id}" method="post" target="photograph-media">

                 <div>
                    <div role="group" id="coordonées"aria-labelledby="coordonées">
                        <label for="first">Prénom</label><br>
                        <input aria-required=true type="text" id="first" name="first" placeholder=" Votre prénom"  required/><br>
                        <label for="last">Nom</label><br>
                        <input aria-required=true type="text" id="last" name="last"  placeholder=" Votre Nom" required /><br>
                        <label for="email">E-mail</label><br>
                        <input aria-required=true id="email" name="email"  placeholder=" Votre Email" required/><br>
                        <label for="message">Message</label>
                    </div>
                    <div  aria-labelledby="votre message">
                    <textarea aria-required=true id="message" name="message" rows="5" cols="33"  placeholder=" Votre message (vous devez pas depasser les 5 lignes" required></textarea>
                    </div>
                  </div>
    <button type="submit" id="sendButton" class="contact_button">Envoyer</button>
  </form>

`;
        //apendchild
        modalContent.appendChild(contactFormDiv);
        const closeButton = document.querySelector('.closebutton');
        closeButton.addEventListener('click', () => {
            this.closeModal()
        });
        /*("click",
            function () { modalContent.style.display = "none"; });*/
        const sendButton = document.getElementById('sendButton');
        return { modalContent, sendButton };
    }

    sendInfos(sendButton) {
        sendButton.addEventListener('click', (e) => {
            e.preventDefault();
            //recuperer les composant du formulaire
            const contactObj = {
                firstName: document.getElementById('first').value,
                lastName: document.getElementById('last').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            }
            //console.log(contactObj);
            //imprimer le contenu du formulaire

            console.log('informations de contact ');
            console.log('Prénom ' + contactObj.firstName);
            console.log('Nom ' + contactObj.lastName);
            console.log('E-mail ' + contactObj.email);
            console.log('Message ' + contactObj.message);

        });


    }

    //ajouter le onclick du bouton envoyer un cosole log des champs
}




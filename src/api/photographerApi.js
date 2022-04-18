export default class photographerApi{
    constructor(url){

        this._url = url;
    }
    async getAllPhotographer(){
        let response = await fetch(this._url);
        const { photographers, media } = await response.json(); //recuperer les data dans deux arrays photographers et media
        console.log(photographers);
        console.log(media);
        return {
            photographers,
           //media
        }
    }

}





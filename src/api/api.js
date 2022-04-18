export default class api{
    constructor(url){

        this._url = url;
    }
    async getAllPhotographer(){
        let response = await fetch(this._url);
        const data = await response.json(); //recuperer les data dans deux arrays photographers et media
        data= {photographers,media};
        console.log(photographers);
        //console.log(media);
        return {
            data,
        }
    }

}





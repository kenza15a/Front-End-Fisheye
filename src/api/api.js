/* eslint-disable no-unused-vars */
export default class api{
    constructor(url){

        this._url = url;
    }
    async getAllPhotographer(){
        let response = await fetch(this._url);
        let  data = await response.json(); //recuperer les data dans deux arrays photographers et media
        const{photographers, media}=data;
        console.log(photographers);
        //console.log(media);
        return {
            data,
        }
    }

}





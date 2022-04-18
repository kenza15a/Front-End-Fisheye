export default class mediaApi{
    constructor(url){

        this._url = url;
    }
    async getAllMedia(){
        let response = await fetch(this._url);
        const { photographers, media } = await response.json(); //recuperer les data dans deux arrays photographers et media
        console.log(media);
        return  {
            media,
        }
    }

}

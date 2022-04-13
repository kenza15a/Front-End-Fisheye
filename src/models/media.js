class media{
    constructor(id,photographerId,title,image,likes,date,price){
        this._id=id;
        this._photographerId=photographerId;
        this._title=title;
        //this._image=  il faut importer les images 
        this._likes=likes;
        this._date=date;
        this._price=price;

        
    }
/**getters */
    get title(){
        return this._title;
        
    }
    get image(){
        return this._image;
        
    }
    get likes(){
        return this._likes;
        
    }
    get date(){
        return this._date;
        
    }
    get price(){
        return this._price; 
    }
}
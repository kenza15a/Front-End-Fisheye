export default class photographer {
    constructor(id, name, city, country, tagline, price, portrait) {
        this._name = name;
        this._id = id;
        this._city = city;
        this._country = country;
        this._tagline = tagline;
        this._price = price;
        this._portrait = portrait;


    }
    /**getters */
    getName() {
        return this._name;

    }
    getId() {
        return this._id;
    }
    getCity() {
        return this._city;
    }
    getCountry() {
        return this._country;
    }
    getTagline() {
        return this._Tagline;
    }
    getPrice() {
        return this._price;
    }
    getPortrait() {
        return this._portrait;
    }
}

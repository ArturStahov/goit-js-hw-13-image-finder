
export class ApiServer {

    constructor() {
        this.baseUrl = `https://pixabay.com/api/?image_type=photo&orientation=horizontal`;
        this.key = `18487031-50da0da9ba31764b7f32dc2fc`;
        this.page = 1;
        this.userInput = "";

    }

    search(userInput) {
        this.page = 1;
        this.userInput = userInput;
        return this.serverConnect();
    }

    nextPage() {
        this.page += 1;
        return this.serverConnect();
    }

    async serverConnect() {
        try {
            const data = await fetch(`${this.baseUrl}&q=${this.userInput}&page=${this.page}&per_page=12&key=${this.key}`)
            const { hits } = await data.json()
            return hits
        } catch (eror) {
            throw eror
        }

    }








}
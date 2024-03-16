class Item {
    constructor(name, price, image, sellerId, status, timesSold, buyers = [] ){
        this.name = name
        this.price = price
        this.image = image
        this.sellerId = sellerId
        this.status = status
        this.timesSold = timesSold
        this.buyers = buyers
    }
}
class Item {
    constructor(name, price, image, sellerId, status, timesSold, buyers = [] , quantity){
        this.name = name
        this.price = price
        this.image = image
        this.sellerId = sellerId
        this.status = status
        this.timesSold = timesSold
        this.buyers = buyers
        this.quantity =quantity
    }
}
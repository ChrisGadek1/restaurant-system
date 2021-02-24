export class Basket {
    userID: string;
    dishes?:{
        dishID: string;
        price: number;
        number: number
    }[]
}

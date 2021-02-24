export class Dish {
    name: string;
    desc: string;
    price: number;
    type: string;
    ID: string;
    photoURL: string;
    constructor(name: string, desc: string, price: number, type:string){
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.type = type;
    }
}

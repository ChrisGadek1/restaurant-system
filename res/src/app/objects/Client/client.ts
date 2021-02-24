export class Client {
    name: string;
    surname: string;
    email: string;
    street: string;
    number: string;
    secondNumber?: string;
    postcode: string;
    phoneNumber: string;
    cardNumber?: string;
    ID: string;
    constructor(name: string,surname:string, email:string,  street:string, number: string, postcode: string, phoneNumber: string){
        this.name = name;
        this.surname = surname;
        this.street = street;
        this.postcode = postcode;
        this.number = number;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}

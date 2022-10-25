import {Role} from "./Role";

export class User{
    id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    userName!: string;
    password!: string;
    role!: Role;
    phone!: number;
    country!: string;
    picture!: any;
    isSelected?:any;




}

import { Photo } from "./photo";

export class profilModel {
  id: string;
  fullname: string;
  name: string;
  surname: string;
  email: string;
  formation: string;
  experience: string;
  skills : string[];
  cv : Photo ;
  phoneNumber : string ;
  universite : string[];
  workplace : string ; 
  localisation : string ;
  skillsnotconfirmed : string[] ;
}
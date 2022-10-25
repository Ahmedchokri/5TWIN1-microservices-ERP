import { ContactsModel } from "../../contacts/contacts.model";
import { profilModel } from "../../profil/profil";
import { CallModel } from "./call.model";
import { Countrymodel } from "./country.model";
import { opportunityanalysis } from "./opportunityanalysis.model";
import { QuoteModel } from "./quote.model";

export class OpportunitiesModel {
  id: string;
  opportunityName: string;
  description: string;
  amount: number;
  status: string;
  opportunityType: string;
  country: Countrymodel;
  priority: string;
  contact : ContactsModel ;
  user : string;
  profils : profilModel[] ;
  quotes : QuoteModel[];
  calls : CallModel[];
  opportunityanalysis : opportunityanalysis;
  reasonlost:String;
  dateclosed :Date;
}
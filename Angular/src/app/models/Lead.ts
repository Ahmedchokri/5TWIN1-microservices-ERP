import { LeadSource } from '../models/LeadSource'
import { LeadStatus } from '../models/LeadStatus'

export class Lead {

	id!: String;
    firstName!: any;
    lastName!: any;
    email!: any;
    phone!: any;
    picture!: any;
    leadSource!: LeadSource ;
    status !: LeadStatus;


}
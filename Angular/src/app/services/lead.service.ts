import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Lead } from '../models/Lead';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  private baseUrl=environment.url+"lead";

  constructor(private HttpClient : HttpClient) { }

  retrieveAllLeads(): Observable<Lead[]>{
    return this.HttpClient.get<Lead[]>(this.baseUrl+'/display');
  }

  retrieveNonConvertedLeads(): Observable<Lead[]>{
    return this.HttpClient.get<Lead[]>(this.baseUrl+'/displayNonConverted');
  }

  addLead(lead:any){
    return this.HttpClient.post(this.baseUrl+'/add',lead);
  }

  updateLead(lead:any){
    return this.HttpClient.put(this.baseUrl+'/update',lead);

  }

  updateLeadStatus(lead:any){
    return this.HttpClient.put(this.baseUrl+'/updateStatus',lead);

  }

  deleteLead(idLead: String){
    return this.HttpClient.delete(this.baseUrl+'/delete/'+idLead);
  }

  findLead(idLead: String){
    return this.HttpClient.get(this.baseUrl+'/retrive/'+idLead);
  }
}

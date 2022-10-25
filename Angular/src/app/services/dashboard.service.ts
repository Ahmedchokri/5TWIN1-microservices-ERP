import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "http://localhost:8080",
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpclient: HttpClient) { }


  leadsCount(){
    return this.httpclient.get("http://localhost:8080/lead/leads", httpOptions);
  }

  contactsCount(){
    return this.httpclient.get("http://localhost:8080/api/contacts", httpOptions);
  }

  accountsCount(){
    return this.httpclient.get("http://localhost:8080/accounts", httpOptions);
  }


  leadsCountByMonth(){
    return this.httpclient.get("http://localhost:8080/lead/leadsByDate", httpOptions);
  }
  contactsCountByMonth(){
    return this.httpclient.get("http://localhost:8080/api/contactsByDate", httpOptions);
  }


  opportunitiesWonCountByYear(){
    return this.httpclient.get("http://localhost:8080/template/oppsWonByDate", httpOptions);
  }
  opportunitiesLostCountByYear(){
    return this.httpclient.get("http://localhost:8080/template/oppsLostByDate", httpOptions);
  }
  opportunitiesPendingCountByYear(){
    return this.httpclient.get("http://localhost:8080/template/oppsPendingByDate", httpOptions);
  }


  countAmountAllThisYear(){
    return this.httpclient.get("http://localhost:8080/template/amountOppAllThisYear", httpOptions);
  }
  countAmountWonThisYear(){
    return this.httpclient.get("http://localhost:8080/template/amountOppWonThisYear", httpOptions);
  }
  countAmountPendingThisYear(){
    return this.httpclient.get("http://localhost:8080/template/amountOppPendingThisYear", httpOptions);
  }

  opportunityByCountry(){
    return this.httpclient.get("http://localhost:8080/template/oppByCountry", httpOptions);
  }
  opportunityCount(){
    return this.httpclient.get("http://localhost:8080/template/countOpp", httpOptions);
  }


  leadsCountByStatus(){
    return this.httpclient.get("http://localhost:8080/lead/leadsByStatus", httpOptions);
  }

  oppsCountByStatus(){
    return this.httpclient.get("http://localhost:8080/template/oppsByStatus", httpOptions);
  }
}

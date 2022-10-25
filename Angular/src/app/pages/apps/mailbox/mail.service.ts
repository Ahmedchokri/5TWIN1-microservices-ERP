import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const PATH_OF_API = 'http://localhost:8080/mail';
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
export class MailService {

  constructor(private httpclient: HttpClient) { }

  sendSimpleMail(data: any){
    return this.httpclient.post(PATH_OF_API + '/sendSimpleMail',data, httpOptions);
  }

  sendAttachmentMail(data: any){
    return this.httpclient.post(PATH_OF_API + '/sendAttachmentMail',data, httpOptions);
  }



  getInboxMails(username:any,password:any){
    return this.httpclient.get(PATH_OF_API + '/getMailsInbox/'+username+"@sapres.de/"+password, httpOptions);
  }

  getSentMails(username:any,password:any){
    return this.httpclient.get(PATH_OF_API + '/getMailsSent/'+username+"@sapres.de/"+password, httpOptions);
  }

  getArchiveMails(username:any,password:any){
    return this.httpclient.get(PATH_OF_API + '/getMailsArchive/'+username+"@sapres.de/"+password, httpOptions);
  }

  getDraftMails(username:any,password:any){
    return this.httpclient.get(PATH_OF_API + '/getMailsDraft/'+username+"@sapres.de/"+password, httpOptions);
  }

  getTrashMails(username:any,password:any){
    return this.httpclient.get(PATH_OF_API + '/getMailsTrash/'+username+"@sapres.de/"+password, httpOptions);
  }

  getSpamMails(username:any,password:any){
    return this.httpclient.get(PATH_OF_API + '/getMailsSpam/'+username+"@sapres.de/"+password, httpOptions);
  }
}

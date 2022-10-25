/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Inject } from '@angular/core';
import { User } from '../../../account/models/user';
//import {Orders} from './data';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './users-sortable.directive';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

interface SearchResult {
  countries: User[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(countries: User[], column: SortColumn, direction: string) {
  return countries;

  /*else {
  return [...countries].sort((a, b) => {
    //const res = compare(a[column], b[column]);
    return direction === 'asc' ? res : -res;
  });
}*/
}

function matches(country: User, term: string, pipe: PipeTransform) {
  return country.userName.toLowerCase().includes(term.toLowerCase())



}

@Injectable({ providedIn: 'root' })
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<User[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    startIndex: 0,
    endIndex: 9,
    totalRecords: 0
  };
  ImgUrl: Array<String> = new Array();


  constructor(private pipe: DecimalPipe, private _http: HttpClient) {
    this.allUsers().subscribe((data: any) => {
      data.map((i: any) => {
        this.ImgUrl.push('data:image/png;base64,' + i.picture.data)
      })
      this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search(data)),
        delay(200),
        tap(() => this._loading$.next(false))
      ).subscribe((result:any) => {
        
        this._countries$.next(result.countries);
        this._total$.next(result.total);
      });

      this._search$.next();
    })
  }

  get countries$() { return this._countries$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get startIndex() { return this._state.startIndex; }
  get endIndex() { return this._state.endIndex; }
  get totalRecords() { return this._state.totalRecords; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }
  set startIndex(startIndex: number) { this._set({ startIndex }); }
  set endIndex(endIndex: number) { this._set({ endIndex }); }
  set totalRecords(totalRecords: number) { this._set({ totalRecords }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(data: any): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let countries = sort(data, sortColumn, sortDirection);

    // 2. filter
    countries = countries.filter(country => matches(country, searchTerm, this.pipe));
    const total = countries.length;

    // 3. paginate
    this.totalRecords = countries.length;
    this._state.startIndex = (page - 1) * this.pageSize + 1;
    //console.log(page)
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    countries = countries.slice(this._state.startIndex - 1, this._state.endIndex);
    return of({ countries, total });
  }
  // getOneTicket(id):Observable<TicketModel>{
  //   return this._http.get<TicketModel>('http://localhost:8102/template/getticket/'+id);
  // };


  allUsers(): Observable<User[]> {
    return this._http.get<User[]>('http://localhost:8080/api/user/all');
  };
  // addticket(ticket: any,idopportunity):Observable<TicketModel>{
  //   return this._http.post<TicketModel>('http://localhost:8102/template/addticket/'+idopportunity+'/62dfa4d5928a2b4471d2d587',ticket,this.httpOptions);
  //  }
  //  updateticket(ticket: any,idopportunity):Observable<TicketModel>{
  //   return this._http.put<TicketModel>('http://localhost:8102/template/updateticket/'+idopportunity+'/62dfa4d5928a2b4471d2d587',ticket,this.httpOptions);
  //  }
  //  deleteticket (ticketid:string): Observable<TicketModel> {
  //   return this._http.delete<TicketModel>("http://localhost:8102/template/deleteticket/"+ticketid,this.httpOptions);
  //  }

  //  getTicketsNumber():Observable<number>{
  //   return this._http.get<number>('http://localhost:8102/template/getticketNumber');
  // };



}
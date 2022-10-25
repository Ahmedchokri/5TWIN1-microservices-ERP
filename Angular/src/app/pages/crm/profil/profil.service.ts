import { DecimalPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap, throttleTime } from 'rxjs/operators';
import { OpportunitiesModel } from '../opportunities/list-view/list-view.model';
import { CallProfilModel } from '../profil-details/call_profil';
import { SortColumn, SortDirection } from './list-view-sortable.directive';
import { profilModel } from './profil';


interface SearchResult {
  countries: profilModel[];
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
function sort(countries: profilModel[], column: SortColumn, direction: string): profilModel[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column][column], b[column][column]);
      return direction === 'asc' ? res : -res;
    });
  }
}
const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function matches(country: profilModel, term: string, pipe: PipeTransform) {
  return country.fullname.toLowerCase().includes(term.toLowerCase());
}
@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
    }
  constructor(private _http:HttpClient,private pipe: DecimalPipe) {

    this.getlistprofils().subscribe(data => {  this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search(data)),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.countries);
      this._total$.next(result.total);
    });

    this._search$.next();
      })
      this._search$.next();
   }

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<profilModel[]>([]);
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
  countries: profilModel[];
total :number ;
 

  get countries$() { return this._countries$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get startIndex() { return this._state.startIndex; }
  get endIndex() { return this._state.endIndex; }
  get totalRecords() { return this._state.totalRecords; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }
  set startIndex(startIndex: number) { this._set({ startIndex }); }
  set endIndex(endIndex: number) { this._set({ endIndex }); }
  set totalRecords(totalRecords: number) { this._set({ totalRecords }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(countr:profilModel[]): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
//console.log(searchTerm)

   let countries = sort(countr, sortColumn, sortDirection);
   // 2. filter if (searchTerm){}
   countries = countries.filter(country => matches(country, searchTerm, this.pipe));
   const total = countries.length;
   // 3. paginate
   this.totalRecords = countries.length;
   this._state.startIndex = (page - 1) * this.pageSize + 1;
   this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
   if (this.endIndex > this.totalRecords) {
       this.endIndex = this.totalRecords;
   }
   countries = countries.slice(this._state.startIndex - 1, this._state.endIndex);
   return of({countries, total});
}
uploadcv(file){
  return this._http.post('/template/flask',file);
};
saveprofil( profil : any,dataValue){
  return this._http.post('http://localhost:8102/template/addprofil/'+dataValue,profil,this.httpOptions);
};
getlistprofils():Observable <profilModel[]>{
  return this._http.get<profilModel[]>('http://localhost:8102/template/getallprofil')
};
getprofil( id :String ):Observable<profilModel>{
  return this._http.get <profilModel>('http://localhost:8102/template/getprofil/'+id)
};

deleteprofil (profilid:string): Observable<profilModel> {
  return this._http.delete<profilModel>("http://localhost:8102/template/deleteprofil/"+profilid,this.httpOptions);
 }
 getopportunity( id :String ): Observable<OpportunitiesModel[]>{
  return this._http.get<OpportunitiesModel[]>('http://localhost:8102/template/get_Profil_Opportunities/'+id)
};
getCalls():Observable <CallProfilModel[]>{
  return this._http.get<CallProfilModel[]>('http://localhost:8102/template/getCallProfile')
};
saveCall(call,idOpp,idProfile) {
  return this._http.post('http://localhost:8102/template/addCallToProfile/'+idOpp+'/'+idProfile,call ,this.httpOptions)
};
getTickets(){
  return this._http.get('http://localhost:8102/template/getticket')
};

}

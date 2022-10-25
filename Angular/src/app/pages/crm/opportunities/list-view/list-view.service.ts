/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from "@angular/core";

import { BehaviorSubject, Observable, of, Subject } from "rxjs";

import { OpportunitiesModel } from "./list-view.model";
import { COUNTRIES } from "./data";
import { DecimalPipe } from "@angular/common";
import {
  debounceTime,
  delay,
  switchMap,
  tap,
  throttleTime,
} from "rxjs/operators";
import { SortColumn, SortDirection } from "./list-view-sortable.directive";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Countrymodel } from "./country.model";
import { QuoteModel } from "./quote.model";

interface SearchResult {
  countries: OpportunitiesModel[];
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

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(
  countries: OpportunitiesModel[],
  column: SortColumn,
  direction: string
): OpportunitiesModel[] {
  if (direction === "" || column === "") {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column][column], b[column][column]);
      return direction === "asc" ? res : -res;
    });
  }
}

function matches(
  country: OpportunitiesModel,
  term: string,
  pipe: PipeTransform
) {
  return country.opportunityName.toLowerCase().includes(term.toLowerCase());
}

@Injectable({ providedIn: "root" })
export class ListViewService {
  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "http://localhost:3000",
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'
    }),
  };
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<OpportunitiesModel[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: "",
    sortColumn: "",
    sortDirection: "",
    startIndex: 0,
    endIndex: 9,
    totalRecords: 0,
  };
  countries: OpportunitiesModel[];
  total: number;
  constructor(private pipe: DecimalPipe, private _http: HttpClient) {


    this.allopportunities().subscribe((data) => {
      this._search$
        .pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search(data)),
          delay(200),
          tap(() => this._loading$.next(false))
        )
        .subscribe((result) => {
          this._countries$.next(result.countries);
          this._total$.next(result.total);
        });

      this._search$.next();
    });
  }

  get countries$() {
    return this._countries$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }
  get startIndex() {
    return this._state.startIndex;
  }
  get endIndex() {
    return this._state.endIndex;
  }
  get totalRecords() {
    return this._state.totalRecords;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }
  set startIndex(startIndex: number) {
    this._set({ startIndex });
  }
  set endIndex(endIndex: number) {
    this._set({ endIndex });
  }
  set totalRecords(totalRecords: number) {
    this._set({ totalRecords });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(countr: OpportunitiesModel[]): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._state;
    //console.log(searchTerm)

    let countries = sort(countr, sortColumn, sortDirection);

    // 2. filter if (searchTerm){}
    countries = countries.filter((country) =>
      matches(country, searchTerm, this.pipe)
    );
    const total = countries.length;

    // 3. paginate
    this.totalRecords = countries.length;
    this._state.startIndex = (page - 1) * this.pageSize + 1;
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    countries = countries.slice(
      this._state.startIndex - 1,
      this._state.endIndex
    );
    
    return of({ countries, total });
  }

  allopportunities(): Observable<OpportunitiesModel[]> {
    return this._http.get<OpportunitiesModel[]>(
      "/template/spring/template/getlistopportunity",this.httpOptions
    );
  }
  allcountries() {
    return this._http.get<Countrymodel[]>(
      "/template/spring/template/getlistcountry"
    );
  }
  createOpportinity(
    opportunity,
    idcontact,
    idcountry
  ): Observable<OpportunitiesModel> {
    return this._http.post<OpportunitiesModel>(
      "/template/spring/template/assignopportunity/" +
        idcontact +
        "/" +
        idcountry,
      opportunity,
      this.httpOptions
    );
  }

  deleteopportunity(opportunityid): Observable<OpportunitiesModel> {
    return this._http.delete<OpportunitiesModel>(
      "/template/spring/template/deleteopp/" + opportunityid,
      this.httpOptions
    );
  }
  assignquotetoopp(quote, opportunityid) {
    return this._http.post<OpportunitiesModel>(
      "/template/template/assignquotetoopp/" + opportunityid,
      quote,
      this.httpOptions
    );
  }
  callasigntoopportunity(call, idoppo) {
    return this._http.post<OpportunitiesModel>(
      "/template/template/callasigntoopportunity/" + idoppo,
      call,
      this.httpOptions
    );
  }
  getopportunity(idoppo): Observable<OpportunitiesModel> {
    return this._http.get<OpportunitiesModel>(
      "/template/template/getopportunitybyid/" + idoppo,
      this.httpOptions
    );
  }
  setstatusoppo(status, idopp) {
    return this._http.post(
      "/template/template/changestatusopportunity/" + idopp,
      status,
      this.httpOptions
    );
  }
  affecteroppoanalysistoopp(oppanalysis , idopp){
    return this._http.post('/template/affecteroppoanalysistoopp/'+idopp,oppanalysis,this.httpOptions)
  }
  deletequote(idquote,idoppo){
    return this._http.delete('/template/delete/'+idquote+'/'+idoppo,this.httpOptions)
  }
  setfinalstatusoppo(oppfinalstage,idopp){
    return this._http.post('/template/setfinalstatusoppo/'+idopp,oppfinalstage,this.httpOptions)

  }
}

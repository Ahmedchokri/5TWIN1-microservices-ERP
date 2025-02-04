import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EventService } from '../../core/services/event.service';

//Logout
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { Router } from '@angular/router';

// Language
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  element: any;
  mode: string | undefined;
  @Output() mobileMenuButtonClicked = new EventEmitter();

  flagvalue: any;
  valueset: any;
  countryName: any;
  cookieValue: any;

  user: any;
  userId: any;
  ImgUrl: any;
  roleName: any;

  constructor(@Inject(DOCUMENT) private document: any,private eventService: EventService, public languageService: LanguageService,
  public _cookiesService: CookieService, public translate: TranslateService, 
  private token: TokenStorageService, private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.element = document.documentElement;

     // Cookies wise Language set
     this.cookieValue = this._cookiesService.get('lang');
     const val = this.listLang.filter(x => x.lang === this.cookieValue);
     this.countryName = val.map(element => element.text);
     if (val.length === 0) {
       if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.svg'; }
     } else {
       this.flagvalue = val.map(element => element.flag);
     }


     this.getUserId()
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
     toggleMobileMenu(event: any) {
      event.preventDefault();
      this.mobileMenuButtonClicked.emit();
    }

  /**
   * Fullscreen method
   */
   fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  /**
  * Topbar Light-Dark Mode Change
  */
   changeMode(mode: string) {
    this.mode = mode;
    this.eventService.broadcast('changeMode', mode);

    switch (mode) {
      case 'light':
        document.body.setAttribute('data-layout-mode', "light");
        document.body.setAttribute('data-sidebar', "light");
        break;
      case 'dark':
        document.body.setAttribute('data-layout-mode', "dark");
        document.body.setAttribute('data-sidebar', "dark");
        break;
      default:
        document.body.setAttribute('data-layout-mode', "light");
        break;
    }
  }

  /***
   * Language Listing
   */
   listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Española', flag: 'assets/images/flags/spain.svg', lang: 'es' },
    { text: 'Deutsche', flag: 'assets/images/flags/germany.svg', lang: 'de' },
    { text: 'Italiana', flag: 'assets/images/flags/italy.svg', lang: 'it' },
    { text: 'русский', flag: 'assets/images/flags/russia.svg', lang: 'ru' },
    { text: '中国人', flag: 'assets/images/flags/china.svg', lang: 'ch' },
    { text: 'français', flag: 'assets/images/flags/Flag_of_France3.svg', lang: 'fr' }
  ];

  /***
   * Language Value Set
   */
   setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Logout the user
   */
   logout() {
    this.token.logout();
    this.router.navigate(['/auth/login']);
  }

  getUserId(){
    this.authService.getUser().subscribe(
      (data: any)=>{
        //console.log(data)
        this.user = data
        this.userId = data.id

        this.ImgUrl = 'data:image/png;base64,' + data.picture.data

        if(this.user.role.name === "ROLE_ADMIN"){
          this.roleName="Admin"
         } else {
          this.roleName="Commercial Agent"
         }
      }
    )
  }

}

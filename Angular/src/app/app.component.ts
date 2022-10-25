import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'KriptonCRM';

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
    let d = Math.floor(Date.now() / 1000)

    if (this.authService.jwtExpire() < d) {
      this.tokenService.logout()
      this.router.navigate(['/auth/login']);
    }
  }
}

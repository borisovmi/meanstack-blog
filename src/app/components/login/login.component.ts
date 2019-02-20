import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if(this._authService.hasToken()){
      this._router.navigate(['/posts']);
    }
  }

  onSubmit({ value, valid }): void {
    this._authService.login(value.email, value.password)
      .subscribe((res: { token: string }) => {
        localStorage.setItem('token', res.token);
        this._router.navigate(['/posts']);
      }, err => {
        this.errorMessage = err.error;
      });
  }

}

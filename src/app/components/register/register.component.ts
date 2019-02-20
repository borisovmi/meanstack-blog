import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this._authService.hasToken()) this._router.navigate(['/posts']);
  }

  onSubmit({ value, valid }): void {
    this._authService.register(value)
      .subscribe((res: any) => {
        localStorage.setItem('token', res.headers.get('x-auth-token'));
        this._router.navigate(['/posts']);
      },
        err => this.errorMessage = err.error
      )
  }

}

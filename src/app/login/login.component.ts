import { Component, OnInit } from '@angular/core';
import { Login } from './login.model';
import { LoginService } from './login.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({

    templateUrl: '../login/login.component.html',
    providers: [LoginService]
})
export class LoginUserComponent implements OnInit {
    loginForm: FormGroup;
    login: Login;
    id: number;
    isFlag = true;
    constructor(private _loginService: LoginService, private _formBuilder: FormBuilder, private _router: Router) { }

    ngOnInit() {
        this.login = new Login(),
            this.loginForm = this._formBuilder.group({
                email: ['', [Validators.required]],
                password: ['', [Validators.required]]
            });
    }

    C_loginUser() {
        this.login = this.loginForm.value;
        this._loginService.S_loginUser(this.login).subscribe(
            resData => {
                this.id = resData;
                if (this.id > 0) {
                    this._router.navigate(['/searchCity', this.id]);
                    // this._router.navigate(['/userPersonal', this.id]);
                } else {
                    alert('please give valid credentials');

                    // this.isFlag = true;
                    // this._router.navigate(['/searchCity']);
                }


            });
        console.log(this.id);
    }
    C_registerUser() {
        this._router.navigate(['/registerUser']);

    }

    C_forgotPassword() {
        this._router.navigate(['/forgotPassword']);
    }

}


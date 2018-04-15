import { Component, OnInit } from '@angular/core';
import { Login, Result } from './login.model';
import { RegistrationService } from '../registration/registration.service';
import { LoginService } from './login.service';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({

    templateUrl: '../login/forgot.component.html',
    styleUrls: ['../login/login.component.css'],
    providers: [RegistrationService, LoginService]
})
export class ForgotPasswordComponent implements OnInit {
    forgotForm: FormGroup;
    isFlag = true;
    isEmailCheck: true;
    password: any;
    login: Login;
    rs: Result;

    constructor(private _registrationService: RegistrationService, private _loginService: LoginService,
        private _formBuilder: FormBuilder, private _router: Router) { }
    ngOnInit() {

        this.forgotForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    C_forgotPassword() {
        this.login = this.forgotForm.value;
        this._registrationService.S_emailExistence(this.login.email).subscribe(resData => {
            this.isEmailCheck = resData;
            console.log(this.isEmailCheck);
            this.isFlag = this.isEmailCheck;
            if (this.isEmailCheck) {


                // tslint:disable-next-line:no-shadowed-variable
                this._loginService.S_getPassword(this.login.email).subscribe(resData2 => {
                    this.rs = resData2;
                    this.password = this.rs.result;
                    console.log(this.password);
                    this.login.password = this.password;
                    alert('your password has been sent to your email id.');
                    this._router.navigate(['/loginUser']);
                    // tslint:disable-next-line:no-shadowed-variable
                    this._loginService.S_sendPassword(this.login).subscribe(resData => {
                        // alert('your password has been sent to your email id.');
                        // this._router.navigate(['/loginUser']);
                    });
                });
            }
        });
    }
}

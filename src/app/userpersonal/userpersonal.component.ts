import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';
import { UserPersonalService } from './userpersonal.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserPersonal } from './userpersonal.model';
import { LoginService } from '../login/login.service';
import { Login } from '../login/login.model';


@Component({

    templateUrl: '../userpersonal/userpersonal.component.html',
    styleUrls: ['../userpersonal/userpersonal.component.css'],
    providers: [UserPersonalService, RegistrationService, LoginService]
})
export class UserPersonalComponent implements OnInit {

    mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
    userPersonalForm: FormGroup;
    userPersonal: UserPersonal;
    isSameEmail = true;
    isEmailCheck = false;
    isContactCheck = false;
    isOldPassword = true;
    isSameNumber = true;
    isConfirm = true;
    isFlag: string;

    id: number;
    private number: string;
    private email: string;
    constructor(private _userPersonalService: UserPersonalService, private _loginService: LoginService, private _formBuilder: FormBuilder,
        private _router: Router, private _activatedRouter: ActivatedRoute, private _registrationService: RegistrationService) { }
    ngOnInit() {

        this.userPersonal = new UserPersonal();

        this.id = this._activatedRouter.snapshot.params['id'];

        this.userPersonalForm = this._formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.maxLength(30), Validators.email, Validators.email]],
            contactNumber: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
            oldPassword: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[1-9]{1}[a-z]{2}[A-Z]{3}$')]],
            password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[1-9]{1}[a-z]{2}[A-Z]{3}$')]],
            confirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[1-9]{1}[a-z]{2}[A-Z]{3}$')]]
        });

        this._userPersonalService.S_getUserInfo(this.id).subscribe(
            resData => {
                this.userPersonal = resData;
                this.number = this.userPersonal.contactNumber;
                this.email = this.userPersonal.email;
                console.log(this.userPersonal.name);
                console.log(this.userPersonal.lastName);
            });



    }

    C_userPersonal() {
        this.userPersonal = this.userPersonalForm.value;
        if (this.email !== this.userPersonal.email) {
            this.isSameEmail = false;
        }
        this.checkEmail(this.isSameEmail);

    }

    checkEmail(isSameEmail: boolean) {
        this.userPersonal = this.userPersonalForm.value;
        if (!isSameEmail) {
            this._registrationService.S_emailExistence(this.userPersonal.email).subscribe(
                resData => {
                    this.isEmailCheck = resData;
                });
        }
        if (this.number !== this.userPersonal.contactNumber) {
            this.isSameNumber = false;
        }
        this.checkContact(this.isSameNumber);
    }

    checkContact(isSameNumber: boolean) {
        if (!isSameNumber) {
            this._registrationService.S_contactExistence(this.userPersonal.contactNumber).subscribe(
                resData => {
                    this.isContactCheck = resData;
                });
        }
        this.checkOldPassword();
    }
    checkOldPassword() {
        const login = new Login();
        login.email = this.email;
        login.password = this.userPersonal.oldPassword;
        this._loginService.S_loginUser(login).subscribe(
            resData => {
                this.isOldPassword = resData;
                if (this.isOldPassword) {
                    if (this.userPersonal.password === this.userPersonal.confirmPassword) {
                        this._userPersonalService.S_updateUser(this.userPersonal, this.id).subscribe(
                            // tslint:disable-next-line:no-shadowed-variable
                            resData => {
                                this.isFlag = resData;
                                if (this.isFlag) {

                                    this._router.navigate(['/loginUser']);
                                }
                            });
                    } else {
                        this.isConfirm = false;
                    }
                } else {
                    this.isOldPassword = false;
                }
            });
    }

}

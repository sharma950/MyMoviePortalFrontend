import { SearchService } from './../search/search.service';
import { AdminService } from './admin.service';
import { Component, OnInit } from '@angular/core';
import { Admin } from './admin.model';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from '../search/city.model';
import { Theatres } from '../search/theatre.model';
import { Movie } from '../search/movie.model';
import { AuthenticationService } from '../authentication.service';


@Component({

    templateUrl: '../login/admin.component.html',
    styleUrls: ['../login/login.component.css'],
    providers: [AdminService, SearchService, AuthenticationService]
})

export class AdminComponent implements OnInit {
    insertForm: FormGroup;
    deleteForm: FormGroup;
    admin: Admin;
    value: string;
    activeFlag = false;
    insertFlag = false;
    deleteFlag = false;
    city: City;
    cityArray: City[];
    theatre: Theatres;
    theatreArray: Theatres[];
    movie: Movie;
    movieArray: Movie[];
    constructor(private _formBuilder: FormBuilder, private _router: Router, private _adminService: AdminService,
        private _searchService: SearchService, private _authenticationService: AuthenticationService) { }


    ngOnInit() {
        this.admin = new Admin();
        this.city = new City();
        this.theatre = new Theatres();
        this._authenticationService.checkCredentials();
    }

    activeValue(str: string) {
        this.activeFlag = true;
        if (str === 'c') {

            this.value = 'city';
        }
        if (str === 't') {
            this.value = 'theatre';
        }
        if (str === 'm') {
            this.value = 'movie';
        }
        console.log(this.value);

    }

    insertFormData() {
        this.insertFlag = true;
        this.deleteFlag = false;
        this.insertForm = this._formBuilder.group({
            cityName: [''],
            theatreName: [''],
            movieName: ['']
        });
    }

    insertData() {
        if (this.value === 'city') {
            this.admin = this.insertForm.value;
            console.log(this.admin.cityName);
            this._adminService.S_insertCity(this.admin).subscribe(
                resData => {
                    this.city = resData;
                    if (this.city.cityName === '' || this.city.cityName === undefined || this.city.cityName === null) {
                        alert('please give city');
                    }
                    alert(this.city.cityName + ' successfully added in city list.');
                    this.insertFlag = false;
                });

        }
        if (this.value === 'theatre') {
            this.admin = this.insertForm.value;
            console.log(this.admin.theatreName);
            this._adminService.S_insertTheatre(this.admin).subscribe(
                resData => {
                    this.theatre = resData;
                    alert(this.theatre.theatreName + ' successfully added in theatre list.');
                    this.insertFlag = false;
                });
        }

        if (this.value === 'movie') {
            this.admin = this.insertForm.value;
            console.log(this.admin.theatreName);
            this._adminService.S_insertMovie(this.admin).subscribe(
                resData => {
                    this.movie = resData;
                    alert(this.movie.movieName + ' successfully added in movie list.');
                    this.insertFlag = false;
                });
        }

    }



    deleteFormData() {
        this.deleteFlag = true;
        this.insertFlag = false;
        this._searchService.S_getCities().subscribe(resData => this.cityArray = resData);
        this._adminService.S_getTheatres().subscribe(resData => this.theatreArray = resData);
        this._adminService.S_getMovies().subscribe(resData => this.movieArray = resData);
        this.deleteForm = this._formBuilder.group({
            cityName: [''],
            theatreName: [''],
            movieName: ['']
        });
    }

    deleteData() {
        if (this.value === 'city') {
            this.admin = this.deleteForm.value;
            console.log(this.admin.cityName);
            this._adminService.S_deleteCity(this.admin).subscribe(
                resData => {
                    this.city = resData;
                    alert(this.city.cityName + ' successfully deleted from city list.');
                    this.deleteFlag = false;
                });

        }
        if (this.value === 'theatre') {
            this.admin = this.deleteForm.value;
            console.log(this.admin.theatreName);
            this._adminService.S_deleteTheatre(this.admin).subscribe(
                resData => {
                    this.theatre = resData;
                    alert(this.theatre.theatreName + ' successfully deleted from theatre list.');
                    this.deleteFlag = false;
                });

        }

        if (this.value === 'movie') {
            this.admin = this.deleteForm.value;
            console.log(this.admin.movieName);
            this._adminService.S_deleteMovie(this.admin).subscribe(
                resData => {
                    this.movie = resData;
                    alert(this.movie.movieName + ' successfully deleted from movie list.');
                    this.deleteFlag = false;
                });

        }
    }


    logout() {
        this._authenticationService.logout();
    }
}

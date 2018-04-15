import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { MovieTheatre } from './seatBooking.model';
import { SeatBooking } from './seatBooking.model';

@Injectable()
export class SearchService {
    constructor(private _http: Http) { }

    S_getCities() {
        return this._http.get('http://localhost:8080/mymovieportal/city/getCities').map(
            (response: Response) => response.json()
        );
    }
    S_getTheatres(cityId: string) {
        return this._http.get('http://localhost:8080/mymovieportal/theatre/getTheatres/' + cityId).map(
            (response: Response) => response.json()
        );
    }
    S_getMovies(theatreId: string) {
        return this._http.get('http://localhost:8080/mymovieportal/movie/getMovies/' + theatreId).map(
            (response: Response) => response.json()
        );
    }

    S_getTimes(movieTheatre: MovieTheatre) {
        return this._http.post('http://localhost:8080/mymovieportal/movie/getShowtime', movieTheatre).map(
            (response: Response) => response.json()
        );
    }
}

@Injectable()
export class SharedData{
    seatbooking:SeatBooking;
    constructor(private _http: Http) { }

    setSeatData(cityId:string,theatreId:string,movieId:string,showTime:string){
        this.seatbooking.sbCityId = cityId;
        this.seatbooking.sbTheatreId = theatreId;
        this.seatbooking.sbMovieId = movieId;
        this.seatbooking.sbShowTime = showTime;
    }

    getSeatData:SeatBooking{
        return SeatBooking;
    }
}

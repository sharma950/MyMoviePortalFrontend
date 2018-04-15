import { Theatres } from './theatre.model';
import { City } from './city.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from './search.service';
import { Movie } from './movie.model';
import { SeatBooking, MovieTheatre } from './seatBooking.model';
import { SeatSelectionComponent } from './search.seatselection.component';


@Component({

    templateUrl: '../search/search.component.html',
    providers: [SearchService],
    //  directives: [SeatSelectionComponent]
})

export class SearchCityComponent implements OnInit {
    cities: City[];
    selectedCity: string;
    theatres: Theatres[];
    movies: Movie[];
    id: number;
    seatBooking: SeatBooking;
    movieTheatre: MovieTheatre;
    times: Array<string> = new Array;
    constructor(private _searchService: SearchService, private _router: Router, private _activatedRouter: ActivatedRoute) { }

    ngOnInit() {
        this.seatBooking = new SeatBooking();
        this.movieTheatre = new MovieTheatre();
        this.id = this._activatedRouter.snapshot.params['id'];
        this._searchService.S_getCities().subscribe(resData => this.cities = resData);
    }

    getTheatres(cityId: string) {
        console.log(cityId);
        this.seatBooking.sbCityId = cityId;
        this._searchService.S_getTheatres(cityId).subscribe(resData => this.theatres = resData);
    }
    getMovies(theatreId: string) {
        console.log(theatreId);
        this.seatBooking.sbTheatreId = theatreId;
        this.movieTheatre.mtTheatreId = theatreId;
        this._searchService.S_getMovies(theatreId).subscribe(resData => this.movies = resData);
    }

    getShowTime(movieId: string) {
        console.log(movieId);
        this.seatBooking.sbMovieId = movieId;
        this.movieTheatre.mtMovieId = movieId;
        this._searchService.S_getTimes(this.movieTheatre).subscribe(resData => {
            this.times = resData;
            console.log(this.times);

        });
    }
    getSeats(time: string) {
        this.seatBooking.sbShowTime = time;

    }

    goToSeats() {
        this.seatBooking.setSeatData(this.seatBooking.sbCityId, this.seatBooking.sbTheatreId,
            this.seatBooking.sbMovieId, this.seatBooking.sbShowTime);
        this._router.navigate(['/seatSelection']);

    }
}

import { SeatBooking, ConfirmSeatMail, MovieTheatre } from './../search/seatbooking.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search/search.service';
import { Movie } from '../search/movie.model';
import { Result } from '../login/login.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

// Component decorator
@Component({
    // selector: 'seat-list',
    templateUrl: './seat.component.html',
    styleUrls: ['./seat.component.css', './seat2.component.css'],
    providers: [SearchService, AuthenticationService]
})
export class SeatComponent implements OnInit {
    // variable declarations
    movieTitle; //  = 'Captain America: The Winter Soldier';
    screen = 'LUXE CINEMAS';
    time = 'FRI, 6:45PM';

    rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    cols: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    i: number;
    id: number;
    reserved: Array<string> = new Array;
    selected: string[] = [];
    str: string;
    ticketPrice = 120;
    convFee = 30;
    totalPrice = 0;
    currency = 'Rs';
    discount: number;

    confirmSeatMail: ConfirmSeatMail;
    seatBookingArray: Array<SeatBooking> = new Array;
    seatBooking: SeatBooking;
    movieTheatre: MovieTheatre;
    movie: Movie;
    role: string;
    rs: Result;

    public constructor(private route: ActivatedRoute, private _searchService: SearchService, private _router: Router,
        private _authenticationService: AuthenticationService) {
        this.seatBooking = new SeatBooking();
        this.movieTheatre = new MovieTheatre();
        this.confirmSeatMail = new ConfirmSeatMail();
        this.route.queryParams.subscribe(params => {
            this.seatBooking.sbCityId = params['cityId'];
            this.seatBooking.sbTheatreId = params['theatreId'];
            this.seatBooking.sbMovieId = params['movieId'];
            this.seatBooking.sbShowTime = params['showTime'];
            this.seatBooking.sbDate = params['showDate'];
            this.id = params['userId'];
            this.role = params['role'];
            console.log('======' + this.id);
        });
        this._searchService.S_getSeats(this.seatBooking).subscribe(resData => {
            this.reserved = resData;
        });
    }

    ngOnInit() {

        if (this.role !== 'guest') {
            this._authenticationService.checkCredentials();
        }

        this.movieTheatre.mtMovieId = this.seatBooking.sbMovieId;
        this.movieTheatre.mtTheatreId = this.seatBooking.sbTheatreId;
        this.rs = new Result();

        this._searchService.S_getDiscount(this.movieTheatre).subscribe(resData => {
            this.discount = resData;
            this.discount = (this.discount / 100);
        });


        this._searchService.S_getMovie(this.seatBooking.sbMovieId).subscribe(resData => {
            this.movie = resData;
            this.movieTitle = this.movie.movieName;

        });
        this.time = this.seatBooking.sbDate + '   ' + this.seatBooking.sbShowTime;
    }


    // return status of each seat
    getStatus = function (seatPos: string) {
        if (this.reserved.indexOf(seatPos) !== -1) {
            return 'reserved';
        } else if (this.selected.indexOf(seatPos) !== -1) {
            return 'selected';
        }
    };
    // clear handler
    clearSelected = function () {
        this.selected = [];
    };
    // click handler
    seatClicked = function (seatPos: string) {
        const index = this.selected.indexOf(seatPos);

        if (index !== -1) {
            // seat already selected, remove
            this.selected.splice(index, 1);
        } else {
            // push to selected array only if it is not reserved
            if (this.reserved.indexOf(seatPos) === -1) {
                this.selected.push(seatPos);
            }
        }
    };

    // Buy button handler
    showSelected = function () {
        if (this.selected.length > 0) {
            console.log(this.selected.length);
            for (this.i = 0; this.i < this.selected.length; this.i++) {
                this.seatBookingArray[this.i] = new SeatBooking();
                this.seatBookingArray[this.i].sbCityId = this.seatBooking.sbCityId;
                this.seatBookingArray[this.i].sbTheatreId = this.seatBooking.sbTheatreId;
                this.seatBookingArray[this.i].sbMovieId = this.seatBooking.sbMovieId;
                this.seatBookingArray[this.i].sbShowTime = this.seatBooking.sbShowTime;
                this.seatBookingArray[this.i].sbDate = this.seatBooking.sbDate;
                this.seatBookingArray[this.i].seatName = this.selected[this.i];
                this.confirmSeatMail.seatNames[this.i] = this.selected[this.i];
                this.seatBookingArray[this.i].sbUserId = this.id;

            }
            console.log(this.seatBookingArray);
            this._searchService.S_setSeats(this.seatBookingArray).subscribe(resData => {
                this.reserved = resData;
            });

            alert('Selected Seats: ' + this.selected + '\nTotal: ' + (this.ticketPrice * this.selected.length + this.convFee));
            alert('Please check your mail.\nConfiramtion mail has been sent to your mail address');
            this._router.navigate(['/searchCity', this.id]);

            this.confirmSeatMail.date = this.seatBooking.sbDate;
            this.confirmSeatMail.time = this.seatBooking.sbShowTime;
            this.confirmSeatMail.theatreId = this.seatBooking.sbTheatreId;
            this.confirmSeatMail.movieId = this.seatBooking.sbMovieId;
            this.confirmSeatMail.id = this.id;


            // console.log('======' + this.ConfirmSeatMail.id);

            this._searchService.S_confirmSeatMail(this.confirmSeatMail).subscribe(resData => {
                this.rs.result = resData;
                console.log(this.rs.result);
            });


        } else {
            alert('No seats selected!');
        }

    };


    logout() {
        this._authenticationService.logout();
    }


    previousPage() {
        if (this.role === 'guest') {
            this.id = 0;
        }
        this._router.navigate(['/searchCity', this.id]);
    }
}

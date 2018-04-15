export class SeatBooking {
    sbCityId: string;
    sbTheatreId: string;
    sbMovieId: string;
    sbShowTime: string;
    sbSeatName: string;

    setSeatData(cityId:string,theatreId:string,movieId:string,showTime:string){
        this.sbCityId = cityId;
        this.sbTheatreId = theatreId;
        this.sbMovieId = movieId;
        this.sbShowTime = showTime;
    }

    getSeatData:SeatBooking(){
        return SeatBooking;
    }
}



export class MovieTheatre {
    mtMovieId: string;
    mtTheatreId: string;
}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './login/login.component';
import { RegisterUserComponent } from './registration/registration.component';
import { UserPersonalComponent } from './userpersonal/userpersonal.component';
import { SearchCityComponent } from './search/search.component';
import { ForgotPasswordComponent } from './login/forgot.component';
import { SeatSelectionComponent } from './search/search.seatselection.component';
const routes: Routes = [
    {
        path: '',
        redirectTo: '/loginUser',
        pathMatch: 'full'
    },
    {
        path: 'loginUser',
        component: LoginUserComponent
    },
    {
        path: 'registerUser',
        component: RegisterUserComponent
    },
    {
        path: 'userPersonal/:id',
        component: UserPersonalComponent
    },
    {
        path: 'searchCity/:id',
        component: SearchCityComponent
    },
    {
        path: 'forgotPassword',
        component: ForgotPasswordComponent
    },
    {
        path: 'seatSelection',
        component: SeatSelectionComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [LoginUserComponent, RegisterUserComponent, UserPersonalComponent,
    SearchCityComponent, ForgotPasswordComponent, SeatSelectionComponent];

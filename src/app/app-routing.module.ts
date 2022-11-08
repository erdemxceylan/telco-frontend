import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './components/guards/login.guard';
import { ServicesService } from './services/service.service';
import { IndividualCustomersComponent } from './components/customers/individualCustomers/individualCustomers.component';
import { CorporateCustomersComponent } from './components/customers/corporate-customers/corporate-customers.component';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail/customer-detail.component';
import { CorporateCustomersDetailComponent } from './pages/corporate-customer-detail/corporate-customers-detail/corporate-customers-detail.component';


const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'login',component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [LoginGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'services',
        component: CardsComponent
      },
      {
        path: 'individualCustomers',
        component: IndividualCustomersComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'corporateCustomers',
        component: CorporateCustomersComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'individualCustomers/details/:id',
        component: CustomerDetailComponent
      },
      {
        path: 'corporateCustomers/details/:id',
        component: CorporateCustomersDetailComponent
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

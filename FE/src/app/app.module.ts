import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountInfoComponent } from './account-info/account-info.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthInterceptor } from './Services/Web/connect-api.service';
import { MyModalComponent } from './my-modal/my-modal.component';
import { MyAddbankComponent } from './my-addbank/my-addbank.component';
import { MyAddmoneyComponent } from './my-addmoney/my-addmoney.component';
import { MyGetoutmoneyComponent } from './my-getoutmoney/my-getoutmoney.component';
import { ManageraccountComponent } from './manageraccount/manageraccount.component';
import { ManagergameComponent } from './managergame/managergame.component';
import { ManagerbankComponent } from './managerbank/managerbank.component';
import { MyModaldeleteComponent } from './my-modaldelete/my-modaldelete.component';
import { MyModalinfoaccountComponent } from './my-modalinfoaccount/my-modalinfoaccount.component';
import { MyModalupdateaccountComponent } from './my-modalupdateaccount/my-modalupdateaccount.component';
import { MyModalupdateaccountBankComponent } from './my-modalupdateaccount-bank/my-modalupdateaccount-bank.component';
import { MyModalinfoaccountBankComponent } from './my-modalinfoaccount-bank/my-modalinfoaccount-bank.component';
import { MyModalinfoaccountGameComponent } from './my-modalinfoaccount-game/my-modalinfoaccount-game.component';
import { MyModalupdateaccountGameComponent } from './my-modalupdateaccount-game/my-modalupdateaccount-game.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    AccountInfoComponent,
    MyModalComponent,
    MyAddbankComponent,
    MyAddmoneyComponent,
    MyGetoutmoneyComponent,
    ManageraccountComponent,
    ManagergameComponent,
    ManagerbankComponent,
    MyModaldeleteComponent,
    MyModalinfoaccountComponent,
    MyModalupdateaccountComponent,
    MyModalupdateaccountBankComponent,
    MyModalinfoaccountBankComponent,
    MyModalinfoaccountGameComponent,
    MyModalupdateaccountGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

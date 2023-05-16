import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ManageraccountComponent } from './manageraccount/manageraccount.component';
import { ManagergameComponent } from './managergame/managergame.component';
import { MyModalinfoaccountComponent } from './my-modalinfoaccount/my-modalinfoaccount.component';
import { MyModalupdateaccountComponent } from './my-modalupdateaccount/my-modalupdateaccount.component';
import { MyModalupdateaccountBankComponent } from './my-modalupdateaccount-bank/my-modalupdateaccount-bank.component';
import { MyModalinfoaccountBankComponent } from './my-modalinfoaccount-bank/my-modalinfoaccount-bank.component';
import { MyModalinfoaccountGameComponent } from './my-modalinfoaccount-game/my-modalinfoaccount-game.component';
import { MyModalupdateaccountGameComponent } from './my-modalupdateaccount-game/my-modalupdateaccount-game.component';
import { JwtModule } from "@auth0/angular-jwt";
import { MyModalconfirmationmsgComponent } from './my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { ManagertransactionComponent } from './managertransaction/managertransaction.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MyModalupdatetransactionsComponent } from './my-modalupdatetransactions/my-modalupdatetransactions.component';
import { ManagerbankaccountComponent } from './managerbankaccount/managerbankaccount.component';
import { VndFormatPipe } from './vnd.pipe';
import { VndFormatValueAccessorDirective } from './vnd-format-value-accessor.directive';
import { InputNumberOnlyDirective } from './input-number-only-directive.directive';
import { ManagerstatusComponent } from './managerstatus/managerstatus.component';
import { ManagerbankComponent } from './managerbank/managerbank.component';
import { MyModalupdatestatusComponent } from './my-modalupdatestatus/my-modalupdatestatus.component';
import { MyModalupdateBankComponent } from './my-modalupdate-bank/my-modalupdate-bank.component';
import { ManagergameProductComponent } from './managergame-product/managergame-product.component';
import { MyModalupdateProductComponent } from './my-modalupdate-product/my-modalupdate-product.component';
import { MyModalupdateaccountBankuserComponent } from './my-modalupdateaccount-bankuser/my-modalupdateaccount-bankuser.component';
import { MyModalupdateanotificationComponent } from './my-modalupdateanotification/my-modalupdateanotification.component';
import { ManagernotificationComponent } from './managernotification/managernotification.component';
import { ManagerlinkComponent } from './managerlink/managerlink.component';
import { MyModalupdateLinkComponent } from './my-modalupdate-link/my-modalupdate-link.component';
import { RuleComponent } from './rule/rule.component';
import { MyModalshowinfogameComponent } from './my-modalshowinfogame/my-modalshowinfogame.component';
import { SupportComponent } from './support/support.component';
import { GuideComponent } from './guide/guide.component';
import { AboutdepositComponent } from './aboutdeposit/aboutdeposit.component';
import { AboutloginComponent } from './aboutlogin/aboutlogin.component';
import { AboutaccountgameComponent } from './aboutaccountgame/aboutaccountgame.component';

export function tokenGetter() {
  return sessionStorage.getItem("auth-token");
}

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
    ManageraccountComponent,
    ManagergameComponent,
    MyModalinfoaccountComponent,
    MyModalupdateaccountComponent,
    MyModalupdateaccountBankComponent,
    MyModalinfoaccountBankComponent,
    MyModalinfoaccountGameComponent,
    MyModalupdateaccountGameComponent,
    MyModalconfirmationmsgComponent,
    ManagertransactionComponent,
    MyModalupdatetransactionsComponent,
    ManagerbankaccountComponent,
    VndFormatPipe,
    VndFormatValueAccessorDirective,
    InputNumberOnlyDirective,
    ManagerstatusComponent,
    ManagerbankComponent,
    MyModalupdatestatusComponent,
    MyModalupdateBankComponent,
    ManagergameProductComponent,
    MyModalupdateProductComponent,
    MyModalupdateaccountBankuserComponent,
    MyModalupdateanotificationComponent,
    ManagernotificationComponent,
    ManagerlinkComponent,
    MyModalupdateLinkComponent,
    RuleComponent,
    MyModalshowinfogameComponent,
    SupportComponent,
    GuideComponent,
    AboutdepositComponent,
    AboutloginComponent,
    AboutaccountgameComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgSelectModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    })

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

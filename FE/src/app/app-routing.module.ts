import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { ManageraccountComponent } from './manageraccount/manageraccount.component';
import { ManagergameComponent } from './managergame/managergame.component';
import { ManagerbankaccountComponent } from './managerbankaccount/managerbankaccount.component';
import { ManagertransactionComponent } from './managertransaction/managertransaction.component';
import { RoleGuardService } from './Services/Security/role-guard.service';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  }
  ,
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'account-info',
    component: AccountInfoComponent,
  },
  {
    path: 'manageraccount',
    component: ManageraccountComponent, canActivate: [RoleGuardService],
    data:
    {
      expectedRole: true
    }
  },
  {
    path: 'managergameaccount',
    component: ManagergameComponent, canActivate: [RoleGuardService],
    data:
    {
      expectedRole: true
    },
  },
  {
    path: 'managerbankaccount',
    component: ManagerbankaccountComponent, canActivate: [RoleGuardService],
    data:
    {
      expectedRole: true
    },
  },
  {
    path: 'managertransaction',
    component: ManagertransactionComponent, canActivate: [RoleGuardService],
    data:
    {
      expectedRole: true
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

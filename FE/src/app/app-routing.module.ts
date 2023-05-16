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
import { ManagerstatusComponent } from './managerstatus/managerstatus.component';
import { ManagerbankComponent } from './managerbank/managerbank.component';
import { ManagergameProductComponent } from './managergame-product/managergame-product.component';
import { ManagernotificationComponent } from './managernotification/managernotification.component';
import { ManagerlinkComponent } from './managerlink/managerlink.component';
import { RuleComponent } from './rule/rule.component';
import { SupportComponent } from './support/support.component';
import { GuideComponent } from './guide/guide.component';
import { AboutdepositComponent } from './aboutdeposit/aboutdeposit.component';
import { AboutloginComponent } from './aboutlogin/aboutlogin.component';
import { AboutaccountgameComponent } from './aboutaccountgame/aboutaccountgame.component';
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
    path: 'rule',
    component: RuleComponent,
  },
  {
    path: 'support',
    component: SupportComponent,
  },
  {
    path: 'guide',
    component: GuideComponent,
  },
  {
    path: 'manageraccount',
    component: ManageraccountComponent, canActivate: [RoleGuardService],
    data:
    {
      expectedRole: ['Admin','Sales']
    }
  },
  {
    path: 'managergameaccount',
    component: ManagergameComponent, canActivate: [RoleGuardService],
    data:
    {
      expectedRole: ['Admin']
    },
  },
  {
    path: 'managerbankaccount',
    component: ManagerbankaccountComponent, canActivate: [RoleGuardService],
    data:
    {
      expectedRole: ['Admin']
    },
  },
  {
    path: 'managertransaction',
    component: ManagertransactionComponent, canActivate: [RoleGuardService],
    data:
    {
      expectedRole: ['Admin','Sales']
    },
  },
  {
    path: 'managerstatus',
    component: ManagerstatusComponent, canActivate: [RoleGuardService],
    data:
    {
      expectedRole: ['Admin']
    },
  } ,
  {
    path: 'managerbank',
    component: ManagerbankComponent, canActivate: [RoleGuardService],
    data:
    {
      expectedRole: ['Admin']
    },
  },
  {
    path: 'managergame',
    component: ManagergameProductComponent, canActivate: [RoleGuardService],
    data:
    {
      expectedRole: ['Admin']
    },
  },
  {
    path: 'managernotification',
    component: ManagernotificationComponent, canActivate: [RoleGuardService],
    data:
    {
      expectedRole: ['Admin']
    },
  },
  {
    path: 'linkGame',
    component: ManagerlinkComponent, canActivate: [RoleGuardService],
    data:
    {
      expectedRole: ['Admin']
    },
  },
  {
    path: 'aboutdeposit',
    component: AboutdepositComponent
  },
  {
    path: 'aboutlogin',
    component: AboutloginComponent
  },
  {
    path: 'aboutaccountgame',
    component: AboutaccountgameComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

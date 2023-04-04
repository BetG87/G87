import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectApiService } from '../Services/Web/connect-api.service';

@Component({
  selector: 'app-my-modalinfoaccount-bank',
  templateUrl: './my-modalinfoaccount-bank.component.html',
  styleUrls: ['./my-modalinfoaccount-bank.component.scss']
})
export class MyModalinfoaccountBankComponent implements OnInit {
  public formAccountinfoBank: FormGroup | any
  accountGame: any;
  id: string = "";
  nameAccount: string = "";
  numberPhone: string = "";
  fullName: string = "";
  email: string = "";
  dateCreateAccount: string = "";
  accountBank: [] = [];
  showinfoBank: any;
  showinfoAccountBank:any;
  fullallaccountbank: any;
  info: any | undefined;
  bankNameLists: any;
  accountGameLists : any ;
  nameaccountBank: any;

  constructor(public activeModal: NgbActiveModal,
    private router: Router,
    private fb: FormBuilder,
    private connectApi: ConnectApiService,) {
    this.formAccountinfoBank = this.fb.group({
      id: [''],
      nameAccount: [''],
      numberPhone: [''],
      fullname: [''],
      email: [''],
      accountBank: [''],
      accountGame: [''],
      dateCreateAccount: ['']

    });

  }
  public onSubmit(): void {

  }
  ngOnInit(): void {
    console.log(this.info)

    if (this.info) {
      console.log(this.id)
      this.formAccountinfoBank.controls['id'].setValue(this.info._id !== undefined ? this.info._id : "");
      this.formAccountinfoBank.controls['nameAccount'].setValue(this.info.username !== undefined ? this.info.username : "");
      this.formAccountinfoBank.controls['numberPhone'].setValue(this.info.numberPhone !== undefined ? this.info.numberPhone : "");
      this.formAccountinfoBank.controls['fullname'].setValue(this.info.fullName !== undefined ? this.info.fullName : "");
      this.formAccountinfoBank.controls['email'].setValue(this.info.email !== undefined ? this.info.email : "");
      this.formAccountinfoBank.controls['dateCreateAccount'].setValue(this.info.createdAt !== undefined ? this.info.createdAt : "");
      this.accountGame = this.info.gameAccounts;
      this.accountBank = this.info.bankAccounts;
      console.log(this.accountGame)
    }





    this.connectApi.get('v1/bank').subscribe((response) => {
      this.bankNameLists = response;
      console.log(this.bankNameLists)




      this.connectApi.get('v1/bankaccount').subscribe((response: any) => {
        this.fullallaccountbank = response
        console.log(response)
        const filteredData: {
          bankId: any; _id: any;
        }[] = [];
        for (let i = 0; i < this.accountBank.length; i++) {
          const bankId = this.accountBank[i];
          const filtered = this.fullallaccountbank.filter((data: { _id: any; }) => data._id === bankId);
          filteredData.push(...filtered);
        }
        console.log(this.bankNameLists);
        console.log(filteredData); // in ra mảng mới sau khi lọc
        // const filteredDatanew: Bank[] = []; // định nghĩa kiểu dữ liệu của filteredDatanew là một mảng các đối tượng Bank
        // for (let i = 0; i < filteredData.length; i++) {
        //   const listbank = this.bankNameLists.filter((data: { _id: any; }) => data._id === filteredData[i].bankId);
        //   filteredDatanew.push(...listbank); // thêm các đối tượng vào mảng filteredDatanew bằng toán tử spread
        // }
        // console.log(filteredDatanew);
        const result = filteredData.filter(account => {
          return this.bankNameLists.some((bank: { _id: any; }) => bank._id === account.bankId);
        }).map(account => {
          const bank = this.bankNameLists.find((bank: { _id: any; }) => bank._id === account.bankId);
          return { ...account, code: bank.code, name: bank.name };
        });

        console.log(result);
        this.showinfoBank = result
        console.log(this.showinfoBank)
      })

      this.connectApi.get('v1/gameaccount').subscribe((response) => {
        this.accountGameLists = response;
        console.log(this.accountGameLists)
    
        let filteredProducts = this.accountGameLists.filter((product: { _id: any; }) => {
          return this.accountGame.includes(product._id);
        });
        this.showinfoAccountBank = filteredProducts
        console.log(this.showinfoAccountBank);
    
      });
    });
  }

  closeModal() {
    this.activeModal.close(true);
  }
  confirm() {
    this.activeModal.close(false);
  }

}

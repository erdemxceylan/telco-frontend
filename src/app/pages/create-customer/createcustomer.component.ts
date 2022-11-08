import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CorporateCustomerInfoModel } from 'src/app/models/corporateCustomerInfoModel';
import { IndividualCustomerInfoModel } from 'src/app/models/individualCustomerInfoModel';
import { AppStoreState } from 'src/app/store/app.state';
import { setCorporateCustomerInfoModel } from 'src/app/store/customerToRegister/customer.actions';
import { setIndividualCustomerInfoModel } from 'src/app/store/individualCustomerStore/individualCustomer.action';

@Component({
  selector: 'app-createcustomer',
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  selected = '';
  isCorporate = false;
  corporateCustomerForm!: FormGroup;
  individualCustomerForm!: FormGroup;
  individualCustomerInfoModel!: IndividualCustomerInfoModel;
  individualCustomerInfoModel$!: Observable<IndividualCustomerInfoModel | null>;
  corporateCustomerInfoModel$!: Observable<CorporateCustomerInfoModel | null>;
  corporateCustomerInfo!: CorporateCustomerInfoModel;
  individualCustomerInfo!: IndividualCustomerInfoModel;
  constructor(
    private store: Store<AppStoreState>,
    private formBuilder: FormBuilder
  ) { 
    this.corporateCustomerInfoModel$ = this.store.select((s) => s.corporateCustomer.corporateCustomerInfo);
    this.individualCustomerInfoModel$ = this.store.select((s) => s.individualCustomer.individualCustomerInfo);
  }

  ngOnInit(): void {
    this.corporateCustomerInfoModel$.subscribe((response) => {
      if (response != null) this.corporateCustomerInfo = response;
      this.createCorporateCustomerForm();
    });
    this.individualCustomerInfoModel$.subscribe((response) => {
      if (response != null) this.individualCustomerInfo = response;
      this.createIndividualCustomerForm();
    });
  }

  changeValue(event: any) {
    console.log(event);
    this.isCorporate = this.selected =='corporate'? false:true;
    
  }

  createCorporateCustomerForm() {
    this.corporateCustomerForm = this.formBuilder.group({
      companyName: [this.corporateCustomerInfo?.companyName ?? '', Validators.required],
      taxNumber: [this.corporateCustomerInfo?.taxNumber ?? '', [Validators.required]],
    });
  }

  createIndividualCustomerForm() {
    this.individualCustomerForm = this.formBuilder.group({
      firstName: [this.individualCustomerInfo?.firstName ?? '', Validators.required],
      lastName: [this.individualCustomerInfo?.lastName ?? '', Validators.required],
      birthDate: [this.individualCustomerInfo?.birthDate ?? 'yyyy-MM-dd', [Validators.required]],
    });
  }

  saveState() {
    // STATE değişecek.. dispatch!!
   // if (!this.corporateCustomerForm.valid) return;

    // dispatch
    if(this.selected == 'corporate') {
    this.store.dispatch(
      setCorporateCustomerInfoModel({ corporateCustomerInfoModel: this.corporateCustomerForm.value })
    ); 
    console.log('value cor',this.corporateCustomerForm.value);
    console.log('save-state cor',this.corporateCustomerInfo);
  }
    else {
    this.store.dispatch(
      setIndividualCustomerInfoModel({ individualCustomerInfoModel: this.individualCustomerForm.value })
    );
    console.log('value in',this.individualCustomerForm.value);
    console.log('save-state in',this.individualCustomerInfo);
  }
}
}
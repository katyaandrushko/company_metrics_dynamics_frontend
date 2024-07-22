import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CompanyService } from '../../services/company.service';

import { ActivatedRoute, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Company } from '../../../../api/src/company/CompanySchema';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
  ],
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent implements OnInit {
  companyForm: FormGroup;
  formBuilder = inject(FormBuilder);
  companyService = inject(CompanyService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  editCompanyId?: string;

  // constructor() {
  //   this.userForm = this.formBuilder.group({
  //     name: ['', [Validators.required]],
  //     email: ['', [Validators.required, Validators.email]],
  //     age: [''],
  //     address: [''],
  //     password: ['', [Validators.required, Validators.minLength(8)]],
  //   });
  // }

  constructor() {
    this.companyForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      bankDetails: ['', [Validators.required]],
      phone: [''],
      contactPerson: [''],
    });
  }

  ngOnInit() {
    this.editCompanyId = this.route.snapshot.params['id'];
    if (this.editCompanyId) {
      this.companyService.getCompany(this.editCompanyId).subscribe((result) => {
        this.companyForm.patchValue(result);
      });
    }
  }

  addCompany() {
    if (this.companyForm.invalid) {
      alert('Please provide all fields');
      return;
    }
    const model: Company = this.companyForm.value;

    this.companyService.addCompany(model).subscribe(() => {
      alert('Company added successfully');
      this.router.navigateByUrl('/companies');
    });
  }

  updateCompany() {
    if (this.companyForm.invalid) {
      alert('Please provide all fields');
      return;
    }
    const model: Company = this.companyForm.value;
    this.companyService
      .updateCompany(this.editCompanyId!, model)
      .subscribe(() => {
        alert('Company updated successfully');
        this.router.navigateByUrl('/companies');
      });
  }
}

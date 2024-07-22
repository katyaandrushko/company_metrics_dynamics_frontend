//

import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Company } from '../../../../api/src/company/CompanySchema';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    CommonModule,
    MatCardModule,
    MatToolbarModule,
  ],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  company: Company[] = [];
  companyService = inject(CompanyService);

  ngOnInit() {
    this.companyService.getCompanies().subscribe((result) => {
      this.company = result;
      console.log(this.company);
    });
  }

  delete(id: string) {
    const ok = confirm('Are you sure?');
    if (ok) {
      this.companyService.deleteCompany(id).subscribe((result) => {
        alert('Company deleted');
        this.company = this.company.filter((u) => u._id != id);
      });
    }
  }

  trackByFn(id: number, item: Company) {
    return item._id;
  }
}

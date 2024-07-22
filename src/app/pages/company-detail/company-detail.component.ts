import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../core/model/common.model';
import { MetricDynamics } from '../../core/model/common.model';
import { MatCardModule } from '@angular/material/card';
import { CompanyService } from '../../services/company.service';
import { MetricsService } from '../../services/metrics.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChangeDetectionStrategy } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MetricComponent } from './metric/metric.component';
@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MetricComponent,
  ],
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyDetailComponent implements OnInit {
  company: Company | null = null;
  companyService = inject(CompanyService);
  metricService = inject(MetricsService);
  metricsDynamics: MetricDynamics[][] = [];
  dataSourceArray: MatTableDataSource<MetricDynamics>[] = [];

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.companyService.detailCompany(id).subscribe((data) => {
        this.company = data;
        this.loadMetrics();
        this.cdr.detectChanges();
      });
    }
  }

  loadMetrics(): void {
    this.metricService.getMetrics().subscribe((metrics) => {
      metrics.forEach((m) => {
        if (this.company) {
          this.metricService
            .getMetricDynamics(m, this.company._id)
            .subscribe((md) => {
              this.dataSourceArray.push(new MatTableDataSource(md));
              this.cdr.detectChanges(); // Force update view after fetching metrics data
            });
        }
      });
    });
  }
}

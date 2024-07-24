import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MetricDynamics } from '../../../core/model/common.model';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { Metric } from '../../../core/model/common.model';
import { MetricsService } from '../../../services/metrics.service';
@Component({
  selector: 'app-metric',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    CanvasJSAngularChartsModule,
  ],
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss'],
})
export class MetricComponent implements OnInit {
  @Input() dataSource: MatTableDataSource<MetricDynamics> =
    new MatTableDataSource();
  metric: Metric | undefined;
  displayedColumns: string[] = ['date', 'value'];
  startDate: Date | null = null;
  endDate: Date | null = null;
  chartOptions: any;
  metricsService = inject(MetricsService);

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.chartOptions = {
      theme: 'dark1',
      animationEnabled: true,
      zoomEnabled: true,
      title: {
        text: 'Dynamics of metrics changes',
      },
      axisY: {
        labelFormatter: (e: any) => {
          var suffixes = ['', 'K', 'M', 'B', 'T'];
          var order = Math.max(
            Math.floor(Math.log(e.value) / Math.log(1000)),
            0
          );
          if (order > suffixes.length - 1) order = suffixes.length - 1;
          var suffix = suffixes[order];
          return '' + e.value / Math.pow(1000, order) + suffix;
        },
      },
      data: this.getDataForPlot(),
    };

    if (
      this.dataSource.filteredData &&
      this.dataSource.filteredData.length > 0
    ) {
      this.metricsService
        .getMetric(this.dataSource.filteredData[0].metricId)
        .subscribe((m) => {
          this.metric = m;
          this.cdr.detectChanges();
        });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  onStartDateChange(event: any): void {
    this.startDate = event.target.value;
    if (this.endDate) {
      this.applyDateFilter();
    }
  }

  onEndDateChange(event: any): void {
    this.endDate = event.target.value;
    if (this.startDate) {
      this.applyDateFilter();
    }
  }

  async applyDateFilter() {
    this.dataSource.filterPredicate = (data: MetricDynamics) => {
      const date = new Date(data.date);
      return this.startDate && this.endDate
        ? this.startDate <= date && date <= this.endDate
        : true;
    };
    this.dataSource.filter = `${this.startDate}-${this.endDate}`;
    this.cdr.detectChanges();
  }

  getDataForPlot() {
    return [
      {
        type: 'line',
        xValueFormatString: 'YYYY',
        yValueFormatString: '#,###.##',
        dataPoints: this.dataSource.data.map((md) => ({
          x: new Date(md.date),
          y: md.value,
        })),
      },
    ];
  }
}

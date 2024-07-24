import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetricDynamics } from '../core/model/common.model';
import { Metric } from '../core/model/common.model';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private apiUrl =
    'https://company-metrics-dynamics-backend.onrender.com/metrics/';
  httpClient = inject(HttpClient);

  constructor(private http: HttpClient) {}

  getMetricsForCompany(companyId: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/metrics/${companyId}`);
  }

  getMetrics() {
    return this.httpClient.get<Metric[]>(this.apiUrl);
  }

  getMetric(id: string) {
    return this.httpClient.get<Metric>(this.apiUrl + id);
  }

  addMetric(model: Metric) {
    return this.httpClient.post(this.apiUrl + 'add', model);
  }
  updateMetric(id: string, model: Metric) {
    return this.httpClient.put(this.apiUrl + id, model);
  }
  deleteMetric(id: string) {
    return this.httpClient.delete(this.apiUrl + id);
  }

  getMetricDynamics(metric: Metric, companyId: string) {
    return this.httpClient.get<MetricDynamics[]>(
      this.apiUrl + companyId + '/' + metric._id + '/values'
    );
  }
}

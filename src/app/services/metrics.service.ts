import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MetricDynamics } from '../core/model/common.model';
import { Metric } from '../core/model/common.model';
import { apiEndpoint } from '../core/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private apiUrl = apiEndpoint.Metrics;
  httpClient = inject(HttpClient);

  constructor(private http: HttpClient) {}

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

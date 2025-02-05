import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Company } from '../core/model/common.model';

import { apiEndpoint } from '../core/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = apiEndpoint.Companies;
  httpClient = inject(HttpClient);

  constructor() {}

  getCompanies() {
    return this.httpClient.get<Company[]>(this.apiUrl);
  }

  getCompany(id: string) {
    return this.httpClient.get<Company>(this.apiUrl + id);
  }

  addCompany(model: Company) {
    return this.httpClient.post(this.apiUrl + 'add', model);
  }
  updateCompany(id: string, model: Company) {
    return this.httpClient.put(this.apiUrl + id, model);
  }
  deleteCompany(id: string) {
    return this.httpClient.delete(this.apiUrl + id);
  }
  detailCompany(id: string) {
    return this.httpClient.get<Company>(this.apiUrl + 'details/' + id);
  }
}

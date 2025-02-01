import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FarmRequest, FarmResponse } from '../interfaces/farm.interface';

@Injectable({
  providedIn: 'root',
})
export class FarmService {
  private readonly apiUrl = '/api/farm/';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<FarmResponse[]>(this.apiUrl);
  }

  getById(id: string) {
    return this.http.get<FarmResponse>(`${this.apiUrl}/${id}`);
  }

  create(farm: FarmRequest) {
    return this.http.post<FarmRequest>(this.apiUrl, farm);
  }

  update(id: string, farm: FarmRequest) {
    return this.http.put<FarmRequest>(`${this.apiUrl}/${id}`, farm);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

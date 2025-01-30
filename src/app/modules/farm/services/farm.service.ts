import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Farm } from '../models/farm.model';

@Injectable({
  providedIn: 'root',
})
export class FarmService {
  private readonly apiUrl = 'https://api.exemplo.com/farm';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Farm[]> {
    return this.http.get<Farm[]>(this.apiUrl);
  }

  getById(id: string): Observable<Farm> {
    return this.http.get<Farm>(`${this.apiUrl}/${id}`);
  }

  create(farm: Farm): Observable<Farm> {
    return this.http.post<Farm>(this.apiUrl, farm);
  }

  update(id: string, farm: Farm): Observable<Farm> {
    return this.http.put<Farm>(`${this.apiUrl}/${id}`, farm);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

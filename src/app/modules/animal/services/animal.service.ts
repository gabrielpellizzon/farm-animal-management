import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnimalResponse, AnimalRequest } from '../interfaces/animal';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private readonly apiUrl = '/api/animal/';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<AnimalResponse[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<AnimalResponse>(`${this.apiUrl}/${id}`);
  }

  create(farm: AnimalRequest) {
    return this.http.post<AnimalRequest>(this.apiUrl, farm);
  }

  update(id: number, farm: AnimalRequest) {
    return this.http.put<AnimalRequest>(`${this.apiUrl}/${id}`, farm);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

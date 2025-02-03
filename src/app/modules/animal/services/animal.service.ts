import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AnimalResponse,
  AnimalRequest,
  MultipleAnimalRequest,
} from '../interfaces/animal';

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

  create(animal: AnimalRequest) {
    return this.http.post<AnimalRequest>(this.apiUrl, animal);
  }

  createAnimals(animalList: MultipleAnimalRequest) {
    return this.http.post<MultipleAnimalRequest>(
      `${this.apiUrl}/add-list`,
      animalList
    );
  }

  update(id: number, animal: AnimalRequest) {
    return this.http.put<AnimalRequest>(`${this.apiUrl}/${id}`, animal);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

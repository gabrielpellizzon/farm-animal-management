import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AnimalService } from './animal.service';
import { AnimalRequest, AnimalResponse } from '../interfaces/animal';

describe('AnimalService', () => {
  let service: AnimalService;
  let httpMock: HttpTestingController;
  const apiUrl = '/api/animal/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnimalService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AnimalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all animals', () => {
    const dummyAnimals: AnimalResponse[] = [
      { id: 1, farmId: 1, name: 'Animal 1', tag: 'A1' },
      { id: 2, farmId: 2, name: 'Animal 2', tag: 'A2' },
    ];

    service.getAll().subscribe((animals) => {
      expect(animals.length).toBe(2);
      expect(animals).toEqual(dummyAnimals);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyAnimals);
  });

  it('should retrieve an animal by ID', () => {
    const dummyAnimal: AnimalResponse = {
      id: 1,
      farmId: 1,
      name: 'Animal 1',
      tag: 'A1',
    };

    service.getById(1).subscribe((animal) => {
      expect(animal).toEqual(dummyAnimal);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyAnimal);
  });

  it('should create an animal', () => {
    const newAnimal: AnimalRequest = {
      farmId: 1,
      name: 'New Animal',
      tag: 'A100',
    };

    service.create(newAnimal).subscribe((response) => {
      expect(response).toEqual(newAnimal);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newAnimal);
  });

  it('should update an animal', () => {
    const updatedAnimal: AnimalRequest = {
      farmId: 1,
      name: 'Updated Animal',
      tag: 'A101',
    };

    service.update(1, updatedAnimal).subscribe((response) => {
      expect(response).toEqual(updatedAnimal);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedAnimal);
  });

  it('should delete an animal', () => {
    service.delete(1).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

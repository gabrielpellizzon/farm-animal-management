import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FarmService } from './farm.service';
import { FarmRequest, FarmResponse } from '../interfaces/farm.interface';

describe('FarmService', () => {
  let service: FarmService;
  let httpMock: HttpTestingController;
  const apiUrl = '/api/farm/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarmService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FarmService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all farms', () => {
    const dummyFarms: FarmResponse[] = [
      { id: 1, name: 'Farm 1' },
      { id: 2, name: 'Farm 2' },
    ];

    service.getAll().subscribe((farms) => {
      expect(farms.length).toBe(2);
      expect(farms).toEqual(dummyFarms);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyFarms);
  });

  it('should retrieve a farm by ID', () => {
    const dummyFarm: FarmResponse = { id: 1, name: 'Farm 1' };

    service.getById(1).subscribe((farm) => {
      expect(farm).toEqual(dummyFarm);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyFarm);
  });

  it('should create a farm', () => {
    const newFarm: FarmRequest = { name: 'New Farm' };

    service.create(newFarm).subscribe((response) => {
      expect(response).toEqual(newFarm);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newFarm);
  });

  it('should update a farm', () => {
    const updatedFarm: FarmRequest = { name: 'Updated Farm' };

    service.update(1, updatedFarm).subscribe((response) => {
      expect(response).toEqual(updatedFarm);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedFarm);
  });

  it('should delete a farm', () => {
    service.delete(1).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

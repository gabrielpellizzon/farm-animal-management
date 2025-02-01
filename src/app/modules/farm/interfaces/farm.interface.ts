import { AnimalResponse } from '../../animal/interfaces/animal';

export interface FarmRequest {
  name: string;
}

export interface FarmResponse extends FarmRequest {
  id: number;
  animals?: AnimalResponse[];
}

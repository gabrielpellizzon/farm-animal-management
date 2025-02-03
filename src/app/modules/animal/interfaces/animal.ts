export interface AnimalRequest {
  farmId: number;
  name: string;
  tag: string;
}

export interface AnimalResponse extends AnimalRequest {
  id: number;
}

export interface MultipleAnimalRequest {
  animals: {
    name: string;
    tag: string;
  }[];
  farmId: number;
}

export interface FarmRequest {
  name: string;
}

export interface FarmResponse {
  id: number;
  name: string;
  animals?: [{ farmId: number; name: string; tag: string }];
}

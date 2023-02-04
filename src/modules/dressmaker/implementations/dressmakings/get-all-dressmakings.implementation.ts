import { GetAllDressmakingDTO } from '../../dtos/GetDressmakingsDTO';

export interface GetAllDressmakingsImplementations {
  getAllDressmakings(): Promise<GetAllDressmakingDTO[]>;
}

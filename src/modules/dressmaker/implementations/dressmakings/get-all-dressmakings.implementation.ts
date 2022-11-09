import { IGetAllDressmakingDTO } from '../../dtos/IGetDressmakingsDTO';

export interface GetAllDressmakingsImplementations {
  getAllDressmakings(): Promise<IGetAllDressmakingDTO[]>;
}

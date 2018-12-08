import { Forecast } from './forecast';

export interface Weather {
    city: {
        coord: {
            lat: number,
            lon: number
        },
        country: string,
        id: number,
        name: string,
        population: number
    };
    cnt: number;
    cod: string;
    list: Forecast[];
    message: number;
}

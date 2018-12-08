export interface Forecast {
    clouds: number;
    deg: number;
    dt: number;
    humidity: number;
    pressure: number;
    snow: number;
    speed: number;
    temp: {
        day: number,
        eve: number,
        max: number,
        min: number,
        morn: number,
        night: number
    };
    weather: {
        description: string,
        icon: string,
        id: number,
        main: string
    }[];
}

export interface City {
    id?:number;
    cityName: string;
    country:string;
    emoji?:string;
    date:Date;
    notes:string;
    position:{
        lat:number;
        lng:number;
    }
}
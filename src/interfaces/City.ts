export interface City {
    id:string | number;
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
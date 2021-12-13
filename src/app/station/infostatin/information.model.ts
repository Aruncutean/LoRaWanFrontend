export class InformationModel {
    public poz: number
    public airQuality: number;
    public temperature: number;
    public humidity:number;
    public date: Date;

    constructor(poz: number, airQuality: number,temperature: number,humidity:number,  date: Date) {
        this.poz = poz;
        this.airQuality = airQuality;
        this.humidity = humidity;
        this.temperature = temperature;
        this.date = date;
    }
}
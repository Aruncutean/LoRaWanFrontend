export class ListStation {
    public poz: number
    public name: string;
    public devEui: string;
    public appEui: string;
    public battery: string;
    public active: boolean;

    constructor(poz: number, name: string, devEui: string, appEui: string, battery: string, active: boolean) {
        this.poz = poz;
        this.name = name;
        this.devEui = devEui;
        this.appEui = appEui;
        this.battery = battery;
        this.active = active;
    }
}
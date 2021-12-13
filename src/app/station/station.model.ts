export class Station {
    public denumire: string;
    public dispozitiv: string;
    public stare: string;
    public ultimaComunicare: string;


    constructor(denumire: string, dispozitiv: string, stare: string, ultimaComunicare: string) {
        this.denumire = denumire;
        this.dispozitiv = dispozitiv;
        this.stare = stare;
        this.ultimaComunicare = ultimaComunicare;
    }
}
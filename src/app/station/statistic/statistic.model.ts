export class Statistic {
    public name: string;
    public value: string;
    public image: string;
    public color: string;
    constructor(name: string, value: string, image: string, color: string) {
        this.name = name;
        this.value = value;
        this.image = image;
        this.color = color;
    }
}
export class Car{
    _id: string;
    brand: string;
    model: string;
    year: number;
    displacement: number;
    description: string;
    path?: string;

    constructor(Id, Brand, Model, Year, Displacemente, Description, Photo)
    {
        this._id = Id;
        this.brand = Brand ;
        this.model = Model;
        this.year = Year;
        this.displacement = Displacemente;
        this.description = Description;
        this.path = Photo;
    
    }
}

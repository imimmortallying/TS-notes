
// OBJECT types

//anonymous object type is convenient and flexible in that they can be used anywhere that is legal to provide type information
// but their usefulness is limited because they cannot be shared or reused anywhere else - use an interface or a type alias for reusablilty
let car: { // an anonymous object type
    doors?: number, // optional property - number|undefined
    readonly make: string,
    drive: (arg: string) => void, // the function still returns undefined. Void means that the function doesn't have a useful return
}
car = {
    doors: 7,
    make: 'Tesla',
    drive: (arg = 'i return nothing') => { console.log(arg) }
}
car.doors = 6;
// car.make = 'new string' // will cause an error. Read-only property cannot be changed once initialised. But arrays as properties can be added new items

// INDEX SIGNATURES

interface Car {
    [prop: string]: string | boolean | number; // can't be just string|boolean if there's another index signature - [id:number] : number
    readonly [id: number]: number;
}

const car2: Car = {
    'prop': 'value',
    9: 4, // cannot be reassigned once initialised
    'boolean': true,
}

//
console.log(car2[9]) // or car2['9'] works as well

// INTERSECTIONS are another way of combining types together in order to create new object types - use & operator

interface Vinyl {
    rpm?: number;
    title: string;
};

interface Cd {
    trackNumber?: number;
    title: string;
};

interface CircularMedia extends Vinyl, Cd { } // we could combine these interfaces by creating an intermediate interface using 'extends' keyword

const album: Vinyl & Cd = { // but we can create the intersection on the fly without having to declare new interfaces
    title: 'Ak-47', // rpm and trackNumber proerties aren't specified since they're optional
}

type CircularMedia2 = Vinyl & Cd; // it's possible to define a type alias for the intersection. Now it can be reused

// as well as interface intersections, we can create type intersections:
type mp3 = { bitrate?: number }
type mp4 = { encoding?: string }
type digitalMedia = mp3 & mp4;

const mp3: digitalMedia = { encoding: 'sadsd' }

// GENERIC object types

interface Warning {
    level: string;
    text: string;
}

type Info = {
    level: string;
    text: string;
}

// interface Modal<T> {
//     message: T; // this property type will be whatever type the type parameter T is 
// }

// or
type Modal <Type> = {
    message: Type;
}

const dataLoss: Warning = {
    level: 'error',
    text: 'Data may be lost, continue?',
}

const completed: Info = {
    level: 'info',
    text: 'Process complete',
}

// the objects have to conform to the Modal interface
const dataLossModal: Modal<Warning> = { message: dataLoss }; // pass the actual type you want to use as the type parameter
const completedModal: Modal<Info> = { message: completed };

const someObject:  Modal <Vinyl> = {
    message: {
        title: 'some title',
        rpm: 92,
    }
};
 
// READONLY UTILITY TYPE
interface ReadWrite {
    prop: string;
}
// using the Readonly utility type automatically create a new type in which all of the properties of the original type are read-only
let notWritable: Readonly <ReadWrite> = { // use angle brackets to pass the Readonly type the interface that you wish to make read-only
    prop: 'string'
}
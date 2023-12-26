// This is a TS outline from chapter four. 
// Structure of the outline: 

// CHAPTER 5 - ENums, Interfaces, and Namespaces

// What interfaces are used for
// Interfaces are used to describe what the shape of an OBJECT should look like. 
// They are very similar to type aliases, which are looked at in Chapter 3, and the two
// can be used interchangeably in almost all situations

// interface Person {
//     name: string;
//     age: number;
//     bad_habits?: string; // ? makes the property optional 
//     readonly social_status: string; // readonly is a access modifier
// }

// const me: Person = {
//     name: 'Alx',
//     age: 25,
//     // interests: ['walking'] - this causes an error. The created object must have all of the properties specified by the interface,
//     // and it must have only those specified props 
//     // BUT it is possible to force an object to have a property not specified by the interface using the type-casting
//     // age: 'twenty five' - this also causes an errors
//     social_status: 'proletarian', // this property is read-only . Such properties, once they are initialized, cannot be changed
// }

// me.social_status = 'life enjoyer' reassigning causes an error

// Very permissive interfaces can be created so that objects can have any named properties:

interface AnyProps {
    [key: string]: string;
}

const anyPropsObj: AnyProps = {
    anything: 'some string',
    anything2: 'some string',
}

// Interfaces also can be used as the type description for members of another interface

interface PersonName {
    FirstName: string;
    SecondName: string;
    otherNames?: string[];
}

interface Person {
    name: PersonName;
    age: number;
    interests?: string[];
}

// the first declaration (see merging down below)
const me: Person = {
    name: {                   // now the name property conforms to the Person interface
        FirstName: 'Alx', 
        SecondName: 'Putin'
    },
    age: 25,
    // height: 22,
}


// Interface merging. (merging is being done by repeating declaration of the same interface / by redeclaring an interface with the same identifier)
// When two declarations are merged together all distinct properties from the individual interface will apear 
// in the resulting interface after the merge

// the second declaration of the Person interface (i.e merging). The Person interface has been redeclared and has been added a new property.
// Now the me object doesn't have the 'height' property hence 
// it doesn't conform to the Person type declaration 
interface Person {
    height: number
}

// Extending interfaces. Extending can be done using 'extends' keyword, as if they were a class
// All instances of the Developer interface will need to include the mandatory properties of both interfaces
interface Developer extends Person {
    languages: string[]
}

//There is no limit of the number of interfaces that can be merged in this way:

interface FirstAider {
    cprTrained: boolean;
};

// DevManager interface will be a combination of both of the interfaces ( that are?) being extended
//! will be ... being extended

interface DevManager extends FirstAider, Developer {
    desired_salary: number
}

const somePerson: DevManager = {
    desired_salary: 999,
    cprTrained: false,
    height: 1,
    age: 33,
    languages: ['JS'],
    name: {
        FirstName: 'killer',
        SecondName: 'feeder'
    }
}

// what are the differences between them?

// The two can be used interchangeably in almost all simple cases
// The main difference between the two is that when extending interfaces they can still be used separately, as they existed prior to extending 

// There is a subtle difference between merging and extending interfaces in the way how methods are handled.
// When redeclaring an interface (i.e. merging), if the same property is being specified in both interfaces, than the property must have the same type in both of them:
//! why may i need to specify the same property twice? if i don't specify it, a new instance of a merged interface still has to have this property 
interface Game {
    price: number;
}

interface Game {
    price: string;
    players: number;
}

// Similarly, if the same method is being declared in a merged interface, then both methods must have the same signature - they must accept the same parameters, parameters must be of the 
// same type, and the methods must have the same return type.
// This is true whether interfaces are being extended or merged

interface MethodTest {
    method : (arg0: string) => number
}

interface SecondTest extends MethodTest {
    method: () => string;
}

interface MethodTest {
    method: (arg0: number) => number
}

// but this could be gotten around with declaration merging by creating function overload. To do so, you have to declare interface differently :
// method: (arg0: number) => number     turns into    method (arg0: string) : string; and than it could be overloaded. This is not possible when extending, so this represents 
// the main practical difference between merging and extending intefaces

interface SecondTest {
    newMethod (arg0: string) : string;
}

interface SecondTest {
    newMethod (arg0: number) : number;
}
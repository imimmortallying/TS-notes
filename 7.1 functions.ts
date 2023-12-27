// PARAMETER type and RETURN type Annotations

//there's an important difference with plain JS: in JS, all function arguments are always optional. If we don't pass enough arguments when calling the function, they
// will have the value undefined inside the function
// and we can as well pass extra parameters that will show up in "arguments" array-like collection inside the function, but will not be accessible as named parameters

// function sayHello(name:string): string {
//     return `Hello ${name}`
// }
// const myNumber: number = sayHello('alx') // will cause an error

// type INFERENCE for functions

// if a type for a parameter isn't specified, than it will have type "any", which means that TS won't try to infer the type for the parameter based on it's usage
// setting the parameter to 'any' will prevent errors in the editor but will disable all type-checking for that parameter, which could result in run-time errors
// this error may not be displayed if the corresponding option - noImplicitAny - are turned off

// 
// function sayHello(name: any){ // return type isn't set
//     return `Hello ${name}`
// }
// const myNumber: number = sayHello('alx') // but there still will be an error because TS infers the return type anyway, based on what is actually returned

// same rules for setting types apply to arrow functions:
// const sayGoodbye = (name: string): string => {
//     return `Bye ${name}`;
//     };

// but there are 2 differences from a regular function declaration in type INFERENCE for arrow functions:
// usually TS can infer type of a parameter, when it is able to see exactly how the function is going to be called
// const str = 'string';
// str.split('').forEach((char) => char.padStart(2, 'X')); // we don't need to set neither parameter type or return type manually

// OPTIONAL parameters
// works just the same as usual
// but consider this: since optional parameter equals to a union 'string|undefined', you'd better check if the parameter type is undefined or not: 
// function optional(maybe?: string) {
//     if (!maybe) return;
// maybe is definetely a string now
// }

// REST parameters
// Rest parameters appear at the end of the parameter list 
// Rest parameters are always an array type. So we can use the generic syntax too
function variadic(a: string, ...extra: string[]) { //Array<string>
    // do something with strings
}
variadic('just one string');
variadic('one string', 'two', 'string')

// REST arguments

function concat(a: string, b: string, ...extra: string[]) {
    return a.concat(b, ...extra) // rest argument 'opens' an array into list if values 
}

console.log(concat('aaa', 'bbb', 'd', 'c'))

// rest parameters and rest arguments are opposite to each other. Rest parameters collect any number of comma-separated values and condense them
// into a single array, whereas rest arguments take an array and expand them into a comma-separated list of values




// DESTRUCTURED PARAMETERS
// if we destructure objects, TS can infer types of variables being assigned based on the values being destructured:
let { height, weight, age } = { height: 180, weight: 70, age: 44 };
// height = '44' // error

// in order to avoid setting types to parameters in a way like below (72), we can destructure parameters of the function:
//! parameters have to have types anyway, but it can look more readable - see line 83 
// function showlocation(lat: string, lng: string): void {
function showlocation({ lat, lng }: { lat: string, lng: string}): void {
    window.open(`https://www.openstreetmap.org/#map=16/${lat}/${lng}`)
}
// 
type location = {
    zoom: string;
    lat: string;
    lng: string
}

function showLocation2({ zoom, lat, lng }: location): void {
// function showLocation2(): void {
    window.open(`https://www.openstreetmap.org/#map=${zoom}/${lat}/${lng}`)
}

// VOID RETURN TYPE
// if a function uses a return keyword without returning an actual value, than TS infers return type of a function as :void - see line 37
// below i added actual return value, now return type is number|undefined: 
function optional(maybe?: string) {
    if (!maybe) return;
    return maybe.length
}
optional();
// if i explicitly add a void return type to a function, than TS will complain if i try to return a value from that function

// so it is better to always specify the return type of a functuion directly rather than letting TS infer the return type
// including functions that don't return a value

// FUNCTION TYPE expressions
// as well as return types and parameter types, functions themselves can also have types. A function type expression
// is a type that describes an entire function:

// it's not the implementation. We define that variable numberFn will contain function, that can recieve any number of arguments that are
// of the type number, in an array, and which itself returns a value of the type number
let numberFn: (...nums: number[]) => number;

// now we define a function. This actual function is very similar to the function type expression above
// the only difference is that the actual function specifies the return type in between the parameter list and fat arrow
numberFn = (...nums: number[]): number => {
    return nums.reduce((prev:number, curr:number) => prev + curr, 0);
}

numberFn(1,2,3) //6

// Though numberFn variable can be reused, can store any function that conforms to the function type expression, but the latter can't be reused
// for that we nedd to use a type alias:
type numberFn2 = (...nums: Array<number>) => number; 

// CALL SIGNATURES
// functions can also have properties, because they're objects
// a function type expressions doesn't allow (watch above) to specify props. In order to do that use an object type and specify
// props and the function's call signature:

type numberFn3 = {
    (...nums: number[]): number; // not => number;
    operation: string;
}

// now the function has to be wrapped with parentheses, and than we have to add the type assertion AS
let myNumberFn3 = ((...nums:number[]): number => {
    return nums.reduce((prev:number, curr:number) => prev + curr, 0); 
}) as numberFn3 // if this is not specified, than we won't be able to add 'operation' property

myNumberFn3.operation = 'sum' // this property may not be and there won't be an error
// myNumberFn3.someProp = 'sum' // this will cause an error


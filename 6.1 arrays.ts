
// ARRAYS
const strings: string[] = ['sd', 'dsf']; // strings variable is an array containing elements of the type string

enum Status {
    Waiting,
    Complete,
}
const statuses: Status[] = [Status.Waiting] // [0] - statuses in an array of values that match one of the Status enum's members 

interface Process {
    name: string,
    status: string,
}
const processes: Process[] = [{name: 'alx', status: 'nice'}] // processes is an array of objects that conform to the Process interface

const anotherStrings: Array<string> = ['sdsd','sads'] // generic syntax that provides an array type. Generics are sort of like variables for types.This syntax is almost equivalent to 
//the literal syntax, except when using the readonly access modifier to create a read-only array

const codes: (string | number)[] = [1, '2'] // the value is of a mixed-type array. It is the literal format

const anotherCodes: Array<string | number> = [1, '2'] // a mixed-type array using the generic format

// Array type inference

const ids = ['1A', 2]; //  (string|number)[] - TS can infer the array type based on how it is declared and initialized. However, it is better to explicitly daclare the type

// const anotherProcesses = [{name: 'Process 1', status: Status.Complete}] // - type would be {name: string, status: Status}[], but not Process[]
// so it's better to explicitly type the variable:
interface Process2 {
    name: string,
    status: Status,
}
    
const anotherProcesses: Process2[] = [{name: 'Process 1', status: Status.Complete}]

// READONLY arrays - arrays that cannot be modified in any way, neither mutating them (push, splice ...) or changing values of the members

const unmodifiable: readonly string[] = ['cannot be changed'] // literal syntax
const unmodifiable2: ReadonlyArray <number> = [2,3] // to use the generic syntax use ReadOnly type to make an array read-only

// TUPLES
// tuple is a special type of array with a specific number of elements of a specific type, in a specific order
const category: [number, string, boolean] = [1, '1A', true];
// category.length = 4; the length cannot modified directly
// category.push(3) // works, but pushing member has to be of the type (number|string|boolean)

// there's no  generic syntax for declaring a tuple

// const id = category[0] // when you hover over element you'll see: (property) 0: number

// but we also can see the full identifier for the element if we specify identifiers:
// it makes it easier to ensure we are working with the intended element
const category2: [id:number, model:string, archived:boolean] = [1, '1A', true];
const id = category2[0] // when you hover over element you'll see: (property) 0: number (id)

// OPTIONAL elements in tuples
const category3: [number, string, boolean?, string?] = [1,'2a', false] // but this will cause an error [number?, string, boolean?] - 
// requested elements cannot follow optional
// the element at index 2 is the union type  boolean | undefined, at index 3 string | undefined

// REST elements in tuples
let category4: [number, ...string[], boolean]
category4 = [2, '2a', '3b', '4g', true] // or it may be [2, true]

// READ-ONLY tuples
let category5: readonly [number, string, boolean] = [1, 'string', false];
// category5[0] = 2 // now elements of the tuple cannot be assigned. Mutating methods (push...) are also prohibited

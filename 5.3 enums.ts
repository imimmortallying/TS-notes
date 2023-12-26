// todo get back later and give a definition to enums

// Unlike types, enums are not removed in the compiled JS, they are converted into objects instead

// NUMERIC enums
// It's a default, not spcified type of enum

enum Fruit {
    Apple, // has the value 0. Would be falsey in comparisons
    Blackberry, // has the value 1
    Melon, // 2
    Baiden = 322, //It's possible to explicitly define the numeric values for each member. See line 19 //! Also see line 48
};

// Enum's members have numerical values - this is what makes enum a numerical enum

console.log(Fruit.Blackberry) // 1

// Consider the example:
// fruit: Fruit  - sets that the function must be passed one of the values from Fruit type when it's invoked
//? line 10 will cause an error (TS playground), because the function below doesn't have a corresponding case. But it's not seen now for some reason
// function determinePortionSize(fruit: Fruit) {
//     switch (fruit) {
//         case Fruit.Apple:
//             return 1;
//         case Fruit.Blackberry:
//             return 10;
//         case Fruit.Melon:
//             return 0.5;
//     }
// }

determinePortionSize(Fruit.Blackberry); // 10
determinePortionSize(2); // 10 // But it's more preferable to use the named enum members because it's more readable and conveys the intent of the code better
// determinePortionSize(5); //? the book says that TS shouldn't have considered this as an error, the value would've just be undefined 

enum TropicalFruits {
    Mango = 6 * 2, // enum members could also be set using unary? or binary? operators
    Papaya, // has the value 13 due to TS auto-incrementing
    // Putin = Fruit.Baiden, // value of one enum member can be used as the value of another in a different enum

    Plum = 5, // duplicated enum values are allowed. But it doesn't provide real benefit and may cause confusion
    Peach = 5,
}

// reverse mapping. Numeric enums get a reverse mapping from the value back to the member:

console.log(Fruit[322]) // Baiden

// Exhaustiveness and the never type
// Never type is frequently used to make sure that a switch statement is exhaustive, that is, that it checks all possible cases. 
// Let's use the determinePortionSize function to see a concrete example of this technique in practice:

// add a new function to handle unknown enum members:
// this function accepts a parameter of the type never and has a return type of never. Only functions that don't have
// a reachable endpoint, that is, they never return a value, can have a return type of never 

function handleUnknownMember (member: never): never {
    throw new Error ('Unhandled enum member: ' + Fruit[member]); // throw a new error which shows the unhandled member's identifier
}
// add a default case that calls the new function, passing it the fruit argument which will be passed to the determinePortionSize function when it gets invoked

function determinePortionSize(fruit: Fruit) {
    switch (fruit) {
        case Fruit.Apple:
            return 1;
        case Fruit.Blackberry:
            return 10;
        case Fruit.Melon:
            return 0.5;
        default:
            // handleUnknownMember(fruit) // line 77
            handleUnknownMember(fruit as never); // line 81
    }
}



// What is the point of this? this is a protection against adding new members to the Fruit enum and not adding cases to handle those
// members inside the determinePortionSize function. The error will stop the code from compiling.
//! but TS already shows the error even without this protection, though it doesn't specify the concrete enum member 
//! that doesn't have corresponding switch case in determinePortionSize function
// But if we cast? the fruit argument to the never type in the function invocation - handleUnknownMember(fruit as never); - this will satisfy the compiler and
// we'll be able to compile the code to JS and see much more usefull error

// STRING enums

enum Vegetables {
    Pea = 'PEA', // by convention in TS the values are specified in uppercase
    Potato = 'POTATO',
    Cabbage = 'CABBAGE',
    // Pukin, // values for all members must be specified
}

// there's a subtle difference between string and numeric enums:

function numberToConsole(fruit: Fruit) {
    console.log(fruit)
    //or do something
}
numberToConsole(Fruit.Blackberry) // 1
numberToConsole(1) // 1 - so i can pass a plain number that matches one of the enum members

function stringToConsole(vegetable: Vegetables) {
    console.log(vegetable)
}
stringToConsole(Vegetables.Cabbage) // 'CABBAGE'
// stringToConsole('cabbage') // but i can't pass a string literal that matches one of the enum members. So i must use an enum explicitly when invoking the function

// reverse mappings are not supported with string enums:
// console.log(Vegetables['CABBAGE']) // will cause an error
console.log(Vegetables['Cabbage']) // CABBAGE //! but i can get value of the member passing the member like a string - wasn't addressed in the book

//! the book says that it's not allowed to use the value of one string enum member as the value of another, but i can do it:
//! so the following code should be invalid, but it's not
enum Tubers {
    Parsnip = 'Parsnip',
    Potato = Vegetables.Potato,
};

//todo debugging - say more about it

// HETEROGENEOUS enums
// It's allowed, but there is no real benefit to mix string and numeric members in the same enum:

// enum Vegetables {
//     Pea = 'PEA',
//     Potato = 0,
//     Cabbage, // 1
//     Corn = 'CORN',
//     Parsnip = 5,
//     Spinach, // 6
// }

// COMPUTED and CONSTANT enums. All of the examples above have involved enums with constant values  - that is, values that are known at compile time
// However, computed enums also can be made use of (?), where the value isn't known at compile time, only at runtime
// In some cases computed enums are not allowed to use as values in TS versions 5 and below. So there's no an issue now

// enum Vegetables2 {
//     Onion = 'Onion',
//     Kale = Vegetables.Cabbage, // it's a computed enum. I'm not sure, if i try to use member of another numeric enum, will this be a computed member?
//     // SomeMember = returnString(), // doesn't allow to assignt computed string this way
// }

// enum TropicalFruit {
//     Mango,
//     Papaya,
//     Melon = Fruit.Melon, // computed
//     PassionFruit = returnTen(), // computed
// };
    
    
// function returnString() { return 'string' }
// function returnTen() { return 10 }

// LITERAL enums. Book definition: As well as being constant, //! line 171
// if all members in an enum are numeric or string literals //! line 171, 172
// the enum is considered a LITERAL enum //! is enum FavouriteVegetable a literal enum?
// With literal enums the members themselves become types. This means that we can specify that a value must be a specific enum member rather than just saying
// that value must be one of the members - line 176

enum Presidents {
    Baiden = 'BAIDEN',
    Trump = 'TRUMP',
}

enum Games {
    Dota = "DOTA",
    Cs = "CS",
}

enum FavouriteVegetable {
    Favourite = Vegetables.Potato, //? computed? string
    Portions = 5, // number
}

// literal enums also can be considered as if they were a union of the members within the enum - line 180
interface PresidentsGames {
    Name: Presidents.Baiden,
    Game: Games, 
    Food: FavouriteVegetable.Favourite,
    Portion: FavouriteVegetable.Portions
}

const Baiden: PresidentsGames = {
    Name:Presidents.Baiden,
    Game: Games.Cs,
    Food: FavouriteVegetable.Favourite,
    Portion: FavouriteVegetable.Portions
}

// INLINING enums:
// enums exist at runtime, after compilation, in the form of objects. But using CONST keyword we can reduce the amount of code - there will be no object created,
// and values of the members will be put in the places where references were previously
// the only requirement for inlining is that the values of the enum are constant

// using the KEYOF operator
// KEYOF operator allows to create the union type of the enum's members values. But in order to do that, you have to use TYPEOF operator at the same time:
type GamesKeys = keyof typeof Games; // 'Cs' | 'Dota'
const game: GamesKeys = "Cs"; 

// type GamesKeys = keyof Games;
//const game: GamesKeys = "Cs";  // will result in an error, because GamesKeys will
// consist of the members of the prototype of the value of the members of Games - 'number | unique symbol | "toString" | and 30 more...





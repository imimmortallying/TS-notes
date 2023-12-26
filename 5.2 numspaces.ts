// In programming terms, a namespace is a container where similar functionality or logic can be grouped together and where identifiers have less chance of 
// colliding. JS has no implicit support for namespaces

//To define a namespace, we use the namespace keyword followed by the identitier and then a pair of curly brackets.
// Anything that we want to be available outside of the namespace needs to be exported:

// any functionality that we want to remain private and only accessible within the namespace can just be defined normally without being exported
// values that are exported from a namespace don't need to be imported

namespace StringUtils {
    export const reverse = (str: string) => 
    str.split('').reverse().join('');
};

namespace NumberUtils {
    export const reverse = (num: number) => 
    parseInt(num.toString().split('').reverse().join(''));
};

// Standart dot notation is (being?) used to invoke the methods, exactly as if 
//? ask about the second part and whether such constructions without pronouns is used
StringUtils.reverse('abc')
NumberUtils.reverse(123)

// Namespace merging
// Namespaces can be merged, and this merging happens in the same way as it does with interfaces:
// When merging interfaces, redeclaring the same property cannot be done twice

namespace NsTest {
    export const str = 'abc'
}

namespace NsTest {
    export const num = 123
}

NsTest.num
NsTest.str



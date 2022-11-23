// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters

// Primitives

let age: number;

age = 12;

let userName: string;

userName = 'Max';

let isInstructor: boolean;

isInstructor = true;

// More complex types

let hobbies: string[];

hobbies = ['Sports', 'Gaming'];

let person : {
  name: string;
  age: number;
};

person = {
    name: 'Luna',
    age: 20
}

let people: {
    name: string;
    age: number;
}[];

people = [
    {
        name: 'Leandro',
        age: 20
    },
    {
        name: 'Luna',
        age: 20
    }
]

// Type inference
let course = 'This is a course'

// Union type
let book: string | number = 'This is a book'

// Type Alias
type Person = {
    name: string;
    age: number;
}

let dude: Person;
let folks: Person[];

// Function & types
function add(a: number, b: number){
    return a + b;
}

function print_output(value: any){
    console.log(value);
}

// Generics
function insertAtBeggining<T>(array: T[], value: T){
    const newArray = [value, ...array];
    return newArray;
}

const updatedArray = insertAtBeggining([1,2,3], -1);
const stringArray = insertAtBeggining(['a', 'b', 'c'], 'd');

// Classes
class Student{
    firstName: string;
    lastName: string;
    age: number;
    private courses: string[];

    constructor(first: string, last: string, age: number, courses: string[]){
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.courses = courses;
    }

    enroll(courseName: string){
        this.courses.push(courseName);
    }

    listCourses(){
        return this.courses.slice();
    }
}

const student = new Student('Leandro', 'Luna', 20, ['Computer Engineer'])

class OtherStudent{
    constructor(public firstName: string, public lastName: string, public age: number, private courses: string[]){
    }

    enroll(courseName: string){
        this.courses.push(courseName);
    }

    listCourses(){
        return this.courses.slice();
    }
}

// Interfaces
interface Human{
    firstName: string;
    age: number;

    greet: () => void;
}

let leandro: Human;

leandro = {
    firstName: 'Leandro',
    age: 20,

    greet(){
        console.log('HELLOOOOOW!');
    }
}

class Instructor implements Human{
    firstName: string;
    age: number;
    greet(){
        console.log('Heya!');
    }
}
// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
// Primitives
var age;
age = 12;
var userName;
userName = 'Max';
var isInstructor;
isInstructor = true;
// More complex types
var hobbies;
hobbies = ['Sports', 'Gaming'];
var person;
person = {
  name: 'Luna',
  age: 20,
};
var people;
people = [
  {
    name: 'Leandro',
    age: 20,
  },
  {
    name: 'Luna',
    age: 20,
  },
];
// Type inference
var course = 'This is a course';
// Union type
var book = 'This is a book';
var dude;
var folks;
// Function & types
function add(a, b) {
  return a + b;
}
function print_output(value) {
  console.log(value);
}
// Generics
function insertAtBeggining(array, value) {
  var newArray = __spreadArray([value], array, true);
  return newArray;
}
var updatedArray = insertAtBeggining([1, 2, 3], -1);
var stringArray = insertAtBeggining(['a', 'b', 'c'], 'd');
// Classes
var Student = /** @class */ (function () {
  function Student(first, last, age, courses) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.courses = courses;
  }
  Student.prototype.enroll = function (courseName) {
    this.courses.push(courseName);
  };
  Student.prototype.listCourses = function () {
    return this.courses.slice();
  };
  return Student;
})();
var student = new Student('Leandro', 'Luna', 20, ['Computer Engineer']);
var OtherStudent = /** @class */ (function () {
  function OtherStudent(firstName, lastName, age, courses) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.courses = courses;
  }
  OtherStudent.prototype.enroll = function (courseName) {
    this.courses.push(courseName);
  };
  OtherStudent.prototype.listCourses = function () {
    return this.courses.slice();
  };
  return OtherStudent;
})();
var leandro;
leandro = {
  firstName: 'Leandro',
  age: 20,
  greet: function () {
    console.log('HELLOOOOOW!');
  },
};
var Instructor = /** @class */ (function () {
  function Instructor() {}
  Instructor.prototype.greet = function () {
    console.log('Heya!');
  };
  return Instructor;
})();

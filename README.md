
####  Create a README file to answer the following question-

1. What is the difference between var, let, and const?

2. What is the difference between map(), forEach(), and filter()? 

3. What are arrow functions in ES6?

4. How does destructuring assignment work in ES6?

5. Explain template literals in ES6. How are they different from string concatenation?


### Answer ---->
1. The difference between var, let, and const is in three things reassignment, scope, and redeclaration. var can be redeclared and reassigned. It works outside the scope too, but the output is undefined. It can be accessed anywhere inside the parent function. let cannot be redeclared but can be reassigned. const cannot be redeclared or reassigned. let and const have a Temporal Dead Zone, so accessing them outside gives an error. They cannot be called outside a function. For const, the values inside an object or array can be changed, but the variable itself cannot be reassigned.

2. The difference between map(), forEach(), and filter() is  map() returns a new array, forEach() does not return anything, and filter() returns a new array containing only the elements that meet a certain condition.

3. Arrow functions are a new feature in ES6. They allow writing short functions without needing the return keyword for single-line expressions, making the code more readable. If there is only a single parameter, parentheses are not required. Arrow functions do not have their own arguments object.if access to arguments is needed, rest parameters (...args) should be used.

4. Destructuring assignment is a new ES6 feature.It helps to take values from arrays or objects.You can put them into variables in one line.For arrays use [] and for objects use {}.This makes the code shorter and readable.

5. Template literals are an ES6 feature that makes writing code easier.You use dollar sign and curly braces ${} to include variables or expressions inside strings.This avoids using extra + for string concatenation.It also solves problems with single and double quotes inside strings.Long strings can be written across multiple lines without extra work.They are very useful when creating dynamic strings.
// ----1----
// import classA from './classes/class-a';
// import classB from './classes/class-b';
// import classC from './classes/class-c';


// let math = {
//     teacher: 'math', age: 47
// };

// classA.push(math);
// classB.push(math);
// classC.push(math);

// ----async----
// entry2.js
// import classB from './modules/module-b';
// import classC from './modules/module-c';

// let math = {
//     teacher: 'math', age: 47
// };

// import(/* webpackChunkName: "async-module-a" */  './modules/module-a').then(classA =>{
//     classA.push(engligh);
// });

// classB.push(math);
// classC.push(math);

// maxInitialRequests
// entry2.js
import classA from './modules/module-a';
import classB from './modules/module-b';

let math = {
    teacher: 'math', age: 47
};
classA.push(math);
classB.push(math);



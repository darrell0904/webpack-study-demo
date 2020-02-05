// ----1----
// // english.js
// import classA from './classes/class-a';
// import classB from './classes/class-b';
// import classC from './classes/class-c';

// let engligh = {
//     teacher: 'english', age: 47
// };

// classA.push(engligh);
// classB.push(engligh);
// classC.push(engligh);


// ----2----
// // entry1.js
// import classB from './modules/module-b';
// import classC from './modules/module-c';

// let engligh = {
//     teacher: 'english', age: 47
// };

// import( /* webpackChunkName: "async-module-a" */  './modules/module-a').then(classA =>{
//     classA.push(engligh);
// });

// classB.push(engligh);
// classC.push(engligh);


// maxInitialRequests
// entry1.js
import classA from './modules/module-a';
import classC from './modules/module-c';

let engligh = {
    teacher: 'english', age: 47
};

classA.push(engligh);
classC.push(engligh);

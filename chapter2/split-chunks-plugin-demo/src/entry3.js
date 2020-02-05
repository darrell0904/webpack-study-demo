// -----1-----
// // chinese.js
// import classA from './classes/class-a';
// import classB from './classes/class-b';
// import classC from './classes/class-c';

// let engligh = {
//     teacher: 'english', age: 47
// };

// classA.push(engligh);
// classB.push(engligh);
// classC.push(engligh);

// -----2-----
// entry3.js
// import classC from './modules/module-c';

// let engligh = {
//     teacher: 'english', age: 47
// };


// import(/* webpackChunkName: "async-module-a" */ './modules/module-a').then(classA =>{
//     classA.push(engligh);
// });

// import(/* webpackChunkName: "async-module-b" */ './modules/module-b').then(classB =>{
//     classB.push(engligh);
// });

// classC.push(engligh);


// maxInitialRequests
// entry3.js 
import classC from './modules/module-c';
import classB from './modules/module-b';

let chinese = {
    teacher: 'chinese', age: 47
};

classB.push(chinese);
classC.push(chinese);

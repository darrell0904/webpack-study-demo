/** export **/
import { basicNum, add } from './math';

function test(ele) {
    ele.textContent = add(99 + basicNum);
}

test();

/** export default **/

// import math from './math';

// function test(ele) {
//     ele.textContent = math.add(99 + math.basicNum);
// }


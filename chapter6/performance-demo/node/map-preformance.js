'use strict';

const runCount = 100;
const keyCount = 100000;

let map = new Map();

let keys = new Array(keyCount);

for (let i = 0; i < keyCount; i++) keys[i] = {};

for (let key of keys) map.set(key, true);

let startTime = process.hrtime();

for (let i = 0; i < runCount; i++) {
  for (let key of keys) {
    let value = map.get(key);

    if (value !== true) throw new Error();
  }
}

let elapsed = process.hrtime(startTime);

// seconds：s
// nanoseconds：纳 s
let [seconds, nanoseconds] = elapsed;


let milliseconds = Math.round(seconds * 1e3 + nanoseconds / 1e6);
console.log(`${process.version} ${milliseconds} ms`);

const path = require('path');

process.chdir(path.join(__dirname, 'smoke/template'));

describe('test-webpack test case', () => {
    require('./unit/webpack-common-test');
});
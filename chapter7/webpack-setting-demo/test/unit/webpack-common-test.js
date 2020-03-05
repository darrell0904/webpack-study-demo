
const assert = require('assert');

describe('webpack.common.js test case', () => {
    const baseConfig = require('../../lib/webpack.common.js')

    it('entry', () => {
        assert.equal(baseConfig.entry.index.indexOf('webpack-study-demo/chapter7/webpack-setting-demo/test/smoke/template/src/index/index.js') > -1, true);
    });
});
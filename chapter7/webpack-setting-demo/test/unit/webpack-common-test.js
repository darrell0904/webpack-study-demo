
const assert = require('assert');

describe('webpack.common.js test case', () => {
    const baseConfig = require('../../lib/webpack.common.js')

    it('entry', () => {
        assert.equal(baseConfig.entry.index, '/Users/fujiawei/Desktop/github/webpack-study-demo/chapter7/webpack-setting-demo/test/smoke/template/src/index/index.js');
    });
});
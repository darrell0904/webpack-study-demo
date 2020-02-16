class CopyrightWebpackPlugin {
	apply(compiler) {
    compiler.hooks.entryOption.tap('CopyrightWebpackPlugin', (context, entry) => {
      // console.log('context\n', context);
      // console.log('entry\n', entry);
    })

    compiler.hooks.done.tap('CopyrightWebpackPlugin', (stats) => {
      // console.log('stats\n', stats);
    })

    compiler.hooks.beforeCompile.tap('CopyrightWebpackPlugin', (compilationParams) => {
      // throw 'too big';
    })

    compiler.hooks.failed.tap('CopyrightWebpackPlugin', (error) => {
      // console.log('error\n', error);
    })

    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
      debugger;
			compilation.assets['copyright.txt'] = {
				source: function() {
					return 'copyright by darrell'
				},
				size: function() {
					return 21;
				}
			};
			cb();
		})
	}

}

module.exports = CopyrightWebpackPlugin;
const loaderUtils = require('loader-utils');

module.exports = function(content) {
  
  const url = loaderUtils.interpolateName(this, "[name].[ext]", {
    content,
  });

  console.log('---url----', url);
  console.log('---content----', content);

  this.emitFile(url, content);

  this.callback(null, content);
}
const loaderUtils = require('loader-utils');
const fs = require('fs');
const path = require('path');

module.exports = function(source) {
  console.log('--source--', source);
  const json = JSON.stringify(source)
      .replace('darrell', 'DARRELL');

  return `export default ${json}`;
}
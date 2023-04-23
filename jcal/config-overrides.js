const {aliasWebpack, aliasJest} = require('react-app-alias-ex');

const options = {};
module.exports = aliasWebpack(options);
module.exports.jest = function (config) {
  const result = aliasJest(options)(config);
  result.moduleDirectories.unshift(require('path').resolve(__dirname, '../node_modules'));
  return result;
};

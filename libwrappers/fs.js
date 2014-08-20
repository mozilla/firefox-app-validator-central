module.exports = function (fsLib) {
  if (fsLib) {
    return require(fsLib);
  }

  return require('fs');
};

module.exports = function check(str, bracketsConfig) {
  let stringResult = str;
  let foundNext;

  bracketsConfig.forEach(function (item) {
    item[0] = item[0].replace(/(([^\\]|^)[\(\)\[\]\.\+\^\$\*\?\{\}\|])/g, "\\$1");
    item[1] = item[1].replace(/(([^\\]|^)[\(\)\[\]\.\+\^\$\*\?\{\}\|])/g, "\\$1");
  });

  do {
    foundNext = false;

    for (let i = 0; i < bracketsConfig.length; i++) {
      let regExp = new RegExp(bracketsConfig[i][0] + bracketsConfig[i][1]);
      foundNext = foundNext || stringResult.search(regExp) >= 0;
      stringResult = stringResult.replace(regExp, "");
    }

  } while (foundNext)

  return !stringResult.length;
}

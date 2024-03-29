const fs = require("fs");
const path = require("path");

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    const p = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json",
    );
    fs.readFile(p, (error, fileContent) => {
      let products = [];
      if (!error) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (error) => {
        console.log("error: ", error);
      });
    });
  }

  static fetchAll(callback) {
    const p = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json",
    );
    fs.readFile(p, (error, fileContent) => {
      if (error) {
        console.log("error on fetchAll function: ", error);
        callback([]);
      }
      callback(JSON.parse(fileContent));
    });
  }
};

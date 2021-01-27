import glob from 'glob';
import fs from 'fs';

export default class Mock {
  getFiles(path) {
    return glob.sync(`${path}/**/*.json`);
  }

  getData(path) {
    let files = this.getFiles(path);
    let data = {};

    if (files.length > 0) {
      files.forEach(file => {
        let relativePath = '_' + file.replace(path + '/', '').slice(0, -5);
        let contents = JSON.parse(fs.readFileSync(file, 'utf8'));
        data = this.addNestedProperty(data, relativePath.split('/'), contents)
      })
    }

    return data;
  }

  addNestedProperty(object, keys, value) {
    let tmp = object;

    keys.forEach((key, index, array) => {
      tmp[key] = tmp[key] || {};

      if (index === (array.length - 1)) {
        tmp = tmp[key] = value;
      } else {
        tmp = tmp[key];
      }
    });

    return object;
  }
}

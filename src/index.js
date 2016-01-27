(function (factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof exports === 'object') {
    // Node
    module.exports = factory(require('fs'), require('os'), require('through2'), require('winattr'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['fs', 'os', 'through2', 'winattr'], factory);
  }
  //not handling the root case
}(function (fs, os, through, winattr) {
  'use strict';

  return function () {
    'use strict';

    var doMarkReadable = function (file, enc, callback) {
      if (file.isNull()) {
        return callback(null, file);
      }

      function doMarkReadable() {

        if (os.platform().indexOf('win') >= 0) {
          winattr.setSync(file.path, { readonly: false });
          return callback(null, file);
        } else {
          var fileStats = fs.statSync(file.path);
          console.log('NOT IMPLEMENTED FOR NON-WIN OS');
        }

        callback(null, file);
      };

      doMarkReadable();
    };

    return through.obj(doMarkReadable);
  };

}));

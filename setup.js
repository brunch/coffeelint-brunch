var exec = require('child_process').exec;
var sysPath = require('path');
var fs = require('fs');

var mode = process.argv[2];

var fsExists = fs.exists || sysPath.exists;

var execute = function(pathParts, params, callback) {
  if (callback == null) callback = function() {};
  var path = sysPath.join.apply(null, pathParts);
  var command = 'node "' + path + '" ' + params;
  console.log('Executing', command);
  exec(command, function(error, stdout, stderr) {
    if (error != null) return process.stderr.write(stderr.toString());
    console.log(stdout.toString());
  });
};

if (mode === 'postinstall') {
  fsExists(sysPath.join(__dirname, 'lib'), function(exists) {
    if (exists) return;
    var modulePath = require.resolve("coffee-script");
    if( typeof modulePath !== "undefined" && modulePath !== null  && modulePath) {
      var coffeeCmd = sysPath.join( 
        sysPath.dirname(modulePath),  
        "..",
        "..",
        "bin",
        "coffee"
      ).split(sysPath.sep);
      //coffeeCmd.unshift(sysPath.sep);
      execute( coffeeCmd , '-o lib/ -c src/');
    }
    else {
      console.log("Module coffee-script absent!");
    };    
  });
} else if (mode === 'test') {
  execute(['node_modules', 'mocha', 'bin', 'mocha'],
    '--require test/common.js --colors');
}

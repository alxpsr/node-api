"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _csvtojson = require("csvtojson");

var _stream = require("stream");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pathToCSV = _path["default"].resolve(__dirname, './csv/example.csv');

var pathToWrite = _path["default"].resolve(__dirname, './txt');

var filenameToWrite = 'output.txt';

function runWithPipeline() {
  if (!_fs["default"].existsSync(pathToWrite)) {
    _fs["default"].mkdirSync(pathToWrite);
  }

  var csvInstance = (0, _csvtojson.csv)();
  csvInstance.on('header', function (header) {
    console.log(header);
  });

  var writeStream = _fs["default"].createWriteStream("".concat(pathToWrite, "/").concat(filenameToWrite), {
    encoding: "utf8",
    flags: 'a'
  });

  writeStream.on('error', function (err) {
    console.log("Error during write file ".concat(pathToWrite, "/").concat(filenameToWrite));
    console.error(err);
  });

  var readStream = _fs["default"].createReadStream(pathToCSV);

  readStream.on('error', function (err) {
    console.log("Error during read file ".concat(pathToCSV));
    console.error(err);
  });
  (0, _stream.pipeline)(readStream, // csv(),
  csvInstance, writeStream, function (err) {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  });
}

runWithPipeline();
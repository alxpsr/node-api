import fs from 'fs';
import path from 'path';
import { csv } from 'csvtojson';
import { pipeline } from 'stream';

const pathToCSV = path.resolve(__dirname, './csv/example.csv');
const pathToWrite = path.resolve(__dirname, './txt');
const filenameToWrite = 'output.txt';

function runWithPipeline() {

    
    if (!fs.existsSync(pathToWrite)) {
        fs.mkdirSync(pathToWrite);
    }
    
    const csvInstance = csv();
    csvInstance.preFileLine((fileLineString, idx) => {
        if (idx === 0) {
            return fileLineString.split(',').map(v => v.toLowerCase()).join(',');
        }

        return fileLineString;
    })
    
    const writeStream = fs.createWriteStream(
        `${pathToWrite}/${filenameToWrite}`,
        { encoding: "utf8", flags: 'a'}
    )

    writeStream.on('error', (err) => {
        console.log(`Error during write file ${pathToWrite}/${filenameToWrite}`);
        console.error(err);
    })


    const readStream = fs.createReadStream(pathToCSV);

    readStream.on('error', (err) => {
        console.log(`Error during read file ${pathToCSV}`);
        console.error(err);
    })
    
    pipeline(
        readStream,
        csvInstance,
        writeStream
    , (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    })
}

runWithPipeline();
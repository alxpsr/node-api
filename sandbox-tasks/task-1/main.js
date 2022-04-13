import { pipeline, Transform } from 'stream';

class ReverseValueStream extends Transform {
    _transform(chunk, encoding, callback) {
        try {
            const result = chunk.toString('utf-8').split('').reverse().join('') + '\n';

            callback(null, result);
        } catch (error) {
            callback(error);
        }
    }
}

pipeline(
    process.stdin,
    new ReverseValueStream(),
    process.stdout,
    (err) => {
        if (!err) {
            console.error(`Pipeline error:: ${err}`);
        }
    }
)
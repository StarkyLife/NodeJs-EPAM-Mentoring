const fs = require('fs');
const { Transform, pipeline } = require('stream');
const csv = require('csvtojson');

const csvFilePath = './csv/example.csv';
const txtFilePath = './example.txt';

const mapNumbers = new Transform({
    transform(chunk, _, callback) {
        const parsed = JSON.parse(chunk.toString());
        const stringified = JSON.stringify({ ...parsed, Price: +parsed.Price });

        this.push(`${stringified}\n`);

        callback();
    }
});

pipeline(
    fs.createReadStream(csvFilePath),
    csv(),
    mapNumbers,
    fs.createWriteStream(txtFilePath),
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    }
);

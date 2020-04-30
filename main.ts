import * as clipboardy from 'clipboardy';
import { ResponseYT } from './response';

import * as https from 'https';
import * as fs from 'fs';

let urls = ['https://www.youtube.com/watch?v=470hYV_iq6E', 'https://www.youtube.com/watch?v=BMX9dEG9SFA'];
let error = false;

console.log('Reading input file...');

if (!fs.existsSync('./input.txt')) {
    console.log('No "input.txt" file found. Creating sample...');
    let dataToWrite = '';
    urls.forEach(i => {
        dataToWrite += i + '\n';
    });
    try {
        fs.writeFileSync('./input.txt', dataToWrite);
        console.log('Sample "input.txt" generated successfully');
    } catch{
        console.log('Error generating sample file.');
        error = true;
    }
}

try {
    if (!error) {
        let asd = fs.readFileSync('./input.txt', {
            encoding: 'utf-8'
        }).replace(/\r\n/g, '\n');
        if (asd.includes('\n')) {
            urls = asd.split('\n').filter(i => i.trim() !== '').map(i => i.trim());
        } else if (asd.trim().length > 0) {
            urls = [asd.trim()];
        } else {
            console.log('No data found in "input.txt" file');
            error = true;
            urls = [];
        }
    }
}
catch{
    urls = [];
    error = true;
}

if (urls.length > 0) {
    console.log('\nURLs read :-\n');
    let index = 0;
    urls.forEach(l => {
        console.log((++index).toString().padStart(urls.length.toString().length, '0') + '. ' + l);
    });
    console.log('');
}

let downloadUrls = '';

function getStuff(counter: number = 0) {

    console.log('Checking link no => ' + (counter + 1) + '/' + urls.length);
    https
        .get('https://api.youtubemultidownloader.com/video?url=' + encodeURIComponent(urls[counter]), resp => {
            let data = '';

            resp.on('data', chunk => {
                data += chunk;
            });

            resp.on('end', () => {
                let mainData = ResponseYT.GetObj(JSON.parse(data) as ResponseYT);

                console.log('Title => ' + mainData.title);

                let downloadableFormat = mainData.format.find(i => i.size == 0);
                if (downloadableFormat) {
                    console.log('Link found');
                    downloadUrls += downloadableFormat.url + '\n';
                } else {
                    console.log('No link found');
                }
                console.log();
                if (counter + 1 < urls.length) {
                    getStuff(counter + 1);
                } else {
                    clipboardy.writeSync(downloadUrls);
                    console.log('Writing links to file...');
                    fs.writeFileSync('./output.txt', downloadUrls);
                    console.log('Done, copied links to clipboard & output file => ./output.txt');
                }
            });
        })
        .on('error', err => {
            console.log('Something went wrong : ' + err.message);
            console.log('Retrying...\n');
            getStuff(counter);
        });
}

if (!error) {
    getStuff();
}

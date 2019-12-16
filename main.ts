import { ResponseYT } from './response';

import * as https from 'https';
import * as fs from 'fs';

let urls = ['https://www.youtube.com/watch?v=470hYV_iq6E', 'https://www.youtube.com/watch?v=BMX9dEG9SFA'];

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
                    console.log('Writing links to file...');
                    fs.writeFileSync('./output.txt', downloadUrls);
                    console.log('Write complete, file => ./output.txt');
                }
            });
        })
        .on('error', err => {
            console.log('Something went wrong : ' + err.message);
            console.log('Retrying...\n');
            getStuff(counter);
        });
}

getStuff();

const https = require('https');
const fs = require('fs');

const cloudName = 'za7e7h1y';
const apiKey = '248277469954814';
const apiSecret = 'VMcR0z07o2dA7iDuaKEEQmZyQho';
const auth = Buffer.from(apiKey + ':' + apiSecret).toString('base64');

const options = {
  hostname: 'api.cloudinary.com',
  path: `/v1_1/${cloudName}/resources/video?max_results=500`,
  method: 'GET',
  headers: {
    'Authorization': 'Basic ' + auth
  }
};

let data = '';

const req = https.request(options, (res) => {
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const parsedData = JSON.parse(data);
    if (!parsedData.resources) {
        console.error('Error fetching videos:', parsedData);
        process.exit(1);
    }
    
    let idx = 1;
    const videos = parsedData.resources.map(res => {
        let category = 'Amigos & Fiesta'; 
        if (idx % 4 === 1) category = 'Familias & Niños';
        else if (idx % 4 === 2) category = 'Glamour & Chicas';
        else if (idx % 4 === 3) category = 'Parejas & Romance';

        const vid = {
            id: res.public_id,
            url: res.secure_url.replace('.mov', '.mp4').replace('.MOV', '.mp4'), // Force mp4 for web support
            title: 'Evento 360 - ' + res.public_id.replace('Only Fun', '').trim(),
            category: category
        };
        idx++;
        return vid;
    });

    fs.writeFileSync('src/data/cloudinaryVideos.json', JSON.stringify(videos, null, 2));
    console.log(`Successfully fetched and saved ${videos.length} videos from Cloudinary!`);
  });
});

req.on('error', (e) => {
  console.error('Problem with request:', e.message);
});

req.end();

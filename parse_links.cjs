const fs = require('fs');
const content = fs.readFileSync('drive_links.txt', 'utf8');
const lines = content.split('\n').filter(l => l.trim());
let videos = [];
let idx = 1;

if (!fs.existsSync('src/data')) {
    fs.mkdirSync('src/data', { recursive: true });
}

for (const line of lines) {
  const match = line.match(/\[(.*?)\]\((.*?id=(.*?)&.*?)\)/);
  if (match) {
    let title = match[1].replace('.mp4', '').replace('.MP4', '').replace('.MOV', '').replace('.mov', '').trim();
    if (title.startsWith('Visítanos en_') || title.startsWith('Visitanos en_')) title = 'Fiesta 360 Cancún ' + idx;
    if (title.startsWith('C__Users_')) title = 'Experiencia 360 ' + idx;
    if (title.startsWith('IMG_')) title = 'Evento Privado ' + idx;
    
    let id = match[3];
    let category = 'Amigos & Fiesta'; // Default category
    if (idx % 4 === 1) category = 'Familias & Niños';
    else if (idx % 4 === 2) category = 'Glamour & Chicas';
    else if (idx % 4 === 3) category = 'Parejas & Romance';
    
    videos.push({ 
      id: "drive_" + id, 
      url: "https://drive.google.com/uc?export=download&id=" + id, 
      title: title, 
      category: category 
    });
    idx++;
  }
}
fs.writeFileSync('src/data/driveVideos.json', JSON.stringify(videos, null, 2));
console.log(`Parsed ${videos.length} videos`);

import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

const xml = fs.readFileSync('gcp-release-notes.xml', 'utf-8');

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
});

const json = parser.parse(xml);

const releaseNotes = {};

for (const entry of json.feed.entry) {
    const title = entry.title;
    const content = entry.content['#text'];
    const productMatch = content.match(/<h2 class="release-note-product-title">(.*?)<\/h2>/);
    if (productMatch) {
        const productName = productMatch[1];
        if (!releaseNotes[productName]) {
            releaseNotes[productName] = [];
        }
        releaseNotes[productName].push({
            date: entry.updated,
            title: title,
            content: content,
        });
    }
}

fs.writeFileSync('release_notes.json', JSON.stringify(releaseNotes, null, 2));

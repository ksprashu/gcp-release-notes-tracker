import fs from 'fs';

const content = fs.readFileSync('products.txt', 'utf-8');

const lines = content.split('\n');

const products = [];
let currentCategory = '';

for (const line of lines) {
    if (line.startsWith('   ')) {
        const parts = line.trim().split('  ');
        if (parts.length > 1) {
            const name = parts[0];
            const description = parts.slice(1).join(' ').trim();
            products.push({
                id: name.toLowerCase().replace(/\s/g, '-'),
                name: name,
                category: currentCategory,
                description: description,
                url: ''
            });
        }
    } else if (line.trim().length > 0) {
        currentCategory = line.trim();
    }
}

fs.writeFileSync('products.json', JSON.stringify(products, null, 2));

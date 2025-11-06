import * as fs from 'fs';
import * as path from 'path';

// Read the dataService.ts file
const dataServiceContent = fs.readFileSync('services/dataService.ts', 'utf8');

// Extract the initialProducts array
const match = dataServiceContent.match(/export const initialProducts: Product\\[\\] = (.*);/s);
if (!match) {
    console.error("Could not find initialProducts in dataService.ts");
    process.exit(1);
}

let initialProducts;
try {
    initialProducts = JSON.parse(match[1]);
} catch (error) {
    console.error("Could not parse initialProducts:", error);
    process.exit(1);
}


// Get the list of icons
const iconsDir = 'public/icons';
const iconFiles = fs.readdirSync(iconsDir);

// Update the icon path for each product
const updatedProducts = initialProducts.map((product: any) => {
    const productName = product.name.toLowerCase().replace(/\\s/g, '-');
    const iconFile = iconFiles.find(file => file.toLowerCase().includes(productName));
    if (iconFile) {
        product.icon = path.join('/', iconsDir, iconFile);
    }
    return product;
});

// Update the dataService.ts file
const updatedContent = `import React from 'react';
import { Product, ChangeType } from '../types';

export const initialProducts: Product[] = ${JSON.stringify(updatedProducts, null, 2)};
`;

fs.writeFileSync('services/dataService.ts', updatedContent);

console.log('dataService.ts updated with icon paths.');

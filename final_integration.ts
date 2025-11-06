import fs from 'fs';
import path from 'path';
import * as parser from '@babel/parser';
import _generate from '@babel/generator';
const generate = _generate.default;
import _traverse from '@babel/traverse';
const traverse = _traverse.default;
import { File } from '@babel/types';

const dataServicePath = path.join(process.cwd(), 'services', 'dataService.ts');
const releaseNotesPath = path.join(process.cwd(), 'release_notes.json');
const productsPath = path.join(process.cwd(), 'products.json');

const releaseNotesContent = fs.readFileSync(releaseNotesPath, 'utf-8');
const productsContent = fs.readFileSync(productsPath, 'utf-8');
const dataServiceContent = fs.readFileSync(dataServicePath, 'utf-8');

const releaseNotes = JSON.parse(releaseNotesContent);
const products = JSON.parse(productsContent);

const ast = parser.parse(dataServiceContent, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
});

traverse(ast, {
    VariableDeclarator(path) {
        if (path.node.id.type === 'Identifier' && path.node.id.name === 'initialProducts') {
            const productsArray = path.node.init;
            if (productsArray && productsArray.type === 'ArrayExpression') {
                productsArray.elements.forEach(element => {
                    if (element && element.type === 'ObjectExpression') {
                        const idProperty = element.properties.find(p => p.type === 'ObjectProperty' && p.key.type === 'StringLiteral' && p.key.value === 'id');
                        if (idProperty && idProperty.type === 'ObjectProperty' && idProperty.value.type === 'StringLiteral') {
                            const id = idProperty.value.value;
                            const productName = products.find(p => p.id === id)?.name;
                            const productWithReleaseNotes = releaseNotes[productName];
                            if (productWithReleaseNotes) {
                                const releaseNotesProperty = element.properties.find(p => p.type === 'ObjectProperty' && p.key.type === 'StringLiteral' && p.key.value === 'releaseNotes');
                                if (releaseNotesProperty) {
                                    // @ts-ignore
                                    releaseNotesProperty.value = parser.parseExpression(JSON.stringify(productWithReleaseNotes));
                                } else {
                                    element.properties.push({
                                        type: 'ObjectProperty',
                                        key: parser.parseExpression('"releaseNotes"'),
                                        value: parser.parseExpression(JSON.stringify(productWithReleaseNotes)),
                                        computed: false,
                                        shorthand: false,
                                        decorators: null
                                    });
                                }
                            }
                        }
                    }
                });
            }
        }
    }
});

const output = generate(ast, {}, dataServiceContent);
fs.writeFileSync(dataServicePath, output.code);

console.log('Release notes integrated successfully!');

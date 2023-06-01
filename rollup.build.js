import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import strip from '@rollup/plugin-strip';
import filesize from 'rollup-plugin-filesize';
import html from '@rollup/plugin-html';
import crypto from 'crypto';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import esbuild from 'rollup-plugin-esbuild';
import typescript from 'rollup-plugin-typescript2';
import { readFileSync } from 'fs';

/* let regularFont;
let mediumFont;
let semiboldFont;
let boldFont; */
let iconSvg;
let iconIco;
let icon180;
let icon192;
let icon512;
let styles;
let manifest;

export default [{
    input: './src/Ava.ts',
    plugins: [
        clear({ targets: ['public'] }),
        resolve(),
        copy({
            targets: [
                {
                    src: 'assets/**/**.*',
                    // ignore: 'assets/website/styles.css',
                    dest: 'public',
                    rename: (name, extension, fullPath) => {
                        return getFileName(name, extension, fullPath);
                    },
                },
                /* {
                    src: 'assets/website/styles.css',
                    dest: 'public',
                    rename: (name, extension, fullPath) => {
                        return getFileName(name, extension, fullPath);
                    },
                    transform: (contents) => contents.toString().replace('{regular}', regularFont).replaceAll('{medium}', mediumFont).replaceAll('{semibold}', semiboldFont).replaceAll('{bold}', boldFont)
                }, */
                { 
                    src: 'assets/website/_headers', dest: 'public',
                },
            ],
        }),
        /* esbuild({
			tsconfig: 'tsconfig.build.json',
			minify: true,
			target: 'es2020',
            treeShaking: true,
		}), */
        typescript({tsconfig: 'tsconfig.build.json'}),
        compiler({
            language_in: 'ECMASCRIPT_2020',
            compilation_level: 'ADVANCED',
            language_out: 'ECMASCRIPT_2015'
        }),

        strip({ include: '**/*.(js|ts)' }),
        filesize({ showBrotliSize: true }),
        html({ template }),
    ],
    output: {
        dir: 'public',
        entryFileNames: '[name].[hash].js',
        format: 'esm',
    },
},
{
    input: './src/Build.ts',
    plugins: [
        esbuild({
			tsconfig: 'tsconfig.build.json',
			target: 'esnext',
		}),
        copy({
            targets: [{
                    src: 'assets/website/manifest.webmanifest',
                    dest: 'public',
                    rename: (name, extension, fullPath) => {
                        return getFileName(name, extension, fullPath);
                    },
                    transform: (contents) => contents.toString().replace('{icon192}', icon192).replaceAll('{icon512}', icon512)
                }
            ],
        }),
    ]
}];

function getFileName(name, extension, fullPath) {
    /* if (extension === 'woff2') {
        return getHashedFont(name, extension, fullPath);
    } */
    if (extension === 'webmanifest') {
        return getHashedManifest(name, extension, fullPath);
    }
    if (extension === 'svg' || extension === 'ico' || extension === 'png') {
        return getHashedIcon(name, extension, fullPath);
    }
    if (extension === 'css'){
        return getHashedStyles(name, extension, fullPath);
    }
    return name + '.' + extension;
}

/* function getHashedFont(name, extension, fullPath) {
    const hashedName = getHashedName(name, extension, fullPath);
    if (name === 'inter-regular') {
        regularFont = hashedName;
    } else if (name === 'inter-medium') {
        mediumFont = hashedName;
    } else if (name === 'inter-bold') {
        boldFont = hashedName;
    } else if (name === 'inter-semi-bold') {
        semiboldFont = hashedName;
    }
    return hashedName;
} */

function getHashedIcon(name, extension, fullPath) {
    const hashedName = getHashedName(name, extension, fullPath);
    if (name === 'icon') {
        iconSvg = hashedName;
    } else if (name === 'icon32x32') {
        iconIco = hashedName;
    } else if (name === 'icon180x180') {
        icon180 = hashedName;
    } else if (name === 'icon192x192') {
        icon192 = hashedName;
    } else if (name === 'icon512x512') {
        icon512 = hashedName;
    }
    return hashedName;
}

function getHashedManifest(name, extension, fullPath) {
    const hashedName = getHashedName(name, extension, fullPath);
    manifest = hashedName;
    return hashedName;
}

function getHashedStyles(name, extension, fullPath) {
    const hashedName = getHashedName(name, extension, fullPath);
    if (name === 'styles') {
        styles = hashedName;
    }
    return hashedName;
}

function getHashedName(name, extension, fullPath) {
    const fileBuffer = readFileSync(fullPath);
    const hash = crypto.createHash('sha256');
    hash.update(fileBuffer);
    const digest = hash.digest('hex').substring(0, 8);
    return name + '.' + digest + '.' + extension;
}

function template({ files }) {
    let main = '';
    const chunks = files.js;
    for (const chunk of chunks) {
        const fileName = chunk.fileName;
        console.log(fileName);
        if (fileName.startsWith('Ava')) {
            main = fileName;
            break;
        }
    }
    return `
    <!DOCTYPE html>
    <html lang="da">
    <head>
        <base href="https://ava.dk/">
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="Description" content="Ava">
        <meta name="theme-color" content="#FFFFFF">
        <link rel="preload" href="https://ava.dk/${styles}" as="style" />
        <link rel="stylesheet" href="https://ava.dk/${styles}"/>
        <link rel="icon" href="https://ava.dk/${iconIco}">
        <link rel="icon" href="https://ava.dk/${iconSvg}" type="image/svg+xml"> 
        <link rel="apple-touch-icon" href="https://ava.dk/${icon180}">
        <link rel="manifest" href="https://ava.dk/${manifest}">
        <title>Ava</title>
    </head>
    <body>
        <ava-dk></ava-dk>
        <script src="https://ava.dk/${main}" type="module" defer></script>
    </body>
    </html>
    `;
}

import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import strip from '@rollup/plugin-strip';
import filesize from 'rollup-plugin-filesize';
import html from '@rollup/plugin-html';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import typescript from 'rollup-plugin-typescript2';

export default [{
    input: './src/StarRating.ts',
    plugins: [
        clear({ targets: ['public'] }),
        resolve(),
        copy({
            targets: [
                {
                    src: 'assets/**/**.*',
                    dest: 'public',
                },
            ],
        }),
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
}];

function template({ files }) {
    let main = '';
    const chunks = files.js;
    for (const chunk of chunks) {
        const fileName = chunk.fileName;
        if (fileName.startsWith('Star')) {
            main = fileName;
            break;
        }
    }
    return `
    <!DOCTYPE html>
    <html lang="da">
        <head>
            <base href="/">
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="Description" content="Star Rating Development">
            <meta name="theme-color" content="#FFFFFF">
            <link rel="preload" href="styles.css" as="style" />
            <link rel="stylesheet" href="styles.css"/>
            <title>Star Rating Development</title>
        </head>
        <body>
            <div class="card">
                <star-rating value="4.7" size="large"></star-rating>
                <p aria-hidden="true">Large (L) value 4.7 red</p>
            </div>
            <div class="card">
                <star-rating value="3.5" size="medium" color="blue" disabled-color="#b8b8b7" disabled></star-rating>
                <p aria-hidden="true">Medium (M) value 3.5 blue disabled</p>
            </div>
            <div class="card">
                <star-rating value="1.8" size="small" color="purple"></star-rating>
                <p aria-hidden="true">Small (S) value 1.8 purple</p>
            </div>
            <div class="card">
                <star-rating value="2.4"></star-rating>
                <p aria-hidden="true">2.4</p>
            </div>
            <div class="card">
                <star-rating id="disabledStar" disabled value="3.7" disabled-color="#b8b8b7"></star-rating>
                <p aria-hidden="true">3.7 disabled</p>
            </div>
            <script type="module" src="${main}" defer></script>
            <!-- forcing deployment -->
        </body>
    </html>
    `;
}

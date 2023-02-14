const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');
const colors = require('colors');
const { spawn } = require('child_process');
const htmlMinifier = require('html-minifier').minify;

const srcPath = './';
const dstPath = 'hide-youtube-shorts-' + process.argv[2];
const ignore = [
    'dist',
    '.git',
    'node_modules',
    'package-lock.json',
    'package.json',
    'webpack.config.js',
    'webminify.config.js',
    'README.md',
    'build.config.js',
    '.gitignore',
    'popup.html',
    'css',
    'js',
    /hide-youtube-shorts-.*/
];

async function copyDirectories(srcPath, dstPath, ignore) {
    if (!fs.existsSync(dstPath)) {
        fs.mkdirSync(dstPath);
    }
    const files = fs.readdirSync(srcPath);
    for (const file of files) {
        if (ignore.some(pattern => {
            if (typeof pattern === 'string') {
                return pattern === file;
            } else if (pattern instanceof RegExp) {
                return pattern.test(file);
            } else {
                return false;
            }
        })) {
            continue;
        }
        const srcFilePath = path.join(srcPath, file);
        const dstFilePath = path.join(dstPath, file);
        if (fs.lstatSync(srcFilePath).isDirectory()) {
            copyDirectories(srcFilePath, dstFilePath, ignore);
            console.log(colors.green.bold('✔'), `Successfully copied ${srcFilePath}`);
        } else {
            fs.copyFileSync(srcFilePath, dstFilePath);
            if (file === 'manifest.json') {
                let content = fs.readFileSync(dstFilePath, 'utf8');
                content = content.replace('js/background.js', 'js/background.min.js');
                content = content.replace('js/main.js', 'js/main.min.js');
                content = content.replace('views/popup.html', 'views/popup.min.html');
                fs.writeFileSync(dstFilePath, content);
                console.log(colors.green.bold('✔'), `Successfully copied ${srcFilePath}`);
            }
        }
    }
}

async function minifyHtml(dstPath) {
    fs.readFile('./views/popup.html', 'utf-8', (err, data) => {
        if (err) throw err;
        const minified = htmlMinifier(data, {
            collapseWhitespace: true,
            removeComments: true,
            removeAttributeQuotes: true,
        });
        const replaced = minified
            .replace('../css/styles.css', '../css/styles.min.css')
            .replace('../js/popup.js', '../js/popup.min.js');
        fs.writeFile(`./${dstPath}/views/popup.min.html`, replaced, (err) => {
            if (err) throw err;
            console.log(colors.green.bold('✔'), 'Successfully minified and copied .html files');
        });
    });
}

async function runWebpack(dstPath) {
    const webpack = spawn(
        'C:\\Users\\proba\\AppData\\Roaming\\npm\\webpack.cmd',
        ['--mode', 'production', '--env', 'dstPath=' + dstPath]
    );
    webpack.on('close', async (code) => {
        console.log(colors.green.bold('✔'), 'Successfully minified and copied .js and .css files');
        await cleanUp(dstPath);
        archiveToZip(dstPath);
    });
}

async function cleanUp(dstPath) {
    if (!fs.existsSync(`./${dstPath}/css`)) {
        fs.mkdirSync(`./${dstPath}/css`);
    }
    fs.copyFileSync(`./${dstPath}/js/styles.min.css`, `./${dstPath}/css/styles.min.css`);
    fs.unlinkSync(`./${dstPath}/js/styles.min.css`);
    fs.unlinkSync(`./${dstPath}/js/styles.min.js`);
    console.log(colors.green.bold('✔'), 'Successfully cleaned unnecessary files');
}

async function archiveToZip(dstPath) {
    const version = process.argv[2];
    const srcDir = `./${dstPath}`;
    const zipFilePath = `./${dstPath}/hide-youtube-shorts-${version}.zip`;
    const zip = new JSZip();
    const addFileToZip = async (filePath, zipPath) => {
        const content = await fs.promises.readFile(filePath);
        zip.file(zipPath, content);
    };
    const addDirectoryToZip = async (dirPath, zipPath) => {
        const files = await fs.promises.readdir(dirPath);
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const fileStat = await fs.promises.stat(filePath);
            const fileZipPath = path.join(zipPath, file);
            if (fileStat.isFile()) {
                await addFileToZip(filePath, fileZipPath);
            } else if (fileStat.isDirectory()) {
                await addDirectoryToZip(filePath, fileZipPath);
            }
        }
    };
    await addDirectoryToZip(srcDir, '');
    const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
    await fs.promises.writeFile(zipFilePath, zipContent);
    console.log(colors.green.bold('✔'), 'Successfully created distributable .zip package');
    console.timeEnd('Build process finished in');
}

async function main() {
    if (!process.argv[2]) return console.log('[ERR] No version provided');
    console.log('Starting build process..');
    console.time('Build process finished in')
    await copyDirectories(srcPath, dstPath, ignore);
    await minifyHtml(dstPath);
    await runWebpack(dstPath);
}

main();
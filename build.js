const fs = require('fs');
const path = require('path');

function deleteDirectoryRecursive(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach((file) => {
            const curPath = path.join(dirPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteDirectoryRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(dirPath);
    }
}

function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return;

    const stats = fs.statSync(src);

    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        const files = fs.readdirSync(src);

        files.forEach((file) => {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);

            copyRecursive(srcPath, destPath);
        });
    }
    else if (stats.isFile()) {
        const destDir = path.dirname(dest);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        fs.copyFileSync(src, dest);
    }
}

function buildExtension() {
    const sourceDir = path.resolve(__dirname);
    const distDir = path.resolve(__dirname, 'dist');
    const chromeDir = path.resolve(distDir, 'chrome');
    const firefoxDir = path.resolve(distDir, 'firefox');

    if (fs.existsSync(distDir)) {
        deleteDirectoryRecursive(distDir);
    }

    fs.mkdirSync(distDir);
    fs.mkdirSync(chromeDir);
    fs.mkdirSync(firefoxDir);

    const copyItems = [
        'styles',
        'public',
        'background.js',
        'content.js',
        'LICENSE',
        'README.md'
    ];

    copyItems.forEach(item => {
        const srcPath = path.resolve(sourceDir, item);
        const destPath = path.resolve(chromeDir, item);

        copyRecursive(srcPath, destPath);
    });

    copyItems.forEach(item => {
        const srcPath = path.resolve(sourceDir, item);
        const destPath = path.resolve(firefoxDir, item);

        copyRecursive(srcPath, destPath);
    });

    const chromeManifestSrc = path.resolve(sourceDir, 'manifest.chrome.json');
    const chromeManifestDest = path.resolve(chromeDir, 'manifest.json');
    fs.copyFileSync(chromeManifestSrc, chromeManifestDest);

    const firefoxManifestSrc = path.resolve(sourceDir, 'manifest.firefox.json');
    const firefoxManifestDest = path.resolve(firefoxDir, 'manifest.json');
    fs.copyFileSync(firefoxManifestSrc, firefoxManifestDest);

    console.log('Building directories completed successfully!');
}

buildExtension();
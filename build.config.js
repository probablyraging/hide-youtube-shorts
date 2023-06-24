import fs from 'fs';

const sourceDir = './src/constants/stylesheets';
const destinationDir = './dist/assets';

const filesToCopy = [
    'channel_shorts_tab.css',
    'home_lives.css',
    'home_premieres.css',
    'home_shorts.css',
    'home_tab_shorts.css',
    'navigation_button.css',
    'notification_shorts.css',
    'recommended_shorts.css',
    'search_shorts.css',
    'subscriptions_feed_fix.css',
    'subscriptions_lives.css',
    'subscriptions_premieres.css',
    'subscriptions_shorts.css',
    'subscriptions_shorts_list.css',
    'trending_shorts.css'
];

filesToCopy.forEach((file) => {
    const sourceFile = `${sourceDir}/${file}`;
    const destinationFile = `${destinationDir}/${file}`;

    fs.copyFileSync(sourceFile, destinationFile);
    console.log(`Copied ${sourceFile} to ${destinationFile}`);
});

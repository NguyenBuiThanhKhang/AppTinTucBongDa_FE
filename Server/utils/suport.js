const cheerio = require('cheerio');
const crypto = require('crypto');

function getContentFromDB(htmlString) {
    if (!htmlString) return [];

    const blockNews = [];

    const $ = cheerio.load(htmlString);

    $('body').children().each((index, element) => {
        const $el = $(element);

        // Hình ảnh
        if (element.name === 'p') {
            const $img = $el.find('img');

            if ($img.length > 0) {
                blockNews.push({
                    numberOrder: index + 1,
                    type: 3,
                    contentBlock: $img.attr('src') || ''
                });
            } else {
                const text = $el.text().trim();
                if (text) {
                    blockNews.push({
                        numberOrder: index + 1,
                        type: 2,
                        contentBlock: text
                    });
                }
            }
        }
        // Heading
        else if (/^h[1-6]$/.test(element.name)) {
            blockNews.push({
                numberOrder: index + 1,
                type: 1,
                contentBlock: $el.text().trim()
            });
        }
    });

    return blockNews;
}

function encoding(s) {
    return crypto.createHash('sha256').update(s).digest('hex');
}

module.exports = {
    getContentFromDB,
    encoding
};
}
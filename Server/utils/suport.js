const cheerio = require('cheerio');
const crypto = require('crypto');

function getContentFromDB(htmlString) {
    if (!htmlString) return [];
    const getContentFromDB = (s) => {
    const parser = new DOMParser();
    const d = parser.parseFromString(s, "text/html");

    // Tải chuỗi HTML vào cheerio
    const $ = cheerio.load(htmlString);
    let blockNews = [];

    // Duyệt qua tất cả các thẻ con trực tiếp của body (hoặc thẻ p)
    $('body').children().each((index, element) => {
        const $el = $(element);

        // Kiểm tra nếu là thẻ P
        if (element.name === 'p') {
            const $img = $el.find('img');

            if ($img.length > 0) {
                // Trường hợp có ảnh bên trong thẻ P
                blockNews.push({
                    numberOrder: index + 1,
                    type: 3,
                    contentBlock: $img.attr('src') || ""
                });
            } else {
                // Trường hợp là văn bản (Type 2)
                const text = $el.text().trim();
                if (text !== "") {
                    blockNews.push({
                        numberOrder: index + 1,
                        type: 2,
                        contentBlock: text
                    });
                }
            }
        }
        // Bạn có thể thêm điều kiện cho thẻ H2, H3 (Type 1) nếu cần
        else if (element.name.match(/^h[1-6]$/)) {
            blockNews.push({
                numberOrder: index + 1,
                type: 1,
                contentBlock: $el.text().trim()
            });
        }
    });

    return blockNews;
}
function encoding(s){
    return crypto.createHash('sha256').update(s).digest('hex');
}

module.exports = {
    getContentFromDB
    ,encoding
};
}
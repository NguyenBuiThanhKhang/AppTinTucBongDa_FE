
const getContentFromDB = (s) => {
    const parser = new DOMParser();
    const d = parser.parseFromString(s, "text/html");
    let blockNews= [];

    d.body.childNodes.forEach((n, index) => {
        if (n.nodeName === 'P') {
            const img = n.querySelector('img');

            if (img) {
                blockNews.push({
                    numberOrder: index + 1,
                    type: 3,
                    contentBlock: img.getAttribute('src') || ""
                });
            } else if (element.innerText.trim() !== "") {
                blockNews.push({
                    numberOrder: index + 1,
                    type: 2,
                    contentBlock: element.innerText
                });
            }
        }
    });

    return blockNews;
}

module.exports = { getContentFromDB };
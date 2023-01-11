//
// const data = {
//     stopWords: ['хуй', 'залупу', 'член'],
//
//     isStopWord: function(textFromMsg) {
//         const wordsFromMsg = textFromMsg.split(' ');
//         const filter = wordsFromMsg.filter((w) => data.stopWords.includes(w));
//         if (filter.length) {
//             return true;
//         }
//         return false;
//     }
// }
//
// module.exports = data;



const stopWords = ['хуй', 'залупу', 'член'];
const isStopWord = (textFromMsg) => {
    const wordsFromMsg = textFromMsg.split(' ');
    const filter = wordsFromMsg.filter((w) => stopWords.includes(w));
    if (filter.length) {
        return true;
    }
    return false;
}

module.exports.isStopWord = isStopWord;
module.exports.stopWords = stopWords;

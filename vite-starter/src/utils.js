export function kebabCaseToTitleCase(colorName) {
    const pureString = colorName.replaceAll('-', ' ');
    const allWords = pureString.split(' ');
    const resultArray = [];

    allWords.forEach(word => {
        word = word.charAt(0).toUpperCase() + word.substr(1);
        resultArray.push(word);
    });

    return resultArray.join(' ');
}
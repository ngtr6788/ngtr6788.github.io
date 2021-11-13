const lettersInAlphabet = 26;

/**
 * caesarCipher shifts the messages's letters by a certain amount
 * to the right, e.g if shift = 3, A -> D, B -> E, etc.
 * 
 * @param {String} message
 * @param {Number} shift
 * @return {String} ciphertext
 */
const caesarCipher = (message, shift) => {
    const upperA = "A".charCodeAt(0);
    const lowerA = "a".charCodeAt(0);
    const upperZ = "Z".charCodeAt(0);
    const lowerZ = "z".charCodeAt(0);

    let ciphertext = "";
    for (let i = 0; i < message.length; ++i) {
        let c = message.charCodeAt(i); // initial character
        if (upperA <= c && c <= upperZ) {
            // if character is uppercases
            c = (c - upperA + shift) % lettersInAlphabet + upperA;
        } else if (lowerA <= c && c <= lowerZ) {
            // if character is lowercase
            c = (c - lowerA + shift) % lettersInAlphabet + lowerA;
        } // if it's not a letter, we don't bother
        const char = String.fromCharCode(c);
        ciphertext += char;
    }
    return ciphertext;
}

/**
 * anagram converts a given string into an anagram using Fisher-Yates
 * 
 * NOTE: From what I read, https://bost.ocks.org/mike/shuffle/, shows
 * that a really good O(n) way to shuffle an array is with the Fisher-Yates
 * shuffle, and I could easily use the naive method.
 * 
 * @param {String} text
 * @return {String} random anagram
 */
const anagram = (text) => {
    let textArray = text.split('');
    let n = textArray.length; // start with end of array
    let i, temp;

    while (n) { // while there exists elements to swap
        // pick remaining element with index < n
        i = Math.floor(Math.random() * n);
        n--;

        // and swap with the current element
        temp = textArray[i];
        textArray[i] = textArray[n];
        textArray[n] = temp;
    }

    const anagram = textArray.join('');
    return anagram;
}

/**
 * changeTextOnHover takes a current HTML node reference and gives 
 * either its Caesar cipher or its anagram, each about 5% of the time
 * 
 * @param {Element} nodeRef
 */

const probCaesar = 0.05;
const probAnagram = 0.05;

const changeTextOnHover = (nodeRef) => {
    // we keep the original text so that 
    const originalText = nodeRef.innerText;
    // when the mouse goes out, we retain the original text
    nodeRef.onmouseout = () => { nodeRef.innerHTML = originalText; }

    // this is where we randomize how the text appears
    const randomNum = Math.random();
    if (0 <= randomNum && randomNum < probCaesar) {
        nodeRef.innerHTML = anagram(originalText);
    } else if (probCaesar <= randomNum && randomNum < (probCaesar + probAnagram)) {
        const randomShift = Math.floor(Math.random() * (lettersInAlphabet + 1));
        nodeRef.innerHTML = caesarCipher(originalText, randomShift);
    }
}

/**
 * showPronounceGuide shows and hides the pronounciation
 * guide on click
 */
const showPronounceGuide = () => {
    const guide = document.getElementById("pronounce");
    if (guide.style.visibility == "hidden") {
        guide.style.visibility = "visible";
    } else {
        guide.style.visibility = "hidden";
    }
}
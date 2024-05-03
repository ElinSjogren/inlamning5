export function convertEmbedCode(embedCode) {
    if (embedCode === "none") {
        return embedCode;
    }

    console.log("Input embed code:", embedCode);

    const spotifyEmbedRegex = /<iframe\s(?:.*?)src=["'](?:https:\/\/open\.spotify\.com\/embed\/[^"']+?)["'](?:.*?)><\/iframe>/;
    console.log("Regex test result:", spotifyEmbedRegex.test(embedCode));

    if (spotifyEmbedRegex.test(embedCode)) {
        return embedCode.replace(/"/g, (match, index) => {
            if (index === 0 || index === embedCode.length - 1) {
                return match;
            } else {
                return "'";
            }
        });
    } else {
        return "none";
    }
}

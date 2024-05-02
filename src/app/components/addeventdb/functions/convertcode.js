export function convertEmbedCode(embedCode) {
    if (embedCode.includes('src="https://open.spotify.com/embed/artist/')) {
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

export default function ToGlosbe({ textToTranslate, sourceLang, targetLang, size }) {
    const glosbeUrl = `https://glosbe.com/${sourceLang}/${targetLang}/${textToTranslate}`
    return (
        <a
            href={encodeURI(glosbeUrl)}
            target="_blank"
            rel="noopener noreferrer"
        >
            <img src="glosbe.svg" alt="glosbe" style={{ width: size }} />
        </a>
    )
}
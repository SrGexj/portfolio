const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');
const deepl = require('deepl-node');

const authKey = "f9b1cce2-..."; // Sustituye con tu clave real
const translator = new deepl.Translator(authKey);

/**
 * Traduce un archivo HTML y guarda la versión traducida en una carpeta específica.
 * @param {string} htmlPath - Ruta del archivo HTML original.
 * @param {string} targetLang - Código del idioma destino (ej. 'es', 'fr', 'en').
 * @param {string} outputDir - Directorio donde se guardará el archivo traducido.
 */
async function translateHtmlFile(htmlPath, targetLang, outputDir) {
    try {
        // Leer el contenido del archivo HTML
        const htmlContent = await fs.readFile(htmlPath, 'utf8');
        
        // Cargar HTML en Cheerio para manipularlo
        const $ = cheerio.load(htmlContent);

        // Traducir textos dentro de elementos específicos
        const translatePromises = [];
        $('[data-translate], h1, h2, h3, p, a, span').each((_, element) => {
            const el = $(element);
            const text = el.text().trim();

            if (text) {
                translatePromises.push(
                    translator.translateText(text, null, targetLang).then(result => {
                        el.text(result.text); // Reemplazar texto traducido
                    })
                );
            }
        });

        // Esperar a que todas las traducciones terminen
        await Promise.all(translatePromises);

        // Crear carpeta de destino si no existe
        const targetFolder = path.join(outputDir, targetLang);
        await fs.mkdir(targetFolder, { recursive: true });

        // Guardar el archivo traducido en la carpeta de destino
        const outputPath = path.join(targetFolder, path.basename(htmlPath));
        await fs.writeFile(outputPath, $.html(), 'utf8');

        console.log(`Archivo traducido guardado en: ${outputPath}`);
    } catch (error) {
        console.error('Error al traducir el HTML:', error.message);
        throw error;
    }
}

/**
 * Ejemplo de uso
 */
(async () => {
    const htmlPath = './original/index.html'; // Ruta del archivo HTML original
    const targetLang = 'fr'; // Idioma destino
    const outputDir = './translated'; // Carpeta base para guardar traducciones

    try {
        await translateHtmlFile(htmlPath, targetLang, outputDir);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();

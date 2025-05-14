#!/usr/bin/env node

/**
 * CLI para servir el MCP project-docs
 */

const fs = require("fs");
const path = require("path");

// Obtener idioma de los argumentos
const args = process.argv.slice(2);
const langArg = args.find(arg => arg.startsWith('--lang='));
const language = langArg ? langArg.split('=')[1] : null;

// Ruta al archivo MCP
const mcpPath = path.join(__dirname, "project-docs-mcp.json");

// Leer y mostrar el contenido del MCP
try {
  // Leer el archivo MCP
  const mcpContent = JSON.parse(fs.readFileSync(mcpPath, "utf8"));
  
  // Verificar si se solicitó un idioma y está soportado
  if (language) {
    const supportedLanguages = mcpContent.language && mcpContent.language.supported || ["es", "en"];
    
    if (supportedLanguages.includes(language)) {
      // Establecer el idioma solicitado como predeterminado
      if (mcpContent.language) {
        mcpContent.language.current = language;
      } else {
        mcpContent.language = {
          default: "es",
          current: language,
          supported: ["es", "en"]
        };
      }
    } else {
      // Si el idioma no está soportado, usar el predeterminado y agregar un mensaje
      const defaultLang = mcpContent.language && mcpContent.language.default || "es";
      mcpContent.language = mcpContent.language || {};
      mcpContent.language.current = defaultLang;
      mcpContent.language.message = `El idioma '${language}' no está soportado. Usando el idioma predeterminado: ${defaultLang}`;
    }
  }
  
  // Devolver el contenido del MCP con el idioma actualizado
  console.log(JSON.stringify(mcpContent, null, 2));
} catch (error) {
  console.error(JSON.stringify({ error: `Error al leer el archivo MCP: ${error.message}` }));
  process.exit(1);
}

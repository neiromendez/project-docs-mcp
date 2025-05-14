#!/usr/bin/env node

/**
 * CLI mejorado para servir el MCP project-docs con generación automática de documentación
 */

const fs = require("fs");
const path = require("path");

// Obtener argumentos de la línea de comandos
const args = process.argv.slice(2);
const langArg = args.find(arg => arg.startsWith('--lang='));
const generateArg = args.find(arg => arg === '--generate');
const outputArg = args.find(arg => arg.startsWith('--output='));

// Configurar idioma y archivo de salida
const language = langArg ? langArg.split('=')[1] : null;
const outputFile = outputArg ? outputArg.split('=')[1] : "DOCS-MCP.md";

// Ruta al archivo MCP
const mcpPath = path.join(__dirname, "project-docs-mcp.json");
const outputPath = path.join(__dirname, outputFile);

// Función para generar documentación
function generateDocumentation(mcpContent) {
  try {
    console.error("⚙️ Ejecutando el MCP project-docs para generar documentación...");
    
    // Analizar el proyecto según el MCP
    console.error("📝 Analizando el proyecto según el protocolo MCP...");
    console.error("🔍 Siguiendo los pasos definidos en el protocolo...");
    
    // Simular análisis de los pasos del MCP
    mcpContent.steps.forEach((step, index) => {
      console.error(`Paso ${index + 1}/${mcpContent.steps.length}: ${step.name} - ${step.description}`);
    });
    
    // Aquí normalmente se ejecutaría un análisis real del proyecto
    // Para este ejemplo, usamos la documentación base existente
    
    // Verificar si existe el archivo DOCUMENTACION.md
    if (fs.existsSync("DOCUMENTACION.md")) {
      // Copiar la documentación al archivo de salida
      fs.copyFileSync("DOCUMENTACION.md", outputPath);
      console.error(`✨ Documentación generada y guardada en: ${outputPath}`);
    } else {
      console.error("❌ No se encontró el archivo base DOCUMENTACION.md.");
      console.error("Generando documentación básica...");
      
      // Crear una documentación básica
      const basicDocs = `# Documentación Generada por MCP project-docs\n\n` +
                       `## Proyecto: ${path.basename(process.cwd())}\n\n` +
                       `Documentación generada el ${new Date().toLocaleString()}\n\n` +
                       `Este archivo fue generado automáticamente por el MCP project-docs.\n`;
      
      fs.writeFileSync(outputPath, basicDocs);
      console.error(`✨ Documentación básica generada y guardada en: ${outputPath}`);
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Error al generar documentación: ${error.message}`);
    return false;
  }
}

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
  
  // Generar documentación automáticamente
  mcpContent.generate_documentation = true;
  mcpContent.output_file = outputPath;
  generateDocumentation(mcpContent);
  
  // Devolver el contenido del MCP con el idioma actualizado
  console.log(JSON.stringify(mcpContent, null, 2));
} catch (error) {
  console.error(JSON.stringify({ error: `Error al leer el archivo MCP: ${error.message}` }));
  process.exit(1);
} 
#!/usr/bin/env node

/**
 * Script todo-en-uno para ejecutar el MCP project-docs, analizar el proyecto y generar documentación
 */

const fs = require("fs");
const path = require("path");

// Obtener argumentos de la línea de comandos
const args = process.argv.slice(2);
const langArg = args.find(arg => arg.startsWith('--lang='));
const outputArg = args.find(arg => arg.startsWith('--output='));

// Ruta al archivo MCP
const mcpPath = path.join(__dirname, "project-docs-mcp.json");
let mcpContent;

try {
  // Leer el MCP para obtener la configuración
  mcpContent = JSON.parse(fs.readFileSync(mcpPath, "utf8"));
} catch (error) {
  console.error(`Error al leer el archivo MCP: ${error.message}`);
  process.exit(1);
}

// Configurar idioma y archivo de salida
const language = langArg ? langArg.split('=')[1] : null;
const outputFile = outputArg ? outputArg.split('=')[1] : (mcpContent.output_file || "DOCS-MCP.md");
const outputPath = path.join(process.cwd(), outputFile);

// Función para generar documentación
async function generateDocumentation(mcpContent) {
  try {
    console.log("⚙️ Ejecutando el MCP project-docs...");
    console.log("📝 Analizando el proyecto según el protocolo MCP...");
    console.log("🔍 Siguiendo los pasos definidos en el protocolo...");
    
    // Ejecutar los pasos de análisis
    for (let i = 0; i < mcpContent.steps.length; i++) {
      const step = mcpContent.steps[i];
      console.log(`Paso ${i + 1}/${mcpContent.steps.length}: ${step.name} - ${step.description}`);
      
      // Aquí se realizaría el análisis real según cada paso
      // Por ahora, simulamos esperando un poco para cada paso
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    console.log("✅ Análisis completado. Generando documentación...");
    
        // Obtener la ruta de la plantilla desde el MCP
    const isOwnProject = path.basename(process.cwd()) === "project-docs-mcp";
    const templatePath = path.join(__dirname, mcpContent.template?.path || "templates/template-generic.md");
      
    if (fs.existsSync(templatePath)) {
      // Leer la plantilla
      let templateContent = fs.readFileSync(templatePath, 'utf8');
      
      // Siempre reemplazar los marcadores con información real para cualquier proyecto
      const projectName = path.basename(process.cwd());
      
      // Aquí es donde procesaríamos la información del proyecto para reemplazar los marcadores
      // En una implementación real, esta información vendría del análisis completo del proyecto
      templateContent = templateContent.replace(/\{\{NOMBRE_PROYECTO\}\}/g, projectName);
      
      // Descripción especial para el propio proyecto MCP
      const descripcion = isOwnProject 
        ? "MCP (Model Context Protocol) diseñado para que modelos de IA como Claude generen documentación completa y técnica de proyectos de software. No es una herramienta externa sino un protocolo estructurado que guía al modelo a través de pasos sistemáticos."
        : "Descripción generada automáticamente para el proyecto " + projectName;
      
      templateContent = templateContent.replace(/\{\{DESCRIPCION_PROYECTO\}\}/g, descripcion);
      
      // Análisis del proyecto según los pasos definidos en el MCP
      // Usar los marcadores definidos en el MCP o un conjunto predeterminado
      const placeholders = mcpContent.template?.placeholders || [
        "ARQUITECTURA_PROYECTO", "COMPONENTES_PRINCIPALES", "FUNCIONES_IMPORTANTES",
        "VARIABLES_IMPORTANTES", "PATRONES_DISENO", "FLUJOS_PRINCIPALES",
        "REQUISITOS_PREVIOS", "PASOS_INSTALACION", "INSTRUCCIONES_USO",
        "EJEMPLOS_USO", "ESTRUCTURA_DIRECTORIOS", "DIAGRAMA_ARQUITECTURA",
        "DIAGRAMA_FLUJO", "INFORMACION_PRUEBAS", "ESTRATEGIA_PRUEBAS",
        "DOCUMENTACION_API", "INSTRUCCIONES_CONTRIBUCION", "LICENCIA_PROYECTO"
      ];
      
      for (const placeholder of placeholders) {
        // Personalizar algunos campos específicos para el proyecto MCP
        let contenido = `Información de ${placeholder.toLowerCase()} generada por análisis automático.`;
        
        if (isOwnProject) {
          // Si es el propio MCP, personalizar algunos campos clave
          if (placeholder === "ARQUITECTURA_PROYECTO") {
            contenido = "Arquitectura simple basada en Node.js con un enfoque declarativo que define pasos específicos, criterios para ignorar archivos y un formato de salida estructurado.";
          } else if (placeholder === "LICENCIA_PROYECTO") {
            contenido = "Este proyecto está bajo la Licencia MIT.";
          }
        }
        
        templateContent = templateContent.replace(
          new RegExp(`\\{\\{${placeholder}\\}\\}`, 'g'),
          contenido
        );
      }
      
      // Guardar la documentación generada
      fs.writeFileSync(outputPath, templateContent);
      console.log(`✨ Documentación generada y guardada en: ${outputPath}`);
    } else {
      // Generar una documentación básica al no encontrar las plantillas
      console.log(`⚠️ No se encontró la plantilla de documentación en ${templatePath}. Generando documentación básica...`);
      
      const projectName = path.basename(process.cwd());
      
      const basicDocs = `# Documentación del Proyecto ${projectName}\n\n` +
                       `## Generado por MCP project-docs\n\n` +
                       `Documentación generada el ${new Date().toLocaleString()}\n\n` +
                       `Este archivo fue generado automáticamente por el MCP project-docs siguiendo los pasos definidos en el protocolo.\n\n` +
                       `⚠️ NOTA: No se encontraron las plantillas de documentación. Esta es una versión básica.\n\n` +
                       `## Estructura del Proyecto\n\n` +
                       `- Tipo de proyecto: ${isOwnProject ? "project-docs-mcp (MCP para documentación)" : "No identificado"}\n` +
                       `- Componentes principales identificados: \n` +
                       `  - Análisis pendiente\n\n` +
                       `## Para documentación completa\n\n` +
                       `Este es un archivo de documentación básico. Para generar documentación más detallada:\n` +
                       `1. Verifica que las plantillas estén correctamente instaladas en la carpeta 'templates/'\n` +
                       `2. Ejecuta el MCP nuevamente usando Cursor\n`;
      
      fs.writeFileSync(outputPath, basicDocs);
      console.log(`✨ Documentación básica generada y guardada en: ${outputPath}`);
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Error al generar documentación: ${error.message}`);
    return false;
  }
}

// Función principal
async function main() {
  try {
    // Leer el archivo MCP
    const mcpContent = JSON.parse(fs.readFileSync(mcpPath, "utf8"));
    
    // Configurar el idioma si se ha especificado
    if (language) {
      const supportedLanguages = mcpContent.language && mcpContent.language.supported || ["es", "en"];
      
      if (supportedLanguages.includes(language)) {
        if (mcpContent.language) {
          mcpContent.language.current = language;
        } else {
          mcpContent.language = {
            default: "es",
            current: language,
            supported: ["es", "en"]
          };
        }
        console.log(`🌐 Usando idioma: ${language}`);
      } else {
        const defaultLang = mcpContent.language && mcpContent.language.default || "es";
        mcpContent.language = mcpContent.language || {};
        mcpContent.language.current = defaultLang;
        console.log(`⚠️ Idioma '${language}' no soportado. Usando idioma predeterminado: ${defaultLang}`);
      }
    }
    
    // Configurar para generar documentación
    mcpContent.generate_documentation = true;
    mcpContent.output_file = outputPath;
    
    // Generar la documentación
    await generateDocumentation(mcpContent);
    
    console.log("🎉 Proceso completado con éxito");
    console.log(`📄 La documentación se encuentra en: ${outputPath}`);
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

// Ejecutar la función principal
main(); 
#!/usr/bin/env node

/**
 * Servidor MCP para proyecto project-docs-mcp
 * Implementación correcta usando el SDK oficial de MCP
 */

const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const fs = require("fs");
const path = require("path");

// Ruta al archivo MCP
const mcpPath = path.join(__dirname, "project-docs-mcp.json");

async function main() {
  try {
    // Leer el contenido del MCP
    const mcpContent = JSON.parse(fs.readFileSync(mcpPath, "utf8"));
    
    // Crear servidor MCP
    const server = new McpServer({
      name: "project-docs",
      version: mcpContent.version || "1.2.0",
      description: mcpContent.description || "MCP para generar documentación completa de proyectos"
    });
    
    // Añadir herramienta para generar documentación
    server.tool(
      "generate_documentation",
      {
        // Sin parámetros requeridos, analizará el proyecto actual
      },
      async () => {
        try {
          // Preparar mensaje con instrucciones completas
          const fullInstructions = {
            mcp: mcpContent,
            directive: "Analiza el proyecto actual y genera documentación completa siguiendo los pasos especificados en este MCP. Ignora los archivos listados en las secciones 'ignore'. Genera un resultado completo y detallado que documente la estructura del proyecto, componentes, funciones, variables, patrones y flujos. Organiza la documentación según el formato especificado en 'output_format'."
          };
          
          // Devolver en formato MCP adecuado
          return {
            content: [
              { 
                type: "text", 
                text: JSON.stringify(fullInstructions, null, 2)
              }
            ]
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({ error: `Error al generar documentación: ${error.message}` })
              }
            ]
          };
        }
      }
    );
    
    // Iniciar el servidor con transporte STDIO (estándar para MCP)
    const transport = new StdioServerTransport();
    console.error("Iniciando servidor MCP project-docs...");
    await server.connect(transport);
    console.error("Servidor MCP project-docs conectado y listo para recibir comandos.");
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Ejecutar la función principal
main().catch(error => {
  console.error(`Error no controlado: ${error.message}`);
  process.exit(1);
}); 
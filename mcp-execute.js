#!/usr/bin/env node

/**
 * Script para ejecutar el MCP project-docs con instrucciones explícitas
 */

const fs = require("fs");
const path = require("path");

// Ruta al archivo MCP
const mcpPath = path.join(__dirname, "project-docs-mcp.json");

// Leer el contenido del MCP
try {
  // Leer el archivo MCP
  const mcpContent = JSON.parse(fs.readFileSync(mcpPath, "utf8"));
  
  // Añadir instrucciones explícitas
  const fullInstructions = {
    mcp: mcpContent,
    directive: "Analiza el proyecto actual y genera documentación completa siguiendo los pasos especificados en este MCP. Ignora los archivos listados en las secciones 'ignore'. Genera un resultado completo y detallado que documente la estructura del proyecto, componentes, funciones, variables, patrones y flujos. Organiza la documentación según el formato especificado en 'output_format'."
  };
  
  // Devolver el contenido
  console.log(JSON.stringify(fullInstructions, null, 2));
} catch (error) {
  console.error(JSON.stringify({ error: `Error al leer el archivo MCP: ${error.message}` }));
  process.exit(1);
} 
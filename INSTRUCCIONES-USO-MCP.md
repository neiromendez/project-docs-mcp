# Instrucciones de Uso del MCP project-docs

Este archivo explica cómo utilizar correctamente el MCP project-docs con IA como Claude en Cursor.

## Problema Común

Cuando simplemente indicas a la IA "Usa el MCP project-docs", la IA puede no entender que debe ejecutar el MCP y en su lugar intenta generar documentación por su cuenta.

## Solución: Formas Correctas de Invocar el MCP

Usa alguna de las siguientes instrucciones exactas para que la IA ejecute correctamente el MCP:

### Opción 1: Ejecución Directa
```
Ejecuta el comando project-docs-mcp-execute para generar documentación completa del proyecto
```

### Opción 2: Ejecución Todo-en-Uno
```
Genera documentación completa para este proyecto usando el comando project-docs-mcp-all
```

### Opción 3: Especificando Parámetros Adicionales
```
Ejecuta project-docs-mcp-all --lang=es --output=DOCUMENTACION.md
```

## Notas Importantes

1. El MCP está diseñado para ser ejecutado desde la línea de comandos, no como una función directa de la IA.
2. Si la IA no reconoce el comando, asegúrate de que el paquete está instalado globalmente con:
   ```
   npm install -g project-docs-mcp
   ```
3. Si estás dentro del directorio del proyecto MCP, puedes ejecutarlo con:
   ```
   node mcp-execute.js
   ```
   o
   ```
   node project-docs-mcp-all.js
   ```

## Parámetros Disponibles

- `--lang=XX`: Especifica el idioma (es, en, fr, pt, de)
- `--output=ARCHIVO.md`: Especifica el nombre del archivo de salida 
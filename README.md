# project-docs-mcp

MCP (Model Context Protocol) para generar documentación automática y detallada de proyectos directamente con IA, incluyendo análisis a nivel de código.

## Descripción

Este proyecto implementa un MCP (Model Context Protocol) que define un protocolo de comunicación para que modelos de IA como Claude generen documentación completa y técnicamente detallada de proyectos. En lugar de ser una herramienta externa, es un protocolo que el modelo usa directamente cuando se le pide documentar un proyecto, analizando tanto la estructura general como los detalles a nivel de código.

## ¿Qué es un MCP (Model Context Protocol)?

Un MCP es un protocolo que guía a un modelo de IA a través de un proceso estructurado para resolver un problema específico. Proporciona contexto, pasos y estructura para que el modelo pueda generar respuestas más precisas y completas. Este MCP específico está diseñado para documentación detallada de proyectos, incluyendo análisis de código.

## Instalación 

Para instalar este MCP globalmente:

```bash
# Clonar el repositorio
git clone https://github.com/yourusername/project-docs-mcp.git
cd project-docs-mcp

# Instalar globalmente
npm install -g .
```

## Configuración de Cursor

Para configurar Cursor, edita el archivo `~/.cursor/mcp.json` y añade:

```json
"mcpServers": {
  "project-docs": {
    "command": "project-docs-mcp-serve",
    "runtime": "node"
  }
}
```

### Configuración con Idioma Específico

Puedes configurar el MCP para que genere documentación en un idioma específico:

```json
"mcpServers": {
  "project-docs": {
    "command": "project-docs-mcp-serve --lang=en",
    "runtime": "node"
  },
  "project-docs-es": {
    "command": "project-docs-mcp-serve --lang=es",
    "runtime": "node"
  },
  "project-docs-fr": {
    "command": "project-docs-mcp-serve --lang=fr",
    "runtime": "node"
  }
}
```

Con esta configuración puedes usar comandos específicos para cada idioma:

```
Usa el MCP project-docs para generar documentación en inglés
```

```
Usa el MCP project-docs-es para generar documentación en español
```

### Idiomas Soportados

El MCP actualmente soporta los siguientes idiomas:
- Español (es) - Predeterminado
- Inglés (en)
- Francés (fr)
- Portugués (pt)
- Alemán (de)

## Cómo Usar este MCP

Hay varias maneras de usar este MCP:

### Uso directo en Cursor

Una vez configurado, simplemente pide a la IA en Cursor que use el MCP con un comando como:

```
Usa el MCP project-docs para generar documentación de este proyecto
```

O más específicamente:

```
Genera documentación completa para este proyecto siguiendo el MCP project-docs. Analiza los archivos, estructura, componentes principales, funciones, variables y genera un README.md completo con documentación técnica detallada.
```

## Ejemplos de Uso

### Solicitud Básica

```
Hazme la documentación de este proyecto usando el MCP project-docs
```

### Solicitud Detallada

```
Genera documentación completa para este proyecto siguiendo el MCP project-docs. Analiza todos los archivos del proyecto, identifica la estructura, componentes principales, dependencias y flujos de datos. Documenta todas las funciones importantes con sus parámetros y retornos. Identifica las variables clave y estructuras de datos. Crea diagramas claros para la arquitectura y organización. El README debe incluir instrucciones detalladas de instalación, uso, y ejemplos. Usa formato Markdown para la salida.
```

### Solicitud con Énfasis en Código

```
Usando el MCP project-docs, genera documentación para este proyecto enfocándote especialmente en el análisis del código. Documenta cada función principal con sus parámetros, valores de retorno, efectos secundarios y ejemplos de uso. Identifica y documenta todas las variables globales importantes y estructuras de datos. Explica patrones de diseño utilizados y posibles mejoras.
```

### Solicitud con Énfasis en Arquitectura

```
Usando el MCP project-docs, genera documentación para este proyecto con especial énfasis en la arquitectura y los patrones de diseño utilizados. Incluye diagramas detallados que muestren la relación entre componentes. Identifica y explica todos los patrones arquitectónicos y de diseño implementados.
```

### Solicitud para Documentación de Funciones

```
Con el MCP project-docs, crea documentación exhaustiva de todas las funciones y métodos de este proyecto. Para cada función importante, especifica:
- Firma de la función y parámetros
- Valor de retorno y tipo
- Propósito y comportamiento
- Efectos secundarios
- Excepciones o errores posibles
- Ejemplos de uso con código
- Dependencias con otras funciones
```

### Solicitud en Otro Idioma

```
Utiliza el MCP project-docs para generar documentación completa de este proyecto en español. Sigue todos los pasos del protocolo y asegúrate de que la documentación sea clara y comprensible, especialmente en las secciones técnicas de funciones y variables.
```

## Pasos del MCP

El MCP guía al modelo a través de los siguientes pasos:

1. **Analizar estructura** - Examinar archivos, directorios y tipo de proyecto
2. **Identificar componentes** - Localizar archivos principales y módulos clave
3. **Analizar flujo** - Determinar flujos de ejecución y datos
4. **Documentar funciones** - Analizar y documentar funciones y métodos importantes
5. **Documentar variables** - Documentar variables y estructuras de datos relevantes
6. **Documentar patrones** - Identificar patrones de diseño y arquitectura utilizados
7. **Generar diagramas** - Crear diagramas explicativos de la estructura y arquitectura
8. **Documentar instalación** - Explicar el proceso de instalación
9. **Documentar uso** - Explicar cómo usar el proyecto
10. **Documentar pruebas** - Analizar estrategias de pruebas y calidad
11. **Compilar README** - Organizar toda la información en un documento coherente

## Archivos y Directorios Ignorados

El MCP está configurado para ignorar automáticamente archivos y directorios comúnmente excluidos en proyectos de software:

### Directorios ignorados
- `node_modules`
- `.git`, `.github`
- `dist`, `build`, `coverage`
- `.idea`, `.vscode`
- `.next`, `.nuxt`, `out`
- Directorios temporales y logs

### Archivos ignorados
- Archivos de entorno (`.env`, `.env.local`, etc.)
- Archivos de log (`*.log`)
- Archivos de bloqueo (`package-lock.json`, `yarn.lock`)
- Archivos minimizados (`*.min.js`, `*.min.css`)
- Archivos de mapeo de código (`*.map`)

Esto asegura que la documentación generada se enfoque en el código relevante del proyecto.

## Formato de Salida

El MCP especifica que la documentación debe incluir las siguientes secciones:

- **Título** (obligatorio) - Nombre del proyecto
- **Descripción** (obligatorio) - Explicación detallada del propósito
- **Arquitectura** (obligatorio) - Estructura arquitectónica y patrones utilizados
- **Componentes** (obligatorio) - Componentes principales y su función
- **Código Detallado** (obligatorio) - Documentación de funciones, variables y patrones
- **Flujos** (obligatorio) - Flujos de ejecución y datos principales
- **Instalación** (obligatorio) - Instrucciones de instalación
- **Uso** (obligatorio) - Guía de uso
- **Estructura** (obligatorio) - Organización del proyecto
- **Diagramas** (obligatorio) - Representaciones visuales
- **API** (opcional) - Documentación de interfaz pública
- **Pruebas** (obligatorio) - Información sobre pruebas y calidad
- **Contribución** (opcional) - Guía para contribuir
- **Licencia** (obligatorio) - Información de licencia

## Ventajas de este Enfoque

- **Sistemático**: Asegura que no se omita ningún aspecto importante
- **Consistente**: Produce documentación con estructura coherente
- **Eficiente**: Guía al modelo a través de un proceso optimizado
- **Adaptable**: Funciona con cualquier tipo de proyecto de software
- **Detallado**: Analiza el código para documentar funciones, variables y patrones
- **Completo**: Genera documentación útil tanto para usuarios como para desarrolladores

## Para Desarrolladores de MCP

Si deseas modificar este MCP, simplemente edita el archivo `project-docs-mcp.json` para:
- Añadir nuevos pasos al proceso
- Modificar los prompts de cada paso
- Cambiar el formato de salida
- Añadir nuevas secciones obligatorias u opcionales

## Licencia

Este proyecto está bajo la Licencia MIT.
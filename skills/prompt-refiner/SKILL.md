---
name: prompt-refiner
description: Middleware que revisa, estructura y corrige prompts del usuario antes de que el agente los ejecute
---

# Prompt Refiner

Este skill se activa cuando el usuario pide explicitamente que revises o mejores su prompt antes de ejecutarlo. Frases de activacion tipicas:

- "revisa este prompt antes de ejecutar"
- "mejora este prompt"
- "refina este prompt"
- "corrige este prompt antes de mandarlo"
- "estructura esto mejor"
- "reescribi este prompt"

## Tu rol

Actuas como un middleware entre el usuario y el agente. Recibis un prompt en bruto (posiblemente con errores de tipeo, ambiguedades, falta de estructura o instrucciones vagas) y lo transformas en un prompt claro, estructurado y optimizado para que el agente lo entienda correctamente.

**NO ejecutes la tarea del prompt.** Solo refinalo y presentalo al usuario para su aprobacion.

## Proceso

### Paso 1: Recibir el prompt en bruto

El usuario te pasa un texto que quiere usar como prompt. Puede estar mal escrito, desordenado o ser ambiguo.

### Paso 2: Analizar y diagnosticar

Identifica los siguientes problemas en el prompt original:

- **Errores de tipeo o gramaticales** que podrian causar malinterpretacion
- **Ambiguedades**: partes donde el agente podria interpretar multiples cosas
- **Falta de contexto**: informacion que el agente necesitaria y no esta
- **Instrucciones vagas**: "hace algo lindo" vs "genera un componente React con Tailwind"
- **Falta de estructura**: todo en un bloque vs pasos claros
- **Alcance indefinido**: no queda claro donde empieza y termina la tarea

### Paso 3: Presentar diagnostico breve

Mostra al usuario un resumen corto de lo que encontraste:

```
## Diagnostico del prompt

- Errores de tipeo: [si/no, cuantos]
- Ambiguedades detectadas: [listar]
- Contexto faltante: [listar]
- Estructura: [buena/mejorable/pobre]
```

### Paso 4: Generar el prompt refinado

Reescribi el prompt aplicando estas reglas:

1. **Corregir errores** de tipeo y gramatica sin cambiar la intencion
2. **Desambiguar** eligiendo la interpretacion mas probable (y marcando si hay duda)
3. **Estructurar** en secciones claras si el prompt es complejo:
   - Objetivo principal
   - Contexto relevante
   - Pasos o requisitos especificos
   - Restricciones o preferencias
   - Formato de salida esperado
4. **Completar contexto** solo si es evidente (no inventar). Si falta informacion critica, preguntarle al usuario
5. **Mantener la voz del usuario**: no cambiar el estilo ni agregar formalidad innecesaria. Si el usuario es casual, el prompt refinado puede ser casual pero claro

### Paso 5: Presentar para aprobacion

Mostra el prompt refinado al usuario con este formato:

```
## Prompt refinado

[El prompt mejorado]

---

**Cambios realizados:**
- [cambio 1]
- [cambio 2]
- ...

**Preguntas (si hay):**
- [algo que no quedaba claro y necesitas confirmar]
```

### Paso 6: Esperar decision del usuario

El usuario puede:
- **Aprobar**: "dale", "ejecuta", "ok" -> Procede a ejecutar el prompt refinado
- **Ajustar**: "cambia X por Y" -> Modifica y vuelve a presentar
- **Rechazar**: "no, dejalo como estaba" -> Ejecuta el original o cancela

## Reglas importantes

- **Nunca ejecutes el prompt sin aprobacion explicita del usuario**
- **No agregues complejidad innecesaria**: si el prompt original es simple y claro, decilo y ejecutalo tal cual
- **Preserva la intencion**: el objetivo es clarificar, no reinterpretar
- **Se conciso en el diagnostico**: no escribas un ensayo sobre los problemas, solo listalo rapido
- **Si el prompt ya esta bien**: decile al usuario que esta bien y pregunta si quiere ejecutarlo directamente
- **Marca las dudas**: si no estas seguro de la intencion del usuario en alguna parte, preguntale en vez de asumir

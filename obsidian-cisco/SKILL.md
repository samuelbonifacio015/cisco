---
name: obsidian-cisco
description: >-
  Recupera todo el contexto del curso Redes y Comunicaciones de Datos (UPC, 1ASI0640,
  Cisco/Packet Tracer) desde el grafo de conocimiento del vault Obsidian, en cualquier
  equipo. Úsalo cuando Samuel diga "obsidian cisco", "retomemos Redes", "cómo voy en
  Redes", "plan de remontada", "actualiza mi dominio de Redes", "registra la sesión de
  Redes", o empiece a estudiar Redes/Cisco en una máquina nueva sin contexto previo.
version: 1.0.0
author: Samuel Bonifacio
metadata:
  tags: [obsidian, redes, cisco, upc, ciclo-7, roadmap]
  related_skills: [obsidian, obsidian-commit-convention, redes-parcial-tutor, cisco-parcial-sprint, packet-tracer]
---

# Obsidian Cisco — contexto del curso de Redes

El vault es la memoria del curso. No re-derives nada desde cero: lee el grafo, di dónde está Samuel y sigue el plan. Todo en español.

## Rutas

| Recurso | Windows | Linux |
|---|---|---|
| Repo del vault | `C:\Users\crama\Desktop\obsidian-notes` | `/home/samuel/obsidian-notes` |
| Grafo del curso | `<vault>/obsidian/Universidad/Ciclo 7/Redes y Comunicaciones de Datos/Conocimiento/` | idem |
| Repo de trabajo `cisco` (PPTs, .pkt, bancos) | `C:\Users\crama\Desktop\Calendarios UPC\Calendarios CICLO 7\Redes\cisco` | puede no existir: dilo y sigue solo con el vault |

Estructura de `Conocimiento/`:
- `00 Roadmap Redes.md` — hub (MOC). Unidades en `Unidades/`, 41 conceptos en `Conceptos/`, evaluaciones en `Evaluaciones/`.
- `Plan de Remontada Redes.md` — notas, cálculo de lo que falta y plan semana a semana (s9–s16).
- `Mapa de Dominio Redes.md` — semáforo 🔴🟡🟢⚪ de todos los conceptos.
- `Errores frecuentes Redes.md` · `Bitácora de sesiones Redes.md` · `Recursos y skills Redes.md` · `Caso de estudio Grupo 2.md`.

## Al arrancar

1. Sincroniza: `git -C <repo del vault> fetch origin main` y `git pull --rebase origin main` (si lo bloquean artefactos como `ruvector.db`, stash solo ese path; ver skill `obsidian`).
2. Lee, en este orden: `Plan de Remontada Redes.md` → `Mapa de Dominio Redes.md` → las últimas 5 entradas de `Bitácora de sesiones Redes.md` → `Errores frecuentes Redes.md`.
3. Con la fecha de hoy, ubica la semana del ciclo (S1 = 24–30 ago 2026; S9 = 19–25 oct) y su fila en el plan.
4. Responde en ≤ 6 líneas: semana actual, qué toca hoy según el plan, los 🔴 más urgentes antes de la próxima evaluación, y una pregunta: ¿estudiar, laboratorio o registrar avance?

## Durante la sesión

- **Estudiar un concepto**: abre su nota en `Conceptos/`, explícalo desde ahí y cierra con una pregunta de comprobación. Para práctica tipo examen usa `redes-parcial-tutor` (banco de preguntas); para el caso del TB1, `cisco-parcial-sprint`; para PT en vivo, `packet-tracer`.
- **Nunca inventes datos del caso**: los valores del `.pka` están en `Caso de estudio Grupo 2.md` y en `cisco/cisco-parcial-sprint/cases/sedes.md`.
- **Tema nuevo de clase (U3/U4)**: amplía la nota ⚪ correspondiente con lo visto (manteniendo el formato: callout de unidad/dominio/evaluación, idea clave, comandos, trampas, `Relacionado:` con wikilinks) y pásala a 🟡.

## Al cerrar (siempre)

1. **Dominio**: si un concepto cambió de estado, actualiza su frontmatter (`dominio:` + tag `dominio/rojo|amarillo|verde|gris`) **y** su fila en `Mapa de Dominio Redes.md` (y el conteo de arriba). Criterio: 🟢 = 16/20 en 10 preguntas seguidas o laboratorio hecho solo con evidencia; 🟡 = con ayuda; 🔴 = falla.
2. **Bitácora**: agrega una línea con la plantilla de la nota (fecha · qué · resultado · pendiente) enlazando los conceptos.
3. **Errores**: si apareció un error nuevo o repetido, agrégalo a `Errores frecuentes Redes.md`.
4. **Notas**: si Samuel da una nota de evaluación, llénala en el frontmatter de `Evaluaciones/<X> Redes.md` y en la tabla del plan, y recalcula. Aprobar = **NF ≥ 12.5**; cada 10 % vale 2 puntos de la NF. Promedio necesario en lo que falta = `(12.5 − Σ peso·nota) / peso restante`. Fórmula y recuperables (PC1, EA1, PC2, EB1) salen del sílabo: `<vault>/obsidian/Universidad/Ciclo 7/Redes y Comunicaciones de Datos/SILABO.pdf`.
5. Commit y push con `obsidian-commit-convention`: stagea solo los archivos tocados, `update(vault): redes <qué> [DD/MM]`, `git push origin main`. Nunca incluyas `.obsidian/graph.json` ni otros cambios ajenos.

## Grafo

Los colores salen de Graph view → Groups con `tag:#dominio/rojo`, `/amarillo`, `/verde`, `/gris` (instrucciones en el roadmap). No edites `.obsidian/graph.json` sin pedir confirmación.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este repo

No es un proyecto de software: es el material de estudio del curso **Redes y Comunicaciones de Datos (UPC, basado en Cisco), ciclo 2026-2**. No hay build, lint ni tests. El trabajo típico es tutoría (subnetting, VLANs, Packet Tracer), resolver entregables en Excel y generar lecciones HTML. Responde siempre en español.

Remote: `github.com/samuelbonifacio015/cisco`.

## Estructura

- `semana-N/<día>/` — material crudo por semana y día de clase (normalmente `jueves/`): PPTs del profesor, `.pkt`/`.pka` de Packet Tracer, fotos de apuntes, PDFs y Excels. Son binarios: no se editan a mano.
- `skill-redes-cisco/SKILL.md` + `skill-redes-cisco/references/curso.md` — skill "redes-cisco" (tutor). **`curso.md` es la referencia consolidada del temario**; léela antes de responder dudas sustantivas del curso.
- `skill-packet-tracer/SKILL.md` — skill "packet-tracer": flujo para dar comandos IOS de VLANs/access/trunk a partir de capturas, con tabla de errores frecuentes.
- `semana-N/apuntes-*.md` — apuntes en Markdown de lo resuelto en clase (p. ej. `semana-5/apuntes-vlan-trunk.md`).
- `handoff/` — contexto heredado de otros agentes. `SOUL-redes-cisco.md` define el rol de tutor; `contexto.md` (~90 KB) es el transcript de una sesión previa. Consúltalo con grep, no lo leas completo.
- `lessons/NNNN-*.html` — lecciones autocontenidas y numeradas (HTML + CSS inline, `lang="es"`, mismas variables `:root`). Las nuevas lecciones siguen esa numeración y ese estilo.
- `reference/` — glosarios HTML.
- `outputs/<uuid>/` — entregables generados (p. ej. Excel completado + su `.inspect.ndjson`).

## Convenciones del curso (no obvias)

- **Fuente de verdad = PPTs del profesor.** Si algo excede el material, dilo y pide la diapositiva; no rellenes con conocimiento externo presentado como si fuera del curso.
- **FLSM por defecto:** si un ejercicio da una IP padre y varias cantidades de hosts sin decir "VLSM", usa una sola máscara hija calculada con la mayor demanda para todas las subredes. La máscara padre se conserva como bloque original (detalle y ejemplo `172.69.0.0/22` en `skill-redes-cisco/SKILL.md`).
- Hosts utilizables = `2^h - 2`; red y broadcast no se asignan.
- Para cálculos IPv4 usa la tabla del skill: máscara, red, primer host, último host, broadcast y hosts utilizables.
- Los `.pkt` se abren con Cisco Packet Tracer (instalado localmente); no se pueden inspeccionar desde la CLI. Para configuraciones, entrega comandos IOS listos para pegar en la pestaña CLI.

## Git

- `.gitignore` excluye `.commandcode/`.
- Se versionan binarios (PDF, PPTX, PKT, imágenes). Historial en estilo `feat:` / `docs:`.

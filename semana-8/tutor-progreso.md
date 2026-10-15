# Progreso — Tutor parcial Redes

Examen: 15/10/2026 · Presupuesto: ~8 h · Reparto por peso (práctica primero).

| Módulo | Tiempo | Inicio | Últimas 10 (/20) | Caja 1 (IDs a repetir) | Estado |
|---|---|---|---|---|---|
| M1 Direccionamiento | 1 h (usó ~2 h) | 14/10 ~17:08 | 12/20 | M1-15, M1-20 (parte 3) | cerrado por tiempo, no dominado |
| M2 Subnetting FLSM/VLSM | 2.5 h | | | | pendiente |
| M3 VLAN e inter-VLAN | 1.5 h | | | | pendiente |
| M4 OSI/TCP-IP | 30 min | | | | pendiente |
| M5 Capa física | 30 min | | | | pendiente |
| M6 Fundamentos | 30 min | | | | pendiente |
| M7 WLAN | 30 min | | | | pendiente |
| S Simulacro | 1 h | | | | pendiente |

## Notas de sesión

- 14/10 M1 (10 preguntas, 12/20): M1-05=1, M1-09=2, M1-07=1, M1-15=0, rep. M1-05=1, M1-10=1, rep. M1-07=2, rep. M1-15=1, M1-19=2, M1-20=1.
- Debilidad principal: confunde SALTO (tamaño del bloque) con RED (múltiplo exacto del salto); pone la red en múltiplo+1 (.33 en vez de .32). Cadena: múltiplo → red · red+1 → primera útil/gateway · siguiente múltiplo−1 → broadcast · broadcast−1 → última útil.
- Escribe solo el último octeto del broadcast/red; en el examen van completos.
- IP vs MAC: sabe que la MAC cambia por salto, pero dijo que la IP destino cambia. La IP destino NO cambia (salvo NAT).
- 15/10 08:10: examen HOY 19:00; estudia hasta 13:00 (~4 h 50). M2: M2-04=2, M2-05=2, M2-06=2; M2-07 (VLSM 3 redes, 192.168.50.0/24: 100/50/2) pendiente → vuelve en simulacro. Plan: M3 Packet Tracer 2 h → teoría 45 min → simulacro P1+P2+P3 1 h → repaso errores. Gateway del examen = "1era IP".
- 15/10 09:52: M3 P3 armado y verificado en PT por el estudiante (Router0 hostname Samuel_Bonifacio, subinterfaces .10/.20 up/up; Switch0 trunk Fa0/2 y Fa0/5; Switch1 Fa0/6→VLAN10, Fa0/18→VLAN20). Falta evidencia de ping PC1→PC2 y show interfaces trunk de Switch1. M3-04=2. Siguiente: VLSM (M2-07), luego simulacro P1+P2+P3, teoría rápida al final.
- 15/10 10:56: M2-07 guiado: LAN A ok (.0/25, bc .127); LAN B prefijo ok pero solapó con A (puso .0–.63); WAN pendiente. Handoff en %TEMP%/handoff-redes-parcial-2026-10-15.md.

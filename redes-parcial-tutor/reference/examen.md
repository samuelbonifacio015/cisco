# Formato del examen parcial y ejercicios tipo examen

Fuente: `semana-8/[studocu] Examen Parcial 2026-1` (parte práctica) y `[studocu] Apuntes Examen Parcial` (parte teórica de opción múltiple).

## Parte teórica

Opción múltiple y V/F sobre M4–M7 y conceptos de M1/M3 (ver `bank/preguntas.md`, IDs marcados "studocu").

## Parte práctica (10 pts)

### P1 · VLSM (3 pts)
Red dada (2026-1: `10.12.12.0/24`) y una topología con LANs y enlaces. Empezar por la subred con más hosts. Documentar el procedimiento y llenar:

| Nombre subred | Hosts solicitados | Hosts válidos | Prefijo | Dirección de red | Rango de hosts utilizable | Broadcast |
|---|---|---|---|---|---|---|

### P2 · División por subredes con VLSM (4 pts)
Red padre (2026-1: `153.170.20.0 /28` — con /28 solo caben 14 hosts, probablemente era /24; si sale así, **pregunta al profesor**). Llenar:

| Nombre | # hosts requeridos | # hosts asignados | ID de red | Máscara /N | Máscara decimal | Gateway (1.ª IP) | Rango de IPs para hosts | Broadcast (última IP) |
|---|---|---|---|---|---|---|---|---|

Requisitos de entrega (si no se cumplen, no se califica): hostname de cada equipo con el código de alumno (`R1(config)# hostname R1_u2016123456`, `SW1_u2016123456`) · evidencias con **recortes** (no pantallazos) en Word + archivo `.pkt` · nombre de archivos y asunto `PC1_NRC_CODIGOALUMNO`.

### P3 · Inter-VLAN (3 pts)
Configurar VLANs en Packet Tracer y demostrar conectividad (ping exitoso o PDU). El **router lleva tu apellido y nombre** como hostname (requisito indispensable). Ítems: topología lógica de switches · configuración de VLAN · trunk · router-on-a-stick · verificar conectividad.

## Cómo armar un ejercicio tipo examen

**P1/P2 (VLSM)**
1. Elige una red base (/24 privada o de clase B) y 4–6 requisitos: 3–4 LAN con hosts distintos (ej. 100, 50, 20, 10) + 1–2 enlaces WAN de 2 hosts.
2. Comprueba que caben: suma de bloques (128+64+32+16+4+4 = 248 ≤ 256).
3. Resuélvelo tú antes de mostrarlo (de mayor a menor, cada red empieza donde termina la anterior).
4. Entrega el enunciado + la tabla vacía con las columnas exactas de P1 o P2. Pide que la llene completa y que escriba el procedimiento (bits de host y salto por fila).
5. Corrige fila por fila: 1 pt por fila completa; señala la primera celda equivocada y por qué.

Modelo resuelto (P1, `10.12.12.0/24`, LAN A 100 · LAN B 50 · LAN C 20 · LAN D 10 · WAN1 2 · WAN2 2):

| Subred | Solic. | Válidos | Prefijo | Red | Rango | Broadcast |
|---|---|---|---|---|---|---|
| LAN A | 100 | 126 | /25 | 10.12.12.0 | .1 – .126 | .127 |
| LAN B | 50 | 62 | /26 | 10.12.12.128 | .129 – .190 | .191 |
| LAN C | 20 | 30 | /27 | 10.12.12.192 | .193 – .222 | .223 |
| LAN D | 10 | 14 | /28 | 10.12.12.224 | .225 – .238 | .239 |
| WAN1 | 2 | 2 | /30 | 10.12.12.240 | .241 – .242 | .243 |
| WAN2 | 2 | 2 | /30 | 10.12.12.244 | .245 – .246 | .247 |

**P3 (inter-VLAN en Packet Tracer)**
Escenario base (PPT de Felix): R1 (2911) `G0/0` ↔ S1 `Fa0/5` (trunk) · S1 `Fa0/1` ↔ S2 `Fa0/1` (trunk) · PC1 en S1 `Fa0/6` VLAN 10 `192.168.10.10/24` gw `.1` · PC2 en S2 `Fa0/18` VLAN 20 `192.168.20.10/24` gw `.1` · subinterfaces `G0/0.10` = `192.168.10.1/24`, `G0/0.20` = `192.168.20.1/24`.
Variantes para no repetir: cambia los números de VLAN y las redes (sácalas de un VLSM previo), agrega una tercera VLAN, o usa un switch 3560 con SVI + `ip routing` (modelo slide 2–3 de Felix: VLAN X/Y `192.168.1.0/24` y `192.168.2.0/24`, gateways `.1`).
Entrega: tabla de dispositivos/puertos/VLAN/IP/gateway completa, la lista de ítems de P3, y pide como evidencia `show vlan brief` (de cada switch), `show interfaces trunk`, `show ip interface brief` (router) y `ping` PC1 → PC2. Recuérdale el hostname del router con su apellido y nombre.

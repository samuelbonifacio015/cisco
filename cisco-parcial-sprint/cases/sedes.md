# Caso Grupo 2 (sección 7610) — topología real del `.pka`

Fuentes: `Exposicion_Hito1_Grupo2.pptx` + lectura directa de `CasoEstudio_GRUPO_2_7610.pka` con el MCP de Packet Tracer (PT 9.0.1). Los valores de abajo son los **reales del archivo**; úsalos tal cual al generar problemas y al explicar el caso.

Empresa: rediseño de la red de la casa matriz en Perú. 5 sedes activas (Lima + 4 sucursales de Provincia) y una sede "Multinacional" pendiente. Bloque multinacional `10.142.0.0/16` → Perú `10.142.32.0/19` → un `/22` por sede (FLSM, 3 bits) → VLSM dentro de cada sede. Mismos IDs de VLAN en todas las sucursales: **3, 9, 21, 45**.

## Mapa general

```
ISP (zona amarilla)                         Zona verde: red de la empresa
DNS ISP 78.86.75.10 ─┐                      
Web ISP 78.86.75.20 ─┴ Switch8 ─ ISP3 ─ ISP1 ═ serial 17.11.35.0/30 ═ ┐
                                  └──── ISP2 ═ serial 17.11.35.4/30 ═ ┤
                                                                      Router_Lima (2911)
                              WAN1 10.142.36.0/30  ── Router_Puno ────┤  (WAN en estrella,
                              WAN2 10.142.36.4/30  ── Router_Huanuco ─┤   enlaces seriales /30)
                              WAN3 10.142.36.8/30  ── Router_Ica ─────┤
                              WAN4 10.142.36.12/30 ── Router_La_Libertad ┤
                              (sin nombre) 10.142.36.16/30 ── Router_Multinacional (pendiente)
```

| Sede | Red /22 | Serial en Lima | Serial en la sede |
|---|---|---|---|
| Lima | 10.142.40.0/22 | — | — |
| La Libertad | 10.142.44.0/22 | Se0/1/0 = 10.142.36.13 | Se0/0/0 = 10.142.36.14 |
| Puno | 10.142.48.0/22 | Se0/2/1 = 10.142.36.1 | Se0/0/0 = 10.142.36.2 |
| Ica | 10.142.52.0/22 | Se0/1/1 = 10.142.36.9 | Se0/0/0 = 10.142.36.10 |
| Huánuco | 10.142.56.0/22 | Se0/2/0 = 10.142.36.5 | Se0/0/0 = 10.142.36.6 |
| Multinacional | (pendiente) | Se0/3/0 = 10.142.36.17 | Se0/0/0 = 10.142.36.18 |

En el mapa de PT los puertos seriales de Lima rotulados son: Se0/0/0 y Se0/0/1 (hacia ISP), Se0/1/0, Se0/1/1, Se0/2/0, Se0/2/1, Se0/3/0 (hacia sedes). Router_Lima y las sucursales son **2911** con módulos seriales HWIC-2T.

## Sucursales (misma estructura en las 4)

- Router 2911: `Gi0/0` **sin IP** (troncal desde el switch central) + 4 sub-interfaces con `encapsulation dot1Q N`. Serial `Se0/0/0` hacia Lima.
- Switch central `SWD_<sede>` (2960-24TT) + cuatro switches de acceso `SW1..SW4_<sede>` (2960-24TT).
- Equipos por sede: 2 PCs de Administración, 2 de Ventas, 2 de Logística (Huánuco/Puno/Ica/La Libertad), y 4 servidores en VLAN 45: WEB, DNS, DHCP, FTP.
- Nombres de VLAN: `admin_<sede>` (3), `log_<sede>` (9), `vent_<sede>` (21), `server_<sede>` (45).
- Sin WiFi en las sucursales (el AP/laptop del TP1 se agrega nuevo).

### La Libertad (caso guiado)

| Área | VLAN | Nombre | Red | Sub-interfaz / gateway | PCs |
|---|---|---|---|---|---|
| Administración | 3 | admin_la_libertad | 10.142.44.0/23 (255.255.254.0) | Gi0/0.3 = 10.142.44.1 | PC1_ADM .2, PC2_ADM .3 |
| Logística | 9 | log_la_libertad | 10.142.47.0/25 (255.255.255.128) | Gi0/0.9 = 10.142.47.1 | PC1_LOG .2, PC2_LOG .3 |
| Ventas | 21 | vent_la_libertad | 10.142.46.0/24 (255.255.255.0) | Gi0/0.21 = 10.142.46.1 | PC1_VEN .2, PC2_VEN .3 |
| Servidores | 45 | server_la_libertad | 10.142.47.128/29 (255.255.255.248) | Gi0/0.45 = 10.142.47.129 | WEB .130, DNS .131, DHCP .132, FTP .133 |

### Puno

| Área | VLAN | Red | Gateway (Gi0/0.N) | Equipos |
|---|---|---|---|---|
| Administración | 3 | 10.142.48.0/23 | 10.142.48.1 | PCs .2, .3 |
| Ventas | 21 | 10.142.50.0/24 | 10.142.50.1 | PCs .2, .3 |
| Logística | 9 | 10.142.51.0/26 | 10.142.51.1 | PCs .2, .3 |
| Servidores | 45 | 10.142.51.64/29 | 10.142.51.65 | WEB .66, DNS .67, DHCP .68, FTP .69 |

### Ica

| Área | VLAN | Red | Gateway (Gi0/0.N) | Equipos |
|---|---|---|---|---|
| Administración | 3 | 10.142.52.0/23 | 10.142.52.1 | PCs .2, .3 |
| Ventas | 21 | 10.142.54.0/25 | 10.142.54.1 | PCs .2, .3 |
| Logística | 9 | 10.142.54.128/26 | 10.142.54.129 | PCs .130, .131 |
| Servidores | 45 | 10.142.54.192/29 | 10.142.54.193 | WEB .194, DNS .195, DHCP .196, FTP .197 |

### Huánuco

| Área | VLAN | Red | Gateway (Gi0/0.N) | Equipos |
|---|---|---|---|---|
| Administración | 3 | 10.142.56.0/24 | 10.142.56.1 | PCs .2, .3 |
| Ventas | 21 | 10.142.57.0/25 | 10.142.57.1 | PCs .2, .3 |
| Logística | 9 | 10.142.57.128/26 | 10.142.57.129 | PCs .130, .131 |
| Servidores | 45 | 10.142.57.192/29 | 10.142.57.193 | WEB .194, DNS .195, DHCP .196, FTP .197 |

Regla del caso: gateway = primer host de cada red; PCs desde el siguiente host; servidores al inicio del bloque /29 de la VLAN 45.

## Lima (sede principal, modelo de 3 capas)

- **Núcleo:** `CORE_Lima` (3560-24PS) con **una SVI por VLAN** (gateway de cada VLAN) e `ip routing`. Puerto hacia el router **enrutado** (`no switchport`): `Fa0/1 = 10.142.42.241/30` ↔ `Router_Lima Gi0/0 = 10.142.42.242/30`.
- **Distribución:** 4 switches 3560-24PS (`01_Lima` … `04_Lima`).
- **Acceso:** 8 switches 2960-24TT (`SW1_LIMA` … `SW8_LIMA`).
- **WiFi:** `AP_EJEC_LIMA` (SSID ejecutivos, VLAN 27) y `AP_CLIE_LIMA` (SSID clientes, VLAN 33), WPA2-PSK/AES; laptops con módulo WPC300N (LT1/LT2_EJEC_LIMA, LT1/LT2_CLIE_LIMA).

| VLAN | Nombre | Red | SVI / gateway | Equipos |
|---|---|---|---|---|
| 3 | admin_lima | 10.142.40.0/24 | 10.142.40.1 | PC1/PC2_ADM .2/.3 |
| 9 | log_lima | 10.142.41.0/25 | 10.142.41.1 | PC1/2/3_LOG .2/.3/.4 |
| 15 | fin_lima | 10.142.41.128/25 | 10.142.41.129 | PC1/PC2_FIN .130/.131 |
| 21 | vent_lima | 10.142.42.0/26 | 10.142.42.1 | PC1/PC2_VEN .2/.3 |
| 27 | ejec_lima | 10.142.42.64/26 | 10.142.42.65 | laptops WiFi .66/.67 |
| 33 | client_lima | 10.142.42.128/26 | 10.142.42.129 | laptops WiFi .130/.131 |
| 39 | mark_lima | 10.142.42.192/27 | 10.142.42.193 | PC1/PC2_MARK .194/.195 |
| 45 | server_lima | 10.142.42.224/28 | 10.142.42.225 | WEB .226, DNS .227, DHCP .228, FTP .229 |

Las VLAN de Lima (8) son más que las de sucursal (4): por eso Lima usa SVI en capa 3 y las sucursales router-on-a-stick.

## Salida a Internet (zona ISP)

| Equipo | Interfaces |
|---|---|
| ISP1 (2811) | Fa0/0 219.0.0.6/30 · Se0/2/0 17.11.35.1/30 (hacia Lima) · Se0/2/1 219.0.0.1/30 |
| ISP2 (2811) | Fa0/0 219.0.0.10/30 · Se0/2/0 17.11.35.5/30 (hacia Lima) · Se0/2/1 219.0.0.2/30 |
| ISP3 (2811) | Fa0/0 219.0.0.5/30 · Fa0/1 219.0.0.9/30 · Fa1/0 78.86.75.1/24 |
| Lima | Se0/0/0 17.11.35.2/30 · Se0/0/1 17.11.35.6/30 |
| Servidores ISP | DNS 78.86.75.10 · Web 78.86.75.20 (`www.oracle.com`), red 78.86.75.0/24, vía Switch8 (2950T-24) |

## Cableado y puertos reales (leídos del `.pka`: enlaces + `show vlan brief` + `show interfaces trunk`)

### Estructura de cada sucursal
- Router `Gi0/0` ↔ `SWD_*` `Fa0/5`.
- `SWD_*` es el switch de distribución: `Fa0/1`–`Fa0/4` suben a los 4 switches de acceso y `Fa0/5` va al router. Los 5 puertos son **trunk** (`mode on`, 802.1Q, native VLAN 1, VLANs permitidas 1-1005).
- En cada switch de acceso el **uplink es trunk** y los puertos de equipos son **access**.
- Servidores: todos en `SW4_*`, VLAN 45, puertos `Fa0/2` WEB, `Fa0/3` DNS, `Fa0/4` DHCP, `Fa0/5` FTP (`Fa0/1` es el uplink).

### Enlaces SWD ↔ acceso

| Sede | SWD Fa0/1 | SWD Fa0/2 | SWD Fa0/3 | SWD Fa0/4 |
|---|---|---|---|---|
| La Libertad | SW1 Fa0/3 | SW2 Fa0/4 | SW3 Fa0/2 | SW4 Fa0/1 |
| Ica | SW1 Fa0/3 | SW2 Fa0/4 | SW3 Fa0/2 | SW4 Fa0/1 |
| Huánuco | SW1 Fa0/3 | SW2 Fa0/1 | SW3 Fa0/2 | SW4 Fa0/1 |
| Puno | SW1 Fa0/3 | SW2 Fa0/1 | SW3 Fa0/2 | SW4 Fa0/1 |

### Puertos access por switch (VLAN)

| Switch | La Libertad | Ica | Huánuco | Puno |
|---|---|---|---|---|
| SW1 | Fa0/1 PC1_VEN (21) · Fa0/2 PC1_ADM (3) · uplink Fa0/3 | igual | igual | igual |
| SW2 | Fa0/1 PC2_ADM (3) · Fa0/2 PC2_VEN (21) · Fa0/3 PC1_LOG (9) · uplink Fa0/4 | igual | Fa0/2 PC2_ADM (3) · Fa0/3 PC2_VEN (21) · Fa0/4 PC1_LOG (9) · uplink Fa0/1 | igual a Huánuco |
| SW3 | Fa0/1 PC2_LOG (9) · uplink Fa0/2 | igual | igual | igual |
| SW4 | Fa0/2-Fa0/5 servidores (45) · uplink Fa0/1 | igual | igual | igual |

### Lima — VLAN por puerto de acceso (leído)
SW1: Fa0/1 V3, Fa0/2 V9, uplink Fa0/3 · SW2: Fa0/1 V9, Fa0/2 V3, uplink Fa0/3 · SW3: Fa0/1 V21, Fa0/2 V39, Fa0/3 V9, uplink Fa0/4 · SW4: Fa0/1 V39, Fa0/2 V21, uplink Fa0/3 · SW5: Fa0/1 V15 (y Fa0/3 V15), uplink Fa0/2 · SW6: Fa0/1 V27 (AP_EJEC), Fa0/2 V15, uplink Fa0/3 · SW7: Fa0/2 V33 (AP_CLIE), uplink Fa0/1 · SW8: Fa0/2–Fa0/5 V45, uplink Fa0/1. Los 4 switches de distribución `01`–`04_Lima` y `CORE_Lima` solo tienen puertos trunk.

### Lima (enlaces)
- `Router_Lima Gi0/0` ↔ `CORE_Lima Fa0/1` (puerto enrutado). `CORE_Lima` Fa0/2–Fa0/5 ↔ `01_Lima`…`04_Lima` Fa0/1.
- Distribución → acceso: `01_Lima` Fa0/2→SW1 Fa0/3, Fa0/3→SW2 Fa0/3 · `02_Lima` Fa0/2→SW3 Fa0/4, Fa0/3→SW4 Fa0/3 · `03_Lima` Fa0/2→SW5 Fa0/2, Fa0/3→SW6 Fa0/3 · `04_Lima` Fa0/2→SW7 Fa0/1, Fa0/3→SW8 Fa0/1.
- Equipos: SW1 Fa0/1 PC1_ADM, Fa0/2 PC2_LOG · SW2 Fa0/1 PC1_LOG, Fa0/2 PC2_ADM · SW3 Fa0/1 PC1_VEN, Fa0/2 PC2_MARK, Fa0/3 PC3_LOG · SW4 Fa0/1 PC1_MARK, Fa0/2 PC2_VEN · SW5 Fa0/1 PC1_FIN · SW6 Fa0/1 AP_EJEC, Fa0/2 PC2_FIN · SW7 Fa0/2 AP_CLIE · SW8 Fa0/2 WEB, Fa0/3 DNS, Fa0/4 DHCP, Fa0/5 FTP.

### Zona ISP (enlaces)
`ISP3 Fa1/0` ↔ `Switch8 Fa0/1` · `Switch8 Fa0/2` DNS ISP · `Switch8 Fa0/3` Web ISP · `ISP1 Fa0/0` ↔ `ISP3 Fa0/0` · `ISP2 Fa0/0` ↔ `ISP3 Fa0/1` · `ISP1 Se0/2/1` ↔ `ISP2 Se0/2/1` · `ISP1 Se0/2/0` ↔ `Router_Lima Se0/0/0` · `ISP2 Se0/2/0` ↔ `Router_Lima Se0/0/1`.

### Rutas (leído de las tablas de enrutamiento)
- `Router_Lima` tiene una sola ruta estática: `ip route 10.142.40.0 255.255.252.0 10.142.42.241` (la red de Lima, vía `CORE_Lima`). Sus otras rutas son conectadas (las 5 WAN /30).
- `Router_La_Libertad` y `Router_Puno` solo muestran redes conectadas (sus sub-interfaces y el serial); Ica y Huánuco no devolvieron rutas estáticas ni protocolos dinámicos. Es decir, en el `.pka` no hay ruteo entre sedes configurado, solo el de cada sede hacia su propio router. Para estudiar el caso: lo que está configurado es VLAN + inter-VLAN por sede + enlaces WAN; el ruteo estático/dinámico entre sedes no.

### WiFi
No se pudo leer por MCP el SSID ni la clave de `AP_EJEC_LIMA` / `AP_CLIE_LIMA`. El Hito dice: WPA2-PSK, AES, tarjeta WPC300N en las laptops; el SSID de Lima es `ejecutivos` (V27) y `clientes` (V33). Para el parcial el SSID es `Fieles`.

### Nota sobre servidores
Los puertos de switch de los servidores sí están en VLAN 45. Lo que puede faltar en algunos servidores es la configuración interna (IP, servicio DHCP/DNS/Web), que no se lee por MCP: confírmalo en el GUI del servidor antes de usarlo como dato.

## Uso en tutoría

- Modo "conocer el caso" (al derecho y al revés): ver `SKILL.md`, sección "Modo estudiar el caso".
- El parcial pide "una sucursal de Provincia" sin nombre: el estudiante debe poder repetir la ruta en las 4. Con La Libertad se guía; Puno, Ica y Huánuco sirven de repetición y simulacro.

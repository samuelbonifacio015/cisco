# Banco de preguntas — Caso Grupo 2 (sección 7610)

Todas las respuestas salen de `cases/sedes.md`, `reference/comandos.md`, `materials/enunciado-tp1.md` y del Hito 1. Si una respuesta cambia en el `.pka`, corrige primero `cases/sedes.md` y luego aquí.

## Convención

- **ID:** `Q-<CAT>-NN`. Categorías: `WAN` enlaces entre sedes · `DER` diseño→configuración · `REV` dato→diseño · `CAB` cableado y puertos · `INT` inter-VLAN y métodos · `LIM` Lima · `TP` las 6 tareas del parcial · `EXP` exposición y diseño general.
- **Nivel:** 1 = recordar un dato · 2 = aplicar/derivar · 3 = trampa o explicar el porqué.
- **Formato de cada pregunta:** `ID · N# · Pregunta` → `R:` respuesta esperada → `Fuente:`. La línea `R:` es solo para el tutor; no se muestra hasta que el estudiante responda.
- **Puntuación:** 2 = completa, 1 = parcial (falta un dato), 0 = incorrecta o sin respuesta.

---

## WAN — enlaces entre sedes

**Q-WAN-01 · N1** · ¿Qué red /30 une Lima con La Libertad y qué IP y puerto tiene cada extremo?
R: `10.142.36.12/30` (WAN4). Lima `Se0/1/0` = .13; La Libertad `Se0/0/0` = .14. Fuente: sedes.md, tabla WAN.

**Q-WAN-02 · N1** · ¿Por qué serial sale Lima hacia Huánuco y con qué IPs?
R: `Se0/2/0` = 10.142.36.5; Huánuco `Se0/0/0` = 10.142.36.6; red 10.142.36.4/30 (WAN2). Fuente: sedes.md.

**Q-WAN-03 · N2** · Nombra las 4 redes WAN con nombre y su sede.
R: WAN1 10.142.36.0/30 Puno · WAN2 10.142.36.4/30 Huánuco · WAN3 10.142.36.8/30 Ica · WAN4 10.142.36.12/30 La Libertad (y 10.142.36.16/30 hacia Multinacional, sin nombre). Fuente: sedes.md, mapa.

**Q-WAN-04 · N2** · ¿Qué topología WAN usa el caso y por qué conviene?
R: Estrella con Lima al centro, enlaces seriales /30 (2 hosts útiles, punto a punto) dentro de 10.142.36.0/22; Lima concentra el acceso a internet y a las sucursales. Fuente: Hito 1, diapositiva 3.

**Q-WAN-05 · N1** · ¿Qué sede aún no tiene LAN y cuál es su enlace?
R: Multinacional: solo serial `10.142.36.16/30`, Lima `Se0/3/0` = .17 y Multinacional `Se0/0/0` = .18. Fuente: sedes.md.

**Q-WAN-06 · N2** · ¿Cuántos hosts tiene un /30 y por qué se usa en seriales?
R: 2 utilizables (2² − 2); un enlace punto a punto necesita exactamente dos direcciones, no se desperdicia espacio. Fuente: curso/redes-cisco.

**Q-WAN-07 · N1** · ¿Qué redes y IPs unen Lima con los ISP?
R: 17.11.35.0/30 con ISP1 (Lima Se0/0/0 = .2, ISP1 = .1) y 17.11.35.4/30 con ISP2 (Lima Se0/0/1 = .6, ISP2 = .5). Fuente: sedes.md, zona ISP.

## DER — de diseño a configuración

**Q-DER-01 · N2** · Sub-interfaz, encapsulación e IP del gateway de Ventas (VLAN 21) en La Libertad.
R: `Gi0/0.21`, `encapsulation dot1Q 21`, `10.142.46.1 255.255.255.0`. Fuente: sedes.md.

**Q-DER-02 · N2** · Gateway y máscara de Administración (VLAN 3) en Ica.
R: `Gi0/0.3`, `10.142.52.1`, máscara `255.255.254.0` (/23). Fuente: sedes.md.

**Q-DER-03 · N2** · Gateway de Logística (VLAN 9) en Puno y su máscara.
R: `Gi0/0.9`, `10.142.51.1`, `255.255.255.192` (/26). Fuente: sedes.md.

**Q-DER-04 · N2** · Gateway de Servidores (VLAN 45) en Huánuco.
R: `Gi0/0.45`, `10.142.57.193`, `255.255.255.248` (/29). Fuente: sedes.md.

**Q-DER-05 · N3** · ¿Por qué Administración usa /23 en La Libertad, Ica y Puno y /24 en Huánuco?
R: El diseño dimensiona cada VLAN por hosts (+25 %); Administración es la mayor y en Huánuco cabe en un /24. Es VLSM dentro de cada /22. Si no lo recuerda con exactitud, que lo diga y explique que depende de los hosts. Fuente: Hito 1, diapositivas 6–7.

**Q-DER-06 · N3** · ¿Por qué la interfaz física `Gi0/0` de una sucursal no tiene IP?
R: Es el enlace trunk del router-on-a-stick; las IP van en las sub-interfaces, una por VLAN. Si tuviera IP, esa red quedaría separada de las sub-interfaces. Fuente: comandos.md.

**Q-DER-07 · N2** · Red, rango de hosts y broadcast de Logística (VLAN 9) en La Libertad.
R: Red `10.142.47.0/25`; hosts `.1`–`.126` (gateway `.1`); broadcast `10.142.47.127`; 126 utilizables. Fuente: sedes.md.

**Q-DER-08 · N2** · IPs de los 4 servidores de La Libertad y el gateway.
R: WEB .130, DNS .131, DHCP .132, FTP .133; red `10.142.47.128/29`, gateway .129; 6 utilizables, 5 en uso (gateway + 4 servidores). Fuente: sedes.md.

**Q-DER-09 · N1** · ¿Qué ID de VLAN tiene cada área en una sucursal?
R: Administración 3, Logística 9, Ventas 21, Servidores 45; mismos IDs en todas las sedes. Fuente: Hito 1, diapositivas 7–8.

## REV — de dato a diseño

**Q-REV-01 · N2** · Una PC tiene `10.142.51.3/26`. ¿Sede, área, VLAN y gateway?
R: Puno, Logística, VLAN 9 (PC2_LOG_PUNO), gateway `10.142.51.1`. Fuente: sedes.md.

**Q-REV-02 · N2** · Una PC tiene `10.142.54.130/26`. ¿Sede, área, VLAN?
R: Ica, Logística, VLAN 9 (PC1_LOG_ICA), gateway `10.142.54.129`. Fuente: sedes.md.

**Q-REV-03 · N2** · `10.142.57.2/25`: ¿de qué sede y qué área?
R: Huánuco, Ventas, VLAN 21 (PC1_VEN_HUANUCO), gateway `10.142.57.1`. Fuente: sedes.md.

**Q-REV-04 · N2** · `10.142.47.131/29`: ¿qué equipo es y en qué VLAN?
R: DNS_LA_LIBERTAD, VLAN 45 Servidores, gateway `10.142.47.129`. Fuente: sedes.md.

**Q-REV-05 · N2** · `10.142.42.66/26`: ¿qué equipo y por qué es WiFi?
R: LT1_EJEC_LIMA, VLAN 27 Ejecutivos (WiFi), gateway `10.142.42.65` (SVI en CORE_Lima), asociada a AP_EJEC_LIMA. Fuente: sedes.md.

**Q-REV-06 · N2** · `10.142.48.3/23`: ¿sede, área y gateway?
R: Puno, Administración, VLAN 3 (PC2_ADM_PUNO), gateway `10.142.48.1`. Fuente: sedes.md.

**Q-REV-07 · N3** · Te dan solo `10.142.46.1`: ¿qué es?
R: Gateway de Ventas de La Libertad (`Gi0/0.21`, VLAN 21). Termina en .1 en una /24: primer host = gateway. Fuente: sedes.md.

**Q-REV-08 · N3** · Una PC con `10.142.44.200/23`, ¿puede existir en La Libertad? ¿Y en Ica?
R: Sí en La Libertad (10.142.44.0/23 abarca .44.0–.45.255; .44.200 es válido). No en Ica (usa 10.142.52.0/23). Fuente: sedes.md.

## CAB — cableado y puertos

**Q-CAB-01 · N1** · ¿Con qué puerto del `SWD` se conecta el router en La Libertad?
R: `Router_La_Libertad Gi0/0` ↔ `SWD_LA_LIBERTAD Fa0/5`. Fuente: sedes.md.

**Q-CAB-02 · N2** · ¿Cuál es el uplink de `SW2_La_Libertad` y dónde llega?
R: `Fa0/4` ↔ `SWD_LA_LIBERTAD Fa0/2`. Fuente: sedes.md.

**Q-CAB-03 · N2** · ¿Qué hay en `Fa0/3` de `SW2_Ica` y en qué VLAN?
R: PC1_LOG_ICA, VLAN 9. Fuente: sedes.md.

**Q-CAB-04 · N2** · ¿Dónde están los servidores en una sucursal?
R: En `SW4_*`, puertos `Fa0/2`–`Fa0/5`, VLAN 45; el uplink es `Fa0/1` hacia `SWD Fa0/4`. Fuente: sedes.md.

**Q-CAB-05 · N2** · ¿En qué modo están los 5 puertos de un `SWD`?
R: Trunk (`mode on`), 802.1Q, native VLAN 1, VLANs 1-1005 permitidas. Fuente: sedes.md.

**Q-CAB-06 · N2** · En Puno, ¿dónde está `PC1_LOG_PUNO` y cuál es el uplink de ese switch?
R: `SW2_PUNO Fa0/4` (VLAN 9); uplink `Fa0/1` ↔ `SWD_PUNO Fa0/2`. Fuente: sedes.md.

**Q-CAB-07 · N3** · Un PC en `SW1_Ica Fa0/2` no llega a su gateway. ¿Qué verificas, en orden?
R: (1) `show vlan brief`: Fa0/2 debe estar en VLAN 3; (2) uplink `Fa0/3` en trunk y VLAN 3 permitida; (3) `SWD Fa0/1` y `Fa0/5` trunk; (4) `Gi0/0.3` con `dot1Q 3` e IP 10.142.52.1; (5) IP/gateway de la PC. Fuente: comandos.md.

## INT — inter-VLAN y métodos

**Q-INT-01 · N2** · ¿Qué método de inter-VLAN usan las sucursales y por qué?
R: Router-on-a-stick: un router 2911 con una sub-interfaz por VLAN sobre `Gi0/0` (trunk). Solución adecuada para sedes pequeñas con 4 VLAN. Fuente: Hito 1, diapositiva 9.

**Q-INT-02 · N2** · ¿Qué método usa Lima y por qué?
R: Switch capa 3 (CORE_Lima, 3560) con una SVI por VLAN e `ip routing`; escala mejor y rutea por hardware con 8 VLAN. Fuente: Hito 1, diapositiva 9.

**Q-INT-03 · N2** · Comandos para el gateway de la VLAN 15 (Finanzas) en el CORE.
R: `interface vlan 15` / `ip address 10.142.41.129 255.255.255.128` / `no shutdown`; y globalmente `ip routing`. Fuente: sedes.md, comandos.md.

**Q-INT-04 · N3** · ¿Cómo se conecta el CORE al router de Lima y por qué no es trunk?
R: Puerto enrutado: `no switchport` + `ip address 10.142.42.241 255.255.255.252` en `Fa0/1`; router `Gi0/0` = .242. No lleva VLAN: es un enlace L3 /30. Fuente: sedes.md.

**Q-INT-05 · N2** · Escribe la sub-interfaz de Ventas de La Libertad.
R: `interface gig0/0.21` / `encapsulation dot1Q 21` / `ip address 10.142.46.1 255.255.255.0`. Fuente: comandos.md.

**Q-INT-06 · N3** · ¿Por qué mantener los mismos IDs de VLAN en todas las sedes?
R: Administración más simple (estandarización), plantillas de configuración reutilizables, menos errores. Fuente: Hito 1, diapositiva 7.

**Q-INT-07 · N3** · ¿Qué diferencia hay al hacer trunk en un 2960 y en un 3560?
R: El 3560 requiere `switchport trunk encapsulation dot1q` antes de `switchport mode trunk`; el 2960 solo soporta dot1q y no lleva ese comando. Fuente: comandos.md.

**Q-INT-08 · N3** · Si una VLAN existe en un switch pero no en el del otro lado del trunk, ¿qué pasa?
R: El tráfico de esa VLAN no pasa o se descarta; hay que crearla en ambos (no hay VTP en este caso). Fuente: conceptos.md.

**Q-INT-09 · N2** · Dos PC en VLAN distintas del mismo switch, ¿se ven? ¿Qué falta?
R: No; hace falta un dispositivo capa 3 (router-on-a-stick o SVI con `ip routing`). El trunk solo transporta, no rutea. Fuente: conceptos.md.

## LIM — Lima

**Q-LIM-01 · N2** · Lista las VLAN de Lima con su ID y nombre.
R: 3 admin_lima · 9 log_lima · 15 fin_lima · 21 vent_lima · 27 ejec_lima · 33 client_lima · 39 mark_lima · 45 server_lima. Fuente: sedes.md.

**Q-LIM-02 · N1** · ¿Cuántos switches tiene Lima por capa?
R: Núcleo 1 (CORE_Lima 3560) · distribución 4 (3560) · acceso 8 (2960). Fuente: sedes.md.

**Q-LIM-03 · N2** · Gateway y red de Marketing (VLAN 39).
R: SVI VLAN 39 = 10.142.42.193, red `10.142.42.192/27`. Fuente: sedes.md.

**Q-LIM-04 · N2** · ¿Cómo se organiza el WiFi de Lima?
R: Dos APs: AP_EJEC_LIMA (SSID ejecutivos, VLAN 27, 10.142.42.64/26) y AP_CLIE_LIMA (SSID clientes, VLAN 33, 10.142.42.128/26); WPA2-PSK, AES; laptops con WPC300N. Fuente: Hito 1, diapositiva 10.

**Q-LIM-05 · N2** · ¿Dónde se conecta el AP de ejecutivos y qué modo tiene ese puerto?
R: `SW6_LIMA Fa0/1`, access VLAN 27. Fuente: sedes.md.

**Q-LIM-06 · N3** · ¿Por qué se usa un /28 en Servidores de Lima?
R: Cubre 14 hosts útiles para 4 servidores + gateway con margen (+25 %); es el bloque más pequeño que cumple. Red `10.142.42.224/28`, gateway .225. Fuente: sedes.md.

## TP — las 6 tareas del parcial

**Q-TP-01 · N1** · Crea la VLAN 667 SuperBestias y muéstrala (tareas 4–5).
R: `vlan 667` / `name SuperBestias` / `end` / `show vlan brief`. Fuente: comandos.md.

**Q-TP-02 · N2** · Configura PC Prueba1 y PC Prueba2 en `192.168.69.0/24` (tarea 3).
R: Ejemplo PC Prueba1 `192.168.69.10/24`, PC Prueba2 `192.168.69.11/24`, gateway `192.168.69.1`; válido cualquier host de la red; el gateway debe coincidir con la sub-interfaz. Fuente: comandos.md.

**Q-TP-03 · N3** · Pasos completos de la tarea 5 (variante A).
R: Crear VLAN 667 en ambos switches → access en los puertos de las 2 PC → trunk con 667 permitida hasta el router → sub-interfaz `Gi0/0.667` con `encapsulation dot1Q 667` y `192.168.69.1/24` → `show ip route` muestra la red → ping a una PC de otra VLAN. Fuente: comandos.md.

**Q-TP-04 · N3** · Si la sede usa ya la VLAN 21 y tu `192.168.69.0/24` choca con algo, ¿choca? Justifica.
R: No choca: la red de la sede es `10.142.x.x`, distinta de `192.168.69.0/24`. Fuente: sedes.md.

**Q-TP-05 · N2** · Agrega un switch nuevo y haz los trunks (tarea 6).
R: Conectarlo con otro switch, `interface fa0/x` → `switchport mode trunk` en ambos extremos (3560: antes `trunk encapsulation dot1q`), crear las mismas VLAN en el nuevo, `show interfaces trunk` en ambos. Fuente: comandos.md.

**Q-TP-06 · N2** · Dos routers por serial (tarea 2): comandos y qué lado lleva `clock rate`.
R: Módulo HWIC-2T en ambos, cable Serial DCE; IPs en /30; `clock rate 64000` solo en el extremo DCE; `no shutdown` en ambos; `ping` entre ellos. Fuente: comandos.md.

**Q-TP-07 · N2** · AP y laptop WiFi (tarea 1).
R: AP-PT Port 1: SSID `Fieles`, WPA2-PSK, clave; laptop con módulo WPC300N, mismo SSID y clave; verificar asociación y ping. Fuente: comandos.md.

**Q-TP-08 · N3** · Muestra que la tarea 5 funciona. ¿Qué evidencias entregas?
R: `show vlan brief` (667 con puertos), `show interfaces trunk` (667 permitida), `show ip interface brief` (sub-interfaz up/up), `show ip route`, y `ping` exitoso de PC Prueba1 a una PC de otra VLAN. Fuente: enunciado-tp1.md.

## EXP — exposición y diseño

**Q-EXP-01 · N2** · ¿Qué problema resolvía el proyecto?
R: Diez años de crecimiento sin diseño ni documentación: IP duplicadas entre sedes que dejaron sin conectividad, equipos propietarios dispares. Se rediseñó la red de Lima y 4 sucursales. Fuente: Hito 1, diapositiva 2.

**Q-EXP-02 · N2** · Explica el direccionamiento jerárquico.
R: `10.142.0.0/16` multinacional → 3 bits → `/19` Perú (`10.142.32.0/19`, 8 subredes) → 3 bits → `/22` por sede (1022 hosts) → dentro de cada sede VLSM por área. Fuente: Hito 1, diapositiva 5.

**Q-EXP-03 · N3** · ¿Cuál es el uso de cada /22 del bloque de Perú?
R: S0 10.142.32.0 reservado · S1 .36.0 WAN · S2 .40.0 Lima · S3 .44.0 La Libertad · S4 .48.0 Puno · S5 .52.0 Ica · S6 .56.0 Huánuco · S7 .60.0 reserva. Fuente: Hito 1, diapositiva 5.

**Q-EXP-04 · N2** · ¿Cuántos hosts se proyectaron y cómo?
R: 2 689 hosts con +25 % de crecimiento; 8 áreas (VLAN) en la sede principal. Fuente: Hito 1, diapositiva 2.

**Q-EXP-05 · N2** · ¿Cuántos equipos y qué costo estimaste?
R: 112 switches de acceso 2960, 11 switches 3560/centrales, 5 routers 2911 + 6 HWIC-2T, 4 APs en Lima (dimensionamiento del Hito; en el `.pka` hay 2 APs en Lima); inversión referencial US$ 53 835 (equipos reacondicionados). Fuente: Hito 1, diapositiva 12.

**Q-EXP-06 · N2** · ¿Qué nube eligieron y por qué?
R: Microsoft Azure (Blob Cool + Archive, Azure Backup, ciclo de vida a 30 días); ganó la matriz ponderada con 4.85 (AWS 4.55, Google Cloud 4.60). Pesos: costo 30 %, seguridad 25 %, durabilidad 20 %, ubicación 15 %, escalabilidad 10 %. Fuente: Hito 1, diapositiva 13.

**Q-EXP-07 · N3** · ¿Qué pruebas hicieron para validar la red?
R: Ping inter-VLAN en Lima (Administración → Logística y Finanzas), ping de un PC de Ventas al router con 0 % de pérdida, laptop WiFi a su gateway y a un PC de otra VLAN; mismo resultado en las 4 sucursales. Fuente: Hito 1, diapositiva 11.

**Q-EXP-08 · N3** · ¿Qué medios físicos usa el caso y dónde?
R: UTP Cat 6 en la LAN, serial en la WAN, inalámbrico 802.11 para usuarios móviles. Fuente: Hito 1, diapositiva 3.

**Q-EXP-09 · N3** · Si te preguntan "¿cómo llega Puno a Ica?", ¿qué respondes con lo que hay hoy en el `.pka`?
R: El diseño es en estrella: pasa por Lima (Se0/2/1 ↔ WAN1 ↔ Puno, Se0/1/1 ↔ WAN3 ↔ Ica). El ruteo entre sedes aún no está configurado en el archivo (solo hay una ruta estática en Lima hacia su propia /22): es un pendiente; no inventes que ya funciona. Fuente: sedes.md, Rutas.

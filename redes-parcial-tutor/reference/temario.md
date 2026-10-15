# Temario consolidado — Parcial Redes (semanas 1-6)

Fuente: `semana-8/Chuleta_Redes_Estilo_Guia_Semanas_1-6.pdf` + PPT de Felix (inter-VLAN) + apuntes y examen 2026-1 de studocu. ★ = dato fuera de las diapositivas.

---

## M1 · Direccionamiento IPv4

**Dirección IPv4**: 32 bits en 4 octetos (decimal punteado) = porción de **red** + porción de **host**. La **máscara** (o prefijo `/n` = nº de bits en 1) dice dónde corta.

**Los 4 tipos de dirección dentro de cada red**

| Tipo | Bits de host | Cómo se obtiene | Ej. 192.168.10.0/24 |
|---|---|---|---|
| Dirección de red | todos 0 | IP AND máscara | .0 |
| Primera útil | 0…01 | red + 1 | .1 |
| Última útil | 1…10 | broadcast − 1 | .254 |
| Broadcast | todos 1 | red + salto − 1 | .255 |

- **Host** = dispositivo final; solo lleva direcciones útiles (nunca red ni broadcast).
- **Gateway (puerta de enlace predeterminada, DGW)** = la interfaz del router (o subinterfaz/SVI) **en la misma LAN** del host. Por convención la primera útil. Sin gateway (o con uno fuera de su red) el host solo habla dentro de su LAN.
- **Broadcast**: un paquete a todos los hosts de la red. Solo un router (capa 3) detiene el broadcast.
- **ANDing**: IP AND máscara bit a bit (1∧1 = 1, lo demás 0) = dirección de red.
  Ej. 192.168.20.75/26: .75 = 01001011, .192 = 11000000 → 01000000 = **.64** (red), broadcast **.127**, útiles **.65–.126**.
- Misma red ⇔ misma porción de red. Ej. .100/25 (red .0) y .130/25 (red .128) **no** están en la misma red.

**IP vs MAC**: IP (capa 3, lógica, global) viaja intacta de origen a destino (salvo NAT). MAC (capa 2, física, local) cambia en cada salto. Si el destino es remoto, la MAC destino de la trama que sale del PC es la **del gateway**. Con 2 routers hay 3 saltos.

**Tipos de comunicación**: unicast (1 a 1) · multicast (1 a grupo, 224.0.0.0–239.x = clase D) · broadcast (1 a todos; no existe en IPv6) · anycast (IPv6).

**Clases (classful, obsoleto)**: A 0–127 (/8) · B 128–191 (/16) · C 192–223 (/24) · D 224–239 multicast · E 240–255 experimental. CIDR = sin clase, permite subredes.

**Privadas (RFC 1918)**, no enrutables en Internet: `10.0.0.0/8` · `172.16.0.0/12` (172.16–172.31) · `192.168.0.0/16`. **NAT** traduce privada → pública en el router perimetral. Especiales: loopback `127.0.0.1` · APIPA `169.254.0.0/16` (Windows sin DHCP).

**Trampas**
- 192.168.100.50 → privada, **clase C** (no A).
- Con máscara 255.0.0.0, la red de 10.50.60.70 es **10.0.0.0** (solo se conserva el 1.er octeto).
- 172.20.4.100 sin máscara → clase B → red **172.20.0.0/16**.
- Gateway en otra red que el host → el host no sale de su LAN.

---

## M2 · Subnetting FLSM y VLSM

**Fórmulas**: hosts = 2^h − 2 (h = bits de host) · subredes = 2^s (s = bits prestados) · prefijo = 32 − h · salto = 256 − octeto interesante de la máscara.

**Método en 4 pasos (red/broadcast de una IP)**
1. Pasa /n a máscara y localiza el octeto interesante (ni 255 ni 0).
2. Salto = 256 − ese octeto.
3. Red = mayor múltiplo del salto ≤ octeto de la IP.
4. Broadcast = red + salto − 1; útiles = red+1 … broadcast−1.

**Tabla de máscaras**

| /n | Máscara | Salto | Bits host | Hosts | Subredes de un /24 |
|---|---|---|---|---|---|
| /24 | 255.255.255.0 | — | 8 | 254 | 1 |
| /25 | .128 | 128 | 7 | 126 | 2 |
| /26 | .192 | 64 | 6 | 62 | 4 |
| /27 | .224 | 32 | 5 | 30 | 8 |
| /28 | .240 | 16 | 4 | 14 | 16 |
| /29 | .248 | 8 | 3 | 6 | 32 |
| /30 | .252 | 4 | 2 | 2 | 64 |

Octeto de máscara según bits en 1: 1=128 · 2=192 · 3=224 · 4=240 · 5=248 · 6=252 · 7=254 · 8=255. Comunes: /19 = 255.255.224.0 · /20 = .240.0 · /21 = .248.0 · /22 = .252.0 · /23 = .254.0. /16 = 65 534 hosts · /8 = 16 777 214.

**Elegir prefijo por hosts**: el menor h con 2^h − 2 ≥ hosts pedidos. 2→/30 · 3–6→/29 · 7–14→/28 · 15–30→/27 · 31–62→/26 · 63–126→/25 · 127–254→/24.

**Contar subredes**: /16 → /19 = 2³ = 8 · /8 → /12 = 16 · /22 → /24 = 4.

**FLSM** (máscara fija): todas las subredes del tamaño de la LAN más grande. Pasos: LAN mayor → bits de host → subnetear con los bits restantes → asignar → tabla.
Ej.: 192.168.10.128/25 para LAN 25, 10, 5 + 1 WAN → 25 hosts = /27 → 2 bits prestados → 4 subredes: .128 .160 .192 .224.

**VLSM** (máscara variable, "subnetear una subred"): de la red **más grande a la más pequeña**, cada una empieza justo donde termina la anterior; enlaces router–router = **/30**. Evita desperdicio (con FLSM /27 un WAN desperdicia 28 direcciones).
Ej. del curso 192.168.10.0/24 → LAN1 60, LAN2 25, LAN3 10, LAN4 5, WAN 2:

| Red | Hosts | Red/prefijo | Útiles | Broadcast |
|---|---|---|---|---|
| LAN1 | 60 | .0/26 | .1–.62 | .63 |
| LAN2 | 25 | .64/27 | .65–.94 | .95 |
| LAN3 | 10 | .96/28 | .97–.110 | .111 |
| LAN4 | 5 | .112/29 | .113–.118 | .119 |
| WAN | 2 | .120/30 | .121–.122 | .123 |

Libres: .124/30, .128/26, .192/26.

**Por qué subnetear**: dominios de broadcast más pequeños (menos tráfico de ARP/DHCP), seguridad entre subredes, menos equipos afectados. Se segmenta por ubicación, grupo/función o tipo de dispositivo.

**Diseño estructurado**: clientes por DHCP · servidores y periféricos IP estática · servidores públicos en DMZ con IP pública · intermediarios con IP de administración.

**Trampas**
- /29 = **6** hosts (no 8) · /28 = **14** (no 16) · "direcciones IP" (16) ≠ "hosts válidos" (14).
- 30 hosts caben en /27; 31 ya piden /26.
- 192.168.8.88/25 → red 192.168.8.**0** (no 168.0.0).
- En VLSM, si no ordenas de mayor a menor, los bloques se desalinean y se solapan.

---

## M3 · Switching, VLAN, trunk e inter-VLAN

**Ethernet** (IEEE 802.2/802.3) = capas 1 y 2. Subcapa **LLC** (802.2): identifica el protocolo de capa 3 y comunica el software de red con el hardware. Subcapa **MAC**: encapsula, control de acceso al medio, direccionamiento L2. MAC = 48 bits (6 bytes hex).

**Switch**: decide solo con MAC. Tabla vacía al encender; **aprende la MAC origen** + puerto; reenvía por la **MAC destino**; si es broadcast o destino desconocido **inunda** (flooding) por todos los puertos menos el de entrada.
- **Store-and-forward**: recibe toda la trama y verifica FCS/CRC; descarta errores; necesario para QoS.
- **Cut-through**: reenvía apenas lee la MAC destino; < 10 µs; sin comprobar errores.
- Cada puerto de switch = un dominio de colisión (full-duplex = sin colisiones). El dominio de broadcast solo lo corta un router.
- Dúplex y velocidad deben coincidir (el desajuste de dúplex es causa común de lentitud). Auto-MDIX detecta el tipo de cable.

**ARP**: resuelve IPv4 → MAC; solicitud por **broadcast**; tabla con entradas temporales. Ver: `arp -a` (Windows) · `show ip arp` (Cisco). Riesgo: ARP spoofing. IPv6 usa ICMPv6.

**Modos IOS**: `Switch>` usuario → `enable` → `Switch#` privilegiado → `configure terminal` → `(config)#` → `interface` → `(config-if)#` · `vlan 20` → `(config-vlan)#` · subinterfaz → `(config-subif)#`. `exit` baja un nivel, `end` vuelve a `#`. ★ Nombre: `hostname R1_u2016123456`.

**VLAN**: red lógica = un dominio de broadcast; cada VLAN su propia subred. Sin capa 3 las VLAN **no se comunican**. Beneficios: dominios de broadcast más pequeños, seguridad, eficiencia de TI, menor costo, mejor rendimiento, administración simple.
- Tipos: **predeterminada VLAN 1** (default, nativa y de administración por defecto; no se borra ni renombra) · de datos · **nativa** (sin etiqueta en el trunk) · de administración (SSH/Telnet) · de voz (QoS, < 150 ms).
- Rango normal 1–1005 (en `vlan.dat`; 1002–1005 heredadas) · extendido 1006–4095 (running-config).

**Trunk 802.1Q**: enlace punto a punto (switch–switch o switch–router) que lleva **varias VLAN**; por defecto permite todas. Etiqueta de **4 bytes**: TPID 0x8100 · prioridad 3 bits (CoS) · CFI 1 bit · **VID 12 bits** (4096 VLAN). La nativa va sin etiqueta y debe coincidir en ambos extremos.

**Comandos**
```
S1(config)# vlan 10
S1(config-vlan)# name VENTAS
S1(config)# interface fa0/6
S1(config-if)# switchport mode access
S1(config-if)# switchport access vlan 10
S1(config)# interface fa0/1
S1(config-if)# switchport mode trunk
S1(config-if)# switchport trunk allowed vlan all      ! o 10,20
S1(config-if)# switchport trunk native vlan 99        ! opcional
```
★ En switch capa 3 (3560/3650): `switchport trunk encapsulation dot1q` **antes** de `switchport mode trunk`. Sin `name`, IOS la llama `vlan0010`. `no vlan 10` borra (reasigna antes sus puertos).

**Inter-VLAN: 3 métodos**
| Método | Idea | Escala |
|---|---|---|
| Legado | una interfaz física del router por VLAN | no escala |
| Router-on-a-stick | 1 trunk al router, una **subinterfaz** por VLAN | red pequeña/mediana |
| Switch capa 3 + SVI | `interface vlan N` + `ip routing` | el más escalable; más rápido (hardware), menor latencia; único contra: más caro |

**Router-on-a-stick (PPT de Felix)**
```
R1(config)# interface g0/0
R1(config-if)# no shutdown                       ! en la FÍSICA
R1(config)# interface g0/0.10
R1(config-subif)# encapsulation dot1Q 10
R1(config-subif)# ip address 192.168.10.1 255.255.255.0
R1(config)# interface g0/0.20
R1(config-subif)# encapsulation dot1Q 20
R1(config-subif)# ip address 192.168.20.1 255.255.255.0
```
El puerto del switch hacia el router y los enlaces entre switches = **trunk**. La IP de cada subinterfaz = gateway de su VLAN.

**Switch capa 3 (SVI)**
```
D1(config)# interface vlan 10
D1(config-if)# ip address 192.168.10.1 255.255.255.0
D1(config-if)# no shutdown
D1(config)# interface vlan 20
D1(config-if)# ip address 192.168.20.1 255.255.255.0
D1(config-if)# no shutdown
D1(config)# ip routing
```
Puerto enrutado: `no switchport` + `ip address` + `no shutdown` (para conectar a un router). Luego enrutamiento estático/dinámico y `show ip route`.

**Orden de una práctica**: 1) crear VLAN en **cada** switch · 2) puertos access · 3) trunks · 4) gateways (subinterfaces o SVI) · 5) `ip routing` si es L3 · 6) IP/máscara/gateway en PCs · 7) `ping`.

**Verificación**: `show vlan brief` (VLAN y puertos access) · `show interfaces trunk` · `show interface fa0/1 switchport` · `show ip interface brief` · `show ip route` · `ping`.

**Errores típicos**: puerto sin `mode access` o en VLAN equivocada · VLAN no creada en el otro switch · falta `no shutdown` en la física o en la SVI · falta `ip routing` · nativa distinta en los extremos · VLAN fuera de `allowed vlan` · gateway del PC ≠ IP de su subinterfaz/SVI · `dot1Q` con número de VLAN equivocado.

**Trampas (apuntes)**: para comunicar 2 VLAN con routing legado → router con **2 interfaces LAN** mínimo. El trunk va **entre 2 switches que usan varias VLAN** (o switch–router). La VLAN de administración inicialmente es la **predeterminada (VLAN 1)**.

---

## M4 · Modelos OSI / TCP-IP, PDU y protocolos

| OSI | TCP/IP | PDU | Identificador | Ejemplos |
|---|---|---|---|---|
| 7 Aplicación · 6 Presentación · 5 Sesión | Aplicación | Datos | — | HTTP, FTP, SMTP, DNS |
| 4 Transporte | Transporte | **Segmento** | puerto | TCP, UDP |
| 3 Red | **Internet** | **Paquete** | IP | IPv4, IPv6, ICMP · router |
| 2 Enlace de datos · 1 Física | Acceso a la red | **Trama** · Bits | MAC | Ethernet, 802.11, UTP, fibra, NIC, switch |

Mnemotecnia: **A**plicación-**P**resentación-**S**esión-**T**ransporte-**R**ed-**E**nlace-**F**ísica · Datos→Segmento→Paquete→Trama→Bits.

- Presentación: formato, **cifrado, compresión**. Sesión: diálogo y sincronización.
- Transporte: **segmenta y reensambla**, extremo a extremo, puertos, control de flujo y errores.
- Red: direccionamiento lógico y enrutamiento de mejor esfuerzo.
- Enlace: tramas, MAC, acceso al medio, FCS. Física: bits, medio, velocidad.
- **OSI** 7 capas, más teórico; **TCP/IP** 4 capas, abierto y práctico (el más usado).

**Encapsulación** = al **bajar** por las capas cada una agrega su encabezado (trama: MAC + IP + puertos + datos + FCS). **Desencapsulación** = al **subir** en el receptor se quitan.

**TCP vs UDP**: TCP orientado a conexión, confiable (confirmaciones, retransmisión, secuencia, control de flujo) — HTTP/S, SSH, FTP, SMTP. UDP sin conexión, mejor esfuerzo, rápido — DNS, voz/video, RADIUS. IP por sí solo es sin conexión y de mejor esfuerzo.

**Puertos**: HTTP 80 · HTTPS 443 · DNS 53 · SSH 22 · MySQL 3306 · RADIUS UDP 1812/1813.

**Encabezado IPv4**: versión (0100) · DS/ToS (QoS) · **TTL** (cuenta saltos; en 0 se descarta) · protocolo (ICMP/TCP/UDP) · checksum · IP origen y destino (32 bits c/u). IP: sin conexión, mejor esfuerzo, independiente del medio. MTU/fragmentación (IPv6 no fragmenta).

**Trama Ethernet II**: preámbulo 8 B · MAC destino 6 B · MAC origen 6 B · tipo 2 B · datos 46–1500 B · FCS 4 B (detecta errores).

**Protocolos**: reglas (software, hardware o ambos). Elementos: fuente, destino, canal. 5 requisitos del mensaje: codificación · formato y encapsulamiento · tamaño · temporización (control de flujo, timeout, método de acceso) · opciones de entrega. Funciones: direccionamiento, confiabilidad, control de flujo, secuenciación, detección de errores, interfaz de aplicación.

**Organizaciones**: ISOC (Internet abierto) · IAB (arquitectura) · **IETF** (desarrolla TCP/IP, RFC) · IRTF (investigación) · ICANN/**IANA** (asignan IP y dominios) · **IEEE** (802.3, 802.11) · EIA/TIA (cableado, TIA/EIA-568) · ITU-T (video, banda ancha).

**Trampas**: PDU de red = **paquete** (no trama) · IPv4/IPv6/ICMP = capa **Internet** (no transporte) · UTP/fibra/NIC/switch = **Acceso a la red** · capturando una página web (HTML) **no** verás ICMP · IPX/SPX **no** es TCP/IP · "comprimir datos" no es función típica de un protocolo de comunicación (es de presentación).

---

## M5 · Capa física y cableado

Señal: cobre = eléctrica · fibra = luz · inalámbrico = ondas. Codificación (Manchester, 4B/5B) y señalización.

**Medidas**: ancho de banda (capacidad, bps) · throughput (real en un período) · goodput (throughput − sobrecarga) · latencia (demora total).

**Cobre**: **atenuación** = pérdida de señal con la distancia (respetar longitud) · **EMI/RFI** → blindaje y tierra · **diafonía** → trenzar pares (el ruido se cancela).
- UTP: 4 pares, RJ-45, barato, el más usado, **máx. 100 m** (todas las categorías, incluida Cat6). STP: blindado, mejor contra ruido, más caro.
- Cat5/5e 100 MHz (100Base-T) · **Cat6 250 MHz (1000Base-T)** · Cat7 600 MHz.
- Coaxial: antenas e Internet por cable.

**Cables UTP**
| Cable | Extremos | Uso |
|---|---|---|
| Directo | T568A–T568A o B–B | equipos **distintos**: PC–switch, switch–router |
| Cruzado | T568A–T568B | equipos **iguales**: PC–PC, switch–switch, **router–router**, PC–router |
| Consola (rollover) | Cisco | PC → puerto de consola del router/switch |

**Fibra**: inmune a EMI/RFI, menos atenuación, mayor ancho de banda y distancia, más cara; **dos hilos** (uno por sentido) = full-duplex. SMF (monomodo): núcleo pequeño, láser, larga distancia. MMF (multimodo): LED, ~550 m, campus. Conectores ST, SC, LC. Uso: backbone, entre edificios, enlace dedicado.

**Inalámbrico**: movilidad; contras: cobertura, interferencia, seguridad, medio compartido semidúplex. Wi-Fi 802.11 · Bluetooth 802.15 · WiMAX 802.16 · Zigbee 802.15.4.

**Trampas**: interferencia en UTP = **EMI** (no "cantidad de dispositivos") · router–router = **cruzado** · si el router solo tiene Ethernet y consola, para configurarlo → **cable de consola**.

---

## M6 · Fundamentos (semana 1)

- **Host/dispositivo final** origina o recibe mensajes · **intermediarios**: switch, AP, router, firewall (regeneran señal, mantienen rutas, avisan errores, priorizan, filtran) · **medios**: cobre, fibra, inalámbrico.
- **LAN** área pequeña, una organización, alta velocidad · **WAN** une LAN en áreas extensas, la administran proveedores · **MAN** ciudad · **PAN** · **WLAN** · **WMAN**.
- **Internet** = colección mundial de LAN y WAN; nadie es dueño. **ISP** da acceso.
- Accesos: **FTTH** (fibra al hogar) · **HFC/cable** (TV por cable) · **DSL** (línea telefónica) · celular 4G/5G · satelital (rural) · dial-up · WISP · PLC (línea eléctrica).
- **Red convergente**: datos + voz + video sobre la misma infraestructura.
- **Red confiable, 4 características**: **tolerancia a fallas** (redundancia, conmutación de paquetes) · **escalabilidad** (crecer sin afectar) · **QoS** (prioriza voz/video en congestión; "video en vivo que se corta" = QoS) · **seguridad** (infraestructura e información).
- **Tríada CIA**: confidencialidad · integridad · disponibilidad. Defensas: antivirus, firewall, ACL, IPS, VPN.
- Tendencias: IoT/IIoT, nube, virtualización (hipervisor **tipo 1** bare metal sobre hardware · **tipo 2** sobre un SO), smart home, colaboración en línea.
- Peer-to-peer: sin administración centralizada, barata, fácil de crear (pero poco escalable y segura).
- Topología = forma en que se conectan los dispositivos; comunes: estrella y bus.
- Nota del curso: EA (parcial) = 20 %, semana 8.

---

## M7 · WLAN (semana 6)

- WPAN 802.15 (Bluetooth, 6–9 m) · **WLAN 802.11** (2.4/5 GHz, ~90 m) · WMAN WiMAX 802.16 (50 km) · WWAN. WLAN usa bandas **sin licencia**.
- Organizaciones: ITU-R (espectro) · IEEE (802.11) · Wi-Fi Alliance (interoperabilidad).
- Estándares: 802.11 2 Mbps 2.4 GHz · a 54 Mbps 5 GHz · b 11 Mbps 2.4 · g 54 Mbps 2.4 · n 600 Mbps 2.4/5 · ac 1300 Mbps · ax 2400 Mbps.
- Componentes: NIC inalámbrica · router doméstico = AP + switch + router · AP **autónomo** (se configura solo, a mano) vs **basado en controlador** (LAP con WLC, LWAPP). Antenas omnidireccional, direccional (Yagi, parabólica), MIMO.
- Modulación: DSSS (802.11b) · FHSS (802.11 original) · OFDM (a/g/n/ac). Canales no superpuestos **2.4 GHz: 1, 6, 11** · 5 GHz: 36, 48, 60.
- Modos: **ad hoc** (sin AP; tethering) · **infraestructura** (con AP). **BSS** = 1 AP y sus clientes · **ESS** = 2+ BSS unidos por sistema de distribución cableado.
- Asociación: descubrir → autenticar → asociar; acuerdan SSID, contraseña, modo de red, seguridad, canal. Descubrimiento **pasivo** (beacons del AP) · **activo** (probe request del cliente).
- **CSMA/CA** (Wi-Fi, semidúplex, **evita** colisiones): escuchar → RTS → CTS → datos → ACK. Ethernet half-duplex usa **CSMA/CD** (detecta). CSMA/CD es de **capa 2** (MAC), no de capa 1.
- Amenazas: intercepción, intrusos, **DoS**, **AP no autorizado (rogue)**, **MITM / evil twin**.
- Seguridad: ocultar SSID y filtrado MAC (débiles) · **WEP** (RC4, clave estática, nunca) · **WPA** (TKIP) · **WPA2** (AES/CCMP) · **WPA3** (SAE, PMF). Personal = PSK · Empresa = RADIUS + 802.1X/EAP (UDP 1812/1813).
- Desventaja principal de lo inalámbrico: **menor confiabilidad** (interferencia, cobertura, seguridad). Extender alcance: **repetidores y puntos de acceso**.

---

## Método para preguntas de teoría

- Absolutos («siempre», «nunca», «solo», «todos») → casi siempre **falso**. Frase copiada de la definición → verdadero.
- «¿Cuál NO es…?» → lee dos veces y marca la que no encaja.
- Mezcla capas o PDU → dibuja la pila OSI y ubica cada palabra.
- Te dan IP y máscara → haz los 4 pasos, no adivines.

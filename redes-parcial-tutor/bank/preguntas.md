# Banco de preguntas — Parcial Redes

Convención: `ID (nivel 1-3)` + enunciado · `R:` respuesta esperada (nunca se muestra antes de que responda). "studocu" = pregunta real de los apuntes del parcial. ⚠ = el apunte de studocu tenía una respuesta dudosa: enseña la de `R:`.
Las preguntas de cálculo son **modelos**: cambia los números (ver SKILL.md, "Preguntas de cálculo nuevas").

## M1 · Direccionamiento IPv4

**M1-01** (1) En la red 192.168.10.0/24, ¿cuál es la dirección de red, la primera útil, la última útil y el broadcast?
R: red .0 · primera .1 · última .254 · broadcast .255.

**M1-02** (1) ¿Qué es el default gateway de una PC y qué condición debe cumplir su IP?
R: la interfaz del router (subinterfaz o SVI) en la LAN de la PC; es la salida hacia otras redes. Debe estar en la **misma subred** que la PC (por convención la primera útil).

**M1-03** (1) ¿Qué es la dirección de broadcast y por qué no se le puede asignar a un host?
R: la última dirección de la red (bits de host en 1); un paquete enviado ahí llega a todos los hosts de la red. Está reservada, igual que la dirección de red.

**M1-04** (1) Un /24, ¿cuántas direcciones tiene y cuántos hosts válidos?
R: 256 direcciones, 254 hosts (2⁸ − 2).

**M1-05** (2) 192.168.20.75/26: red, broadcast y rango útil.
R: salto 64 → red .64 · broadcast .127 · útiles .65–.126.

**M1-06** (2) 192.168.10.66/25: ¿cuál es el broadcast? (studocu)
R: salto 128 → red .0 → broadcast 192.168.10.127.

**M1-07** (2) 172.16.8.12/29: red, broadcast y útiles.
R: salto 8 → red 172.16.8.8 · broadcast .15 · útiles .9–.14.

**M1-08** (2) 10.25.140.200/28: red, broadcast y útiles.
R: salto 16 → red .192 · broadcast .207 · útiles .193–.206.

**M1-09** (2) Una PC tiene 192.168.1.10/24 y gateway 192.168.2.1. Hace ping a otra red y falla. ¿Por qué?
R: el gateway está en otra red (192.168.2.0); la PC no lo puede alcanzar, así que su tráfico se queda en su LAN. El gateway debe ser una IP de 192.168.1.0/24 (ej. .1).

**M1-10** (1) ¿192.168.100.50 es pública o privada? ¿De qué clase?
R: privada (RFC 1918), no enrutable en Internet; clase C.

**M1-11** (1) Nombra los 3 bloques privados RFC 1918.
R: 10.0.0.0/8 · 172.16.0.0/12 (172.16–172.31) · 192.168.0.0/16.

**M1-12** (2) 172.20.4.100 sin máscara: ¿cuál es su dirección de red con la máscara por defecto de su clase? (studocu)
R: clase B → /16 → 172.20.0.0.

**M1-13** (1) ¿Qué son 127.0.0.1 y 169.254.x.x?
R: loopback (prueba la pila TCP/IP del propio equipo) · APIPA (IP autoasignada por Windows cuando no hay DHCP).

**M1-14** (1) Una PC 172.16.4.1 envía a 224.10.10.5. ¿Qué tipo de comunicación es? (studocu: "224.10.15.255")
R: multicast (224–239 = clase D).

**M1-15** (2) ¿Por qué no puedes ponerle a una PC 192.168.20.64/26 ni 192.168.20.127/26?
R: .64 es la dirección de red y .127 el broadcast de esa subred.

**M1-16** (3) 10.20.30.15/18: red, broadcast y número de hosts.
R: 3.er octeto, salto 64 → red 10.20.0.0 · broadcast 10.20.63.255 · 2¹⁴ − 2 = 16 382 hosts.

**M1-17** (3) 100.250.33.55/22: red, broadcast y hosts.
R: 3.er octeto, salto 4 → red 100.250.32.0 · broadcast 100.250.35.255 · 1 022 hosts.

**M1-18** (2) Explica con ANDing cómo sale la red de 192.168.20.75/26.
R: .75 = 01001011, .192 = 11000000; AND → 01000000 = 64 → red 192.168.20.64.

**M1-19** (2) ¿192.168.1.100/25 y 192.168.1.130/25 están en la misma red?
R: no: .100 está en la red .0 (.0–.127) y .130 en la red .128 (.128–.255). Necesitan un router.

**M1-20** (2) Una PC envía a un servidor de otra red. ¿Qué MAC destino lleva la trama que sale de la PC? ¿Cambia la IP destino en el camino?
R: la MAC del gateway. La IP destino no cambia (salvo NAT); la MAC cambia en cada salto.

**M1-21** (3) 172.16.45.200/20: red, broadcast y hosts.
R: 3.er octeto, máscara 240, salto 16 → red 172.16.32.0 · broadcast 172.16.47.255 · 4 094 hosts.

**M1-22** (2) Con máscara 255.0.0.0, ¿cuál es la red de 10.50.60.70?
R: 10.0.0.0 (solo se conserva el 1.er octeto); broadcast 10.255.255.255.

## M2 · Subnetting FLSM y VLSM

**M2-01** (1) ¿Cuántos hosts válidos tiene /30, /29, /28, /27 y /26?
R: 2 · 6 · 14 · 30 · 62.

**M2-02** (1) Escribe en decimal /27 y /20.
R: 255.255.255.224 · 255.255.240.0.

**M2-03** (1) ¿Qué prefijo es 255.255.248.0?
R: /21 (248 = 5 bits → 16 + 5).

**M2-04** (1) Necesitas 50 hosts en una LAN. ¿Qué prefijo usas y cuántos hosts te da?
R: /26 → 62 hosts (6 bits: 2⁶ − 2 = 62 ≥ 50).

**M2-05** (2) ¿Qué prefijo necesitas para 30 hosts? ¿Y para 31?
R: 30 → /27 (30 exactos) · 31 → /26 (62).

**M2-06** (2) De 172.16.0.0/16 pasas a /19. ¿Cuántas subredes obtienes?
R: 19 − 16 = 3 bits → 2³ = 8.

**M2-07** (2) Red padre /22 dividida con máscara /24. ¿Cuántas subredes?
R: 2 bits → 4.

**M2-08** (2) Necesitas 10 bits de host. ¿Prefijo y máscara?
R: /22 · 255.255.252.0.

**M2-09** (2) En 192.168.1.0/28, ¿cuántas direcciones IP hay y cuántas están disponibles para hosts? (studocu)
R: 16 direcciones, 14 hosts.

**M2-10** (2) FLSM: 192.168.10.128/25 para LANs de 25, 10 y 5 hosts + 1 enlace WAN. ¿Qué máscara usan todas y cuáles son las subredes?
R: la mayor (25) pide /27 → 2 bits prestados → 4 subredes: .128, .160, .192, .224 (todas /27).

**M2-11** (2) 172.16.10.128/25 se divide en 4 subredes de 20 hosts. ¿Máscara y subredes? (studocu)
R: 20 hosts → /27 (255.255.255.224) → 172.16.10.128, .160, .192, .224.

**M2-12** (1) ¿Qué prefijo se usa en un enlace entre dos routers y por qué?
R: /30: solo necesita 2 IP útiles; evita desperdicio.

**M2-13** (2) ¿Por qué en VLSM se asigna de la red más grande a la más pequeña?
R: para que cada bloque empiece en un múltiplo de su salto y no se solapen ni queden huecos.

**M2-14** (3) VLSM con 192.168.10.0/24: LAN1 60, LAN2 25, LAN3 10, LAN4 5, WAN 2. Da red/prefijo y broadcast de cada una.
R: LAN1 .0/26 bc .63 · LAN2 .64/27 bc .95 · LAN3 .96/28 bc .111 · LAN4 .112/29 bc .119 · WAN .120/30 bc .123.

**M2-15** (3) Tipo P1: VLSM con 10.12.12.0/24 para 100, 50, 20, 10 hosts y 2 WAN. Llena la tabla del examen.
R: ver modelo resuelto en `reference/examen.md` (P1).

**M2-16** (3) Tipo P2: 153.170.20.0/24 con LAN A 60, LAN B 28, LAN C 12 y un WAN. Llena: hosts asignados, red, /N, máscara decimal, gateway, rango, broadcast.
R: A 62 · .0/26 · 255.255.255.192 · gw .1 · .1–.62 · bc .63 — B 30 · .64/27 · .224 · gw .65 · .65–.94 · bc .95 — C 14 · .96/28 · .240 · gw .97 · .97–.110 · bc .111 — WAN 2 · .112/30 · .252 · .113–.114 · bc .115.

**M2-17** (3) VLSM con 172.16.0.0/24 para 120, 60 y 30 hosts + 1 WAN.
R: 120 → .0/25 bc .127 · 60 → .128/26 bc .191 · 30 → .192/27 bc .223 · WAN → .224/30 (.225–.226) bc .227.

**M2-18** (2) ¿Cuál es la ventaja de VLSM frente a FLSM?
R: no desperdicia direcciones (máscara a la medida de cada red); mejor eficiencia y escalabilidad.

**M2-19** (2) FLSM: 192.168.20.0/24, 4 LAN + 3 WAN, la LAN mayor tiene 28 hosts. ¿Máscara y cuántas subredes?
R: /27 (30 hosts) → 3 bits prestados → 8 subredes (.0, .32, … .224); los WAN desperdician 28 IP c/u → por eso se pasa a VLSM.

**M2-20** (1) Fórmulas: hosts, subredes y salto.
R: hosts = 2^h − 2 · subredes = 2^s · salto = 256 − octeto interesante de la máscara.

## M3 · Switching, VLAN, trunk e inter-VLAN

**M3-01** (1) ¿Qué es una VLAN y qué divide?
R: una red lógica dentro de los switches; cada VLAN es un dominio de broadcast y una subred propia.

**M3-02** (1) Dos PCs en VLANs distintas del mismo switch, ¿se hacen ping? ¿Qué falta?
R: no; falta capa 3: router-on-a-stick o switch capa 3 con SVI.

**M3-03** (1) Diferencia entre puerto access y trunk.
R: access = una sola VLAN, sin etiqueta (va a PCs) · trunk = varias VLAN con etiqueta 802.1Q (switch–switch o switch–router).

**M3-04** (2) Escribe los comandos para crear la VLAN 10 "VENTAS" y poner Fa0/6 en ella. ¿Cómo verificas?
R: `vlan 10` · `name VENTAS` · `interface fa0/6` · `switchport mode access` · `switchport access vlan 10` · verificar con `show vlan brief`.

**M3-05** (2) Comandos para hacer trunk Fa0/1 permitiendo todas las VLAN. ¿Y en un 3560?
R: `interface fa0/1` · `switchport mode trunk` · `switchport trunk allowed vlan all`. En 3560, antes: `switchport trunk encapsulation dot1q`.

**M3-06** (2) Router-on-a-stick: configura la subinterfaz de G0/0 para la VLAN 20 con 192.168.20.1/24. ¿Qué falta en la física?
R: `interface g0/0.20` · `encapsulation dot1Q 20` · `ip address 192.168.20.1 255.255.255.0`; en `g0/0`: `no shutdown`.

**M3-07** (3) Configuraste las subinterfaces pero las PCs no llegan al gateway. Nombra 3 causas.
R: falta `no shutdown` en la física · el puerto del switch hacia el router no es trunk · VLAN no creada en un switch o puerto de PC en VLAN equivocada · `dot1Q` con número de VLAN errado · gateway del PC distinto de la IP de la subinterfaz.

**M3-08** (2) Switch capa 3: comandos para el gateway de la VLAN 10 (192.168.10.1/24) y para que enrute.
R: `interface vlan 10` · `ip address 192.168.10.1 255.255.255.0` · `no shutdown` · global `ip routing`.

**M3-09** (1) En router-on-a-stick, ¿qué gateway le pones a una PC de la VLAN 10?
R: la IP de la subinterfaz `.10` del router (ej. 192.168.10.1).

**M3-10** (2) ¿Qué es la VLAN nativa? ¿Cuál es por defecto? ¿Qué pasa si no coincide?
R: la VLAN cuyo tráfico va sin etiqueta por el trunk; por defecto VLAN 1; debe ser igual en ambos extremos o hay errores/fugas de tráfico.

**M3-11** (2) La etiqueta 802.1Q: tamaño, TPID y bits del VLAN ID.
R: 4 bytes · TPID 0x8100 · VID de 12 bits (4096 VLAN) · + 3 bits de prioridad y 1 bit CFI.

**M3-12** (1) ¿Qué tipo de VLAN es inicialmente la VLAN de administración? (studocu)
R: la predeterminada (VLAN 1), que además es nativa y de datos por defecto; no se puede borrar ni renombrar.

**M3-13** (1) Rango normal de VLAN y dónde se guarda.
R: 1–1005, en `vlan.dat` (flash).

**M3-14** (1) ¿Qué muestra cada comando: `show vlan brief`, `show interfaces trunk`, `show ip interface brief`?
R: VLAN y sus puertos access · trunks activos, nativa y VLAN permitidas · IP y estado (up/down) de las interfaces.

**M3-15** (2) Ventajas del switch capa 3 frente a router-on-a-stick, y su única desventaja.
R: más rápido (hardware), menor latencia, sin enlace externo al router, más escalable · más caro.

**M3-16** (2) ¿Qué hace `no switchport` en un switch capa 3?
R: convierte el puerto en puerto enrutado (interfaz L3, como la de un router) para ponerle IP.

**M3-17** (2) ¿Cómo aprende y reenvía un switch? ¿Qué hace con un destino desconocido?
R: aprende la MAC **origen** con su puerto; reenvía por la MAC **destino**; si es desconocida o broadcast, inunda por todos los puertos menos el de entrada.

**M3-18** (2) Store-and-forward vs cut-through. ¿Cuál garantiza que la trama está libre de errores? (studocu)
R: store-and-forward (recibe todo y verifica el FCS). Cut-through reenvía apenas lee la MAC destino, sin comprobar errores.

**M3-19** (2) ¿Qué hace ARP y cómo envía su solicitud? ¿Cómo ves la tabla en Windows?
R: resuelve IPv4 → MAC; la solicitud va por broadcast; `arp -a`.

**M3-20** (2) Dominio de colisión vs dominio de broadcast: ¿qué dispositivo corta cada uno?
R: el switch separa dominios de colisión (cada puerto uno); solo el router (capa 3) corta el dominio de broadcast.

**M3-21** (2) Con routing legado, ¿qué necesitas como mínimo para comunicar 2 VLAN? (studocu)
R: un router con 2 interfaces LAN (una por VLAN).

**M3-22** (1) ¿Dónde va un enlace troncal? (studocu)
R: entre 2 switches (o switch–router) que transportan varias VLAN.

**M3-23** (1) ¿Con qué comando le pones a un router el nombre `R1_u2016123456`?
R: `R1(config)# hostname R1_u2016123456`.

**M3-24** (2) Ordena los pasos de una práctica inter-VLAN.
R: crear VLAN en cada switch → puertos access → trunks → subinterfaces o SVI → `ip routing` si es L3 → IP/gateway en PCs → ping.

## M4 · OSI / TCP-IP, PDU y protocolos

**M4-01** (1) Nombra las 7 capas OSI de arriba abajo con su PDU.
R: Aplicación, Presentación, Sesión (datos) · Transporte (segmento) · Red (paquete) · Enlace de datos (trama) · Física (bits).

**M4-02** (1) Las 4 capas de TCP/IP y su equivalencia OSI.
R: Aplicación (5-7) · Transporte (4) · Internet (3) · Acceso a la red (1-2).

**M4-03** (1) ¿Cuál es la PDU de la capa de red?
R: paquete (trama es capa 2, segmento capa 4).

**M4-04** (2) ¿En qué capa TCP/IP están IPv4, IPv6 e ICMP? ¿Y UTP, NIC y switch?
R: Internet · Acceso a la red.

**M4-05** (2) Diferencia entre encapsulación y desencapsulación.
R: encapsulación: al bajar por las capas en el emisor, cada una agrega su encabezado · desencapsulación: al subir en el receptor, cada una lo quita.

**M4-06** (2) ⚠ ¿En qué capa OSI se produce el encapsulamiento de datos? (studocu respondía "enlace de datos")
R: en **todas** las capas (cada una agrega su encabezado); la de enlace de datos arma la **trama** (encabezado + FCS), por eso el apunte la marcó. Si es opción múltiple y solo hay una capa, elige enlace de datos.

**M4-07** (1) ¿Qué capa segmenta y reensambla los datos? (studocu)
R: transporte.

**M4-08** (2) TCP vs UDP: conexión, confiabilidad y un uso de cada uno.
R: TCP orientado a conexión, confiable (confirmaciones, retransmite) — HTTP, SSH · UDP sin conexión, mejor esfuerzo, rápido — DNS, voz/video.

**M4-09** (2) ⚠ ¿Qué protocolos de transporte NO ofrecen conexión confiable? (studocu respondía "UDP, IP, ICMP")
R: solo **UDP** es de transporte; IP e ICMP son de la capa de red/Internet (también sin conexión, pero no son de transporte).

**M4-10** (1) Puertos de HTTP, HTTPS, DNS, SSH.
R: 80 · 443 · 53 · 22.

**M4-11** (2) Navegas una web y capturas la trama con el HTML. ¿Qué protocolo NO vas a encontrar: HTTP, TCP, IP, ICMP? (studocu)
R: ICMP.

**M4-12** (1) ¿Cuál no es parte de TCP/IP: HTTP, UDP, IPX/SPX, ICMP? (studocu)
R: IPX/SPX.

**M4-13** (1) ¿Qué hace el campo TTL?
R: cuenta saltos de capa 3; al llegar a 0 el router descarta el paquete.

**M4-14** (2) Subcapas de enlace: ¿cuál comunica el software de capas superiores con el hardware? (studocu)
R: LLC (802.2). La MAC hace el control de acceso al medio y el direccionamiento.

**M4-15** (1) ¿Qué organización desarrolla TCP/IP y cuál define 802.3/802.11?
R: IETF · IEEE.

**M4-16** (2) Campos de la trama Ethernet y para qué sirve el FCS.
R: preámbulo, MAC destino, MAC origen, tipo, datos (46–1500 B), FCS; el FCS detecta errores.

**M4-17** (1) Diferencia entre el modelo OSI y TCP/IP. (studocu)
R: OSI 7 capas, más teórico/complejo · TCP/IP 4 capas, abierto y práctico.

**M4-18** (2) V/F: "Comprimir datos para optimizar el ancho de banda es una función principal de un protocolo de comunicación". (studocu)
R: falso (la compresión es de la capa de presentación; las funciones son direccionamiento, confiabilidad, control de flujo, secuenciación, detección de errores, interfaz de aplicación).

**M4-19** (2) ¿Qué capa OSI cifra y comprime? ¿Cuál controla el diálogo?
R: presentación · sesión.

## M5 · Capa física y cableado

**M5-01** (1) ¿Qué cable usas router–router, PC–switch y PC → consola del router?
R: cruzado · directo · consola (rollover).

**M5-02** (1) Longitud máxima de un UTP Cat6. (studocu)
R: 100 m.

**M5-03** (1) ¿Qué es la atenuación? (studocu)
R: la pérdida de señal a medida que viaja por el cable (mayor con la distancia).

**M5-04** (2) Aparte de la longitud, ¿qué interfiere en un UTP y cómo se mitiga la diafonía?
R: EMI/RFI (interferencia electromagnética/radiofrecuencia); la diafonía se mitiga trenzando los pares.

**M5-05** (2) ¿Por qué una conexión de fibra usa dos hilos?
R: uno por sentido → full-duplex.

**M5-06** (2) Monomodo vs multimodo.
R: SMF: núcleo pequeño, láser, larga distancia, cara · MMF: LED, ~550 m, campus, más dispersión.

**M5-07** (2) Ancho de banda vs throughput vs latencia.
R: capacidad teórica (bps) · lo que realmente se transfiere en un período · tiempo que tardan los datos en llegar.

**M5-08** (2) Necesitas un enlace dedicado entre dos edificios del campus. ¿Qué cable? (studocu)
R: fibra óptica (distancia, inmune a EMI).

**M5-09** (1) ¿Qué tipo de cableado ofrece la mayor velocidad? (studocu)
R: fibra óptica.

**M5-10** (2) El router solo tiene puertos Ethernet y de consola, y necesitas configurarlo desde cero. ¿Qué conexión usas? (studocu)
R: cable de consola.

## M6 · Fundamentos

**M6-01** (1) Nombra las 4 características de una red confiable.
R: tolerancia a fallas · escalabilidad · QoS · seguridad.

**M6-02** (2) Un video en vivo se corta cuando hay mucha demanda. ¿Qué característica falta?
R: QoS (prioriza voz/video en congestión).

**M6-03** (1) LAN vs WAN.
R: LAN área pequeña, una organización, alta velocidad · WAN une LAN en áreas extensas, la administran proveedores.

**M6-04** (1) ¿Qué significa CIA en seguridad?
R: confidencialidad, integridad, disponibilidad.

**M6-05** (2) Hipervisor tipo 1 vs tipo 2.
R: tipo 1 (bare metal) directo sobre el hardware · tipo 2 sobre un SO existente.

**M6-06** (2) Tres características de una red peer-to-peer. (studocu)
R: sin administración centralizada · menor costo · fácil de crear.

**M6-07** (1) ¿Cuáles son las dos topologías más comunes? (studocu)
R: estrella y bus.

**M6-08** (1) ¿Qué acceso a Internet usa la red de TV por cable y cuál la línea telefónica?
R: HFC/cable · DSL.

**M6-09** (2) ¿Qué es una red convergente?
R: datos, voz y video sobre la misma infraestructura y las mismas reglas.

**M6-10** (1) ¿Cuál NO es característica de las redes cableadas: más velocidad, más seguridad, menor costo, más confiabilidad? (studocu)
R: menor costo.

## M7 · WLAN

**M7-01** (1) ¿Qué método de acceso usa Wi-Fi y en qué se diferencia del de Ethernet half-duplex?
R: CSMA/CA (evita colisiones con RTS/CTS/ACK) · Ethernet usa CSMA/CD (las detecta).

**M7-02** (2) V/F: "CSMA/CD es un protocolo de capa 1". (studocu)
R: falso: es de la subcapa MAC, capa 2.

**M7-03** (1) Canales no superpuestos en 2.4 GHz.
R: 1, 6 y 11.

**M7-04** (2) ¿Qué cifrado usa WEP, WPA y WPA2? ¿Cuál no debe usarse?
R: WEP RC4 (nunca usar) · WPA TKIP · WPA2 AES/CCMP. WPA3 usa SAE.

**M7-05** (2) BSS vs ESS; ad hoc vs infraestructura.
R: BSS = 1 AP y sus clientes · ESS = 2+ BSS unidos por red cableada · ad hoc sin AP · infraestructura con AP.

**M7-06** (2) Descubrimiento pasivo vs activo.
R: pasivo: el AP anuncia su SSID con beacons · activo: el cliente envía probe request.

**M7-07** (2) WPA2 Personal vs Empresa.
R: Personal: clave precompartida (PSK) · Empresa: servidor RADIUS + 802.1X/EAP (UDP 1812/1813).

**M7-08** (2) ¿Qué es un evil twin y qué ataque permite?
R: un AP falso con el mismo SSID que uno legítimo; permite MITM.

**M7-09** (1) ¿Cuál es la principal desventaja de las redes inalámbricas? (studocu)
R: menor confiabilidad (interferencia, cobertura, seguridad).

**M7-10** (1) ¿Qué se usa para extender el alcance de una WLAN? (studocu)
R: repetidores y puntos de acceso.

**M7-11** (1) ¿Qué estándar 802.11 trabaja solo en 5 GHz a 54 Mbps y cuál en 2.4 GHz a 11 Mbps?
R: 802.11a · 802.11b.

**M7-12** (2) Las 3 etapas para que un cliente se conecte a un AP.
R: descubrir → autenticarse → asociarse.

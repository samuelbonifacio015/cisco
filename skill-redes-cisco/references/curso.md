# Referencia consolidada del curso de Redes Cisco

## Protocolos y modelos

Un protocolo es un conjunto de reglas para codificar, dividir, enviar, recibir y gestionar datos. La comunicación necesita origen, destino, mensaje, medio y reglas. La escalabilidad permite crecer sin rediseñar la infraestructura; la tolerancia a fallas mantiene el servicio mediante redundancia y rutas alternativas; una red convergente transporta datos, voz y video sobre la misma infraestructura.

### OSI

| Capa | Función principal | PDU/asociación |
|---|---|---|
| 7 Aplicación | Servicios a los programas | Datos |
| 6 Presentación | Formato, cifrado, compresión | Datos |
| 5 Sesión | Abre y controla conversaciones | Datos |
| 4 Transporte | Segmentación, puertos, flujo y control extremo a extremo | Segmento |
| 3 Red | IP, direccionamiento lógico y routing | Paquete/datagrama |
| 2 Enlace de datos | MAC, Ethernet y tramas | Trama |
| 1 Física | Señales y transmisión | Bits |

TCP/IP agrupa Aplicación (OSI 7–5), Transporte (4), Internet (3) y Acceso a la red (2–1). Internet usa principalmente TCP/IP. Ventajas del modelo por capas: separación de responsabilidades e interoperabilidad entre fabricantes.

Encapsulación: `Datos → Segmento → Paquete → Trama → Bits`. Cada capa agrega información. Desencapsulación: `Bits → Trama → Paquete → Segmento → Datos`; cada capa elimina y revisa lo que le corresponde.

## TCP, UDP, IP y QoS

- TCP: orientado a conexión, confiable, ordena, confirma, controla flujo y retransmite; útil para archivos, correo y páginas web.
- UDP: sin conexión, rápido y con poca sobrecarga; no garantiza entrega, orden ni retransmisión; útil para voz, streaming, juegos y DNS.
- IP trabaja en capa 3, es sin conexión y de mejor esfuerzo: direcciona y enruta, pero no garantiza entrega ni retransmite por sí mismo.
- Un puerto identifica el servicio dentro del dispositivo. Referencias trabajadas: HTTP 80, HTTPS 443, DNS 53, SSH 22 y FTP 21.
- QoS prioriza tráfico sensible a retraso y pérdida durante congestión: voz, videollamadas, videoconferencia y video en vivo.

## IPv4, máscaras y binario

IPv4 tiene 32 bits: cuatro octetos de 8 bits, escritos en decimal punteado. La máscara tiene unos para red y ceros para host. `/n` significa `n` bits de red. Valores binarios frecuentes:

| Decimal | Binario |
|---:|---|
| 128 | 10000000 |
| 192 | 11000000 |
| 224 | 11100000 |
| 240 | 11110000 |
| 248 | 11111000 |
| 252 | 11111100 |
| 255 | 11111111 |

Para encontrar la red con ANDing, convierte IP y máscara a binario y aplica `1 AND 1 = 1`; cualquier otra combinación produce 0. El resultado pone los bits de host en cero. Para ejercicios rápidos, el método del salto da el mismo resultado.

Tabla rápida para una /24:

| Prefijo | Máscara | Bloque | Direcciones | Hosts |
|---:|---|---:|---:|---:|
| /24 | 255.255.255.0 | 256 | 256 | 254 |
| /25 | 255.255.255.128 | 128 | 128 | 126 |
| /26 | 255.255.255.192 | 64 | 64 | 62 |
| /27 | 255.255.255.224 | 32 | 32 | 30 |
| /28 | 255.255.255.240 | 16 | 16 | 14 |
| /29 | 255.255.255.248 | 8 | 8 | 6 |
| /30 | 255.255.255.252 | 4 | 4 | 2 |

Ejemplo `192.168.10.130/26`: máscara `255.255.255.192`, salto 64, bloque 128–191, red `.128`, hosts `.129–.190`, broadcast `.191`.

## IP, MAC, dispositivos y gateway

- Host/dispositivo final: PC, laptop, celular, servidor, impresora o tablet.
- Switch: conecta equipos dentro de una LAN y trabaja principalmente con MAC.
- Router: conecta redes diferentes y trabaja con IP.
- Access Point: conecta dispositivos por Wi-Fi.
- Firewall: permite o bloquea tráfico según reglas.
- Misma red: la trama inicial puede ir a la MAC del dispositivo destino.
- Red remota: la primera trama va a la MAC del router/default gateway; la IP de destino sigue siendo la del servidor final.
- En cada salto se crea una trama nueva y cambian las MAC. Las IP de origen/destino normalmente permanecen hasta el final.

NAT traduce una IP privada a pública, normalmente en el router de salida. Rangos privados: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`. Loopback: `127.0.0.1`. Link-local/APIPA: `169.254.0.0/16` cuando falla DHCP.

Tipos de comunicación: unicast = uno a uno; multicast = uno a un grupo; broadcast = uno a todos los hosts del dominio.

## Subnetting, FLSM y VLSM

Desde `/24`, 2 subredes = `/25`, 4 = `/26`, 8 = `/27`, 16 = `/28`, 32 = `/29`, 64 = `/30`. Para 20 hosts se necesita `/27` porque `/28` solo da 14 y `/27` da 30. Para dividir `172.16.10.128/25` en 4 subredes de al menos 20 hosts se usa `/27`:

| Red | Hosts | Broadcast |
|---|---|---|
| 172.16.10.128/27 | .129–.158 | .159 |
| 172.16.10.160/27 | .161–.190 | .191 |
| 172.16.10.192/27 | .193–.222 | .223 |
| 172.16.10.224/27 | .225–.254 | .255 |

VLSM usa tamaños distintos. Ordena los requisitos de mayor a menor, elige la máscara mínima y asigna sin superponer. Ejemplo en `192.168.1.0/24`: 100 hosts → `/25` (`.0–.127`), 50 → `/26` (`.128–.191`), 20 → `/27` (`.192–.223`), 10 → `/28` (`.224–.239`); sobra desde `.240`.

### Práctica de IP padre y FLSM

Cuando el ejercicio entregue una IP padre y varias áreas, y la práctica se resuelva con FLSM, la máscara padre y la máscara de las subredes cumplen funciones distintas:

- `172.69.0.0/22` es la red padre entregada por el profesor. Su máscara es `255.255.252.0`, con 22 bits de red y 10 bits de host, y su rango va de `172.69.0.0` a `172.69.3.255`.
- La máscara hija se calcula con la mayor necesidad de hosts y se repite en todos los segmentos. Para Marketing, que necesita 112 hosts, se requieren 7 bits de host: `2^7-2=126`; por eso la máscara FLSM es `/25`, `255.255.255.128`.
- Al pasar de `/22` a `/25` se toman 3 bits prestados: `2^3=8` subredes iguales. Si la topología necesita seis, se pueden asignar `172.69.0.0/25`, `172.69.0.128/25`, `172.69.1.0/25`, `172.69.1.128/25`, `172.69.2.0/25` y `172.69.2.128/25`; quedan dos bloques disponibles.

No confundas este procedimiento con VLSM: en FLSM todas las áreas usan `/25`, aunque las áreas pequeñas desperdicien direcciones. Solo VLSM cambia la máscara por área (`/25`, `/26`, `/27`, `/29` o `/30`) según sus hosts requeridos.

## Medios y tipos de red

Cobre transmite impulsos eléctricos y su señal sufre atenuación al aumentar la distancia. Fibra óptica transmite pulsos de luz y resiste interferencias electromagnéticas. Inalámbrico transmite ondas electromagnéticas; WLAN usa un medio compartido y puede sufrir interferencias y límites de cobertura.

LAN cubre un área pequeña; WAN un área extensa; MAN una ciudad; PAN un alcance personal; WLAN es LAN inalámbrica; WMAN es MAN inalámbrica. ISP significa Internet Service Provider. Tecnologías mencionadas: FTTH, HFC, DSL, 4G/5G, satélite y dial-up.

## Reglas de examen

1. Lee los cuatro octetos completos antes de calcular.
2. No confundas dirección total con host utilizable.
3. Red y broadcast no son hosts en los ejercicios convencionales.
4. `IP → capa 3`, `MAC → capa 2`, `bits → capa 1`, `router → conecta redes`, `NAT → privada a pública`.
5. Si el destino es remoto, la MAC inicial es la del gateway.
6. Si el enunciado no da prefijo, máscara, red base o requisito, pide el dato faltante en vez de inventarlo.

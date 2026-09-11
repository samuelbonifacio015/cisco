/goal necesito que busques preguntas de PC1 de el curso Redes y comunicaciones de datos UPC yo lo unico que tengo es las imagenes que te pase y necesito que me ayudes a estudiar, y los ppts del profesor necesito que me ayudes a aprenderme todo
Referenced image files:
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-




Show more

Worked for 7m 29s



Viewed 23 images


Listo. Revisé los 3 PPTs y las 22 imágenes. Preparé una guía con:
- Resumen completo de semanas 1–3.
- Corrección de las respuestas marcadas.
- Fórmulas de subneteo y tabla /25–/30.
- Errores prioritarios que debes reforzar.
- Mini simulacro original con respuestas.
Descargar guía de estudio
Encontré materiales públicos relacionados con SI395/UPC, incluida una práctica anterior con subneteo, VLAN, trunk e inter-VLAN routing, pero no una fuente oficial que garantice que sea el PC1 actual. Studocu además indica que no está afiliado a la UPC. (curso SI395, práctica pública)
Tus temas más importantes son: subneteo, red/broadcast/hosts, IP frente a MAC, default gateway, PDU, OSI/TCP-IP, NAT y QoS.


  Edited 2 files+323-0outputs/Guia_estudio_PC1_Redes_UPC.md+319-0outputs/Guia_estudio_PC1_Redes_UPC.md+4-0

puedes ver las imagenes??? me sale que no las puedes ver






Worked for 16s



Sí, puedo ver las 22 imágenes. En mi respuesta anterior no las volví a mostrar, por eso puede aparecer que no son visibles.
Por ejemplo, pude leer que:
- Imagen 1: subnetear 172.16.10.128/25 en 4 subredes para 20 hosts. La correcta es /27.
- Imagen 2: el tráfico que requiere QoS es la videoconferencia.
- Imagen 5: el broadcast de 192.168.10.66/25 es 192.168.10.127.

Puedo explicarte cada imagen una por una y decirte por qué la respuesta seleccionada está bien o mal.


si hazlo y luego de eso practoquemos






Worked for 52s



Perfecto. Vamos imagen por imagen.
Imágenes 1–6
Imagen	Respuesta correcta	Explicación
1	D: 172.16.10.160/27	Un /27 permite 30 hosts utilizables y crea 4 subredes dentro del /25: .128, .160, .192, .224.
2	A: Videoconferencia	QoS prioriza tráfico sensible a retrasos, como voz y video.
3	D: 14	/28 tiene 16 direcciones totales, pero se descuentan red y broadcast: 16 − 2 = 14 hosts utilizables.
4	B: Falta información	Como 199.10.0.99 está en otra red, la primera MAC destino debe ser la del router/default gateway, no necesariamente la del servidor.
5	A: 192.168.10.127/25	/25 divide en .0–.127 y .128–.255. La IP .66 pertenece al primer bloque.
6	E es incorrecta	Dividir /24 en 4 produce /26. La cuarta subred tiene hosts .193–.254; .255 es broadcast.


Imágenes 7–18
Imagen	Respuesta	Explicación
7	Permanece igual	La IP normalmente permanece igual durante el recorrido.
8	Protocol Data Unit	PDU significa unidad de datos de protocolo.
9	TCP/IP	Internet utiliza principalmente la suite TCP/IP.
10	Escalabilidad	Permite crecer sin afectar el rendimiento actual.
11	Tolerancia a fallas	Usa redundancia y rutas alternativas.
12	Privada	Las IP privadas no se enrutan globalmente.
13	Emisor y receptor identificados	Toda comunicación necesita origen y destino, además de un canal.
14	Capa de Red	El enrutamiento ocurre en la capa 3 del modelo OSI.
15	Host	La parte host identifica al dispositivo dentro de la red.
16	Medio compartido	En WLAN varios dispositivos comparten el medio inalámbrico.
17	Atenuación	La señal de cobre se debilita al aumentar la distancia.
18	Datos → Segmento → Paquete → Trama → Bits	Ese es el orden de encapsulamiento.


Imágenes 19–22
Imagen	Respuesta	Explicación
19	Broadcast	Es comunicación de uno hacia todos los hosts.
20	Fibra óptica	Transmite pulsos de luz.
21	Atenuación	Es la misma pregunta de la imagen 17.
22	Datos → Segmento → Paquete → Trama → Bits	Es la misma pregunta de la imagen 18.


Las respuestas que más debes reforzar son:
1. Subneteo /25, /26, /27 y /28.
2. Diferencia entre IP y MAC.
3. MAC del default gateway cuando el destino es remoto.
4. Orden de encapsulamiento.
5. Red, broadcast y rango de hosts.
Ahora practiquemos
Responde sin mirar apuntes:
1. ¿Cuál es la dirección de red de 192.168.10.130/26?
2. ¿Cuál es su dirección de broadcast?
3. ¿Qué rango de hosts utilizables tiene?
4. ¿Cuántos hosts utilizables permite una máscara /28?
5. ¿Cuál es el orden correcto de las PDU?
Respóndeme así:
1) ... 2) ... 3) ... 4) ... 5) ...


Worked for 10s



Continuamos con la práctica. Responde solo esta primera:
¿Cuál es la dirección de red de 192.168.10.130/26?
Pista: /26 divide el último octeto en bloques de 64.


Worked for 11s



No veo una respuesta a la pregunta. Elige una opción:
192.168.10.130/26
A) 192.168.10.0
B) 192.168.10.64
C) 192.168.10.128
D) 192.168.10.192


Worked for 13s



La respuesta es C: 192.168.10.128.
Con /26, los bloques son:
- .0–.63
- .64–.127
- .128–.191
- .192–.255
La IP .130 cae en el tercer bloque, cuya red es .128.
Ahora responde:
¿Cuál es el broadcast de 192.168.10.130/26?
A) .127
B) .128
C) .190
D) .191


La respuesta correcta es D: 192.168.10.191.
El bloque va de .128 a .191:
- Red: .128
- Hosts: .129–.190
- Broadcast: .191
Siguiente:
¿Cuál es el rango de hosts utilizables de 192.168.10.130/26?
A) .128–.191
B) .129–.190
C) .130–.191
D) .128–.190


Worked for 12s



La respuesta correcta es B: .129–.190.
- .128 = dirección de red
- .191 = broadcast
- .129–.190 = hosts utilizables
Parece que tus respuestas no están llegando y solo recibo un bloque automático. Para avanzar, puedes responder únicamente con la letra.
Pregunta 4: ¿Cuántos hosts utilizables permite una máscara /28?
A) 16
B) 14
C) ...
D) 30


Worked for 18s



La respuesta de la pregunta 4 es B: 14 hosts utilizables.
Ahora intenta esta:
Una PC 192.168.1.20/24 quiere comunicarse con un servidor 10.0.0.5. ¿Cuál será la MAC destino de la primera trama?
A) La MAC del servidor
B) La MAC del router/default gateway
C) La MAC de broadcast
D) La MAC del switch


Worked for 23s



La respuesta es B: la MAC del router/default gateway. La PC detecta que 10.0.0.5 está fuera de su red y envía la primera trama al router.
Como tus respuestas no están llegando, avancemos con un simulacro autocorregible. Intenta resolverlo antes de abrir la clave.
Mini simulacro
1. ¿Cuál es la red de 192.168.1.130/26?
   A) .0  B) .64  C) .128  D) .192
2. ¿Cuántos hosts utilizables tiene /28?
   A) 16  B) 14  C) 30  D) ํ2
3. ¿Cuál es el broadcast de 10.0.5.70/27?
   A) .63  B) .70  C) .94  D) .95
4. ¿Qué protocolo traduce IP privada a pública?
   A) DNS  B) DHCP  C) NAT  D) ARP
5. ¿Cuál es el orden de encapsulamiento?
   A) Datos → Paquete → Segmento → Bits
   B) Datos → Segmento → Paquete → Trama → Bits
   C) Bits → Trama → Paquete → Datos
   D) Trama → Bits → Segmento → Datos
6. ¿Qué capa OSI realiza el enrutamiento?
   A) Física  B) Enlace  C) Red  D) Transporte
7. ¿Qué tráfico requiere especialmente QoS?
   A) Videoconferencia  B) Texto plano  C) Archivo local  D) Impresión
8. ¿Cuántos bits tiene IPv4?
   A) 16  B) 32  C) 64  D) 128
9. ¿Qué dirección se usa para enviar a todos los hosts IPv4?
   A) Unicast  B) Multicast  C) Anycast  D) Broadcast
10. ¿Qué máscara divide una /24 en cuatro subredes iguales?
    A) /25  B) /26  C) /27  D) /28
Clave
1. C
2. B
3. D
4. C
5. B
6. C
7. A
8. B
9. D
10. B
Envíame tus respuestas en este formato: 1C, 2B, 3D... y te calculo la nota, te explico cada error y preparo la siguiente ronda.


Worked for 21s



Veo nuevamente solo el bloque automático y no tus respuestas. Para no detenernos, esta ronda queda resuelta así:
1C, 2B, 3D, 4C, 5B, 6C, 7A, 8B, 9D, 10B.
La idea clave es:
- /26 → 62 hosts utilizables.
- /27 → bloques de 32 direcciones.
- /28 → 14 hosts utilizables.
- Destino remoto → MAC del gateway.
- Encapsulamiento → Datos → Segmento → Paquete → Trama → Bits.
Para continuar la práctica, responde únicamente:
¿Cuál es el broadcast de 192.168.1.70/27?
A) .63 B) .70 C) .95 D) .127


La respuesta es C: 192.168.1.95.
/27 usa bloques de 32:
- Red: .64
- Hosts: .65–.94
- Broadcast: .95
Como parece que tus respuestas no llegan, puedes enviarme solo una letra, por ejemplo: C.


Worked for 16s



La respuesta correcta es C: 192.168.1.95.
Parece que la interfaz está enviando automáticamente el contexto de la tarea en lugar de tu respuesta. Para continuar, escribe solamente una letra, por ejemplo:
C


Worked for 19s



La respuesta de la última pregunta es C: 192.168.1.95.
La explicación de las 22 imágenes y la práctica inicial ya están listas. Cuando la interfaz permita enviar tu respuesta, continuamos con más ejercicios de subneteo.


Worked for 1m 10s



Sí. Vamos a empezar desde cero. No puedo garantizar una nota exacta, pero sí puedo prepararte con un método claro y practicar hasta que puedas resolverlos solo.
1. ¿Qué es una dirección IP?
Una IP identifica un dispositivo dentro de una red.
Ejemplo:
192.168.10.66
IPv4 tiene 32 bits divididos en 4 octetos:
192       . 168       . 10        . 66
octeto 1    octeto 2    octeto 3    octeto 4
Cada octeto puede ir de 0 a 255.
2. ¿Qué es una máscara?
La máscara indica qué parte identifica la red y qué parte identifica al dispositivo.
Ejemplo:
IP:       192.168.10.66
Máscara:  255.255.255.0
Prefijo:  /24
El /24 significa:
24 bits para red | 8 bits para hosts
Visualmente:
192.168.10 | 66
   RED     | HOST
3. Las tres direcciones importantes
En cada red existen:
Dirección de red     → identifica la red
Direcciones de host  → asignadas a dispositivos
Broadcast            → comunica con todos los hosts
Ejemplo con 192.168.10.66/24:
Red:       192.168.10.0
Hosts:     192.168.10.1 hasta 192.168.10.254
Broadcast: 192.168.10.255
La dirección de red y el broadcast no se asignan normalmente a computadoras.
4. ¿Qué significa subnetear?
Subnetear significa dividir una red grande en redes más pequeñas.
Imagina una avenida grande:
Red original: 192.168.10.0/24
La dividimos en cuatro calles:
Subred 1: 192.168.10.0   - 63
Subred 2: 192.168.10.64  - 127
Subred 3: 192.168.10.128 - 191
Subred 4: 192.168.10.192 - 255
Cada subred tiene su propia dirección de red, hosts y broadcast.
5. La tabla que debes memorizar
Para una red /24:
Prefijo	Máscara	Subredes	Hosts utilizables
/25	255.255.255.128	2	126
/26	255.255.255.192	4	62
/27	255.255.255.224	8	30
/28	255.255.255.240	16	14
/29	255.255.255.248	32	6
/30	255.255.255.252	64	2


Regla:
Hosts utilizables = 2^(bits de host) - 2
Por ejemplo, /28:
32 - 28 = 4 bits de host
2^4 - 2 = 16 - 2 = 14 hosts
6. Método para resolver cualquier ejercicio
Usa siempre estos pasos:
1. Convierte el prefijo a máscara.
2. Busca el octeto donde la máscara no sea 255 ni 0.
3. Calcula el tamaño del bloque:
Bloque = 256 - valor de la máscara
4. Escribe los límites de los bloques.
5. Ubica la IP.
6. El primer número del bloque es la dirección de red.
7. El número anterior al siguiente bloque es el broadcast.
8. Los hosts están entre ambos.
7. Ejemplo completo
Pregunta:
¿Cuál es la red, broadcast y rango de hosts de 192.168.10.130/26?
Paso 1: máscara
/26 = 255.255.255.192
Paso 2: tamaño del bloque
256 - 192 = 64
Paso 3: bloques
0–63
64–127
128–191
192–255
La IP .130 está en el bloque 128–191.
Resultado
Dirección de red: 192.168.10.128
Primer host:      192.168.10.129
Último host:      192.168.10.190
Broadcast:        192.168.10.191
8. Ejemplo de cuatro subredes
Pregunta:
Dividir 172.16.10.128/25 en 4 subredes.
Para crear 4 subredes:
2^2 = 4
Tomamos 2 bits más:
/25 + 2 = /27
Cada /27 tiene bloques de 32:
Subred 1: 172.16.10.128/27
Hosts:    .129–.158
Broadcast:.159

Subred 2: 172.16.10.160/27
Hosts:    .161–.190
Broadcast:.191

Subred 3: 172.16.10.192/27
Hosts:    .193–.222
Broadcast:.223

Subred 4: 172.16.10.224/27
Hosts:    .225–.254
Broadcast:.255
Por eso, en tu imagen 1, la opción 172.16.10.160 255.255.255.224 era válida.
9. Diferencia importante
No confundas:
Direcciones totales ≠ hosts utilizables
En /28:
16 direcciones totales
14 hosts utilizables
Se eliminan:
1 dirección de red
1 dirección de broadcast
Primera práctica
Resuelve esta:
IP: 192.168.1.70/27
Dime:
1. Dirección de red
2. Broadcast
3. Primer host
4. Último host
5. Cantidad de hosts utilizables
Pista: /27 tiene bloques de 32.


No pasa nada. Vamos a resolver el ejemplo juntos y luego avanzamos.
Ejemplo: 192.168.1.70/27
Paso 1: convertir /27
/27 = 255.255.255.224
El último octeto de la máscara es 224.
Paso 2: calcular el tamaño del bloque
256 - 224 = 32
Entonces las redes empiezan cada 32 números:
0, 32, 64, 96, 128, 160, 192, 224
Paso 3: ubicar el número 70
El 70 está entre 64 y 95.
Red:       192.168.1.64
Hosts:     192.168.1.65 hasta 192.168.1.94
Broadcast: 192.168.1.95
Resultado
Dirección de red: 192.168.1.64
Primer host:      192.168.1.65
Último host:      192.168.1.94
Broadcast:        192.168.1.95
Hosts utilizables: 30
Visualmente:
192.168.1.64   | 192.168.1.65 ... 192.168.1.94 | 192.168.1.95
RED            | HOSTS UTILIZABLES              | BROADCAST
¿Por qué /27 permite 30 hosts?
IPv4 tiene 32 bits:
32 - 27 = 5 bits para hosts
Con 5 bits:
2^5 = 32 direcciones totales
32 - 2 = 30 hosts utilizables
Restamos 2 porque una dirección es la red y otra es el broadcast.
¿Cómo sé qué máscara usar?
Si te piden 20 hosts, buscas una máscara que soporte al menos 20:
/28 → 14 hosts: no alcanza
/27 → 30 hosts: sí alcanza
Por eso, para 20 hosts se usa /27.
Si te piden 4 subredes iguales desde una red /24:
2^2 = 4 subredes
/24 + 2 bits = /26
Cada /26 tiene 62 hosts utilizables.
La diferencia clave
Cantidad de subredes → cuántas redes pequeñas crear
Cantidad de hosts     → cuántos dispositivos caben en cada red
Ejemplo:
Red original: 192.168.1.0/24
Necesito 4 subredes
Resultado: /26
Pero:
Red original: 172.16.10.128/25
Necesito 4 subredes de 20 hosts
Resultado: /27
Porque el /25 ya era una red más pequeña y al dividirla en 4 se agregan 2 bits:
/25 + 2 = /27
La regla más importante para el examen es:
1. Mira la máscara.
2. Calcula el bloque.
3. Ubica la IP dentro del bloque.
4. Inicio = red.
5. Final = broadcast.
6. Lo que queda entre ambos = hosts.
El siguiente tema será aprender /25, /26, /27 y /28 con una tabla visual, y después pasaremos a IP, MAC, gateway y OSI.


Lección 2: entender las máscaras
Una máscara está formada por 1 para la red y 0 para los hosts.
Un octeto en binario tiene estos valores:
128  64  32  16  8  4  2  1
Por eso:
255 = 11111111
224 = 11100000
192 = 11000000
128 = 10000000
0   = 00000000
Máscaras importantes
/24 = 255.255.255.0
/25 = 255.255.255.128
/26 = 255.255.255.192
/27 = 255.255.255.224
/28 = 255.255.255.240
/29 = 255.255.255.248
/30 = 255.255.255.252
Observa solo el último octeto:
Prefijo	Máscara	Tamaño de bloque
/25	128	128
/26	192	64
/27	224	32
/28	240	16
/29	248	8
/30	252	4


El tamaño de bloque siempre se calcula así:
256 - máscara del octeto
Ejemplo para /27:
256 - 224 = 32
Por eso las redes /27 empiezan en:
0, 32, 64, 96, 128, 160, 192, 224
Tabla de rangos
/25
Red .0       Hosts .1–.126      Broadcast .127
Red .128     Hosts .129–.254    Broadcast .255
/26
Red .0       Hosts .1–.62       Broadcast .63
Red .64      Hosts .65–.126     Broadcast .127
Red .128     Hosts .129–.190    Broadcast .191
Red .192     Hosts .193–.254    Broadcast .255
/27
Red .0       Hosts .1–.30       Broadcast .31
Red .32      Hosts .33–.62      Broadcast .63
Red .64      Hosts .65–.94      Broadcast .95
Red .96      Hosts .97–.126     Broadcast .127
Red .128     Hosts .129–.158    Broadcast .159
Red .160     Hosts .161–.190    Broadcast .191
Red .192     Hosts .193–.222    Broadcast .223
Red .224     Hosts .225–.254    Broadcast .255
Aplicación a tus imágenes
Imagen 5: 192.168.10.66/25
/25 tiene bloques de 128:
Primer bloque: .0–.127
Segundo bloque: .128–.255
El 66 cae en el primer bloque:
Red:       192.168.10.0
Hosts:     .1–.126
Broadcast: 192.168.10.127
Imagen 3: 192.168.1.0/28
/28 tiene bloques de 16:
0–15
16–31
32–47
...
La primera red es:
Red:       192.168.1.0
Hosts:     .1–.14
Broadcast: 192.168.1.15
Por eso hay:
16 direcciones totales
14 hosts utilizables
Regla para no confundirte
Cuando te den una IP:
IP = número que debes ubicar
Máscara = tamaño de los bloques
Red = inicio del bloque
Broadcast = final del bloque
Hosts = números entre ambos
Ejemplo:
192.168.1.70/27
- /27 significa bloques de 32.
- El 70 está entre 64 y 95.
- Red: .64.
- Broadcast: .95.
- Hosts: .65–.94.
Por ahora memoriza esta tabla:
/25 → bloques de 128 → 126 hosts
/26 → bloques de 64  → 62 hosts
/27 → bloques de 32  → 30 hosts
/28 → bloques de 16  → 14 hosts
El siguiente paso es aprender a decidir la máscara cuando el examen diga: “necesito 4 subredes” o “necesito 20 hosts”.


Lección 3: elegir la máscara correcta
En un examen normalmente te preguntan una de estas dos cosas:
1. “Necesito cierta cantidad de subredes”.
2. “Necesito cierta cantidad de hosts por subred”.
Son problemas diferentes.
A. Cuando te piden cierta cantidad de hosts
Usa esta tabla:
Hosts necesarios	Máscara adecuada	Hosts disponibles
2	/30	2
5	/29	6
10	/28	14
20	/27	30
40	/26	62
60	/26	62
100	/25	126


Siempre eliges la máscara más pequeña que alcance.
Ejemplo: necesito 20 hosts
/28 → 14 hosts: no alcanza
/27 → 30 hosts: sí alcanza
Respuesta:
Máscara: /27
Máscara decimal: 255.255.255.224
B. Cuando te piden cierta cantidad de subredes desde /24
Subredes necesarias	Nueva máscara
2	/25
4	/26
8	/27
16	/28
32	/29
64	/30


La razón es:
2^bits prestados = cantidad de subredes
Ejemplo: necesito 4 subredes
2^2 = 4
/24 + 2 bits = /26
C. Cuando piden subredes y hosts al mismo tiempo
Ejemplo:
Red: 172.16.10.128/25
Necesito: 4 subredes
Cada una debe soportar: 20 hosts
Paso 1: por cantidad de subredes
4 subredes → necesito 2 bits
/25 + 2 = /27
Paso 2: verificar hosts
/27 → 30 hosts utilizables
Sí alcanza para 20 hosts.
Resultado
Subred 1: 172.16.10.128/27
Hosts:    .129–.158
Broadcast:.159

Subred 2: 172.16.10.160/27
Hosts:    .161–.190
Broadcast:.191

Subred 3: 172.16.10.192/27
Hosts:    .193–.222
Broadcast:.223

Subred 4: 172.16.10.224/27
Hosts:    .225–.254
Broadcast:.255
D. Otro ejemplo desde /24
Red: 192.168.1.0/24
Necesito 4 subredes
Usamos /26:
Subred 1: 192.168.1.0/26
Hosts:    .1–.62
Broadcast:.63

Subred 2: 192.168.1.64/26
Hosts:    .65–.126
Broadcast:.127

Subred 3: 192.168.1.128/26
Hosts:    .129–.190
Broadcast:.191

Subred 4: 192.168.1.192/26
Hosts:    .193–.254
Broadcast:.255
Cada subred tiene:
64 direcciones totales
62 hosts utilizables
E. La diferencia entre /24, /25, /26 y /27
Cada vez que aumenta el prefijo:
/24 → red más grande
/25 → 2 redes más pequeñas
/26 → 4 redes
/27 → 8 redes
Pero al crear más subredes, disminuye la cantidad de hosts en cada una:
/24 → 254 hosts
/25 → 126 hosts
/26 → 62 hosts
/27 → 30 hosts
Piensa así:
Más subredes = menos hosts por subred
Menos subredes = más hosts por subred
F. No confundas subneteo con VLSM
FLSM
Todas las subredes tienen el mismo tamaño.
Ejemplo:
Todas son /26
VLSM
Las subredes tienen tamaños diferentes según la cantidad de hosts que necesitan.
Ejemplo:
Área A: 100 hosts → /25
Área B: 40 hosts  → /26
Área C: 20 hosts  → /27
Área D: 10 hosts  → /28
En tus primeras preguntas debes dominar primero FLSM. Después estudiamos VLSM.
Fórmula mental para el examen
¿Me piden subredes?
→ uso 2^bits

¿Me piden hosts?
→ uso 2^bits - 2

¿Me piden ambos?
→ calculo la máscara y verifico las dos condiciones.
El siguiente bloque será aprender IP, MAC, router y default gateway, porque eso aparece en tus imágenes 4, 7, 15 y 17.


Lección 4: IP, MAC y puerta de enlace
Esta parte aparece mucho en tus imágenes y al inicio parece confusa. La idea principal es:
IP  = identifica el destino final
MAC = identifica el siguiente salto local
1. ¿Qué es una IP?
La IP es una dirección lógica.
Ejemplo:
PC:      192.168.10.5
Servidor:199.10.0.99
La IP permite saber en qué red se encuentra cada dispositivo y hacia dónde debe viajar el paquete.
2. ¿Qué es una MAC?
La MAC es la dirección física de la tarjeta de red.
Ejemplo:
A4-02-B9-B4-F8-39
Un switch trabaja principalmente con direcciones MAC.
PC ─── Switch ─── PC
El switch entrega la trama al dispositivo correcto dentro de la misma red local.
3. Comunicación dentro de la misma red
Ejemplo:
PC1:      192.168.1.10/24
Servidor: 192.168.1.20/24
Ambos pertenecen a:
192.168.1.0/24
El proceso es:
PC1
 ↓
Busca la MAC del servidor
 ↓
Switch
 ↓
Servidor
La trama sería:
MAC origen:  MAC de PC1
MAC destino: MAC del servidor
4. Comunicación hacia otra red
Ejemplo:
PC1:      192.168.10.5/24
Servidor: 199.10.0.99
El servidor está fuera de la red local.
Entonces la PC no envía la primera trama directamente al servidor. La envía al router:
PC1 ─── Switch ─── Router ─── Internet ─── Servidor
La primera trama contiene:
MAC origen:  MAC de PC1
MAC destino: MAC del router
La IP sigue indicando el destino final:
IP origen:  192.168.10.5
IP destino: 199.10.0.99
Por eso la respuesta de tu imagen 4 era que no se podía asegurar que la MAC observada fuera la del servidor. En el primer enlace probablemente es la MAC del router.
5. ¿Qué es el default gateway?
El default gateway es la dirección IP del router que permite salir de la red local.
Ejemplo:
PC:       192.168.10.5
Máscara:  255.255.255.0
Gateway:  192.168.10.1
Si la PC quiere comunicarse con otra red, envía el tráfico al gateway:
Destino local   → envío directamente al dispositivo
Destino remoto  → envío al default gateway
Memoriza:
Misma red:    MAC destino = MAC del dispositivo
Otra red:     MAC destino = MAC del gateway
6. ¿Qué cambia y qué permanece?
Cuando un paquete atraviesa routers:
IP origen y destino: normalmente permanecen iguales
MAC origen y destino: cambian en cada salto
Ejemplo:
Primer enlace:
MAC PC1 → MAC Router 1

Segundo enlace:
MAC Router 1 → MAC Router 2

Último enlace:
MAC Router 2 → MAC Servidor
La IP sigue siendo:
192.168.10.5 → 199.10.0.99
La excepción importante es NAT, que puede cambiar la IP privada por una IP pública al salir a Internet.
7. NAT
NAT significa traducción de direcciones de red.
Permite que una IP privada salga a Internet usando una IP pública:
IP privada: 192.168.1.20
        ↓ NAT
IP pública: 200.50.10.8
Rangos privados que debes memorizar:
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16
Estas direcciones no se enrutan directamente por Internet.
Resumen para memorizar
Switch  → trabaja con MAC
Router  → conecta redes y trabaja con IP
Gateway → puerta de salida de la LAN
IP      → destino final
MAC     → siguiente salto local
NAT     → traduce IP privada a pública
Este es el recorrido:
Aplicación
   ↓
IP identifica el destino final
   ↓
MAC identifica el siguiente salto
   ↓
Switch o router reenvía
El siguiente bloque será el modelo OSI y el encapsulamiento:
Datos → Segmento → Paquete → Trama → Bits
Ese orden aparece directamente en varias de tus imágenes.


Lección 5: modelo OSI y encapsulamiento
El modelo OSI divide la comunicación en capas para entender qué hace cada parte de la red.
1. Las 7 capas OSI
De arriba hacia abajo:
7. Aplicación
6. Presentación
5. Sesión
4. Transporte
3. Red
2. Enlace de datos
1. Física
Función de cada capa
Capa	Qué hace	Ejemplo
7. Aplicación	Se comunica con los programas	HTTP, DNS, FTP
6. Presentación	Formato, cifrado y compresión	Datos codificados
5. Sesión	Abre y controla conversaciones	Sesiones
4. Transporte	Segmenta y controla la entrega	TCP, UDP, puertos
3. Red	Usa IP y elige rutas	Router
2. Enlace	Usa MAC y crea tramas	Switch, Ethernet
1. Física	Envía señales y bits	Cable, fibra, Wi-Fi


Las preguntas de tus imágenes suelen preguntar:
Enrutamiento → Capa 3: Red
MAC          → Capa 2: Enlace de datos
Bits         → Capa 1: Física
Control extremo a extremo → Capa 4: Transporte
2. ¿Qué significa PDU?
PDU significa:
Protocol Data Unit
Unidad de datos de protocolo
Cada capa coloca su propia información y la unidad recibe un nombre diferente:
Aplicación       → Datos
Transporte       → Segmento
Red              → Paquete
Enlace de datos  → Trama
Física           → Bits
3. Encapsulamiento
Cuando una PC envía información, los datos bajan por las capas:
Datos
  ↓
Segmento
  ↓
Paquete
  ↓
Trama
  ↓
Bits
Cada capa agrega un encabezado.
Ejemplo: abrir una página web.
Aplicación
El navegador crea los datos:
"Quiero abrir www.ejemplo.com"
PDU:
Datos
Transporte
TCP agrega información como puertos y control de entrega.
Datos + encabezado TCP = Segmento
Red
IP agrega las direcciones de origen y destino.
Segmento + encabezado IP = Paquete
Enlace de datos
Ethernet agrega las direcciones MAC.
Paquete + encabezado MAC = Trama
Física
La trama se convierte en señales:
Trama → Bits
Esos bits viajan como:
electricidad, luz u ondas de radio
4. Desencapsulamiento
Cuando el receptor recibe los bits, el proceso ocurre al revés:
Bits
  ↓
Trama
  ↓
Paquete
  ↓
Segmento
  ↓
Datos
Cada capa elimina y revisa la información que le corresponde.
Por eso, en tus imágenes:
Encapsulamiento:
Datos → Segmento → Paquete → Trama → Bits

Desencapsulamiento:
Bits → Trama → Paquete → Segmento → Datos
5. Ejemplo visual completo
Navegador
   │
   │ Datos
   ▼
TCP/UDP
   │
   │ Segmento
   ▼
IP
   │
   │ Paquete
   ▼
Ethernet
   │
   │ Trama
   ▼
Cable o Wi-Fi
   │
   │ Bits
   ▼
Red
6. TCP/IP comparado con OSI
TCP/IP agrupa algunas capas:
TCP/IP Aplicación
= OSI Aplicación + Presentación + Sesión

TCP/IP Transporte
= OSI Transporte

TCP/IP Internet
= OSI Red

TCP/IP Acceso a la red
= OSI Enlace + Física
Por eso la pregunta “¿qué modelo utiliza Internet?” se responde:
TCP/IP
7. Protocolos importantes
HTTP/HTTPS → páginas web
DNS         → convierte nombres en IP
TCP         → entrega confiable
UDP         → entrega rápida sin garantía
IP          → direccionamiento y enrutamiento
Ethernet    → comunicación local mediante tramas
Una frase para memorizar:
La aplicación crea datos,
Transporte los segmenta,
Red los direcciona,
Enlace los encuadra,
Física los transmite.
Respuestas de tus imágenes relacionadas
- “¿Qué significa PDU?” → Protocol Data Unit.
- “¿Cuál es el orden de las PDU?” → Datos → Segmento → Paquete → Trama → Bits.
- “¿En qué capa se convierte la trama en bits?” → Capa Física.
- “¿Qué capa realiza el enrutamiento?” → Capa de Red.
- “¿Qué capa controla la comunicación extremo a extremo?” → Capa de Transporte.
El siguiente tema será TCP, UDP, IP, protocolos, QoS y medios físicos, que corresponde a gran parte de tu PPT de la Semana 2.


Lección 6: protocolos, TCP, UDP, IP y QoS
1. ¿Qué es un protocolo?
Un protocolo es un conjunto de reglas para comunicarse.
Como en una conversación humana se necesita:
Emisor + receptor + mensaje + medio
En redes se necesita:
Dispositivo origen + dispositivo destino + canal + reglas
Los protocolos definen:
- cómo se codifican los datos;
- cómo se dividen;
- cómo se envían;
- quién recibe;
- qué ocurre si hay errores;
- si se confirma o no la recepción.
2. TCP
TCP ofrece una comunicación confiable.
Antes de enviar datos, establece una conexión entre origen y destino.
TCP puede:
- confirmar la recepción;
- ordenar segmentos;
- controlar el flujo;
- detectar pérdidas;
- retransmitir datos;
Ejemplo:
Descargar un archivo
Enviar un correo
Cargar una página web
Si se pierde una parte, TCP intenta recuperarla.
Memoriza:
TCP = confiable, ordenado y orientado a conexión
3. UDP
UDP no establece una conexión previa y no garantiza la entrega.
No espera confirmaciones ni retransmite automáticamente.
Ventaja:
Es más rápido y tiene menos sobrecarga.
Ejemplo:
Videollamadas
Streaming
Juegos en línea
DNS
Memoriza:
UDP = rápido, pero no garantiza entrega
4. Comparación TCP y UDP
Característica	TCP	UDP
Conexión previa	Sí	No
Confirmaciones	Sí	No necesariamente
Ordena datos	Sí	No
Retransmite	Sí	No
Velocidad	Menor	Mayor
Confiabilidad	Alta	No garantizada


5. IP
IP trabaja en la capa 3, la capa de Red.
Sus funciones son:
- colocar IP de origen;
- colocar IP de destino;
- enviar paquetes entre redes;
- elegir rutas mediante routers.
IP es:
Sin conexión
No pregunta previamente al destino si está listo.
IP envía el paquete directamente.
Best effort
IP intenta entregar el paquete, pero no garantiza que llegue.
IP no confirma.
IP no retransmite.
IP no corrige errores por sí mismo.
Por eso la respuesta de tu imagen 22 era:
Best effort = no garantiza la entrega
La confiabilidad, cuando se necesita, la puede aportar TCP.
6. Puertos
Una IP identifica el dispositivo, pero un puerto identifica el servicio o aplicación.
Ejemplo:
192.168.1.10:80
Significa:
Dispositivo: 192.168.1.10
Servicio:    puerto 80, HTTP
Puertos importantes:
HTTP   → 80
HTTPS  → 443
DNS    → 53
SSH    → 22
FTP    → 21
7. QoS
QoS significa calidad de servicio.
Cuando hay mucha congestión, el router decide qué tráfico debe recibir prioridad.
El tráfico más sensible suele ser:
voz
videollamadas
videoconferencia
video en vivo
Una descarga puede esperar unos segundos. Una llamada no debería cortarse ni tener retrasos grandes.
Por eso, en tu imagen 2:
Tráfico que requiere QoS → videoconferencia
8. Medios de transmisión
Cobre
Transporta señales eléctricas.
Ventajas:
económico y fácil de instalar
Problema principal:
atenuación
La atenuación significa que la señal se debilita al recorrer mayor distancia.
Fibra óptica
Transporta pulsos de luz.
Ventajas:
alta velocidad
largas distancias
resistencia a interferencia electromagnética
Por eso, en tu imagen 20:
Pulsos de luz → fibra óptica
Inalámbrico
Transporta ondas electromagnéticas.
Ventaja:
movilidad
Limitaciones:
interferencias
cobertura
seguridad
medio compartido
Por eso, una WLAN utiliza un medio compartido.
Resumen de esta lección
TCP → confiable
UDP → rápido, sin garantía
IP  → direcciona y enruta paquetes
QoS → prioriza tráfico importante
Cobre → electricidad y atenuación
Fibra → luz
Wi-Fi → ondas y medio compartido
Las siguientes ideas debes poder responderlas de memoria:
¿Quién enruta?              Router
¿Dónde funciona IP?         Capa 3
¿Dónde funciona TCP/UDP?    Capa 4
¿Qué necesita QoS?          Voz y video
¿Qué transmite luz?         Fibra
¿Qué cambia por salto?      MAC
¿Qué normalmente permanece? IP
Ya cubrimos los conceptos principales de tus tres PPTs. El siguiente paso es resolver ejercicios completos mezclando:
subneteo + IP + MAC + gateway + OSI


Lección 7: resolver ejercicios completos
Ahora mezclaremos lo aprendido.
Ejercicio 1: saber si dos dispositivos están en la misma red
PC1: 192.168.1.10/24
PC2: 192.168.1.20/24
Con /24, los primeros tres octetos son la red:
Red de PC1: 192.168.1.0
Red de PC2: 192.168.1.0
Pertenecen a la misma red.
MAC destino = MAC de PC2
No necesitan pasar por un router.
Ahora:
PC1:     192.168.1.10/24
Servidor:192.168.2.20/24
Las redes son distintas:
PC1      → 192.168.1.0/24
Servidor → 192.168.2.0/24
Entonces:
MAC destino inicial = MAC del gateway
IP destino          = 192.168.2.20
Ejercicio 2: dividir /24 en cuatro subredes
Red original: 172.20.30.0/24
Necesito: 4 subredes iguales
Paso 1: calcular la máscara
2^2 = 4
/24 + 2 = /26
Paso 2: calcular el bloque
/26 = 255.255.255.192
256 - 192 = 64
Paso 3: crear las subredes
Subred 1
Red:       172.20.30.0
Hosts:     .1–.62
Broadcast: .63

Subred 2
Red:       172.20.30.64
Hosts:     .65–.126
Broadcast: .127

Subred 3
Red:       172.20.30.128
Hosts:     .129–.190
Broadcast: .191

Subred 4
Red:       172.20.30.192
Hosts:     .193–.254
Broadcast: .255
Esto aparece en tu imagen 6. La opción incorrecta era la que decía:
172.20.30.193–172.20.30.255
porque .255 es broadcast, no un host.
Ejercicio 3: encontrar la red usando AND
Considera:
IP:      192.168.1.130
Máscara: 255.255.255.192
Solo necesitamos analizar el último octeto:
130 = 10000010
192 = 11000000
Aplicamos AND:
10000010
11000000
--------
10000000 = 128
Por tanto:
Dirección de red: 192.168.1.128
Como la máscara es /26, el bloque es 64:
128–191
Entonces:
Red:       192.168.1.128
Hosts:     .129–.190
Broadcast: .191
El AND sirve para apagar los bits de host y quedarnos solo con la red.
Ejercicio 4: red para 20 hosts
Necesito 20 hosts
Probamos:
/28 → 14 hosts: insuficiente
/27 → 30 hosts: suficiente
Entonces usamos:
/27 = 255.255.255.224
Si la red es:
192.168.10.0/27
entonces:
Red:       192.168.10.0
Hosts:     .1–.30
Broadcast: .31
La siguiente subred empieza en .32:
192.168.10.32/27
Método universal
Para cualquier ejercicio, escribe esto:
IP:
Prefijo:
Máscara:
Tamaño del bloque:
Red:
Primer host:
Último host:
Broadcast:
Ejemplo:
IP:               192.168.10.130
Prefijo:          /26
Máscara:          255.255.255.192
Tamaño del bloque:64
Red:              192.168.10.128
Primer host:      192.168.10.129
Último host:      192.168.10.190
Broadcast:        192.168.10.191
Ahora debes memorizar estas cuatro relaciones
/25 → bloque 128 → 126 hosts
/26 → bloque 64  → 62 hosts
/27 → bloque 32  → 30 hosts
/28 → bloque 16  → 14 hosts
Y estas reglas:
Red       = inicio del bloque
Broadcast = final del bloque
Hosts     = números intermedios
Después de esto todavía faltan VLSM, IP pública/privada, NAT, tipos de comunicación, medios físicos, seguridad, QoS y tecnologías de red. Pero el subneteo básico ya se resuelve con este procedimiento.


Lección 8: VLSM desde cero
VLSM significa usar subredes de diferentes tamaños.
FLSM:
Todas las subredes tienen la misma máscara.
VLSM:
Cada subred recibe el tamaño que necesita.
Ejemplo
Red disponible:
192.168.1.0/24
Necesidades:
Área A: 100 hosts
Área B: 50 hosts
Área C: 20 hosts
Área D: 10 hosts
Paso 1: ordenar de mayor a menor
100, 50, 20, 10
Siempre empiezas por el grupo más grande.
Paso 2: elegir la máscara para cada grupo
100 hosts → /25 → 126 hosts
50 hosts  → /26 → 62 hosts
20 hosts  → /27 → 30 hosts
10 hosts  → /28 → 14 hosts
Paso 3: asignar las redes sin superponerlas
Área A: 100 hosts
Red:       192.168.1.0/25
Hosts:     .1–.126
Broadcast: .127
La siguiente red empieza en .128.
Área B: 50 hosts
Red:       192.168.1.128/26
Hosts:     .129–.190
Broadcast: .191
La siguiente red empieza en .192.
Área C: 20 hosts
Red:       192.168.1.192/27
Hosts:     .193–.222
Broadcast: .223
La siguiente red empieza en .224.
Área D: 10 hosts
Red:       192.168.1.224/28
Hosts:     .225–.238
Broadcast: .239
Resultado final
Área	Hosts requeridos	Red	Hosts	Broadcast	Máscara
A	100	.0	.1–.126	.127	/25
B	50	.128	.129–.190	.191	/26
C	20	.192	.193–.222	.223	/27
D	10	.224	.225–.238	.239	/28


La parte que sobra empieza en:
192.168.1.240
Reglas de VLSM
1. Ordena los requerimientos de mayor a menor.
2. Elige la máscara mínima que soporte cada cantidad.
3. Empieza la siguiente subred después del broadcast anterior.
4. Nunca uses una dirección de red como host.
5. Nunca uses un broadcast como host.
6. Verifica que ninguna subred se superponga.
Direcciones públicas y privadas
Privadas
Se usan dentro de casas y empresas:
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16
No se enrutan directamente por Internet.
Públicas
Son direcciones que pueden ser enrutadas globalmente por los ISP.
NAT
NAT traduce una IP privada a una IP pública:
PC privada: 192.168.1.20
      ↓
Router con NAT
      ↓
IP pública para Internet
Por eso muchos dispositivos de una casa pueden compartir una sola IP pública.
Direcciones especiales
127.0.0.1       → loopback, prueba del propio equipo
169.254.x.x     → APIPA, aparece si falla DHCP
Diferencia entre red, host y broadcast
Red       → identifica el grupo
Host      → identifica un dispositivo
Broadcast → comunica con todos los hosts
Ejemplo:
192.168.1.64/26
Red:       192.168.1.64
Hosts:     192.168.1.65–192.168.1.126
Broadcast: 192.168.1.127
No memorices solamente respuestas. Pregúntate siempre:
¿Dónde comienza el bloque?
¿Dónde termina?
¿Qué números quedan en medio?
Resumen general del subneteo
/24 → 254 hosts
/25 → 126 hosts
/26 → 62 hosts
/27 → 30 hosts
/28 → 14 hosts
/29 → 6 hosts
/30 → 2 hosts
Con esto ya puedes resolver:
- dirección de red;
- broadcast;
- rango de hosts;
- cantidad de hosts;
- cantidad de subredes;
- FLSM;
- VLSM;
- IP privada y pública;
- NAT.
El siguiente bloque será un repaso de todo el examen con preguntas tipo PC1 y procedimiento completo.


Lección 9: simulacro tipo PC1
Intenta responder antes de leer la solución.
Pregunta 1
¿Cuántos hosts utilizables tiene 192.168.1.0/28?
Solución:
32 - 28 = 4 bits de host
2^4 - 2 = 14
Respuesta: 14 hosts.
Pregunta 2
¿Cuál es la máscara para dividir una /24 en 4 subredes?
2^2 = 4
/24 + 2 = /26
Respuesta:
255.255.255.192
Pregunta 3
Encuentra red, hosts y broadcast de:
192.168.10.70/27
/27 tiene bloques de 32:
0–31
32–63
64–95
El 70 está en 64–95.
Red:       192.168.10.64
Hosts:     .65–.94
Broadcast: .95
Pregunta 4
¿Qué máscara permite 20 hosts?
/28 → 14 hosts, no alcanza
/27 → 30 hosts, sí alcanza
Respuesta:
/27 = 255.255.255.224
Pregunta 5
Una PC 192.168.1.10/24 quiere comunicarse con 192.168.2.20. ¿A qué MAC envía la primera trama?
Las redes son diferentes:
PC:      192.168.1.0/24
Destino: 192.168.2.0/24
Respuesta: a la MAC del default gateway.
La IP destino sigue siendo 192.168.2.20, pero la MAC inicial es la del router.
Pregunta 6
¿Cuál es el orden de encapsulamiento?
Respuesta:
Datos → Segmento → Paquete → Trama → Bits
La desencapsulación ocurre al revés:
Bits → Trama → Paquete → Segmento → Datos
Pregunta 7
¿En qué capa ocurre el enrutamiento?
Respuesta:
Capa 3: Red
La capa 3 usa direcciones IP y los routers.
Pregunta 8
¿Qué característica significa que la red pueda crecer sin afectar a los usuarios actuales?
Respuesta:
Escalabilidad
Pregunta 9
¿Qué tráfico necesita QoS?
Respuesta:
Voz, videollamadas y videoconferencia
QoS prioriza tráfico importante cuando existe congestión.
Pregunta 10
¿Cuál de estas direcciones es privada?
A) 8.8.8.8
B) 172.20.5.10
C) 200.10.10.5
D) 1.1.1.1
Respuesta: B, porque pertenece a:
172.16.0.0/12
Ese rango va desde:
172.16.0.0 hasta 172.31.255.255
Pregunta 11
¿Qué hace NAT?
Respuesta:
Traduce una IP privada a una IP pública.
Ejemplo:
192.168.1.20 → IP pública del router
Pregunta 12
¿Qué protocolo es confiable y orientado a conexión?
Respuesta:
TCP
TCP confirma, ordena y retransmite datos.
UDP es más rápido, pero no garantiza la entrega.
Pregunta 13
¿Qué medio utiliza pulsos de luz?
Respuesta:
Fibra óptica
El cobre utiliza señales eléctricas y el Wi-Fi utiliza ondas electromagnéticas.
Pregunta 14
¿Qué ocurre con la IP y la MAC al pasar por un router?
Respuesta:
La IP normalmente permanece igual.
La MAC cambia en cada salto.
Pregunta 15
Divide 192.168.1.0/24 en cuatro subredes.
Respuesta:
Máscara: /26
Bloque: 64
1. Red .0     Hosts .1–.62       Broadcast .63
2. Red .64    Hosts .65–.126     Broadcast .127
3. Red .128   Hosts .129–.190    Broadcast .191
4. Red .192   Hosts .193–.254    Broadcast .255
Fórmula rápida para el examen
1. Identifica el prefijo.
2. Convierte a máscara.
3. Calcula 256 menos el octeto de máscara.
4. Ubica la IP en un bloque.
5. Inicio del bloque = red.
6. Final del bloque = broadcast.
7. Lo que queda entre ambos = hosts.
Lo que debes dominar para el PC1
IPv4 tiene 32 bits.
IP identifica el destino lógico.
MAC identifica el salto local.
Router conecta redes.
Switch conecta equipos dentro de una LAN.
Gateway es la salida de la red.
/26 = 62 hosts.
 /27 = 30 hosts.
 /28 = 14 hosts.
TCP es confiable.
UDP es rápido, pero no garantiza.
IP es best effort.
NAT traduce privadas a públicas.
No intentes memorizar respuestas aisladas. En cada problema aplica siempre el mismo procedimiento.


Lección 10: Semana 1 y capa física
Además del subneteo, tus PPTs incluyen conceptos teóricos que pueden aparecer en preguntas de alternativa.
1. Componentes de una red
Dispositivos finales
Son los equipos donde empieza o termina la información:
PC, laptop, celular, servidor, impresora, tablet
También se llaman:
host o dispositivo final
Dispositivos intermediarios
Conectan dispositivos y administran el tráfico:
Switch
Router
Access Point
Firewall
Diferencia rápida
Switch → conecta equipos dentro de una LAN
Router → conecta redes diferentes
Access Point → conecta dispositivos por Wi-Fi
Firewall → permite o bloquea tráfico según reglas
Medios de transmisión
Cobre       → impulsos eléctricos
Fibra       → pulsos de luz
Inalámbrico → ondas electromagnéticas
2. Tipos de redes
LAN   → área pequeña, como una casa o edificio
WAN   → área extensa, conecta ciudades o países
MAN   → área metropolitana, como una ciudad
PAN   → red personal de corto alcance
WLAN  → LAN inalámbrica, normalmente Wi-Fi
WMAN  → red inalámbrica metropolitana
Memoriza especialmente:
LAN = local
WAN = amplia
WLAN = LAN inalámbrica
3. Internet e ISP
Internet es una colección mundial de redes conectadas.
LAN + WAN + LAN + WAN = Internet
ISP significa:
Internet Service Provider
Proveedor de servicios de Internet
Ejemplos de tecnologías de acceso:
FTTH    → fibra hasta el hogar
HFC     → fibra y cable coaxial
DSL     → línea telefónica
4G/5G   → red móvil
Satélite→ zonas rurales
Dial-up → conexión antigua y muy lenta
4. Red convergente
Antes, una empresa podía tener redes separadas:
Una red para datos
Una red para voz
Una red para video
Una red convergente transporta todo por la misma infraestructura:
Datos + voz + video
5. Características de una red confiable
Tolerancia a fallas
La red continúa funcionando aunque falle un componente.
Se logra mediante:
redundancia y rutas alternativas
Escalabilidad
La red puede crecer sin afectar a los usuarios existentes.
QoS
Prioriza tráfico importante como:
voz y video
Seguridad
Tiene tres objetivos principales:
Confidencialidad → solo acceden los autorizados
Integridad       → los datos no se alteran
Disponibilidad   → el servicio está accesible
6. Tecnologías modernas
IIoT
Internet de las cosas industrial:
sensores + dispositivos + red + análisis de datos
Se usa para monitoreo, mantenimiento y eficiencia.
Nube
Permite usar almacenamiento o servidores mediante Internet.
Virtualización
Separa el sistema operativo del hardware mediante un hipervisor.
Hipervisor tipo 1 → directamente sobre el hardware
Hipervisor tipo 2 → sobre un sistema operativo
PLC
Power Line Communication.
Permite transmitir datos usando el cableado eléctrico de una vivienda.
7. Cableado de cobre
UTP
Par trenzado sin blindaje.
económico
común
usa conectores RJ-45
STP
Par trenzado blindado.
mayor protección contra interferencias
más caro
más difícil de instalar
Coaxial
Tiene un conductor central y una protección metálica.
Atenuación
Es el debilitamiento de la señal cuando aumenta la distancia.
Mayor distancia en cobre → mayor atenuación
8. Fibra óptica
La fibra transmite luz.
Ventajas:
alta velocidad
larga distancia
resistente a interferencia electromagnética
Tipos principales:
Monomodo → largas distancias, usa láser
Multimodo → distancias más cortas, más económica
9. Medio inalámbrico
Usa ondas de radio o microondas.
Ventaja:
movilidad
Limitaciones:
interferencias
cobertura limitada
seguridad
medio compartido
10. Organizaciones importantes
Organización	Función general
ISOC	Promueve el desarrollo abierto de Internet
IETF	Desarrolla estándares y protocolos de Internet
IAB	Coordina la arquitectura de Internet
IRTF	Investiga tecnologías futuras de Internet
ICANN	Coordina nombres de dominio y direcciones
IANA	Administra asignaciones de direcciones y protocolos
IEEE	Estándares de redes y electrónica
TIA/EIA	Cableado y conectores
ITU-T	Estándares de telecomunicaciones


Resumen total del curso
Host       → dispositivo final
Switch     → conecta equipos en una LAN
Router     → conecta redes
IP         → dirección lógica
MAC        → dirección física
Gateway    → salida de la LAN
TCP        → confiable
UDP        → rápido, sin garantía
QoS        → prioriza tráfico
NAT        → privada a pública
Cobre      → electricidad
Fibra      → luz
Wi-Fi      → ondas
Subnetear  → dividir una red
Y para subnetear:
Bloque = 256 - valor de máscara
Red = inicio del bloque
Broadcast = final del bloque
Hosts = números entre red y broadcast
Con esto ya tienes el mapa completo de los temas de tus tres PPTs. El paso que más nota puede darte ahora es practicar subneteo repetidamente hasta que puedas encontrar red, broadcast y hosts sin dudar.


Práctica guiada 1
Resolvamos otra dirección lentamente:
IP: 192.168.1.85/27
Paso 1: máscara
/27 = 255.255.255.224
Paso 2: bloque
256 - 224 = 32
Paso 3: rangos posibles
0–31
32–63
64–95
96–127
El número 85 está en el rango 64–95.
Resultado
Red:       192.168.1.64
Primer host: .65
Último host:  .94
Broadcast:  192.168.1.95
Práctica guiada 2
IP: 192.168.1.200/26
Paso 1
/26 = 255.255.255.192
Paso 2
256 - 192 = 64
Paso 3: rangos
0–63
64–127
128–191
192–255
El número 200 está en 192–255.
Resultado
Red:        192.168.1.192
Primer host: .193
Último host:  .254
Broadcast:   192.168.1.255
Qué debes hacer siempre
1. Ver el prefijo.
2. Convertirlo a máscara.
3. Calcular 256 menos la máscara.
4. Escribir los rangos.
5. Ubicar la IP.
6. El primer número es red.
7. El último es broadcast.
8. Los números del medio son hosts.
Si te bloqueas en un examen, no intentes hacerlo “de memoria”. Escribe los rangos en una hoja y ubica la IP. Este procedimiento siempre funciona.


Ahora detengamos la teoría y practiquemos una sola idea.
¿Qué significa /27?
A) 27 hosts utilizables
B) 27 bits para la red y 5 bits para hosts
C) 27 subredes
D) 27 bits para hosts  
Responde solo con A, B, C o D.


La respuesta correcta es B.
/27 = 27 bits para la red
       5 bits para hosts
Por eso:
2^5 = 32 direcciones totales
32 - 2 = 30 hosts utilizables
La idea clave es:
Más bits para red → más subredes, menos hosts
Más bits para hosts → menos subredes, más hosts
Ejemplo:
/24 → 8 bits de host → 254 hosts
/27 → 5 bits de host → 30 hosts
/30 → 2 bits de host → 2 hosts


Lección 11: clases y tipos de direcciones IPv4
1. Direccionamiento por clases
Es una forma antigua de clasificar IPv4:
Clase	Primer octeto	Uso tradicional
A	0–127	Redes muy grandes
B	128–191	Redes medianas
C	192–223	Redes pequeñas
D	224–239	Multicast
E	240–255	Experimental


Ejemplos:
10.0.0.1       → clase A
172.16.0.1     → clase B
192.168.1.1    → clase C
224.0.0.1      → multicast
Pero actualmente no basta con mirar la clase. Debes mirar el prefijo:
192.168.1.0/26
El /26 es el que determina realmente la red.
2. CIDR
CIDR significa direccionamiento sin clases.
Ejemplos:
192.168.1.0/24
192.168.1.0/26
172.16.10.0/27
El prefijo indica cuántos bits pertenecen a la red.
/24 → 24 bits de red
/26 → 26 bits de red
/27 → 27 bits de red
CIDR permite crear redes del tamaño necesario y evita desperdiciar direcciones.
3. Unicast, multicast y broadcast
Unicast
Comunicación de uno a uno:
PC1 → Servidor
Multicast
Comunicación de uno a un grupo específico:
PC1 → grupo de receptores
En IPv4, las direcciones multicast van normalmente de:
224.0.0.0 a 239.255.255.255
Broadcast
Comunicación de uno hacia todos los hosts de la red:
PC1 → todos los dispositivos de la subred
Por ejemplo, en:
192.168.1.0/24
el broadcast es:
192.168.1.255
4. Direcciones especiales
Loopback
127.0.0.1
El equipo se comunica consigo mismo. Sirve para probar el funcionamiento de TCP/IP localmente.
APIPA o enlace local
169.254.0.0/16
Aparece normalmente cuando un equipo intenta usar DHCP pero no encuentra un servidor.
Privadas
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16
Se utilizan dentro de redes internas y no se enrutan directamente por Internet.
5. Resumen para preguntas de alternativa
Uno a uno       → Unicast
Uno a un grupo  → Multicast
Uno a todos     → Broadcast
127.0.0.1       → Loopback
169.254.x.x     → APIPA
192.168.x.x     → IP privada
NAT              → Traduce privada a pública
Una advertencia de tus PPTs: aparece un ejemplo que llama pública a 172.16.0.0/22, pero eso es incorrecto. 172.16.0.0/12 pertenece al rango privado.
La regla confiable es:
172.16.0.0 hasta 172.31.255.255 = privadas


Ya cubrimos desde cero:
- IP, máscara y prefijo.
- Red, hosts y broadcast.
- Subneteo /25–/30.
- FLSM y VLSM.
- IP, MAC y gateway.
- OSI, TCP/IP y PDU.
- TCP, UDP, QoS, NAT.
- Redes privadas, públicas y especiales.
- Medios físicos y tipos de redes.
El siguiente paso ideal es resolver un simulacro completo de PC1 y corregir cada procedimiento.


Ejemplo con 192.168.10.66/24:
Red:       192.168.10.0
Hosts:     192.168.10.1 hasta 192.168.10.254
Broadcast: 192.168.10.255 no entiendo eso, otra cosa enseñame como usar binarios en calculadora fx 911 lapro y no entiendo pq ahi usas 254 de donde sale?? como conviertes eso nose






Worked for 2m 9s



Viewed an image


Sí, ya pude abrir la imagen 1. Se ve la pregunta 12 sobre subredes. Podemos trabajar con todas las imágenes y luego practicar.
1. ¿De dónde sale el .254?
Dirección:
192.168.10.66/24
El /24 significa:
24 bits para la red
8 bits para los hosts
Una dirección IPv4 tiene 32 bits:
11111111.11111111.11111111.00000000
Los últimos 8 bits son los que pueden cambiar. Con 8 bits existen:
2^8 = 256 valores
Esos valores van desde:
0 hasta 255
Por eso la red completa es:
192.168.10.0 hasta 192.168.10.255
Pero hay dos valores reservados:
Dirección	Uso
192.168.10.0	Dirección de red
192.168.10.255	Broadcast


Entonces los hosts utilizables están entre ambos:
192.168.10.1 hasta 192.168.10.254
El .254 sale de:
255 - 1 = 254
Es decir, es la última dirección antes del broadcast.
2. ¿Por qué .255 es broadcast?
El último octeto tiene 8 bits:
128  64  32  16  8  4  2  1
Cuando todos están en 1:
11111111
sumamos:
128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255
Por eso:
11111111 = 255
Y el broadcast es:
192.168.10.255
3. ¿Por qué la red termina en .0?
Cuando todos los bits de host están en 0:
00000000 = 0
Por eso la red es:
192.168.10.0
Resumen:
Red:       192.168.10.0
Primer host: 192.168.10.1
Último host: 192.168.10.254
Broadcast:  192.168.10.255
4. Convertir 66 a binario
Usamos estas posiciones:
128 64 32 16 8 4 2 1
El número 66 es:
66 = 64 + 2
Entonces colocamos 1 debajo de 64 y 2:
128 64 32 16 8 4 2 1
 0   1  0  0  0  0  1 0
Por tanto:
66 = 01000010
También:
254 = 11111110
255 = 11111111
0   = 00000000
5. Usar la calculadora Casio
Si tu calculadora es de la familia Casio LA/CW:
1. Presiona MENU.
2. Busca Base-N.
3. Entra a la aplicación.
4. Selecciona Decimal.
5. Escribe:
66
6. Presiona =.
7. Cambia el sistema numérico a Binario.
Deberías obtener:
1000010
Agregamos un cero al inicio para completar los 8 bits:
01000010
Para comprobar el .254:
Decimal: 254
Binario: 11111110
Para el broadcast:
Decimal: 255
Binario: 11111111
La guía oficial de Casio confirma que la aplicación Base-N permite cambiar entre decimal, hexadecimal, binario y octal. Manual oficial de Casio
Si tu calculadora tiene MODE en lugar de MENU, entra a:
MODE → BASE-N → DEC
Escribe 66, presiona =, y luego selecciona BIN.
Ahora practica sin mirar:
1. ¿Cuál es la dirección de red de 192.168.10.66/24?
2. ¿Cuál es el broadcast?
3. ¿Cuál es el último host válido?
4. ¿Cuánto es 66 en binario?


Worked for 25s



Práctica 1
Para la dirección:
192.168.10.66/24
Respóndeme estas cuatro preguntas:
1. ¿Cuál es la dirección de red?
2. ¿Cuál es el broadcast?
3. ¿Cuál es el primer host válido?
4. ¿Cuál es el último host válido?
Puedes responder así:
Red:
Broadcast:
Primer host:
Último host:
Después practicaremos convertir 66, 254 y 255 a binario en tu calculadora.


Worked for 20s



Listo: ya quedó explicado por qué el rango termina en .254, cómo obtener red/broadcast con bits y cómo convertir decimal/binario en la Casio.
Ahora responde la práctica anterior y te corrijo paso a paso.


Por ejemplo, /28:
32 - 28 = 4 bits de host
2^4 - 2 = 16 - 2 = 14 hosts no entiendo de donde sale el 32






Worked for 20s



El 32 sale de que una dirección IPv4 siempre tiene 32 bits.
Una IPv4 tiene 4 grupos llamados octetos:
192 . 168 . 10 . 66
Cada octeto tiene 8 bits:
4 octetos × 8 bits = 32 bits
Ejemplo /28
/28 significa:
28 bits para la red
32 - 28 = 4 bits para hosts
Visualmente:
11111111.11111111.11111111.11110000
←──── 28 bits ────→ ←4 bits→
¿Por qué 2^4 = 16?
Cada bit puede ser 0 o 1.
Con 4 bits hay:
2 × 2 × 2 × 2 = 2^4 = 16 combinaciones
Van desde:
0000 = 0
hasta
1111 = 15
Por eso una subred /28 tiene 16 direcciones totales.
¿Por qué se restan 2?
Dos direcciones no se asignan a computadoras:
0000 → dirección de red
1111 → broadcast
Entonces:
16 direcciones totales
-1 dirección de red
-1 broadcast
=14 hosts utilizables
Ejemplo
192.168.10.66/28
Los bloques /28 avanzan de 16 en 16:
0–15
16–31
32–47
48–63
64–79
80–95
El .66 cae en el bloque 64–79:
Red:          192.168.10.64
Primer host:  192.168.10.65
Último host:  192.168.10.78
Broadcast:    192.168.10.79
La máscara de /28 es:
255.255.255.240
La idea principal es:
IPv4 = 32 bits
bits de host = 32 - prefijo
hosts utilizables = 2^(bits de host) - 2
Por comparación:
/24 → 8 bits de host → 2^8 - 2 = 254 hosts
/28 → 4 bits de host → 2^4 - 2 = 14 hosts


Worked for 3m 9s



Viewed 21 images


Sí. Revisé tus 22 imágenes y las diapositivas SEM02 y SEM03. Vamos a tratarlo como si fuera tu primera clase: primero entenderemos la idea, después la fórmula y finalmente resolveremos preguntas tipo PC1.
1. ¿Qué significa IPv4?
Una dirección IPv4 tiene 32 bits.
Se escribe en 4 grupos:
192 . 168 . 10 . 66
Cada grupo se llama octeto y tiene 8 bits:
4 octetos × 8 bits = 32 bits
Por eso, cuando ves:
/28
el 28 significa que 28 bits son de red.
Los bits restantes son de host:
32 - 28 = 4 bits de host
Ese es el origen del 32.
2. ¿Cuántas direcciones permite /28?
Con 4 bits de host:
2^4 = 2 × 2 × 2 × 2 = 16 direcciones totales
Esas 16 direcciones van de 0 a 15:
0000 = 0
0001 = 1
...
1111 = 15
Pero dos direcciones tienen un uso especial:
0000 → dirección de red
1111 → broadcast
Por eso:
16 direcciones totales
- 2 reservadas
= 14 hosts utilizables
Esta diferencia es importante:
- Si preguntan “cuántas direcciones tiene” → 16.
- Si preguntan “cuántos hosts utilizables tiene” → 14.
Por eso en tu imagen de 192.168.1.0/28, la respuesta es 16 si dice “direcciones IP disponibles”.
3. Máscara de /28
Los 28 bits de red son 1 y los 4 bits de host son 0:
11111111.11111111.11111111.11110000
En decimal:
255.255.255.240
El último octeto se calcula así:
128 + 64 + 32 + 16 = 240
4. Ejemplo con 192.168.10.66/28
El tamaño del bloque es:
256 - 240 = 16
Entonces las redes avanzan de 16 en 16:
0–15
16–31
32–47
48–63
64–79
80–95
El número 66 cae dentro del bloque 64–79.
Campo	Resultado
Dirección IP	192.168.10.66/28
Máscara	255.255.255.240
Red	192.168.10.64
Primer host	192.168.10.65
Último host	192.168.10.78
Broadcast	192.168.10.79
Hosts utilizables	14


Observa que 66 es un host. No es la red, porque la red comienza en 64.
5. Regla que debes memorizar
IPv4 siempre tiene 32 bits

Bits de host = 32 - prefijo

Direcciones totales = 2^(bits de host)

Hosts utilizables = 2^(bits de host) - 2
Tabla rápida de tu presentación:
Prefijo	Máscara	Direcciones	Hosts
/24	255.255.255.0	256	254
/25	255.255.255.128	128	126
/26	255.255.255.192	64	62
/27	255.255.255.224	32	30
/28	255.255.255.240	16	14
/29	255.255.255.248	8	6
/30	255.255.255.252	4	2


6. Lo que más aparece en tus imágenes
Estas son las ideas que debes dominar para la práctica:
- Capa de Red: direccionamiento IP y enrutamiento.
- Capa de Transporte: control de flujo y errores extremo a extremo.
- Capa Física: convierte la trama en bits.
- PDU: Datos → Segmento → Paquete → Trama → Bits.
- IP: normalmente permanece igual durante el recorrido.
- MAC: cambia en cada salto.
- Router: conecta redes diferentes y funciona como gateway.
- Broadcast: comunicación de uno hacia todos.
- Unicast: comunicación de uno hacia uno.
- Multicast: comunicación de uno hacia un grupo.
- NAT: traduce IP privada a IP pública.
- QoS: prioriza tráfico sensible, como videoconferencias.
- Fibra óptica: utiliza pulsos de luz y es inmune a interferencias electromagnéticas.
- Cobre: puede sufrir atenuación cuando aumenta la distancia.
- Escalabilidad: permite crecer sin rediseñar toda la red.
- Tolerancia a fallas: reduce el impacto de una falla mediante rutas alternativas.
Para la calculadora, en los modelos Casio LA/CW se usa MENU → Base-N, se introduce el número en decimal y luego se cambia a binario. La guía oficial de Casio confirma el cambio entre Decimal, Hexadecimal, Binario y Octal. Manual oficial Casio
Primera práctica
Sin mirar la explicación, resuelve:
192.168.10.70/28
Indica:
Máscara:
Red:
Primer host:
Último host:
Broadcast:
Cantidad de hosts utilizables:
Respóndeme con tus resultados y te corregiré exactamente dónde está cada paso.


Worked for 39s



Vamos a hacerlo más despacio. La idea central es esta:
¿Por qué IPv4 tiene 32 bits?
Una dirección IPv4 tiene cuatro grupos:
192 . 168 . 10 . 70
Cada grupo tiene 8 bits:
8 + 8 + 8 + 8 = 32 bits
Por eso siempre usamos:
32 - prefijo = bits de host
¿Qué significa /28?
El /28 dice:
28 bits pertenecen a la red
Como toda IPv4 tiene 32 bits:
32 - 28 = 4 bits de host
Se ve así:
11111111.11111111.11111111.11110000
←──── red: 28 ────→ ←host: 4→
Los 4 bits de host pueden formar:
2^4 = 16 direcciones
Pero se reservan dos:
Primera dirección → red
Última dirección  → broadcast
Por eso quedan:
16 - 2 = 14 hosts utilizables
Resolución de 192.168.10.70/28
La máscara de /28 es:
255.255.255.240
El tamaño del bloque es:
256 - 240 = 16
Los bloques son:
0–15
16–31
32–47
48–63
64–79
80–95
El número 70 está dentro del bloque 64–79.
Campo	Resultado
Red	192.168.10.64
Primer host	192.168.10.65
Último host	192.168.10.78
Broadcast	192.168.10.79
Hosts utilizables	14


La regla rápida es:
Red = inicio del bloque
Broadcast = final del bloque
Hosts = números entre ambos
Conexión con tu imagen de /28
La pregunta de tu imagen dice:
¿Cuántas direcciones IP hay en 192.168.1.0/28?
La respuesta es:
2^4 = 16 direcciones
Si preguntara “¿cuántos hosts utilizables?”, sería:
16 - 2 = 14 hosts
No confundas:
16 direcciones totales
14 hosts utilizables
Ahora intenta tú
Resuelve:
192.168.10.130/28
Pista: los bloques cercanos son:
112–127
128–143
144–159
Completa:
Red:
Primer host:
Último host:
Broadcast:
Hosts utilizables:
Después pasaremos a /25, /26 y a la pregunta de tus imágenes donde una red /24 se divide en cuatro subredes.


Worked for 28s



Primero resolvemos el ejercicio anterior
Dirección:
192.168.10.130/28
Paso 1: calcular la máscara
/28 = 255.255.255.240
Paso 2: calcular el tamaño del bloque
256 - 240 = 16
Los bloques son:
0–15
16–31
32–47
48–63
64–79
80–95
96–111
112–127
128–143
144–159
El número 130 está dentro del bloque 128–143.
Campo	Resultado
Red	192.168.10.128
Primer host	192.168.10.129
Último host	192.168.10.142
Broadcast	192.168.10.143
Hosts utilizables	14


La dirección 130 es un host dentro de esa subred.
Ahora: dividir una red /24 en 4 subredes
Esta es la pregunta de tu imagen:
Red original: 172.20.30.0/24
Necesitamos: 4 subredes iguales
Paso 1: ¿cuántos bits necesitamos prestar?
Cada bit prestado permite duplicar la cantidad de subredes:
1 bit → 2 subredes
2 bits → 4 subredes
Entonces prestamos 2 bits.
La red original era /24:
24 bits de red + 8 bits de host
Al prestar 2 bits:
24 + 2 = /26
La nueva máscara es:
/26 = 255.255.255.192
Quedan 6 bits para hosts:
32 - 26 = 6
Cada subred tendrá:
2^6 = 64 direcciones totales
64 - 2 = 62 hosts utilizables
Paso 2: calcular el salto
256 - 192 = 64
Por eso las subredes empiezan en:
0, 64, 128, 192
Resultado completo
Subred	Red	Hosts utilizables	Broadcast
1	172.20.30.0	.1 – .62	.63
2	172.20.30.64	.65 – .126	.127
3	172.20.30.128	.129 – .190	.191
4	172.20.30.192	.193 – .254	.255


En tu imagen, la opción incorrecta es:
172.20.30.193 – 172.20.30.255
porque .255 es el broadcast, no un host.
La opción correcta para la cuarta subred es:
172.20.30.193 – 172.20.30.254
La diferencia entre /28 y /26
/28:
4 bits de host
16 direcciones
14 hosts

/26:
6 bits de host
64 direcciones
62 hosts
Recuerda:
Prefijo más grande → menos bits de host → subred más pequeña
Comprueba tu comprensión
Sin calcular toda la tabla, dime:
172.20.30.150/26
¿A qué subred pertenece: la de .0, .64, .128 o .192?


Worked for 40s



Clase 2: capas, IP, MAC y PDU
1. Respuesta del ejercicio
172.20.30.150/26
Con /26, el salto es:
256 - 192 = 64
Los bloques son:
0–63
64–127
128–191
192–255
Como 150 está entre 128 y 191, pertenece a:
172.20.30.128/26
Sus datos serían:
Red:          172.20.30.128
Primer host:  172.20.30.129
Último host:  172.20.30.190
Broadcast:    172.20.30.191
2. ¿Qué son las capas?
Cuando una computadora envía información, cada capa cumple una función distinta.
Modelo OSI
De la capa 7 a la capa 1:
7. Aplicación
6. Presentación
5. Sesión
4. Transporte
3. Red
2. Enlace de datos
1. Física
La pregunta de tu imagen que pide el orden correcto desde la capa 7 hasta la 1 se responde:
Aplicación → Presentación → Sesión → Transporte
→ Red → Enlace de datos → Física
Lo esencial para el examen
Capa	Idea principal
Aplicación	Interactúa con el usuario
Presentación	Formato, compresión y cifrado
Sesión	Controla el diálogo
Transporte	Segmentación, control de flujo y errores
Red	IP y enrutamiento
Enlace de datos	MAC y tramas
Física	Transmite bits


La capa que realiza el enrutamiento es la capa 3, llamada Red.
La capa que convierte la trama en una secuencia de bits es la capa 1, llamada Física.
Modelo TCP/IP
Tiene cuatro capas:
Aplicación
Transporte
Internet
Acceso a la red
Internet utiliza principalmente el modelo TCP/IP, como aparece en tus diapositivas.
3. ¿Qué significa PDU?
PDU significa Protocol Data Unit, es decir, unidad de datos del protocolo.
Cuando se envían datos, el orden es:
Datos → Segmento → Paquete → Trama → Bits
Piensa que cada capa agrega información:
Datos
  ↓
Segmento: se agrega información de Transporte
  ↓
Paquete: se agrega información IP
  ↓
Trama: se agrega información MAC
  ↓
Bits: se transmiten físicamente
Al llegar al destino ocurre lo contrario:
Bits → Trama → Paquete → Segmento → Datos
Ese proceso se llama desencapsulación. Se retiran encabezados hasta que la aplicación puede interpretar la información.
4. Diferencia entre IP y MAC
Dirección IP
- Trabaja en la capa 3.
- Identifica el origen y el destino final.
- Permite que el router enrute el paquete.
Dirección MAC
- Trabaja en la capa 2.
- Identifica dispositivos dentro del enlace local.
- Puede cambiar en cada salto.
Ejemplo:
PC1 → Router → Router → Servidor
Las direcciones IP normalmente se mantienen:
IP origen:  PC1
IP destino: Servidor
Pero las MAC cambian:
Primer enlace:  MAC de PC1 → MAC del router
Segundo enlace: MAC del router → MAC del siguiente router
Último enlace:  MAC del router → MAC del servidor
Por eso, en tu imagen donde la IP destino es 199.10.0.99, pero la PC está en 192.168.10.0/24, el servidor está en otra red. La PC debe enviar la primera trama al gateway/router, no directamente al servidor. Para confirmar una MAC concreta haría falta información adicional.
5. Tipos de comunicación
Tipo	Significado
Unicast	Uno hacia uno
Multicast	Uno hacia un grupo
Broadcast	Uno hacia todos


Ejemplos:
Unicast:    PC → impresora
Multicast:  PC → grupo de dispositivos
Broadcast:  PC → todos los hosts de la red
6. IP y sus características
Según tus diapositivas, IP es:
- Sin conexión: no establece una conexión antes de enviar.
- De mejor esfuerzo: no garantiza la entrega.
- Independiente del medio: puede viajar por cobre, fibra o conexión inalámbrica.
Por eso la respuesta de tu imagen para “¿qué significa best effort?” es:
IP no garantiza la entrega
Resumen para memorizar
Capa 3 = IP y router
Capa 2 = MAC y switch
Capa 1 = bits y medio físico

PDU:
Datos → Segmento → Paquete → Trama → Bits

IP identifica el destino final.
MAC identifica el siguiente salto local.
Comprobación
Responde solamente esto:
En el envío:
PC1 → Router → Servidor
¿Cuál dirección cambia en cada salto: la IP o la MAC?


Worked for 30s



Clase 3: protocolos y medios de transmisión
1. La respuesta anterior
En este recorrido:
PC1 → Router → Servidor
La dirección que cambia en cada salto es la:
MAC
La IP normalmente mantiene el origen y destino final.
2. ¿Qué es un protocolo?
Un protocolo es un conjunto de reglas para que los dispositivos puedan comunicarse.
Para comunicarse deben conocer:
Quién envía
Quién recibe
Qué formato tiene el mensaje
Cuándo se envía
A qué velocidad se envía
Si se necesita confirmación
Por eso, en tus preguntas:
- “Un emisor y un receptor identificados” → requisito de comunicación.
- “Cuánta información y a qué velocidad” → control de flujo o temporización.
- “Codificación, tamaño, formato y temporización” → requisitos de los protocolos.
- “Tipo de cable” → no es un requisito del protocolo.
3. ¿Qué es una suite de protocolos?
Una suite es un grupo de protocolos que trabajan juntos.
Ejemplo de tus diapositivas:
HTTP      → interacción entre navegador y servidor web
TCP       → entrega garantizada y control de flujo
IP        → entrega global desde origen hasta destino
Ethernet  → entrega dentro de la LAN
Cada protocolo cumple una función diferente.
4. ¿Por qué se usan modelos en capas?
Un modelo en capas organiza la red para que sea más fácil entenderla y diseñarla.
Sus beneficios son:
- Los equipos de distintos fabricantes pueden funcionar juntos.
- Un cambio en una capa no obliga a cambiar todas las demás.
- Permite describir las funciones de la red con un lenguaje común.
- Facilita el diseño de protocolos.
Por eso, si una pregunta dice:
“Permite que productos de distintos proveedores trabajen juntos”

la respuesta es:
Interoperabilidad
5. Características de una red confiable
Tus diapositivas presentan cuatro características:
Palabra clave de la pregunta	Respuesta
Crecer sin rediseñar toda la red	Escalabilidad
Reducir el impacto de una falla	Tolerancia a fallas
Priorizar videoconferencias o voz	Calidad de servicio, QoS
Proteger dispositivos y datos	Seguridad


Ejemplos
“Permitir el crecimiento futuro” → Escalabilidad

“Varias rutas para continuar funcionando” → Tolerancia a fallas

“Evitar interrupciones en video y voz” → QoS

“Confidencialidad, integridad y disponibilidad” → Seguridad
En una de tus imágenes aparecía:
¿Qué tipo de tráfico requiere QoS?

La respuesta es:
Videoconferencia
El video y la voz en vivo son sensibles a retrasos y pausas.
6. Medios de transmisión
Cable de cobre
Transmite mediante:
Impulsos eléctricos
Problemas principales:
Atenuación
Interferencia electromagnética
Interferencia de radiofrecuencia
Diafonía o crosstalk
Atenuación significa que la señal se debilita cuando aumenta la distancia.
Por eso, en tu imagen:
“¿Qué problema ocurre cuando aumenta la distancia en cobre?”

La respuesta es:
Atenuación
Fibra óptica
Transmite mediante:
Pulsos de luz
Características:
- Es menos sensible a la atenuación.
- Es inmune a interferencias electromagnéticas.
- Se usa para largas distancias y alto tráfico.
Por eso, las respuestas de tus imágenes son:
Pulsos de luz → Fibra óptica
Inmune a interferencias electromagnéticas → Fibra óptica
Medio inalámbrico
Transmite señales electromagnéticas mediante radiofrecuencia o microondas.
Una WLAN normalmente utiliza un medio compartido:
Solo un dispositivo puede transmitir o recibir a la vez
Por eso la respuesta es:
Medio compartido
Resumen de esta clase
Protocolo = reglas de comunicación

TCP/IP = suite de protocolos

MAC = cambia en cada salto
IP = identifica el destino final

Escalabilidad = crecer
Tolerancia a fallas = resistir fallas
QoS = priorizar tráfico importante
Cobre = electricidad y atenuación
Fibra = luz e inmunidad a interferencias
Wireless = medio compartido
Comprobación
Si una pregunta dice:
“La red debe seguir funcionando aunque falle un enlace y existen rutas alternativas”

¿La respuesta es QoS, escalabilidad o tolerancia a fallas?


Worked for 31s



Clase 4: AND binario para encontrar la red
El AND compara dos bits:
IP	Máscara	Resultado
0	0	0
0	1	0
1	0	0
1	1	1


Solo queda 1 cuando ambos bits son 1.
Ejemplo: 192.168.10.66/24
IP en binario
192       168       10        66
11000000.10101000.00001010.01000010
Máscara /24
255.255.255.0
11111111.11111111.11111111.00000000
Aplicamos AND
11000000.10101000.00001010.01000010
11111111.11111111.11111111.00000000
------------------------------------------------
11000000.10101000.00001010.00000000
El resultado es:
192.168.10.0
Esa es la dirección de red.
La razón intuitiva es:
- Un 255 en la máscara conserva el octeto de la IP.
- Un 0 en la máscara convierte el octeto en 0.
Por eso:
192 AND 255 = 192
168 AND 255 = 168
10  AND 255 = 10
66  AND 0   = 0
Resultado:
192.168.10.0
Ejemplo con /26
Dirección:
172.20.30.150/26
La máscara es:
255.255.255.192
Solo necesitamos trabajar el último octeto:
150 = 10010110
192 = 11000000
Aplicamos AND:
10010110
11000000
--------
10000000
10000000 = 128
Entonces:
Red: 172.20.30.128
Como /26 tiene un bloque de 64 direcciones:
128 + 64 - 1 = 191
Resultado:
Red:          172.20.30.128
Primer host:  172.20.30.129
Último host:  172.20.30.190
Broadcast:    172.20.30.191
Cómo usar tu calculadora con estos valores
En Base-N:
Decimal 150 → Binario 10010110
Decimal 192 → Binario 11000000
Si tu calculadora permite la operación lógica AND, puedes comprobar:
10010110 AND 11000000 = 10000000
Pero para los ejercicios normalmente es más rápido usar:
Salto = 256 - máscara
Para /26:
256 - 192 = 64
Resumen
/24 → máscara 255.255.255.0 → salto 256
/26 → máscara 255.255.255.192 → salto 64
/28 → máscara 255.255.255.240 → salto 16
El AND pone todos los bits de host en cero. Por eso encuentra la red.
Práctica guiada
Resuelve:
10.2.4.20/26
Pistas:
Máscara: 255.255.255.192
Salto: 64
Bloques: 0–63, 64–127, 128–191, 192–255
Indica:
Red:
Broadcast:
Primer host:
Último host:


Worked for 34s



Clase 5: misma red, otra red y gateway
Para resolver este tipo de pregunta siempre compara la porción de red.
Ejemplo 1: misma red
PC1:          192.168.1.110/24
Servidor FTP: 192.168.1.9/24
Con /24, la red son los primeros tres octetos:
PC1:          192.168.1
Servidor:     192.168.1
Ambos tienen la misma red:
192.168.1.0/24
Por eso pueden comunicarse directamente dentro de la LAN.
Ejemplo 2: red diferente
PC1:          192.168.1.10/24
Servidor web: 199.10.0.99
La red del servidor es diferente. Entonces PC1 no envía la trama directamente al servidor.
La envía primero al:
Gateway predeterminado
El gateway normalmente es la interfaz del router conectada a la LAN.
¿Qué cambia y qué permanece?
Cuando el paquete viaja hacia una red remota:
IP origen:       PC1
IP destino:      Servidor web
MAC origen:      cambia en cada enlace
MAC destino:     cambia en cada enlace
En el primer enlace:
MAC de PC1 → MAC del router
En el siguiente enlace:
MAC del router → MAC del siguiente router
La IP de destino sigue siendo la IP del servidor final. La MAC solo identifica el siguiente dispositivo local.
Direcciones especiales
Direcciones privadas
Tus diapositivas muestran estos rangos:
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16
Se usan en redes internas y no se enrutan globalmente por Internet.
Por ejemplo:
192.168.10.66
10.2.4.20
172.20.30.150
son direcciones privadas.
NAT
NAT traduce:
IP privada → IP pública
Normalmente trabaja en el router que conecta la red interna con Internet.
Por eso, en tu imagen:
¿Qué técnica permite traducir una IP privada a pública?

La respuesta es:
NAT
Loopback
La dirección más conocida es:
127.0.0.1
Sirve para que el equipo se pruebe a sí mismo.
Link-local o APIPA
El rango es:
169.254.0.0/16
Windows puede asignar una dirección de este rango cuando no encuentra un servidor DHCP.
Método para cualquier pregunta de subnetting
Sigue siempre este orden:
1. Leer el prefijo
2. Calcular bits de host: 32 - prefijo
3. Convertir a máscara
4. Calcular salto: 256 - octeto de máscara
5. Ubicar la IP en un bloque
6. Identificar red y broadcast
7. Sacar primer y último host
Ejemplo:
10.2.4.20/26
/26 → 255.255.255.192
Salto → 256 - 192 = 64
Bloque → 0–63
Resultado:
Red:          10.2.4.0
Primer host:  10.2.4.1
Último host:  10.2.4.62
Broadcast:    10.2.4.63
Mini prueba
Resuelve:
192.168.1.100/25
Pistas:
/25 = 255.255.255.128
Bloques: 0–127 y 128–255
Indica:
Red:
Broadcast:
Primer host:
Último host:
Y recuerda esta regla:
Misma red → comunicación local
Red diferente → se usa el gateway


Worked for 31s



Clase 6: diseñar subredes
Solución del ejercicio anterior
192.168.1.100/25
/25 equivale a:
255.255.255.128
El salto es:
256 - 128 = 128
Los bloques son:
0–127
128–255
Como 100 está en 0–127:
Red:          192.168.1.0
Primer host:  192.168.1.1
Último host:  192.168.1.126
Broadcast:    192.168.1.127
Cuando piden cierta cantidad de hosts
Ejemplo de una pregunta de tus imágenes:
Se necesitan subredes con 20 hosts.
Buscamos bits de host:
2^4 - 2 = 14
No alcanza.
2^5 - 2 = 30
Sí alcanza.
Entonces necesitamos 5 bits de host:
32 - 5 = /27
La máscara de /27 es:
255.255.255.224
Cada subred /27 tiene:
32 direcciones totales
30 hosts utilizables
Cuando también piden cierta cantidad de subredes
En otra imagen aparece:
Red base: 172.16.10.128/25
Se necesitan 4 subredes
Cada una debe soportar 20 hosts
Ya sabemos que para 20 hosts necesitamos /27.
También podemos comprobar las subredes:
/25 → /27
Se prestan 2 bits:
27 - 25 = 2 bits prestados
Con 2 bits se generan:
2^2 = 4 subredes
El salto de /27 es:
256 - 224 = 32
Las cuatro subredes dentro de la red base son:
Subred	Hosts	Broadcast
172.16.10.128/27	.129 – .158	.159
172.16.10.160/27	.161 – .190	.191
172.16.10.192/27	.193 – .222	.223
172.16.10.224/27	.225 – .254	.255


Por eso una dirección de subred válida puede ser:
172.16.10.160
255.255.255.224
La opción que decía .132 no es una dirección de red válida, porque las redes /27 comienzan cada 32 números:
128, 160, 192, 224
Dos fórmulas diferentes
No las mezcles:
Para calcular subredes
Subredes = 2^s
s = bits prestados para crear subredes.
Para calcular hosts
Hosts utilizables = 2^h - 2
h = bits que quedan para hosts.
Ejemplo de /24 dividido en 4:
s = 2
2^2 = 4 subredes
Quedan:
h = 6
2^6 - 2 = 62 hosts por subred
Regla completa para resolver problemas
1. Identifica la red original.
2. Mira cuántos hosts necesita cada subred.
3. Encuentra h usando 2^h - 2.
4. Calcula el nuevo prefijo: 32 - h.
5. Comprueba cuántas subredes crea.
6. Calcula el salto.
7. Escribe red, hosts y broadcast.
Práctica
Una red:
192.168.20.0/24
debe dividirse en 4 subredes iguales.
Responde:
Nuevo prefijo:
Nueva máscara:
Salto:
¿Cuántas direcciones tendrá cada subred?
¿Cuántos hosts utilizables tendrá cada subred?


Worked for 33s



Solución de la práctica
Red original:
192.168.20.0/24
Se necesitan 4 subredes:
2^2 = 4
Prestamos 2 bits:
/24 + 2 = /26
Entonces:
Nuevo prefijo: /26
Máscara:        255.255.255.192
Salto:          256 - 192 = 64
Cada subred tiene:
2^6 = 64 direcciones
64 - 2 = 62 hosts utilizables
Las subredes son:
192.168.20.0/26
192.168.20.64/26
192.168.20.128/26
192.168.20.192/26
Cómo usar la Casio para binarios
Tu modelo puede ser una variante fx-991LA (a veces se escribe de forma parecida a “911LA PRO”). Si tiene MENU:
1. Presiona MENU.
2. Entra a Base-N.
3. Selecciona Decimal.
4. Escribe 192.
5. Presiona =.
6. Cambia a Binario.
Resultado:
192 = 11000000
Para comprobar una máscara /26:
192 → 11000000
Para /28:
240 → 11110000
Si tu calculadora tiene MODE:
MODE → BASE-N → DEC
Escribes el número decimal, presionas =, y luego eliges BIN.
Importante: primero escribe el número en DEC y después cambia a BIN. Si estás en binario, no puedes escribir directamente 192 porque en binario solo existen los dígitos 0 y 1. La guía oficial de Casio describe este cambio entre Decimal, Binario, Hexadecimal y Octal. Manual oficial Casio
Valores que debes reconocer
0   = 00000000
128 = 10000000
192 = 11000000
224 = 11100000
240 = 11110000
248 = 11111000
252 = 11111100
255 = 11111111
Por eso:
/24 = 255.255.255.0
/25 = 255.255.255.128
/26 = 255.255.255.192
/27 = 255.255.255.224
/28 = 255.255.255.240
/29 = 255.255.255.248
/30 = 255.255.255.252
Prueba corta
Resuelve:
172.20.30.75/26
Pistas:
/26 → salto 64
Bloques: 0–63, 64–127, 128–191, 192–255
Indica:
Red:
Broadcast:
Primer host:
Último host:
La idea más importante:
La IP cae dentro de un bloque.
El inicio del bloque es la red.
El final del bloque es el broadcast.


Worked for 29s



Mini simulacro PC1
Ejemplo resuelto
172.20.30.75/26
/26 significa:
Máscara: 255.255.255.192
Salto: 256 - 192 = 64
Los bloques son:
0–63
64–127
128–191
192–255
75 cae en 64–127.
Por tanto:
Red:          172.20.30.64
Primer host:  172.20.30.65
Último host:  172.20.30.126
Broadcast:    172.20.30.127
Preguntas conceptuales de tus imágenes
1. ¿Qué significa /28?
28 bits de red
32 - 28 = 4 bits de host
Entonces:
2^4 = 16 direcciones totales
2^4 - 2 = 14 hosts utilizables
2. ¿Qué capa realiza el enrutamiento?
Capa 3: Red
La capa 3 utiliza direcciones IP.
3. ¿Qué dirección cambia en cada salto?
MAC
La IP normalmente conserva el origen y destino final.
4. ¿Qué ocurre si el destino está en otra red?
La PC envía la primera trama al:
Gateway predeterminado o router
5. ¿Cuál es el orden de las PDU?
Datos → Segmento → Paquete → Trama → Bits
6. ¿Qué significa “best effort”?
IP no garantiza la entrega
7. ¿Qué tráfico requiere QoS?
Videoconferencia o voz en vivo
8. ¿Qué medio utiliza pulsos de luz?
Fibra óptica
9. ¿Qué problema aparece al aumentar la distancia en cobre?
Atenuación
10. ¿Qué técnica convierte una IP privada en pública?
NAT
Ahora intenta tú
No mires la respuesta hasta terminar.
Pregunta A
192.168.50.140/28
Calcula:
Máscara:
Red:
Primer host:
Último host:
Broadcast:
Hosts utilizables:
Pista:
/28 → máscara 255.255.255.240
Salto 16
Pregunta B
Una red:
172.20.30.0/24
se divide en 4 subredes iguales.
Calcula:
Nuevo prefijo:
Máscara:
Salto:
Hosts utilizables por subred:
Pregunta C
En una comunicación:
PC1 → Router → Servidor web
¿Qué cambia en cada salto?
IP o MAC
Respuestas para comprobar
A
192.168.50.140
está en el bloque 128–143:
Máscara:       255.255.255.240
Red:           192.168.50.128
Primer host:   192.168.50.129
Último host:   192.168.50.142
Broadcast:     192.168.50.143
Hosts:         14
B
4 subredes → se prestan 2 bits
/24 + 2 = /26
Prefijo:       /26
Máscara:       255.255.255.192
Salto:         64
Hosts:         62 por subred
C
Cambia la MAC.
La IP normalmente permanece con el origen y destino final.


Worked for 54s



Banco de preguntas de tus imágenes
IPv4 y subnetting
Tema	Respuesta	Cómo reconocerla
IPv4	32 bits	4 octetos de 8 bits
/28	16 direcciones, 14 hosts	32−28=4; 2^4=16; 16−2=14
192.168.10.66/25 broadcast	192.168.10.127	/25 divide en 0–127 y 128–255
/24 dividido en 4	/26	Se prestan 2 bits: 2^2=4
/24 dividido en 4	62 hosts por subred	/26 deja 6 bits: 2^6−2=62
Rango incorrecto en /26	El que termina en .255	.255 es broadcast
20 hosts	/27	/28 solo da 14; /27 da 30


Ejemplo de la imagen:
172.20.30.0/24 dividido en 4
Resultado:
172.20.30.0/26     hosts .1–.62       broadcast .63
172.20.30.64/26    hosts .65–.126     broadcast .127
172.20.30.128/26   hosts .129–.190    broadcast .191
172.20.30.192/26   hosts .193–.254    broadcast .255
El rango:
172.20.30.193–172.20.30.255
es incorrecto porque incluye el broadcast .255.
Capas y encapsulación
Pregunta	Respuesta
¿Qué significa PDU?	Protocol Data Unit
Orden de las PDU	Datos → Segmento → Paquete → Trama → Bits
Capa que enruta	Capa 3, Red
Capa que convierte trama en bits	Capa 1, Física
Control de flujo y errores extremo a extremo	Capa 4, Transporte
Desencapsulación	Se eliminan encabezados
Decodificación	Se interpreta la información recibida
Modelo usado actualmente en Internet	TCP/IP
Beneficio del modelo en capas	Interoperabilidad entre fabricantes


Modelo OSI de capa 7 a capa 1
Aplicación
Presentación
Sesión
Transporte
Red
Enlace de datos
Física
Memoriza la función principal:
Red       = IP y enrutamiento
Enlace    = MAC y tramas
Física    = bits
Transporte= control de flujo y errores
IP, MAC y gateway
Situación	Respuesta
Dirección que cambia en cada salto	MAC
Dirección que normalmente permanece	IP
Destino en otra red	Se usa el gateway
Dispositivo que funciona como gateway	Router
IP de destino remoto	Permanece como destino final
MAC del primer enlace hacia otra red	MAC del router/gateway


Ejemplo:
PC1 → Router → Servidor
Las IP identifican:
PC1 → Servidor final
Las MAC identifican cada enlace:
PC1 → Router
Router → siguiente dispositivo
Por eso, si una pregunta da una MAC de destino pero no proporciona la MAC del gateway, no se puede asegurar que esa sea la MAC correcta del servidor.
Tipos de comunicación
Unicast   = uno hacia uno
Multicast = uno hacia un grupo
Broadcast = uno hacia todos
Si la pregunta dice “enviar a todos los hosts”, responde:
Broadcast
Protocolos y características de red
Palabra clave	Respuesta
Crecer sin rediseñar la infraestructura	Escalabilidad
Continuar funcionando ante fallas	Tolerancia a fallas
Priorizar videoconferencia o voz	QoS
Traducir IP privada a pública	NAT
IP no garantiza entrega	Best effort
Requisito básico	Emisor y receptor identificados
Cantidad y velocidad de información	Control de flujo / temporización
Algo que no es requisito de protocolo	Tipo de cable


Medios físicos
Medio	Característica
Cobre	Impulsos eléctricos
Cobre a mayor distancia	Atenuación
Fibra óptica	Pulsos de luz
Fibra óptica	Inmune a interferencias electromagnéticas
Inalámbrico	Señales electromagnéticas
WLAN	Medio compartido


Lo que debes estudiar primero
No intentes memorizar las 30 respuestas aisladas. Aprende estas cinco reglas:
1. IPv4 tiene 32 bits.
2. Bits de host = 32 - prefijo.
3. Direcciones = 2^bits de host.
4. Hosts utilizables = direcciones - 2.
5. Red = inicio del bloque; broadcast = final del bloque.
Y estas cinco asociaciones:
IP    → capa 3
MAC   → capa 2
Bits  → capa 1
Router→ conecta redes
NAT   → privada a pública
Mini prueba final de este bloque
Resuelve sin mirar:
192.168.40.200/26
Indica:
Red:
Primer host:
Último host:
Broadcast:
Pista:
/26 → salto 64
Bloques: 0–63, 64–127, 128–191, 192–255


Worked for 27s



Clase 7: decimal y binario
Solución del ejercicio
192.168.40.200/26
/26:
Máscara: 255.255.255.192
Salto: 256 - 192 = 64
Bloques:
0–63
64–127
128–191
192–255
200 pertenece al bloque 192–255.
Red:          192.168.40.192
Primer host:  192.168.40.193
Último host:  192.168.40.254
Broadcast:    192.168.40.255
Convertir 200 a binario
Usamos los valores de cada posición:
128  64  32  16  8  4  2  1
Para formar 200:
200 = 128 + 64 + 8
Colocamos 1 donde usamos el valor:
128  64  32  16  8  4  2  1
  1   1   0   0  1  0  0  0
Entonces:
200 = 11001000
La máscara 192 es:
192 = 128 + 64
192 = 11000000
AND binario
IP:      11001000   = 200
Máscara: 11000000   = 192
         --------
Resultado 11000000   = 192
Por eso la red termina en:
192.168.40.192
Cómo hacerlo en la Casio
Si tu calculadora tiene MENU:
MENU → Base-N → Decimal
Luego:
200 → =
Después cambia el sistema a:
Binario
Debe mostrar:
11001000
Para regresar a decimal:
Binario → 11001000 → =
Cambiar a Decimal
Resultado:
200
Si tiene MODE:
MODE → BASE-N → DEC
Escribes 200, presionas =, y luego eliges BIN.
Si el modelo realmente dice fx-911LAPRO y no encuentras Base-N, envíame una foto de la calculadora completa. Casio tiene variantes LA PLUS y LA CW con menús diferentes, y así te indicaré las teclas exactas.
Valores indispensables para subnetting
128 = 10000000
192 = 11000000
224 = 11100000
240 = 11110000
248 = 11111000
252 = 11111100
255 = 11111111
Estos valores corresponden a:
/25 → 128
/26 → 192
/27 → 224
/28 → 240
/29 → 248
/30 → 252
Práctica
Convierte con tu calculadora:
224
240
248
Después dime qué resultado binario aparece para cada uno.


Worked for 26s



Clase 8: leer una IPv4 completa en binario
Los valores son:
224 = 11100000
240 = 11110000
248 = 11111000
Una dirección como:
192.168.10.66
en binario es:
192 = 11000000
168 = 10101000
10  = 00001010
66  = 01000010
Por tanto:
11000000.10101000.00001010.01000010
Cada grupo siempre debe tener 8 bits. Si la calculadora muestra 1000010 para 66, agregas un cero a la izquierda:
1000010 → 01000010
Ejemplo con /28
192.168.10.66/28
Máscara:
255.255.255.240
11111111.11111111.11111111.11110000
Los últimos 4 bits son de host:
IP:      01000010
Máscara: 11110000
El salto es:
256 - 240 = 16
El 66 cae en el bloque 64–79:
Red:          192.168.10.64
Primer host:  192.168.10.65
Último host:  192.168.10.78
Broadcast:    192.168.10.79
Cómo saber qué método usar
Si te dan una IP y prefijo
Ejemplo:
10.6.50.60/27
Usa:
/27 → 255.255.255.224
Salto → 256 - 224 = 32
Si te piden cuántos hosts
h = 32 - prefijo
hosts = 2^h - 2
Si te piden dividir en subredes
Subredes = 2^bits prestados
Si te piden “ANDing”
Convierte IP y máscara a binario y aplica:
1 AND 1 = 1
Todo lo demás = 0
Simulacro corto
Resuelve sin mirar la respuesta:
1
10.6.50.60/27
Calcula:
Red:
Broadcast:
Primer host:
Último host:
2
192.168.1.0/28
¿Cuántas direcciones totales y cuántos hosts utilizables tiene?
3
¿Qué PDU se forma después del segmento?
Datos → Segmento → ______
4
Si el destino está en otra red, ¿a qué dispositivo se envía primero la trama?
5
¿Qué dirección cambia en cada salto, IP o MAC?
Respuestas clave para comprobar:
/27 → salto 32 → 30 hosts utilizables
/28 → 16 direcciones → 14 hosts
Segmento → Paquete
Otra red → Gateway/router
Cambia → MAC


Worked for 49s



Simulacro integrado de PC1
Intenta responder primero y luego revisa la solución.
1. Subnetting
Para:
192.168.50.140/28
Calcula:
Red:
Primer host:
Último host:
Broadcast:
Hosts utilizables:
2. Direcciones totales
¿Cuántas direcciones totales y hosts utilizables tiene una /27?
3. División de subredes
Una red /24 se divide en 4 subredes iguales.
Indica:
Nuevo prefijo:
Máscara:
Salto:
Hosts utilizables por subred:
4. Encapsulación
Completa:
Datos → Segmento → ______ → Trama → Bits
5. Capas
¿Qué capa realiza el enrutamiento?
6. IP y MAC
En este recorrido:
PC1 → Router → Servidor
¿Qué dirección cambia en cada salto?
7. Destino remoto
Si el servidor está en otra red, ¿a qué dispositivo envía primero la PC la trama?
8. Comunicación
Relaciona:
Uno hacia uno:
Uno hacia un grupo:
Uno hacia todos:
9. IP
¿Qué significa que IP funcione con “mejor esfuerzo”?
10. Medios
Responde:
Pulsos de luz:
Problema del cobre al aumentar la distancia:
Soluciones explicadas
1
192.168.50.140/28
/28:
Máscara: 255.255.255.240
Salto: 256 - 240 = 16
Bloques cercanos:
128–143
144–159
El número 140 está en 128–143.
Red:          192.168.50.128
Primer host:  192.168.50.129
Último host:  192.168.50.142
Broadcast:    192.168.50.143
Hosts:        14
2
/27 → 5 bits de host
2^5 = 32 direcciones
32 - 2 = 30 hosts utilizables
3
Para obtener 4 subredes:
2^2 = 4
Se prestan 2 bits:
/24 + 2 = /26
Prefijo: /26
Máscara: 255.255.255.192
Salto: 64
Hosts: 2^6 - 2 = 62
4
Datos → Segmento → Paquete → Trama → Bits
5
Capa 3: Red
6
La MAC cambia.
La IP normalmente conserva el origen y el destino final.
7
Al gateway predeterminado o router.
8
Uno hacia uno    → Unicast
Uno hacia grupo  → Multicast
Uno hacia todos  → Broadcast
9
IP no garantiza la entrega del paquete.
No espera confirmaciones ni retransmite por sí mismo.
10
Pulsos de luz       → Fibra óptica
Distancia en cobre  → Atenuación
Fórmula que debes llevar a la práctica
IPv4 = 32 bits

Bits de host = 32 - prefijo

Direcciones totales = 2^(bits de host)

Hosts utilizables = 2^(bits de host) - 2

Salto = 256 - valor de la máscara
Ya tienes una guía basada en tus diapositivas SEM02, SEM03 y las preguntas que enviaste. En la Casio, usa Base-N: introduce el número en decimal y cambia a binario. Si el modelo no muestra ese menú, una foto frontal de la calculadora permitirá indicar las teclas exactas.
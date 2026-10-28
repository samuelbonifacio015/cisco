# Conceptos y errores típicos por etapa

## Test inicial (5 preguntas, una a una)
1. ¿Qué diferencia hay entre un puerto access y uno trunk? (access = una VLAN sin etiqueta; trunk = varias VLAN con etiqueta 802.1Q.)
2. Escribe los comandos para crear la VLAN 667 "SuperBestias" y verificar. (`vlan 667` / `name SuperBestias` / `show vlan brief`.)
3. Dos PCs en VLANs distintas del mismo switch: ¿se ven? ¿qué falta? (No sin un dispositivo de capa 3: router-on-a-stick o SVI.)
4. ¿Qué dos cosas deben coincidir entre la sub-interfaz del router y la PC? (La IP de la sub-interfaz = gateway de la PC; `encapsulation dot1Q N` = VLAN de la PC.)
5. Dos routers por serial: ¿qué lado lleva `clock rate` y por qué? (El DCE; da la temporización del enlace.)

Interpretación: 0–1 aciertos → etapa 1; 2–3 → etapa 2/3; 4 → etapa 4; 5 → salta a etapas 6–7 y simulacro.

## Etapas
- **1 VLAN.** Concepto: dominio de broadcast lógico; rango normal 1–1005, guardada en `vlan.dat`. Error: crear la VLAN pero no asignar puertos; `show vlan brief` la muestra sin puertos.
- **2 Access + IP.** Concepto: un puerto access pertenece a una VLAN; el gateway es la IP del router/SVI de esa VLAN. Error: puerto en VLAN 1 (por default) o gateway distinto de la sub-interfaz; PC con máscara equivocada.
- **3 Trunk.** Concepto: enlace entre switches/router que lleva varias VLAN con 802.1Q. Error: trunk en un solo extremo; olvidar `trunk encapsulation dot1q` en 3560; no crear las VLAN en el switch nuevo; VLAN no permitida en `allowed vlan`.
- **4 Router-on-a-stick.** Concepto: una interfaz física con una sub-interfaz por VLAN; el router rutea entre ellas. Error: `no shutdown` solo en la sub-interfaz y no en `gig0/0`; `dot1Q` con VLAN equivocada; no hacer trunk el puerto del switch hacia el router.
- **5 SVI.** Concepto: `interface vlan N` actúa como gateway; requiere `ip routing`. Error: olvidar `ip routing`; SVI en "down" porque la VLAN no existe o no hay puertos activos.
- **6 WiFi.** Concepto: SSID + WPA2-PSK; laptop necesita módulo inalámbrico. Error: laptop con NIC cableada; clave distinta; seguridad distinta entre AP y laptop.
- **7 Serial.** Concepto: enlace punto a punto /30 con DCE/DTE. Error: sin `clock rate` en DCE; olvidar `no shutdown`; falta módulo serial; IP en redes distintas.

## Check "sin ayuda" (todas las etapas)
El estudiante hace la tarea en Packet Tracer y pega la salida de verificación (`show vlan brief`, `show interfaces trunk`, `show ip interface brief`, `ping`). El tutor valida línea por línea.

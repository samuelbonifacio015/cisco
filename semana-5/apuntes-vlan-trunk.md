# Semana 5 — VLANs y trunk en Packet Tracer (apuntes)

Ejercicio: `jueves/ejercicio 2026-2 router on stick v0.pkt`. Dos switches 2960 unidos por un cable, cada uno con PCs en dos VLANs.

## Los 4 pasos globales (pizarra del profesor)

| Paso | Qué | Dónde | Comando clave |
|---|---|---|---|
| 1 | Crear **todas** las VLANs en **TODOS** los switches | Cada switch | `vlan <id>` → `name <nombre>` |
| 2 | Asignar los puertos **access** a sus VLANs, en **TODOS** los switches | Puertos hacia PCs | `switchport mode access` + `switchport access vlan <id>` |
| 3 | Crear las interfaces **trunk** | Puertos entre switches (y hacia el router) | `switchport mode trunk` |
| 4 | **Inter-VLAN** | Router o switch capa 3 | Router-on-a-stick **o** SW L3 |

Los pasos 1–3 permiten el ping dentro de una misma VLAN. El paso 4 es lo que permite comunicar VLANs distintas.

## Topología del ejercicio

| Switch | Puerto | Dispositivo | VLAN | IP |
|---|---|---|---|---|
| Switch2(1) | Fa0/6 | PC4 | 67 | 192.168.10.2/24 |
| Switch2(1) | Fa0/2 | PC0(1) | 67 | 192.168.10.3/24 |
| Switch2(1) | Fa0/3 | PC1(1) | 666 | 192.168.20.2/24 |
| Switch2(1) | Fa0/1 | → Switch3(1) | trunk | — |
| Switch3(1) | Fa0/2 | PC2(1) | 666 | 192.168.20.3/24 |
| Switch3(1) | Fa0/3 | PC3(1) | 67 | 192.168.10.4/24 |
| Switch3(1) | Fa0/7 | PC5 | 666 | 192.168.20.4/24 |
| Switch3(1) | Fa0/1 | → Switch2(1) | trunk | — |

VLAN 67 = `cisco` (192.168.10.0/24) · VLAN 666 = `packet` (192.168.20.0/24).

> Los puertos Fa0/2–Fa0/3 de Switch2 y Fa0/3–Fa0/7 de Switch3 se leyeron de etiquetas muy juntas: confirmar pasando el mouse por el cable.

## Qué se configura dónde

| Dónde | Qué | Cómo |
|---|---|---|
| Switch (pestaña **CLI**) | Crear VLANs, asignar puertos, trunk | Comandos IOS |
| PC (**Desktop → IP Configuration → Static**) | IP, máscara, gateway | Formulario |

Una PC no sabe en qué VLAN está: lo decide el puerto del switch donde se conecta.

## Comandos — Switch2(1)

```
enable
configure terminal
no vlan 20
vlan 67
 name cisco
vlan 666
 name packet
exit
interface fa0/6
 switchport mode access
 switchport access vlan 67
interface fa0/2
 switchport mode access
 switchport access vlan 67
interface fa0/3
 switchport mode access
 switchport access vlan 666
interface fa0/1
 switchport mode trunk
end
```

`no vlan 20` borra una VLAN creada por error (ver errores abajo).

## Comandos — Switch3(1)

```
enable
configure terminal
vlan 67
 name cisco
vlan 666
 name packet
exit
interface fa0/2
 switchport mode access
 switchport access vlan 666
interface fa0/3
 switchport mode access
 switchport access vlan 67
interface fa0/7
 switchport mode access
 switchport access vlan 666
interface fa0/1
 switchport mode trunk
end
```

## Verificación

| Comando | Qué debe mostrar |
|---|---|
| `show vlan brief` | Cada puerto de PC bajo su VLAN (67 / 666). Los trunk **no** aparecen aquí |
| `show vlan id 666` | Si la VLAN existe; si no: `VLAN id 666 not found` |
| `show interfaces trunk` | Fa0/1 en `trunking`, VLANs permitidas `1,67,666` |
| `show interfaces status` | Qué puertos están `connected` |
| `ping` desde la PC | Misma VLAN → responde. VLAN distinta → **no** responde (falta router) |

Dentro de `(config)#` los `show` llevan `do` delante: `do show vlan brief`.

## Conceptos clave

- **`interface fa0/18`** = *qué puerto* configuro. **`switchport access vlan 666`** = *a qué VLAN* lo meto. El número final es la VLAN, no el puerto.
- **Access**: puerto de una sola VLAN (va a una PC). **Trunk**: puerto que transporta varias VLANs (entre switches o hacia el router).
- El trunk **no crea** VLANs en el otro switch: hay que crearlas en ambos con el mismo número.
- En el 2960 basta `switchport mode trunk` (solo usa 802.1Q, no pide `encapsulation`).
- Las PCs de una misma VLAN deben estar en la misma red IP.
- Entre VLANs distintas no hay comunicación sin router (**router-on-a-stick**) o switch capa 3. El gateway de la PC (normalmente `.1`) se usa recién ahí.
- VLANs 1002–1005 (`fddi-default`, `token-ring-default`…) vienen de fábrica; se ignoran.

## Errores que me pasaron

| Síntoma | Causa | Solución |
|---|---|---|
| `interface 0/18` → `% Invalid input detected` | Falta el tipo de puerto | `interface fastEthernet 0/18` o `int fa0/18` |
| `% Access VLAN does not exist. Creating vlan 18` | Puse el nº de puerto como nº de VLAN; el switch creó la VLAN 18 | `switchport access vlan <VLAN correcta>` y `no vlan 18` |
| `Translating "666"...domain server` y se cuelga | Escribí algo que no es comando y lo busca por DNS | `Ctrl+Shift+6`; prevenir con `no ip domain-lookup` |
| `configure end` → `Invalid input` | Comando inexistente | `configure terminal` para entrar, `end` para salir |
| Mensajes `%LINK-5-CHANGED` interrumpen lo que escribo | Logs en consola | `line console 0` → `logging synchronous` (o `no logging console`) |

## Trucos de Packet Tracer

- Ver puertos en los cables: **Options → Preferences → Interface → Always Show Port Labels in Logical Workspace**. O dejar el mouse sobre el cable.
- Salir de `(config-if)#`: `exit` sube un nivel, `end` o `Ctrl+Z` vuelve a `Switch#`.
- Abreviaturas: `sh vl br`, `int fa0/1`, `int range fa0/1 - 2`.

---

# Ejercicio 2 — Router-on-a-stick (4 pasos completos)

Router 1841 conectado por su Fa0/0 al Fa0/23 del switch izquierdo. Los dos switches se unen por Fa0/1 ↔ Fa0/1.

| Dispositivo | Puerto | Conecta a | VLAN | IP / gateway |
|---|---|---|---|---|
| Switch izq. | Fa0/2 | PC0 | 92 | 192.168.10.2 / gw 192.168.10.1 |
| Switch izq. | Fa0/3 | PC1 | 93 | 192.168.20.2 / gw 192.168.20.1 |
| Switch izq. | Fa0/1 | Switch der. | trunk | — |
| Switch izq. | Fa0/23 | Router Fa0/0 | trunk | — |
| Switch der. | Fa0/2 | PC2 | 93 | 192.168.20.3 / gw 192.168.20.1 |
| Switch der. | Fa0/3 | PC3 | 92 | 192.168.10.3 / gw 192.168.10.1 |
| Switch der. | Fa0/1 | Switch izq. | trunk | — |
| Router | Fa0/0.92 | VLAN 92 | 92 | 192.168.10.1/24 |
| Router | Fa0/0.93 | VLAN 93 | 93 | 192.168.20.1/24 |

## Switch izquierdo (pasos 1–3)

```
enable
configure terminal
vlan 92
vlan 93
exit
interface fa0/2
 switchport mode access
 switchport access vlan 92
interface fa0/3
 switchport mode access
 switchport access vlan 93
interface fa0/1
 switchport mode trunk
interface fa0/23
 switchport mode trunk
end
```

## Switch derecho (pasos 1–3)

```
enable
configure terminal
vlan 92
vlan 93
exit
interface fa0/2
 switchport mode access
 switchport access vlan 93
interface fa0/3
 switchport mode access
 switchport access vlan 92
interface fa0/1
 switchport mode trunk
end
```

## Router (paso 4: router-on-a-stick)

```
enable
configure terminal
interface fa0/0
 no shutdown
interface fa0/0.92
 encapsulation dot1Q 92
 ip address 192.168.10.1 255.255.255.0
interface fa0/0.93
 encapsulation dot1Q 93
 ip address 192.168.20.1 255.255.255.0
end
```

- Una **subinterfaz** (`fa0/0.92`) por VLAN; `encapsulation dot1Q <vlan>` la asocia a esa VLAN; su IP es el gateway de la VLAN.
- `no shutdown` va en la interfaz física `fa0/0`: los puertos del router vienen apagados (triángulos rojos en el cable).
- El puerto del switch hacia el router debe ser **trunk**.

## Verificación

- `show ip interface brief` en el router → `Fa0/0`, `Fa0/0.92` y `Fa0/0.93` en `up/up`.
- `show interfaces trunk` en el switch izquierdo → Fa0/1 y Fa0/23.
- Ping PC0 → PC3 (misma VLAN) y PC0 → PC1 (inter-VLAN, pasa por el router). El primer ping puede perder un paquete por ARP.

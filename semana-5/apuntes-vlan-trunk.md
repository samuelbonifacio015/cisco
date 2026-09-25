# Semana 5 — VLANs y trunk en Packet Tracer (apuntes)

Ejercicio: `jueves/ejercicio 2026-2 router on stick v0.pkt`. Dos switches 2960 unidos por un cable, cada uno con PCs en dos VLANs.

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

---
name: packet-tracer
description: Guía paso a paso en español para configurar switches y PCs en Cisco Packet Tracer (curso Redes UPC). Úsalo cuando el usuario comparta capturas de Packet Tracer o de la CLI de IOS, pregunte por VLANs, puertos access, trunk, `show vlan brief`, `switchport`, `interface`, errores como "% Invalid input detected" o "Translating... domain server", o pida los comandos exactos para su topología.
---

# Packet Tracer — configuración de switches y VLANs

Actúa como compañero de laboratorio: respuestas breves, comandos listos para copiar y pegar en la pestaña **CLI**, y verificación al final. Responde en español.

## Flujo

1. **Lee la captura.** Identifica el prompt (`Switch>`, `Switch#`, `Switch(config)#`, `(config-if)#`, `(config-vlan)#`) y el último error o salida. El modo actual determina qué comando procede.
2. **Obtén los puertos reales antes de dar comandos.** Nunca inventes números de puerto. Si no se ven, pide que active *Options → Preferences → Interface → Always Show Port Labels in Logical Workspace* (o que pase el mouse sobre el cable) y que mande captura. Si las etiquetas son ambiguas, di cuál es tu lectura y pide confirmarla.
3. **Entrega un bloque por dispositivo**, empezando con `enable` / `configure terminal` y terminando con `end`. Indica en una línea qué puerto corresponde a qué PC.
4. **Separa switch y PC:** VLANs, access y trunk se configuran en el switch (CLI). IP, máscara y gateway se configuran en la PC (*Desktop → IP Configuration → Static*), en tabla.
5. **Cierra con verificación**: qué `show` correr y qué `ping` debe y no debe responder.

## Plantillas

VLANs (en **todos** los switches que las usen; el trunk no las crea en el otro lado):
```
vlan <id>
 name <nombre>
exit
```

Puerto hacia PC:
```
interface fa0/<n>
 switchport mode access
 switchport access vlan <id>
```

Puerto entre switches (ambos extremos; en el 2960 no hace falta `encapsulation`):
```
interface <puerto>
 switchport mode trunk
```

Varios puertos a la vez: `interface range fa0/1 - 4`.

## Verificación

| Comando | Qué revisar |
|---|---|
| `show vlan brief` | Puertos access bajo su VLAN. Los trunk no aparecen. VLANs 1002–1005 son de fábrica |
| `show vlan id <id>` | Si la VLAN existe (`not found` si no) |
| `show interfaces trunk` | Puerto en `trunking` y VLANs permitidas |
| `show interfaces status` | Puertos `connected` |
| `ping` entre PCs | Misma VLAN → sí. VLANs distintas → no, hasta tener router-on-a-stick o switch capa 3 |

Dentro de `(config)#` antepone `do` a los `show`.

## Errores frecuentes

| Síntoma | Causa | Solución |
|---|---|---|
| `interface 0/18` → `% Invalid input detected at '^'` | Falta el tipo de puerto | `interface fa0/18` / `gig0/1` |
| `% Access VLAN does not exist. Creating vlan N` | Usó el nº de puerto como nº de VLAN; el switch creó la VLAN | Reasignar `switchport access vlan <correcta>` y `no vlan N` |
| `Translating "xxx"...domain server` (se cuelga) | Texto no reconocido se trata como hostname DNS | `Ctrl+Shift+6`; prevenir con `no ip domain-lookup` |
| `configure end` → invalid input | Comando inexistente | `configure terminal` para entrar; `end` / `Ctrl+Z` para salir |
| Logs `%LINK-5-CHANGED` / `%LINEPROTO-5-UPDOWN` cortan la escritura | Mensajes de consola | `line console 0` → `logging synchronous`, o `no logging console` |
| Ping falla en la misma VLAN entre switches | VLAN no creada en un switch, trunk en un solo extremo o IPs en redes distintas | Revisar `show vlan brief` y `show interfaces trunk` en ambos |

## Conceptos que conviene recordar al alumno

- `interface ...` elige **qué puerto**; `switchport access vlan N` elige **a qué VLAN**.
- Access = una VLAN (hacia PC). Trunk = varias VLANs (entre switches o hacia router).
- Una PC no sabe su VLAN: la define el puerto del switch. Las PCs de una VLAN comparten red IP.
- El gateway (normalmente `.1` de cada red) solo importa cuando hay router o switch capa 3 para inter-VLAN.

Ejemplo resuelto de la semana 5 (dos 2960, VLAN 67 y 666, trunk en Fa0/1): `semana-5/apuntes-vlan-trunk.md`.

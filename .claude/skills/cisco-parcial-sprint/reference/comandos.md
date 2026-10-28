# Comandos por tarea (Cisco IOS / Packet Tracer)

Fuente: PPTs de Felix (SEM05 e INTERVLAN) salvo lo marcado **[fuera de PPTs]**.

## Modos
`enable` → `configure terminal` → `interface ...` / `vlan ...`; `end` vuelve a privilegiado; `exit` sube un nivel.

## T4 — VLANs (etapa 1)
```
Switch(config)# vlan 667
Switch(config-vlan)# name SuperBestias
Switch(config-vlan)# end
Switch# show vlan brief
Switch# show interface fa0/18 switchport
```
Borrar: `no vlan 667` (primero reasignar sus puertos). Sin `name`, IOS pone `VLAN0667`.

## T3 — IP en PCs y puertos access (etapa 2)
PC → Desktop → IP Configuration (estática):
- Prueba1: `192.168.69.10` / `255.255.255.0` / gateway `192.168.69.1`
- Prueba2: `192.168.69.11` / `255.255.255.0` / gateway `192.168.69.1`
```
Switch(config)# interface fa0/10
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 667
```
Para sacar un puerto de la VLAN: `no switchport access vlan`. Verifica con `show vlan brief`.

## T6 — Trunk (etapa 3)
```
Switch(config)# interface fa0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan all      ! default; para sumar una: allowed vlan add 667
Switch# show interfaces trunk
Switch# show interface fa0/1 switchport
```
- **3560**: antes de `mode trunk` → `switchport trunk encapsulation dot1q`.
- **2960**: no lleva ese comando.
- Hacer trunk en **ambos** extremos. Mismo native VLAN en ambos lados (default 1).
- El switch nuevo debe tener **las mismas VLANs creadas** (`vlan N` + `name`), si no, el tráfico se pierde (no hay VTP en estos ejercicios).
- Puertos de PCs en el switch nuevo: `switchport mode access` + `switchport access vlan N`.

## T5 — Inter-VLAN con router-on-a-stick (etapa 4, variante A)
Switch: puertos de PCs en 667 (access) y enlace al router en **trunk** (permitir 667).
```
Router(config)# interface gig0/0
Router(config-if)# no shutdown
Router(config)# interface gig0/0.667
Router(config-subif)# encapsulation dot1Q 667
Router(config-subif)# ip address 192.168.69.1 255.255.255.0
```
Las sub-interfaces existentes de la sede (p. ej. `.21` con `10.142.46.1/24`) no se tocan. Verifica: `show ip interface brief`, `show ip route` (debe aparecer `192.168.69.0/24` conectada) y `ping` de PC Prueba1 a una PC de otra VLAN.
El gateway de las PCs (192.168.69.1) **debe coincidir** con la IP de la sub-interfaz.

## T5 — Variante B (misma VLAN de la sede)
Poner las PCs en la VLAN existente (p. ej. `switchport access vlan 21`) con IP de esa red (`10.142.46.x`, gateway `10.142.46.1`). Sin ruteo extra, pero **no** usa 192.168.69.0/24.

## Etapa 5 — Switch capa 3 (SVI), contexto Lima
```
Switch(config)# interface vlan 15
Switch(config-if)# ip address 10.142.41.129 255.255.255.128
Switch(config-if)# no shutdown
Switch(config)# ip routing
Switch(config)# interface gi1/0/1
Switch(config-if)# no switchport              ! puerto enrutado hacia el router
Switch(config-if)# ip address <ip> <máscara>
```
La VLAN debe existir y tener al menos un puerto activo para que la SVI levante.

## T1 — AP WiFi y laptop **[fuera de PPTs]**
- AP: dispositivo Access-PT. Cable al switch (copper straight-through) en un puerto access.
- AP → pestaña Config → Port 1 (Wireless): **SSID** `Fieles`, **Authentication** WPA2-PSK, **PSK Pass Phrase** (clave elegida), cifrado AES.
- Laptop: apagarla, quitar el módulo cableado, insertar **WPC300N**, encenderla.
- Laptop → Config → Wireless0: SSID `Fieles`, WPA2-PSK, misma clave. Debe aparecer línea punteada de asociación al AP.
- IP por DHCP si la VLAN lo ofrece; si no, estática en la red de la VLAN del AP. Verifica con `ping` desde Command Prompt.

## T2 — Dos routers por serial **[fuera de PPTs]**
- Cada router necesita módulo serial (p. ej. HWIC-2T en 2911): apagar, insertar, encender.
- Cable **Serial DCE**: un extremo (DCE) y otro (DTE). El lado DCE lleva reloj.
```
R_A(config)# interface serial0/0/0
R_A(config-if)# ip address 10.142.36.1 255.255.255.252
R_A(config-if)# clock rate 64000          ! solo en el extremo DCE
R_A(config-if)# no shutdown
R_B(config)# interface serial0/0/0
R_B(config-if)# ip address 10.142.36.2 255.255.255.252
R_B(config-if)# no shutdown
R# show ip interface brief
R_A# ping 10.142.36.2
```
Usa una /30 libre (la WAN del caso está en `10.142.36.0/22`; evita las ya usadas). Si el enlace está en rojo, falta `no shutdown` o `clock rate`.

## Guardar
`copy running-config startup-config` (o `write`).

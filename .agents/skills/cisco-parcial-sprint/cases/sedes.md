# Caso Grupo 2 — sucursales (Hito 1)

Fuente: `Exposicion_Hito1_Grupo2.pptx`. WAN en estrella desde Lima, enlaces seriales /30 dentro de `10.142.36.0/22`. Cada sucursal: switch central 2960 + 4 switches de acceso, router 2911 con router-on-a-stick sobre `Gi0/0` (troncal desde el switch central). VLAN IDs iguales en todas las sedes: **3, 9, 21, 45**.

## La Libertad (caso guiado)

| Área | VLAN | Red | Gateway* |
|---|---|---|---|
| Administración | 3 | 10.142.44.0/23 | 10.142.44.1 |
| Ventas | 21 | 10.142.46.0/24 | 10.142.46.1 (en el Hito) |
| Logística | 9 | 10.142.47.0/25 | 10.142.47.1 |
| Servidores | 45 | 10.142.47.128/29 | 10.142.47.129 |

\*Convención usada en el Hito: gateway = primer host (confirmado para Ventas). Verifica el resto en el `.pka`.

Ejemplos de sub-interfaz en el router:
```
interface gig0/0.21
 encapsulation dot1Q 21
 ip address 10.142.46.1 255.255.255.0
```
Tarea 5 (variante A) en esta sede: agregar `gig0/0.667` con `192.168.69.1/24`; la red 192.168.69.0/24 no se solapa con `10.142.x`.

## Las 4 sedes (Administración · Ventas · Logística · Servidores)

| Sede | Admin V3 | Ventas V21 | Logística V9 | Servidores V45 |
|---|---|---|---|---|
| La Libertad | 10.142.44.0/23 | 10.142.46.0/24 | 10.142.47.0/25 | 10.142.47.128/29 |
| Puno | 10.142.48.0/23 | 10.142.50.0/24 | 10.142.51.0/26 | 10.142.51.64/29 |
| Ica | 10.142.52.0/23 | 10.142.54.0/25 | 10.142.54.128/26 | 10.142.54.192/29 |
| Huánuco | 10.142.56.0/24 | 10.142.57.0/25 | 10.142.57.128/26 | 10.142.57.192/29 |

Lima (VLAN 3, 9, 15, 21, 27, 33, 39, 45) usa CORE 3560 con SVI + `ip routing`; sus redes están en `10.142.40.0/22`. Lima no es sucursal de Provincia: las tareas 1, 3, 5 y 6 se piden en Provincia.

El parcial pide "una sucursal de Provincia" sin nombre: el estudiante debe poder repetir la ruta en cualquiera de las 4 (misma estructura, solo cambian redes).

# Enunciado TP1 (parcial) — 10 puntos

Transcrito de las fotos de pizarra y la captura del usuario. La tarea 5 tiene un tramo ilegible/ambiguo ("[...] la VLAN que se usa en esa sede").

1. (1 pt) En la sucursal de Provincia, en un espacio en blanco, agregar un **Access Point WiFi** y una **laptop**. Crear el WiFi **SSID "Fieles"** y configurar una contraseña. Establecer la configuración inalámbrica entre la laptop y el AP.
2. (1 pt) En un espacio en blanco de la red principal del proyecto, agregar **dos routers** de cualquier modelo y conectarlos entre sí con un **cable serial**.
3. (1 pt) En una sucursal de Provincia, agregar **2 PCs nuevas (PC Prueba1 y PC Prueba2)** y conectarlas a uno de los switches de la sucursal. Configurar IP, máscara y default gateway de cada PC, ambas en la red **192.168.69.0/24**.
4. (1 pt) Mostrar **con comandos** las VLANs creadas en un switch.
5. (3 pts) Crear la **VLAN 667 de nombre SuperBestias**, asignar las 2 PCs del paso 3 a esa VLAN y lograr **conectividad con el resto de las PCs de esa sucursal** ([...] la VLAN que se usa en esa sede).
6. (3 pts) Agregar un **nuevo switch** en una sucursal, conectarlo con otro switch y crear las **interfaces trunk** relacionadas.

## Rúbrica de simulacro (propuesta, no oficial)

| Tarea | Pts | Evidencia que debe mostrar el estudiante |
|---|---|---|
| 1 | 1 | Laptop con ícono de asociación al AP; SSID Fieles + clave; ping/estado wireless |
| 2 | 1 | Enlace serial en verde; `show ip interface brief` up/up; ping entre routers |
| 3 | 1 | `ipconfig` en ambas PCs con 192.168.69.x /24 y gateway |
| 4 | 1 | `show vlan brief` visible |
| 5 | 3 | `show vlan brief` con 667 SuperBestias y puertos; sub-interfaz/trunk; ping PC Prueba ↔ PC de otra VLAN |
| 6 | 3 | `show interfaces trunk` en ambos switches; ping a través del nuevo switch |

# Evaluación de habilidades: Enrutamiento dinámico (práctica tipo PC2)

Archivo: `PC2_Practica_RIP_-_topologia.pkt`. Las PCs y los servidores ya tienen IP, gateway y DNS. Los routers están de fábrica, y en el lienzo hay una nota con las IPs de cada uno.

## Topología
- **HQ (R1)**: LAN1, LAN2 · S0/0/0 → R2 (WAN1, DCE) · S0/1/0 → R3 (WAN2, DCE) · S0/0/1 → ISP
- **R2**: LAN3 (G0/0), LAN4 (G0/1), LAN5 (G0/2) · S0/0/0 → HQ · S0/0/1 → R3 (WAN3, DCE)
- **R3**: LAN6 (G0/0), LAN7 (G0/1), LAN8 (G0/2) · S0/0/0 → HQ · S0/0/1 → R2
- **ISP**: S0/0/0 → HQ (DCE) · G0/0 → Server Externo
- Cada LAN: 1 switch 2960 (Gi0/1 al router, Fa0/1 a la PC). En LAN1 está el Web Server, en LAN2 el DNS Server y en LAN3 el Mail Server (Fa0/2).

## Parte 1: Diseñar el esquema de direccionamiento
Red padre LAN: **192.168.50.0/24** · Red padre WAN: **10.20.30.0/24** (subredes /30)

| Red  | Hosts requeridos |
|------|------------------|
| LAN1 | 55 |
| LAN2 | 50 |
| LAN3 | 27 |
| LAN4 | 20 |
| LAN5 | 13 |
| LAN6 | 9  |
| LAN7 | 6  |
| LAN8 | 3  |

| WAN  | Subred |
|------|--------|
| WAN1 (HQ–R2) | primera /30 |
| WAN2 (HQ–R3) | segunda /30 |
| WAN3 (R2–R3) | tercera /30 |
| HQ–ISP | 200.100.50.0/30 (ISP = primera, HQ = segunda) |

- Asigna con VLSM, de la LAN más grande a la más chica.
- El router usa la **primera** IP útil de cada LAN y la PC la **última**.
- En WAN1 y WAN2, HQ usa la primera IP útil. En WAN3, R2 usa la primera.
- El Web Server usa la penúltima IP de LAN1, el DNS Server la penúltima de LAN2 y el **Mail Server la décima segunda dirección de la red de LAN3**.
- ISP: G0/0 209.165.200.225/27 · Server Externo 209.165.200.226/27.

## Parte 2: Configuración
1. **Configuración básica**: hostname, IP de todas las interfaces y `clock rate 64000` en los DCE. Configura las PCs y servidores (IP, máscara, gateway y DNS = DNS Server).
2. **ISP**: rutas estáticas hacia 192.168.50.0/24 y 10.20.30.0/24 por 200.100.50.2.
3. **Ruta predeterminada en HQ**: todo el tráfico de Internet sale por S0/0/1.
4. **RIPv2 en HQ**: versión 2, `no auto-summary`, redes conectadas, interfaces LAN como pasivas, anunciar la ruta por defecto.
5. **RIPv2 en R2 y R3**: lo mismo, sin la ruta por defecto.
6. **Servicios**: Web Server con HTTP activo. DNS Server con DNS activo y un registro A `www.redes50.com` → IP del Web Server.
7. **Verificación**: ping entre todas las PCs, ping al Server Externo y que una PC abra `www.redes50.com`. Guarda la configuración en todos los routers.

---

## Solucionario (IPs)

| Red | Subred | Gateway (router) | PC / servidor |
|-----|--------|------------------|---------------|
| LAN1 | 192.168.50.0/26 (255.255.255.192) | HQ G0/0 192.168.50.1 | PC1 .62 · Web Server .61 |
| LAN2 | 192.168.50.64/26 | HQ G0/1 192.168.50.65 | PC2 .126 · DNS Server .125 |
| LAN3 | 192.168.50.128/27 (255.255.255.224) | R2 G0/0 192.168.50.129 | PC3 .158 · Mail Server .140 |
| LAN4 | 192.168.50.160/27 | R2 G0/1 192.168.50.161 | PC4 .190 |
| LAN5 | 192.168.50.192/28 (255.255.255.240) | R2 G0/2 192.168.50.193 | PC5 .206 |
| LAN6 | 192.168.50.208/28 | R3 G0/0 192.168.50.209 | PC6 .222 |
| LAN7 | 192.168.50.224/29 (255.255.255.248) | R3 G0/1 192.168.50.225 | PC7 .230 |
| LAN8 | 192.168.50.232/29 | R3 G0/2 192.168.50.233 | PC8 .238 |
| WAN1 | 10.20.30.0/30 | HQ S0/0/0 .1 | R2 S0/0/0 .2 |
| WAN2 | 10.20.30.4/30 | HQ S0/1/0 .5 | R3 S0/0/0 .6 |
| WAN3 | 10.20.30.8/30 | R2 S0/0/1 .9 | R3 S0/0/1 .10 |
| ISP  | 200.100.50.0/30 | ISP S0/0/0 .1 | HQ S0/0/1 .2 |
| Internet | 209.165.200.224/27 | ISP G0/0 .225 | Server Externo .226 |

DNS en todos los hosts internos: 192.168.50.125. Libre: 192.168.50.240/28.

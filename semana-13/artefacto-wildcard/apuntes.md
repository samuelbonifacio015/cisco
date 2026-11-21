# Apuntes S13 · ACL y Wildcard (pasados en limpio)

Fotos originales en `fotos-apuntes/`. Lo marcado con (?) no se leía bien.

## 1. ACL estándar
- `access-list [número] (deny | permit | remark) [IP origen] [wildcard]`
- `access-list 69 deny 192.168.10.20 0.0.0.15`
- `access-list 4 deny 192.168.3.200 0.0.0.0` y `access-list 4 permit any`
- `ip access-group [acl-number] in|out` (?) la foto dice "ip access (acl-number)"
- El wildcard de la estándar es el del origen (source).

## 2. Wildcard rápido
- `255.255.255.255` aplica para todos (= `any`).
- Wildcard en base a la red: /25 = 0.0.0.127.
- Dibujo: red 192.168.10.128/25, router .129, host .150.

## 3. Hallar el rango con bits
```
deny 192.168.20.140 0.0.0.15
w : 0000 1111
IP: 1000 1100
-> 192.168.20.1000xxxx
128 + 15 = 143  ->  (128 - 143)
```

## 4. ACL extendida
- `access-list 103 permit ip any any` (cuando es para TODOS).
- Extendida siempre cerca del origen.
- (?) "wildcard extendido: SIEMPRE ... IN" (tachón en la foto).
- (?) "Teoría: access-list por interfaz que NO ES ..." (frase cortada).

## 5. Agenda
- Semana 15: jueves, exposición de 3 grupos y exposición individual (jueves o viernes).
- Temas anotados: IPv6, sumarización, route, access-list.

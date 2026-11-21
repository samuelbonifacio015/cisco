
/* S13 · ACL y Wildcard · alta en el índice (aditivo) */
(function(){
  META.units.push({"k":"S13","label":"Repaso Examen Final · ACL","badge":"EF","theme":"rose"});
  [{"id":"wc-base","unit":"S13","title":"Wildcard: bits, resta y 4 casos","status":"curso"},
   {"id":"wc-acl","unit":"S13","title":"ACL en la topología, orden y caza de errores","status":"curso"},
   {"id":"wc-quiz","unit":"S13","title":"Práctica: ¿cuáles coinciden?","status":"curso"},{"id":"wc-cmd","unit":"S13","title":"Comandos de ACL y armador","status":"curso"},{"id":"wc-notas","unit":"S13","title":"Mis apuntes de ACL","status":"curso"}].forEach(function(t){META.topics.push(t)});
  [["u-acl","rose",null,null],["wc-idea","mint","wc-base","S13"],["wc-bits","sky","wc-base","S13"],["wc-calc","lav","wc-base","S13"],["wc-tipos","peach","wc-base","S13"],["wc-topo","rose","wc-acl","S13"],["wc-topo-ext","rose","wc-acl","S13"],["wc-orden","sun","wc-acl","S13"],["wc-error","lav","wc-acl","S13"],["wc-cmd","peach","wc-cmd","S13"],["wc-armador","sky","wc-cmd","S13"],["wc-quiz","mint","wc-quiz","S13"],["wc-notas","sun","wc-notas","S13"]]
   .forEach(function(s){META.slides.push({"id":s[0],"theme":s[1],"topic":s[2],"unit":s[3]})});
  Object.assign(META.text,{
    "u-acl":"repaso examen final ef acl wildcard ruta pasos",
    "wc-idea":"wildcard comodín máscara inversa bit 0 igual 1 ignorar octeto acl semana 13",
    "wc-bits":"wildcard bit por bit coincide ip regla rango binario acl comodín host subred",
    "wc-calc":"wildcard 255.255.255.255 menos máscara de subred calcular acl access-list permit prefijo",
    "wc-tipos":"wildcard host any 0.0.0.0 0.0.0.255 0.0.15.255 255.255.255.255 palabra clave rango acl",
    "wc-topo":"acl topología practicante internet access-list 10 deny permit ip access-group out in router1 serial deny implícito",
    "wc-topo-ext":"acl extendida topología puertos tcp 80 http https ping icmp dns udp 53 access-list 101 deny permit ip any any fa0/0 in",
    "wc-error":"caza interfaz equivocada acl in out fa0/0 fa0/1 s0/0/0 estándar extendida origen destino examen teoría error",
    "wc-orden":"acl estándar lógica orden filas primera coincidencia deny implícito access-list 2",
    "wc-cmd":"comandos acl access-list access-group ip access-list standard extended nombre vty access-class permit deny any host remark established log eq range show access-lists editar secuencia no access-list armador",
    "wc-armador":"armador comando acl extendida estándar host any wildcard puerto eq versión larga corta",
    "wc-notas":"apuntes cuaderno fotos acl estándar extendida rango bits 128 143 /25 0.0.0.127 semana 15 exposición",
    "wc-quiz":"práctica wildcard cuáles ip coinciden quiz ejercicios binario acl"
  });
})();

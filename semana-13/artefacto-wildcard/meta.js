
/* S13 · ACL y Wildcard · alta en el índice (aditivo) */
(function(){
  META.units.push({"k":"ACL","label":"Repaso Examen Final · ACL","badge":"EF","theme":"rose"});
  [{"id":"wc-idea","unit":"ACL","title":"1 · Wildcard: bits, resta y 4 casos","status":"curso"},
   {"id":"wc-cmd","unit":"ACL","title":"2 · Comandos de ACL y armador","status":"curso"},
   {"id":"wc-topo","unit":"ACL","title":"3 · ACL en la topología, orden y caza de errores","status":"curso"},
   {"id":"wc-quiz","unit":"ACL","title":"4 · Práctica: ¿cuáles coinciden?","status":"curso"},
   {"id":"wc-notas","unit":"ACL","title":"5 · Mis apuntes de ACL","status":"curso"}].forEach(function(t){META.topics.push(t)});
  [["u-acl","rose",null,null],["wc-idea","mint","wc-idea","ACL"],["wc-bits","sky","wc-idea","ACL"],["wc-calc","lav","wc-idea","ACL"],["wc-tipos","peach","wc-idea","ACL"],["wc-topo","rose","wc-topo","ACL"],["wc-topo-ext","rose","wc-topo","ACL"],["wc-orden","sun","wc-topo","ACL"],["wc-error","lav","wc-topo","ACL"],["wc-cmd","peach","wc-cmd","ACL"],["wc-armador","sky","wc-cmd","ACL"],["wc-quiz","mint","wc-quiz","ACL"],["wc-notas","sun","wc-notas","ACL"]]
   .forEach(function(s){META.slides.push({"id":s[0],"theme":s[1],"topic":s[2],"unit":s[3]})});
  Object.assign(META.text,{
    "wc-idea":"wildcard comodín máscara inversa bit 0 igual 1 ignorar octeto acl semana 13 bit por bit coincide ip regla rango binario host subred 255.255.255.255 menos máscara de subred calcular access-list permit prefijo any 0.0.0.0 0.0.0.255 0.0.15.255 palabra clave 4 casos",
    "wc-cmd":"comandos acl access-list access-group ip access-list standard extended nombre vty access-class permit deny any host remark established log eq range show access-lists editar secuencia no access-list armador versión larga corta puerto",
    "wc-topo":"acl topología practicante internet access-list 10 101 deny permit ip access-group out in router1 serial deny implícito extendida puertos tcp 80 http https ping icmp dns udp orden filas primera coincidencia caza interfaz equivocada examen teoría error origen destino fa0/0 fa0/1 s0/0/0",
    "wc-quiz":"práctica wildcard cuáles ip coinciden quiz ejercicios binario acl",
    "wc-notas":"apuntes cuaderno fotos acl estándar extendida rango bits 128 143 /25 0.0.0.127 semana 15 exposición repaso examen final ef"
  });
})();

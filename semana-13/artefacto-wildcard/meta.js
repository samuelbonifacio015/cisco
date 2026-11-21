
/* S13 · ACL y Wildcard · alta en el índice (aditivo) */
(function(){
  META.units.push({"k":"S13","label":"S13 · ACL y Wildcard","badge":"S13","theme":"rose"});
  [{"id":"wc-base","unit":"S13","title":"Wildcard: bits, resta y 4 casos","status":"curso"},
   {"id":"wc-acl","unit":"S13","title":"ACL en la topología y orden de filas","status":"curso"},
   {"id":"wc-quiz","unit":"S13","title":"Práctica: ¿cuáles coinciden?","status":"curso"}].forEach(function(t){META.topics.push(t)});
  [["u-acl","rose",null,null],["wc-idea","mint","wc-base","S13"],["wc-bits","sky","wc-base","S13"],["wc-calc","lav","wc-base","S13"],["wc-tipos","peach","wc-base","S13"],["wc-topo","rose","wc-acl","S13"],["wc-orden","sun","wc-acl","S13"],["wc-quiz","mint","wc-quiz","S13"]]
   .forEach(function(s){META.slides.push({"id":s[0],"theme":s[1],"topic":s[2],"unit":s[3]})});
  Object.assign(META.text,{
    "wc-idea":"wildcard comodín máscara inversa bit 0 igual 1 ignorar octeto acl semana 13",
    "wc-bits":"wildcard bit por bit coincide ip regla rango binario acl comodín host subred",
    "wc-calc":"wildcard 255.255.255.255 menos máscara de subred calcular acl access-list permit prefijo",
    "wc-tipos":"wildcard host any 0.0.0.0 0.0.0.255 0.0.15.255 255.255.255.255 palabra clave rango acl",
    "wc-topo":"acl topología practicante internet access-list 10 deny permit ip access-group out in router1 serial deny implícito",
    "wc-orden":"acl estándar lógica orden filas primera coincidencia deny implícito access-list 2",
    "wc-quiz":"práctica wildcard cuáles ip coinciden quiz ejercicios binario acl"
  });
})();

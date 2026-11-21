
  /* 8 · comandos (pestañas) */
  (function(){
    var T=[
     {k:'Estándar',c:'mint',b:[
      {h:'Crear la lista (1–99 y 1300–1999)',n:'Filtra solo por IP de origen. host = wildcard 0.0.0.0. any = 255.255.255.255. Si no pones wildcard, IOS asume 0.0.0.0.',x:'access-list 10 permit host 192.168.1.1\naccess-list 10 permit 192.168.1.1 0.0.0.0\naccess-list 10 permit 192.168.1.1\naccess-list 10 permit 192.168.1.0 0.0.0.255\naccess-list 10 deny host 192.168.3.200\naccess-list 10 deny 192.168.0.0 0.0.255.255\naccess-list 10 permit any\naccess-list 10 permit 0.0.0.0 255.255.255.255\naccess-list 10 remark Bloquear al practicante'},
      {h:'Receta del PPT: el practicante no sale',n:'Orden: primero el deny puntual, luego los permit. Al final queda el deny implícito.',x:'Router1(config)#access-list 10 deny 192.168.3.200 0.0.0.0\nRouter1(config)#access-list 10 permit 192.168.3.0 0.0.0.255\nRouter1(config)#access-list 10 permit 192.168.4.0 0.0.0.255\nRouter1(config)#interface s0/0/0\nRouter1(config-if)#ip access-group 10 out'}]},
     {k:'Estándar con nombre',c:'sky',b:[
      {h:'Crear con nombre',n:'Entras en un submodo y escribes las filas sin repetir “access-list”. Puedes poner número de secuencia delante.',x:'Router1(config)#ip access-list standard PRACTICANTE\nRouter1(config-std-nacl)#remark Bloquear al practicante\nRouter1(config-std-nacl)#deny host 192.168.3.200\nRouter1(config-std-nacl)#permit 192.168.3.0 0.0.0.255\nRouter1(config-std-nacl)#permit any\nRouter1(config-std-nacl)#exit\nRouter1(config)#interface fa0/0\nRouter1(config-if)#ip access-group PRACTICANTE in'}]},
     {k:'Extendida',c:'lav',b:[
      {h:'Forma general (100–199 y 2000–2699)',n:'Filtra por origen, destino, protocolo y puerto.',x:'access-list [ID] [permit|deny] [ip|tcp|udp|icmp] [IP origen] [wildcard] [IP destino] [wildcard] eq [puerto]'},
      {h:'Variantes',n:'permit ip any any es para TODOS. eq www es lo mismo que eq 80.',x:'access-list 103 permit ip any any\naccess-list 101 deny tcp host 192.168.3.200 host 200.48.225.130 eq 80\naccess-list 101 deny tcp 192.168.3.0 0.0.0.255 any eq 23\naccess-list 101 deny tcp any any neq 443\naccess-list 101 permit tcp any any range 20 21\naccess-list 101 permit tcp any any gt 1023\naccess-list 101 permit tcp any any established\naccess-list 101 permit udp any any eq 53\naccess-list 101 permit icmp any any echo\naccess-list 101 permit icmp any any echo-reply\naccess-list 101 deny ip any any log'},
      {h:'Receta del PPT: sin web, pero con el resto',n:'Sin el permit final, el deny implícito cortaría hasta el ping.',x:'Router0(config)#access-list 101 deny tcp 192.168.3.200 0.0.0.0 200.48.225.130 0.0.0.0 eq 80\nRouter0(config)#access-list 101 permit ip any any\nRouter0(config)#interface fa0/0\nRouter0(config-if)#ip access-group 101 in'}]},
     {k:'Extendida con nombre',c:'rose',b:[
      {h:'Crear con nombre',n:'Ejemplos del PPT. established deja volver las respuestas TCP de lo que salió de adentro.',x:'R1(config)#ip access-list extended FTP-FILTER\nR1(config-ext-nacl)#permit tcp 192.168.10.0 0.0.0.255 any eq ftp\nR1(config-ext-nacl)#permit tcp 192.168.10.0 0.0.0.255 any eq ftp-data\n\nR1(config)#ip access-list extended SURF\nR1(config-ext-nacl)#permit tcp 192.168.10.0 0.0.0.255 any eq 443\nR1(config-ext-nacl)#permit tcp any 192.168.10.0 0.0.0.255 established'}]},
     {k:'Aplicar y VTY',c:'sun',b:[
      {h:'A una interfaz',n:'in = el paquete entra al router. out = el paquete sale. Estándar: cerca del destino. Extendida: cerca del origen.',x:'Router(config)#interface fa0/0\nRouter(config-if)#ip access-group 10 in\nRouter(config-if)#ip access-group PRACTICANTE out\n\nRouter(config-if)#no ip access-group 10 in'},
      {h:'A las líneas VTY (telnet/ssh)',n:'Se usa una ACL estándar y el comando access-class, no access-group.',x:'Router(config)#access-list 5 permit host 192.168.3.10\nRouter(config)#line vty 0 4\nRouter(config-line)#access-class 5 in'}]},
     {k:'Editar y borrar',c:'peach',b:[
      {h:'Con números de secuencia',n:'No se puede sobrescribir una fila: primero la borras con “no”, luego agregas la correcta.',x:'Router(config)#ip access-list standard 10\nRouter(config-std-nacl)#15 permit host 192.168.10.5\nRouter(config-std-nacl)#no 20\nRouter(config-std-nacl)#exit\nRouter(config)#ip access-list resequence 10 10 10'},
      {h:'Borrar la lista completa',n:'resequence no existe en todos los IOS ni en Packet Tracer.',x:'Router(config)#no access-list 10\nRouter(config)#no ip access-list standard PRACTICANTE\nRouter(config)#no ip access-list extended SURF'}]},
     {k:'Verificar',c:'mint',b:[
      {h:'Ver y comprobar',n:'show access-lists muestra los contadores de coincidencias. El deny implícito no cuenta: para contarlo escribe tú deny ip any any.',x:'Router#show access-lists\nRouter#show access-lists 10\nRouter#show ip interface fa0/0\nRouter#show running-config | section access\nRouter#clear access-list counters'}]}
    ];
    var tabs=gid('wcm-tabs'),body=gid('wcm-body'),sel=0;
    var esc2=function(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')};
    function draw(){
      tabs.innerHTML=T.map(function(t,i){return '<button type="button" role="tab" aria-selected="'+(i===sel)+'" data-i="'+i+'">'+t.k+'</button>'}).join('');
      var t=T[sel];
      body.innerHTML=t.b.map(function(b){return '<div class="box c-'+t.c+'"><h4>'+b.h+'</h4><p>'+b.n+'</p><div class="pre-wrap"><pre>'+esc2(b.x)+'</pre><button class="copy" type="button">Copiar</button></div></div>'}).join('');
    }
    tabs.addEventListener('click',function(e){var b=e.target.closest('[data-i]');if(b){sel=+b.dataset.i;draw()}});
    body.addEventListener('click',function(e){var c=e.target.closest('.copy');if(!c)return;try{navigator.clipboard.writeText(c.previousElementSibling.textContent);c.textContent='Copiado'}catch(x){c.textContent='Selecciona y copia'}setTimeout(function(){c.textContent='Copiar'},1400)});
    draw();
  })();

  /* 9 · armador */
  (function(){
    var $i=function(i){return gid('wca-'+i)};
    var f=['tipo','act','pro','sm','si','sw','dm','di','dw','op','pt','ex'];
    function addr(m,ip,w,long){
      if(m==='any')return long?'0.0.0.0 255.255.255.255':'any';
      if(m==='host')return long?ip+' 0.0.0.0':'host '+ip;
      return ip+' '+w;
    }
    function render(){
      var ext=$i('tipo').value==='ext',m={};f.forEach(function(k){m[k]=$i(k).value.trim()});
      var bad=function(el,ok){el.classList.toggle('bad',!ok);return ok};
      var ok=true;
      if(m.sm!=='any')ok=bad($i('si'),!!ip4(m.si))&&ok;else bad($i('si'),true);
      if(m.sm==='red')ok=bad($i('sw'),!!ip4(m.sw))&&ok;else bad($i('sw'),true);
      if(ext){if(m.dm!=='any')ok=bad($i('di'),!!ip4(m.di))&&ok;else bad($i('di'),true);if(m.dm==='red')ok=bad($i('dw'),!!ip4(m.dw))&&ok;else bad($i('dw'),true)}
      gid('wca-dst').hidden=!ext;
      var tp=ext&&(m.pro==='tcp'||m.pro==='udp');gid('wca-prt').hidden=!tp;$i('pro').disabled=!ext;
      var out=gid('wca-out');
      if(!ok){out.innerHTML='Revisa las IP marcadas en rojo.';return}
      function line(long){
        var id=ext?'101':'10',s='access-list '+id+' '+m.act+' ';
        if(ext){s+=m.pro+' '+addr(m.sm,m.si,m.sw,long)+' '+addr(m.dm,m.di,m.dw,long);if(tp&&m.op){s+=' '+m.op+' '+m.pt}if(tp&&m.pro==='tcp'&&m.ex==='established')s+=' established';if(m.ex==='log')s+=' log'}
        else{s+=addr(m.sm,m.si,m.sw,long);if(m.ex==='log')s+=' log'}
        return s;
      }
      var id=ext?'101':'10',a=line(false),b=line(true);
      out.innerHTML=a+'<small>Versión larga (igual): '+b+'</small><small>Para que funcione, aplícala: interface fa0/0 → ip access-group '+id+' '+(ext?'in':'out')+(ext?'  (extendida: cerca del origen)':'  (estándar: cerca del destino)')+'. Al final siempre hay un deny implícito.</small>';
    }
    f.forEach(function(k){$i(k).addEventListener('input',render);$i(k).addEventListener('change',render)});
    render();
  })();

<script id="wc-js">
/* S13 · ACL y Wildcard */
(function(){
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var sleep=function(ms){return new Promise(function(r){setTimeout(r,rm?0:ms)})};
  var ip4=function(s){var m=/^\s*(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\s*$/.exec(s);if(!m)return null;var o=m.slice(1).map(Number);return o.some(function(x){return x>255})?null:o};
  var show=function(a){return a.join('.')};
  var match=function(ip,rule,w){return ip.every(function(b,i){return (((b^rule[i])&~w[i])&255)===0})};
  var bin=function(n){return n.toString(2).padStart(8,'0')};
  var gid=function(i){return document.getElementById(i)};
  var pop=function(w){return w.reduce(function(a,b){return a+bin(b).split('1').length-1},0)};

  /* 0 · lista de repaso del hub */
  (function(){
    var L=['Calcular el wildcard de una red: 255.255.255.255 − máscara','Decir qué IP coinciden con una regla (bit por bit)','Escribir una ACL estándar y una extendida, con host y any','Aplicarla con ip access-group in/out y saber dónde ponerla','Explicar por qué importa el orden y qué hace el deny implícito','Verificar con show access-lists y editar con números de secuencia','Detectar una ACL aplicada en la interfaz equivocada'];
    var ul=gid('ef-todo'),on=store.get('ef-todo',[]);
    ul.innerHTML=L.map(function(t,i){return '<li><label><input type="checkbox" data-i="'+i+'"'+(on.indexOf(i)>-1?' checked':'')+'><span>'+t+'</span></label></li>'}).join('');
    ul.addEventListener('change',function(){store.set('ef-todo',[].slice.call(ul.querySelectorAll('input:checked')).map(function(x){return +x.dataset.i}))});
  })();

  /* 1 · idea: octetos tocables */
  (function(){
    var IP=[192,168,10,120],w=[0,0,0,255],row=gid('wci-row'),out=gid('wci-out');
    function draw(){
      row.innerHTML=IP.map(function(b,i){var free=w[i]===255;return '<button type="button" class="wc-ob '+(free?'c-sun free':'c-mint')+'" data-i="'+i+'" aria-label="Octeto '+(i+1)+': '+(free?'cualquiera':'igual a '+b)+'. Tocar para cambiar"><b>'+(free?'x':b)+'</b><small>wildcard '+w[i]+' · '+(free?'cualquiera':'igual')+'</small></button>'}).join('');
      var n=w.filter(function(x){return x}).length,pat=IP.map(function(b,i){return w[i]?'x':b}).join('.');
      var lo=IP.map(function(b,i){return w[i]?0:b}),hi=IP.map(function(b,i){return w[i]?255:b});
      out.innerHTML='Pasan: '+pat+'<small>'+Math.pow(256,n).toLocaleString('es-PE')+' direcciones · de '+show(lo)+' a '+show(hi)+' · wildcard '+show(w)+'</small>';
    }
    row.addEventListener('click',function(e){var b=e.target.closest('[data-i]');if(!b)return;var i=+b.dataset.i;w[i]=w[i]?0:255;draw()});
    draw();
  })();

  /* 2 · bit por bit */
  (function(){
    var P=[['Host','192.168.1.1','0.0.0.0','192.168.1.1'],['/24 · toda la red','192.168.1.0','0.0.0.255','192.168.1.77'],['/26','192.168.1.64','0.0.0.63','192.168.1.100'],['/28','192.168.3.32','0.0.0.15','192.168.3.40'],['/23 · dos redes','192.168.10.0','0.0.1.255','192.168.11.9'],['Rango 16 a 31','192.168.16.0','0.0.15.255','192.168.20.5'],['Solo pares','192.168.10.120','0.0.0.254','192.168.10.10'],['Apunte .140','192.168.20.140','0.0.0.15','192.168.20.130']];
    var fi=gid('wcb-ip'),fw=gid('wcb-w'),ft=gid('wcb-t'),g=gid('wcb-g'),v=gid('wcb-v');
    gid('wcb-pre').innerHTML=P.map(function(p,i){return '<button type="button" class="c-'+['mint','sky','lav','sun','rose','peach','mint','sun'][i]+'" data-p="'+i+'">'+p[0]+'</button>'}).join('');
    function oc(f){var h='';for(var i=0;i<4;i++){h+='<div>'+f(i)+'</div>'}return '<div class="wc-oc">'+h+'</div>'}
    function cells(n,cls){return bin(n).split('').map(function(b,k){return '<i class="'+(cls?cls(k,b):'')+'">'+b+'</i>'}).join('')}
    function render(){
      var r=ip4(fi.value),w=ip4(fw.value),t=ip4(ft.value);
      fi.classList.toggle('bad',!r);fw.classList.toggle('bad',!w);ft.classList.toggle('bad',!t);
      if(!r||!w){g.innerHTML='';v.className='verdict bad wc-vbig';v.textContent='Escribe IP y wildcard válidas (ej. 192.168.1.0 y 0.0.0.255).';return}
      var cmp=function(i,k){return bin(w[i])[k]==='0'};
      var h='<b>IP regla</b>'+oc(function(i){return cells(r[i],function(k){return cmp(i,k)?'m':'g'})});
      h+='<b>Wildcard</b>'+oc(function(i){return cells(w[i],function(k){return cmp(i,k)?'m':'g'})});
      h+='<b>¿Se compara?</b>'+oc(function(i){return bin(w[i]).split('').map(function(b){return '<i class="'+(b==='0'?'m':'g')+'">'+(b==='0'?'=':'·')+'</i>'}).join('')});
      if(t)h+='<b>IP a probar</b>'+oc(function(i){return cells(t[i],function(k){if(!cmp(i,k))return 'g';return bin(t[i])[k]===bin(r[i])[k]?'m':'x'})});
      g.innerHTML=h;
      var lo=r.map(function(b,i){return b&~w[i]&255}),hi=r.map(function(b,i){return (b|w[i])&255}),n=pop(w);
      gid('wcb-r').textContent=show(lo)+' → '+show(hi);gid('wcb-c').textContent=Math.pow(2,n).toLocaleString('es-PE');
      var wn=((w[0]*16777216)+(w[1]<<16)+(w[2]<<8)+w[3])>>>0;
      gid('wcb-n').textContent=(wn&(wn+1))===0?'':'Ojo: esta wildcard tiene ceros entre los unos, así que las IP que coinciden no forman un rango seguido (por ejemplo 0.0.0.254 acepta solo pares).';
      if(!t){v.className='verdict bad wc-vbig';v.textContent='Escribe una IP a probar.';return}
      var ok=match(t,r,w);v.className='verdict '+(ok?'ok':'bad')+' wc-vbig';
      v.innerHTML=(ok?'✓ '+show(t)+' COINCIDE':'✕ '+show(t)+' NO coincide')+'<small>'+(ok?'Todos los bits verdes son iguales.':'Hay un bit rojo: se compara y es distinto.')+'</small>';
    }
    [fi,fw,ft].forEach(function(f){f.addEventListener('input',render)});
    gid('wcb-pre').addEventListener('click',function(e){var b=e.target.closest('[data-p]');if(!b)return;var p=P[+b.dataset.p];fi.value=p[1];fw.value=p[2];ft.value=p[3];render()});
    render();
  })();

  /* 3 · resta */
  (function(){
    var P=[['Toda la red /24','192.168.3.0',24],['14 usuarios /28','192.168.3.32',28],['Dos redes /23','192.168.10.0',23],['Rango 16 a 31 /20','192.168.16.0',20],['Un host /32','192.168.1.1',32]];
    var fi=gid('wcc-ip'),fn=gid('wcc-n');
    gid('wcc-pre').innerHTML=P.map(function(p,i){return '<button type="button" class="c-'+['mint','sky','lav','sun','rose'][i]+'" data-p="'+i+'">'+p[0]+'</button>'}).join('');
    var blk=function(a,c){return a.map(function(b){return '<div class="wc-ob '+c+'"><b>'+b+'</b></div>'}).join('')};
    function render(){
      var r=ip4(fi.value),n=+fn.value;fi.classList.toggle('bad',!r);gid('wcc-no').textContent='/'+n;
      var m=[0,1,2,3].map(function(i){var b=Math.max(0,Math.min(8,n-i*8));return (256-Math.pow(2,8-b))&255});
      var w=m.map(function(x){return 255-x});
      gid('wcc-a').innerHTML=blk([255,255,255,255],'c-sky');gid('wcc-m').innerHTML=blk(m,'c-lav');gid('wcc-w').innerHTML=blk(w,'c-sun');
      var box=gid('wcc-ace');
      if(!r){box.innerHTML='Escribe una red válida.';return}
      var net=r.map(function(b,i){return b&m[i]}),hosts=n>=31?1:Math.pow(2,32-n)-2;
      box.innerHTML='access-list 10 permit '+show(net)+' '+show(w)+'<small>Máscara '+show(m)+' · '+(n===32?'un solo equipo (también se escribe “host”)':hosts.toLocaleString('es-PE')+' equipos útiles')+'</small>';
    }
    fi.addEventListener('input',render);fn.addEventListener('input',render);
    gid('wcc-pre').addEventListener('click',function(e){var b=e.target.closest('[data-p]');if(!b)return;var p=P[+b.dataset.p];fi.value=p[1];fn.value=p[2];render()});
    render();
  })();

  /* 4 · cuatro casos */
  (function(){
    var C=[{c:'mint',h:'HOST',w:'0.0.0.0',cmd:'access-list 10 permit 192.168.1.1 0.0.0.0',alt:'access-list 10 permit host 192.168.1.1',d:'Solo 192.168.1.1. Todos los bits se comparan.'},
      {c:'sky',h:'RED /24',w:'0.0.0.255',cmd:'access-list 10 permit 192.168.1.0 0.0.0.255',alt:'',d:'Toda la red 192.168.1.0/24. El último octeto se ignora.'},
      {c:'lav',h:'RANGO',w:'0.0.15.255',cmd:'access-list 10 permit 192.168.16.0 0.0.15.255',alt:'',d:'Las redes 192.168.16.0/24 hasta 192.168.31.0/24. Se ignoran 4 bits del 3.er octeto y todo el 4.º.'},
      {c:'sun',h:'CUALQUIERA',w:'255.255.255.255',cmd:'access-list 10 permit 0.0.0.0 255.255.255.255',alt:'access-list 10 permit any',d:'Cualquier IP. No se compara ningún bit.'}];
    var box=gid('wct-cards'),det=gid('wct-det'),sel=0;
    function strip(w){return '<span class="wc-strip" aria-hidden="true">'+ip4(w).map(function(b){return bin(b).split('').map(function(x){return '<i class="'+(x==='1'?'g':'')+'"></i>'}).join('')}).join('')+'</span>'}
    function draw(){
      box.innerHTML=C.map(function(x,i){return '<button type="button" class="wc-tp c-'+x.c+'" data-i="'+i+'" aria-pressed="'+(i===sel)+'"><span class="h">'+x.h+'</span><span class="w">'+x.w+'</span>'+strip(x.w)+'</button>'}).join('');
      var x=C[sel];det.innerHTML=x.cmd+(x.alt?'<small>Igual que: '+x.alt+'</small>':'')+'<small>'+x.d+' · verde = se compara, amarillo = se ignora.</small>';
    }
    box.addEventListener('click',function(e){var b=e.target.closest('[data-i]');if(!b)return;sel=+b.dataset.i;draw()});
    draw();
  })();

  /* 5 · topología + ACL (estándar y extendida) */
  var DEST={net:[200,48,225,130],lan4:[192,168,4,150]};
  var SND=[{n:'Practicante .200',ip:[192,168,3,200],p:[[108,76],[210,76],[210,141],[390,141]]},{n:'PC .100',ip:[192,168,3,100],p:[[108,206],[210,206],[210,141],[390,141]]},{n:'Host .150',ip:[192,168,4,150],p:[[108,366],[390,366],[390,141]]}];
  var TAIL={net:[[780,141],[1010,141],[1010,300]],lan4:[[390,366],[190,366]]};
  function aceHit(e,k){return match(k.src,e.src,e.sw)&&(!e.dst||match(k.dst,e.dst,e.dw))&&(e.proto==='ip'||e.proto===k.proto)&&(e.port==null||e.port===k.port)}
  function topo(P,cfg){
    var g=function(s){return gid(P+'-'+s)};
    var aceBox=g('ace'),msg=g('msg'),dot=g('dot'),xs=g('x'),oks=g('ok'),tog=g('tog'),badge=g('badge'),bt=g('badget'),pre=g('pre'),note=g('note');
    var on=true,tok=0,st={d:'net',v:0,m:cfg.mode||cfg.fixed||'out'};
    aceBox.innerHTML=cfg.ace.map(function(e,i){return '<div data-i="'+i+'"><i>'+(i+1)+'</i><span>'+e.txt+'<small>'+e.t+'</small></span></div>'}).join('')+'<div class="imp" data-i="x"><i>·</i><span>deny any (implícito)<small>Invisible: frena lo que ninguna fila aceptó</small></span></div>';
    g('send').innerHTML=SND.map(function(s,i){return '<button class="btn" type="button" data-s="'+i+'">'+s.n+'</button>'}).join('');
    function btns(id,list,key,cur){var el=g(id);if(!el)return;el.innerHTML=list.map(function(x){return '<button type="button" class="btn alt sm" data-'+key+'="'+x[0]+'" aria-pressed="'+(x[0]===cur)+'">'+x[1]+'</button>'}).join('')}
    function ctrls(){
      if(cfg.dest)btns('dest',[['net','Internet (servidor .130)'],['lan4','LAN 4 (192.168.4.0/24)']],'d',st.d);
      if(cfg.mode)btns('mode',[['out','out en S0/0/0'],['in','in en Fa0/0']],'m',st.m);
      if(cfg.svc)btns('svc',cfg.svc.map(function(x,i){return [i,x.n]}),'v',st.v);
    }
    function place(){
      var inn=st.m==='in';
      badge.setAttribute('x',inn?216:470);badge.setAttribute('y',inn?162:214);badge.setAttribute('width',inn?116:168);
      bt.setAttribute('x',inn?274:554);bt.setAttribute('y',inn?187:239);
      badge.style.fill=on?'var(--mint)':'var(--rose)';bt.textContent=on?cfg.name+' · '+(inn?'in':'out'):'sin ACL';
      pre.textContent=cfg.pre.concat(inn?['Router1(config)#interface fa0/0','Router1(config-if)#ip access-group '+cfg.id+' in']:['Router1(config)#interface s0/0/0','Router1(config-if)#ip access-group '+cfg.id+' out']).join('\n');
      if(note)note.textContent=cfg.notes[st.m];
    }
    var rows=function(){return [].slice.call(aceBox.children)};
    function clear(){rows().forEach(function(r){r.className=r.dataset.i==='x'?'imp':''});xs.style.opacity=0;oks.style.opacity=0;dot.style.fill='var(--lav-d)'}
    function put(p){dot.setAttribute('cx',p[0]);dot.setAttribute('cy',p[1])}
    async function travel(pts,my){
      for(var i=0;i<pts.length-1;i++){var a=pts[i],b=pts[i+1],L=Math.hypot(b[0]-a[0],b[1]-a[1]),T=rm?0:L/0.6,t0=performance.now();
        while(true){if(my!==tok)return false;var k=T?Math.min(1,(performance.now()-t0)/T):1;put([a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k]);if(k>=1)break;await new Promise(requestAnimationFrame)}}
      return true;
    }
    function reset(t){tok++;clear();dot.setAttribute('cx',-60);msg.className='verdict ok';msg.textContent=t||'Elige quién envía un paquete.'}
    async function run(i){
      var s=SND[i],d=cfg.dest?st.d:'net',sv=cfg.svc?cfg.svc[st.v]:{proto:'ip',port:null,n:''};
      if(i===2&&d==='lan4'){reset();msg.className='verdict bad';msg.innerHTML='Misma red<small>El host .150 ya está en la LAN 4: el paquete no pasa por el router.</small>';return}
      var my=++tok,pk={src:s.ip,dst:DEST[d],proto:sv.proto,port:sv.port};clear();msg.className='verdict ok';msg.textContent='Enviando desde '+show(s.ip)+(sv.n?' · '+sv.n:'')+'…';
      if(!await travel(s.p,my))return;
      var applies=st.m==='in'?s.ip[2]===3:d==='net',verdict;
      if(!on)verdict={a:'permit',j:-1};
      else if(!applies)verdict={a:'permit',j:-2};
      else{
        for(var j=0;j<cfg.ace.length;j++){
          var r=rows()[j];r.classList.add('on');await sleep(650);if(my!==tok)return;
          if(aceHit(cfg.ace[j],pk)){r.classList.remove('on');r.classList.add(cfg.ace[j].a==='permit'?'ok':'no');verdict={a:cfg.ace[j].a,j:j};rows().slice(j+1).forEach(function(x){x.classList.add('skip')});break}
          r.classList.remove('on');r.classList.add('skip');
        }
        if(!verdict){rows()[cfg.ace.length].classList.add('no');verdict={a:'deny',j:cfg.ace.length}}
      }
      if(verdict.a==='deny'){
        dot.style.fill='var(--rose-d)';xs.style.opacity=1;msg.className='verdict bad';
        msg.innerHTML='✕ Se descarta en Router1<small>'+show(s.ip)+(sv.n?' · '+sv.n:'')+' coincide con la fila '+(verdict.j+1)+' ('+(verdict.j===cfg.ace.length?'deny implícito':'deny')+'). El router ya no revisa más filas.</small>';return}
      msg.className='verdict ok';
      msg.innerHTML='✓ Pasa'+(d==='net'?' a Internet':' a la LAN 4')+'<small>'+(verdict.j===-1?'La ACL está apagada: todos pasan.':verdict.j===-2?'La ACL no se revisó: este paquete no cruza la interfaz donde está aplicada.':show(s.ip)+(sv.n?' · '+sv.n:'')+' coincide con la fila '+(verdict.j+1)+' (permit).')+'</small>';
      oks.setAttribute('x',d==='net'?1010:290);oks.setAttribute('y',d==='net'?268:336);
      if(await travel([[390,141]].concat(TAIL[d]),my))oks.style.opacity=1;
    }
    g('send').addEventListener('click',function(e){var b=e.target.closest('[data-s]');if(b)run(+b.dataset.s)});
    ['dest','mode','svc'].forEach(function(id){var el=g(id);if(!el)return;el.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var k=Object.keys(b.dataset)[0];st[k]=k==='v'?+b.dataset[k]:b.dataset[k];ctrls();place();reset()})});
    tog.addEventListener('click',function(){on=!on;tog.setAttribute('aria-pressed',on);tog.textContent=on?'ACL activa':'ACL apagada';place();reset()});
    ctrls();place();
  }
  (function(){
    var h=function(s,sw,d,dw){return {src:ip4(s),sw:ip4(sw),dst:d?ip4(d):null,dw:dw?ip4(dw):null}};
    var a=h('192.168.3.200','0.0.0.0'),b=h('192.168.3.0','0.0.0.255'),c=h('192.168.4.0','0.0.0.255');
    topo('wct',{id:'10',name:'ACL 10',mode:'out',dest:true,
      ace:[Object.assign({a:'deny',proto:'ip',txt:'access-list 10 deny 192.168.3.200 0.0.0.0',t:'Bloquea solo al practicante (.200)'},a),Object.assign({a:'permit',proto:'ip',txt:'access-list 10 permit 192.168.3.0 0.0.0.255',t:'Deja pasar el resto de 192.168.3.0/24'},b),Object.assign({a:'permit',proto:'ip',txt:'access-list 10 permit 192.168.4.0 0.0.0.255',t:'Deja pasar toda 192.168.4.0/24'},c)],
      pre:['Router1(config)#access-list 10 deny 192.168.3.200 0.0.0.0','Router1(config)#access-list 10 permit 192.168.3.0 0.0.0.255','Router1(config)#access-list 10 permit 192.168.4.0 0.0.0.255'],
      notes:{out:'Out en S0/0/0 filtra lo que sale hacia Internet; lo que va a la LAN 4 no pasa por esa interfaz. Ojo: el PPT escribe “in” en S0/0/0, pero ahí se filtra lo que llega de Internet. Para esta regla sirve out en S0/0/0 o in en Fa0/0 (confírmalo con tu profe).',in:'In en Fa0/0 mira todo lo que entra desde la LAN 3, vaya a donde vaya: el practicante queda sin Internet y también sin LAN 4. Por eso la estándar va cerca del destino.'}});
    var box=gid('wce-svgbox');
    if(box){var sv=document.querySelector('#wc-topo svg').cloneNode(true);[].slice.call(sv.querySelectorAll('[id]')).forEach(function(n){n.id=n.id.replace('wct-','wce-')});sv.querySelectorAll('title').forEach(function(t){t.remove()});box.appendChild(sv)}
    topo('wce',{id:'101',name:'ACL 101',mode:null,fixed:'in',
      svc:[{n:'Web (HTTP 80)',proto:'tcp',port:80},{n:'Web segura (HTTPS 443)',proto:'tcp',port:443},{n:'Ping (ICMP)',proto:'icmp',port:null},{n:'DNS (UDP 53)',proto:'udp',port:53}],
      ace:[Object.assign({a:'deny',proto:'tcp',port:80,txt:'access-list 101 deny tcp host 192.168.3.200 host 200.48.225.130 eq 80',t:'Solo la web del servidor, solo para el practicante'},h('192.168.3.200','0.0.0.0','200.48.225.130','0.0.0.0')),Object.assign({a:'permit',proto:'ip',port:null,txt:'access-list 101 permit ip any any',t:'Todo lo demás pasa: ping, DNS, HTTPS…'},h('0.0.0.0','255.255.255.255'))],
      pre:['Router1(config)#access-list 101 deny tcp 192.168.3.200 0.0.0.0 200.48.225.130 0.0.0.0 eq 80','Router1(config)#access-list 101 permit ip any any'],
      notes:{in:'Extendida cerca del origen: in en Fa0/0. El host .150 entra por Fa0/1, así que esta ACL ni lo mira. Sin el permit final, el deny implícito cortaría hasta el ping.'}});
    var o=gid('wce-msg');
  })();

  /* 6 · orden de filas */
  (function(){
    var A=[{a:'deny',ip:[192,168,10,10],w:[0,0,0,0],t:'solo 192.168.10.10'},{a:'permit',ip:[192,168,10,0],w:[0,0,0,255],t:'toda la 192.168.10.0/24'},{a:'deny',ip:[192,168,0,0],w:[0,0,255,255],t:'todo 192.168.x.x'},{a:'permit',ip:[192,0,0,0],w:[0,255,255,255],t:'todo 192.x.x.x'}];
    var order=[0,1,2,3],box=gid('wco-ace'),v=gid('wco-v'),inp=gid('wco-in'),tok=0,cur='192.168.10.55';
    var IPS=['192.168.10.10','192.168.10.55','192.168.77.5','192.9.9.9','10.1.1.1'];
    var ips=gid('wco-ips');
    function drawIps(){ips.innerHTML=IPS.map(function(x){return '<button type="button" class="btn alt sm" data-ip="'+x+'" aria-pressed="'+(x===cur)+'">'+x+'</button>'}).join('')}
    function draw(){box.innerHTML=order.map(function(k,n){var e=A[k];return '<div><i>'+(n+1)+'</i><span>access-list 2 '+e.a+' '+show(e.ip)+' '+show(e.w)+'<small>'+e.t+'</small></span></div>'}).join('')+'<div class="imp"><i>·</i><span>deny any (implícito)<small>Si nada coincide, se descarta</small></span></div>'}
    async function go(){
      var ip=ip4(inp.value.trim()||cur);if(!ip){v.className='verdict bad';v.textContent='IP no válida.';return}
      var my=++tok,r=[].slice.call(box.children);draw();r=[].slice.call(box.children);v.className='verdict ok';v.textContent='Revisando '+show(ip)+'…';
      for(var n=0;n<4;n++){var e=A[order[n]];r[n].classList.add('on');await sleep(650);if(my!==tok)return;
        if(match(ip,e.ip,e.w)){r[n].classList.remove('on');r[n].classList.add(e.a==='permit'?'ok':'no');r.slice(n+1).forEach(function(x){x.classList.add('skip')});
          v.className='verdict '+(e.a==='permit'?'ok':'bad');v.innerHTML=(e.a==='permit'?'✓ PASA':'✕ SE DESCARTA')+'<small>'+show(ip)+' coincide primero con la fila '+(n+1)+' ('+e.a+'). Las demás ya no se leen.</small>';return}
        r[n].classList.remove('on');r[n].classList.add('skip')}
      r[4].classList.add('no');v.className='verdict bad';v.innerHTML='✕ SE DESCARTA<small>'+show(ip)+' no coincide con ninguna fila: cae en el deny implícito.</small>';
    }
    ips.addEventListener('click',function(e){var b=e.target.closest('[data-ip]');if(!b)return;cur=b.dataset.ip;inp.value='';drawIps();go()});
    gid('wco-go').addEventListener('click',go);
    inp.addEventListener('keydown',function(e){if(e.key==='Enter')go()});
    gid('wco-swap').addEventListener('click',function(e){var b=e.currentTarget,s=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',s);order=s?[0,2,1,3]:[0,1,2,3];tok++;draw();v.className='verdict ok';v.textContent=s?'Filas 2 y 3 cambiadas. Prueba 192.168.10.55 otra vez.':'Orden original. Elige una IP y envía.'});
    drawIps();draw();
  })();

  /* 7 · práctica */
  (function(){
    var PPT=[{r:[192,168,10,120],w:[0,0,0,255],o:['192.168.11.100','192.168.10.2','192.188.10.253','192.168.10.200']},
      {r:[192,168,10,120],w:[0,0,0,254],o:['192.168.10.10','192.168.10.33','192.168.10.121','192.168.10.254']},
      {r:[192,168,10,69],w:[0,0,0,255],o:['192.168.10.46','172.168.10.69','192.168.11.101','192.168.10.254']},
      {r:[192,168,10,69],w:[0,0,0,31],o:['192.168.10.81','192.168.10.159','192.168.11.95','192.168.10.62']}];
    var ri=function(a,b){return a+Math.floor(Math.random()*(b-a+1))};
    function gen(){
      var k=ri(1,6),w=Math.random()<.6?[0,0,0,Math.pow(2,k)-1]:[0,0,[1,3,7,15][ri(0,3)],255],r=[192,168,ri(1,60),ri(0,255)],o={},guard=0;
      var inside=function(){return r.map(function(b,i){return ((b&~w[i])|(ri(0,255)&w[i]))&255})};
      var outside=function(){var x=inside(),c=[];for(var i=0;i<4;i++)for(var q=0;q<8;q++)if(!(w[i]>>q&1))c.push([i,q]);var p=c[ri(0,c.length-1)];x[p[0]]^=1<<p[1];return x};
      var want=[ri(1,2),ri(1,2)][0];
      while(Object.keys(o).length<4&&guard++<80){var x=Object.keys(o).length<want?inside():outside();o[show(x)]=1}
      return {r:r,w:w,o:Object.keys(o).sort(function(){return Math.random()-.5})};
    }
    var q,i0=0,done=false,st=store.get('wc-q',{ok:0,n:0,k:0});
    var rule=gid('wcq-rule'),opts=gid('wcq-opts'),v=gid('wcq-v'),chk=gid('wcq-chk');
    function stats(){gid('wcq-s').textContent=st.ok+'/'+st.n;gid('wcq-k').textContent=st.k}
    function next(){
      q=i0<PPT.length?PPT[i0]:gen();i0++;done=false;v.hidden=true;chk.disabled=false;
      rule.innerHTML='access-list 10 deny '+show(q.r)+' '+show(q.w)+'<small>'+(i0<=PPT.length?'Ejercicio del PPT · ':'')+'Wildcard en binario: '+q.w.map(bin).join(' . ')+'</small>';
      opts.innerHTML=q.o.map(function(s,i){return '<label class="wc-opt"><input type="checkbox" data-i="'+i+'"><span>'+s+'<small></small></span></label>'}).join('');stats();
    }
    function check(){
      if(done)return;done=true;chk.disabled=true;var all=true;
      [].slice.call(opts.children).forEach(function(l,i){
        var ip=ip4(q.o[i]),m=match(ip,q.r,q.w),u=l.querySelector('input').checked,sm=l.querySelector('small');
        l.classList.add(m===u?'ok':'bad');if(m!==u)all=false;
        if(m){sm.textContent='Coincide: todos los bits que se comparan son iguales.'}
        else{var j=ip.findIndex(function(b,x){return ((b^q.r[x])&~q.w[x]&255)!==0});
          sm.textContent='No coincide. Octeto '+(j+1)+': regla '+bin(q.r[j])+' · wildcard '+bin(q.w[j])+' · IP '+bin(ip[j])+' → un bit que se compara es distinto.'}
      });
      st.n++;if(all){st.ok++;st.k++}else st.k=0;store.set('wc-q',st);stats();
      v.hidden=false;v.className='verdict '+(all?'ok':'bad');v.innerHTML=all?'✓ Correcto':'✕ Revisa las marcas';
    }
    chk.addEventListener('click',check);gid('wcq-next').addEventListener('click',next);next();
  })();

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

  /* 10 · caza la interfaz equivocada */
  (function(){
    var box=gid('wcr-svgbox');if(!box)return;
    var sv=document.querySelector('#wc-topo svg').cloneNode(true);
    [].slice.call(sv.querySelectorAll('[id]')).forEach(function(n){n.remove()});
    var NS='http://www.w3.org/2000/svg',mk=document.createElementNS(NS,'g');mk.id='wcr-m';sv.appendChild(mk);box.appendChild(sv);
    var POS={'fa0/0':[330,141,'Fa0/0'],'fa0/1':[390,186,'Fa0/1'],'s0/0/0':[450,141,'S0/0/0']};
    var STD10='access-list 10 deny host 192.168.3.200\naccess-list 10 permit any',STD20='access-list 20 deny host 192.168.3.200\naccess-list 20 permit any',EXT='access-list 101 deny tcp host 192.168.3.200 host 200.48.225.130 eq 80\naccess-list 101 permit ip any any';
    var G1='El practicante (192.168.3.200) no debe llegar a Internet.',G2='El practicante no puede usar la web del servidor 200.48.225.130, pero conserva ping y lo demás.',G3='El practicante no debe llegar al host 192.168.4.150 (LAN 4), pero sí a Internet.';
    var OP=['Bien aplicada','Interfaz o sentido equivocado','Funciona, pero en un lugar poco conveniente'];
    var Q=[
      {g:G1,t:'Estándar',c:STD10,i:'fa0/1',d:'in',a:1,w:'Fa0/1 es la LAN 4. El practicante entra por Fa0/0: su tráfico nunca pasa por Fa0/1.'},
      {g:G1,t:'Estándar',c:STD10,i:'s0/0/0',d:'out',a:0,w:'Out en S0/0/0 revisa todo lo que sale hacia Internet. Cerca del destino, como pide la estándar.'},
      {g:G1,t:'Estándar',c:STD10,i:'s0/0/0',d:'in',a:1,w:'In en S0/0/0 revisa lo que llega desde Internet: su origen nunca es 192.168.3.200. Ojo: el PPT (diapositiva 24) lo escribe con in. Para esta regla va out en S0/0/0 o in en Fa0/0; confírmalo con tu profe.'},
      {g:G2,t:'Extendida',c:EXT,i:'fa0/0',d:'in',a:0,w:'In en Fa0/0 la revisa apenas el paquete entra al router. Extendida cerca del origen.'},
      {g:G2,t:'Extendida',c:EXT,i:'fa0/0',d:'out',a:1,w:'Out en Fa0/0 revisa lo que sale hacia la LAN 3, es decir, lo que recibe el practicante, no lo que él envía.'},
      {g:G2,t:'Extendida',c:EXT,i:'s0/0/0',d:'out',a:2,w:'Sí bloquea, pero el paquete ya cruzó el router. La extendida va cerca del origen para no gastar red de más.'},
      {g:G3,t:'Estándar',c:STD20,i:'fa0/1',d:'out',a:0,w:'Out en Fa0/1 revisa lo que sale hacia la LAN 4. Cerca del destino, y no afecta lo que va a Internet.'},
      {g:G3,t:'Estándar',c:STD20,i:'fa0/0',d:'in',a:2,w:'Pararías al practicante, pero también le quitarías Internet: la estándar no distingue destinos. Por eso va cerca del destino.'}
    ];
    var st=store.get('wc-err',{ok:0,n:0,k:0}),q,done,last=-1;
    var cfg=gid('wcr-cfg'),opts=gid('wcr-opts'),v=gid('wcr-v');
    function stats(){gid('wcr-s').textContent=st.ok+'/'+st.n;gid('wcr-k').textContent=st.k}
    function mark(p,d){
      var x=p[0],y=p[1],up=d==='in';
      mk.innerHTML='<circle cx="'+x+'" cy="'+y+'" r="22" style="fill:var(--sun);stroke:var(--ink);stroke-width:4"><animate attributeName="r" values="22;28;22" dur="1.4s" repeatCount="indefinite"/></circle><text x="'+x+'" y="'+(y+6)+'" text-anchor="middle" style="font-size:17px;font-weight:800;fill:var(--ink)">'+d.toUpperCase()+'</text><text x="'+x+'" y="'+(y-34)+'" text-anchor="middle" style="font-size:18px;font-weight:800;fill:var(--ink)">'+p[2]+'</text>';
    }
    function next(){
      var i;do{i=Math.floor(Math.random()*Q.length)}while(i===last&&Q.length>1);last=i;q=Q[i];done=false;v.hidden=true;
      cfg.innerHTML=q.g+'<small>'+q.t+'</small><pre style="margin-top:.5rem;font-size:.9rem">'+q.c+'\ninterface '+q.i+'\n ip access-group '+q.c.split(' ')[1]+' '+q.d+'</pre>';
      mark(POS[q.i],q.d);
      opts.innerHTML=OP.map(function(o,k){return '<button type="button" class="btn alt" data-k="'+k+'">'+o+'</button>'}).join('');
    }
    opts.addEventListener('click',function(e){
      var b=e.target.closest('[data-k]');if(!b||done)return;done=true;var k=+b.dataset.k,ok=k===q.a;
      st.n++;if(ok){st.ok++;st.k++}else st.k=0;store.set('wc-err',st);stats();
      [].slice.call(opts.children).forEach(function(x,i){x.disabled=true;if(i===q.a)x.classList.remove('alt')});
      v.hidden=false;v.className='verdict '+(ok?'ok':'bad');v.innerHTML=(ok?'✓ Correcto: ':'✕ Era: ')+OP[q.a]+'<small>'+q.w+'</small>';
    });
    gid('wcr-next').addEventListener('click',next);stats();next();
  })();
})();
</script>

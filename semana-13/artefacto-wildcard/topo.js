  /* 5 · topología + ACL (estándar y extendida) */
  var DEST={net:[200,48,225,130],lan4:[192,168,4,150]};
  var SND=[{n:'Practicante .200',ip:[192,168,3,200],p:[[108,76],[210,76],[210,141],[390,141]]},{n:'PC .100',ip:[192,168,3,100],p:[[108,206],[210,206],[210,141],[390,141]]},{n:'Host .150',ip:[192,168,4,150],p:[[108,366],[390,366],[390,141]]}];
  var TAIL={net:[[780,141],[1010,141],[1010,300]],lan4:[[390,366],[190,366]]};
  function aceHit(e,k){return match(k.src,e.src,e.sw)&&(!e.dst||match(k.dst,e.dst,e.dw))&&(e.proto==='ip'||e.proto===k.proto)&&(e.port==null||e.port===k.port)}
  function topo(P,cfg){
    var g=function(s){return gid(P+'-'+s)};
    var aceBox=g('ace'),msg=g('msg'),dot=g('dot'),xs=g('x'),oks=g('ok'),tog=g('tog'),badge=g('badge'),bt=g('badget'),pre=g('pre'),note=g('note');
    var on=true,tok=0,st={d:'net',v:0,m:cfg.mode||'out'};
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
    topo('wce',{id:'101',name:'ACL 101',mode:null,
      svc:[{n:'Web (HTTP 80)',proto:'tcp',port:80},{n:'Web segura (HTTPS 443)',proto:'tcp',port:443},{n:'Ping (ICMP)',proto:'icmp',port:null},{n:'DNS (UDP 53)',proto:'udp',port:53}],
      ace:[Object.assign({a:'deny',proto:'tcp',port:80,txt:'access-list 101 deny tcp host 192.168.3.200 host 200.48.225.130 eq 80',t:'Solo la web del servidor, solo para el practicante'},h('192.168.3.200','0.0.0.0','200.48.225.130','0.0.0.0')),Object.assign({a:'permit',proto:'ip',port:null,txt:'access-list 101 permit ip any any',t:'Todo lo demás pasa: ping, DNS, HTTPS…'},h('0.0.0.0','255.255.255.255'))],
      pre:['Router1(config)#access-list 101 deny tcp 192.168.3.200 0.0.0.0 200.48.225.130 0.0.0.0 eq 80','Router1(config)#access-list 101 permit ip any any'],
      notes:{out:'Extendida cerca del origen: in en Fa0/0. El host .150 entra por Fa0/1, así que esta ACL ni lo mira. Sin el permit final, el deny implícito cortaría hasta el ping.'}});
    var o=gid('wce-msg');
  })();

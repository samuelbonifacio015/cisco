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
    var P=[['Host','192.168.1.1','0.0.0.0','192.168.1.1'],['/24 · toda la red','192.168.1.0','0.0.0.255','192.168.1.77'],['/26','192.168.1.64','0.0.0.63','192.168.1.100'],['/28','192.168.3.32','0.0.0.15','192.168.3.40'],['/23 · dos redes','192.168.10.0','0.0.1.255','192.168.11.9'],['Rango 16 a 31','192.168.16.0','0.0.15.255','192.168.20.5'],['Solo pares','192.168.10.120','0.0.0.254','192.168.10.10']];
    var fi=gid('wcb-ip'),fw=gid('wcb-w'),ft=gid('wcb-t'),g=gid('wcb-g'),v=gid('wcb-v');
    gid('wcb-pre').innerHTML=P.map(function(p,i){return '<button type="button" class="c-'+['mint','sky','lav','sun','rose','peach','mint'][i]+'" data-p="'+i+'">'+p[0]+'</button>'}).join('');
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

  /* 5 · topología + ACL */
  (function(){
    var ACE=[{a:'deny',ip:[192,168,3,200],w:[0,0,0,0],t:'Bloquea solo al practicante (.200)'},{a:'permit',ip:[192,168,3,0],w:[0,0,0,255],t:'Deja pasar el resto de 192.168.3.0/24'},{a:'permit',ip:[192,168,4,0],w:[0,0,0,255],t:'Deja pasar toda 192.168.4.0/24'}];
    var S=[{n:'Practicante .200',ip:[192,168,3,200],p:[[108,76],[210,76],[210,141],[390,141]]},{n:'PC .100',ip:[192,168,3,100],p:[[108,206],[210,206],[210,141],[390,141]]},{n:'Host .150',ip:[192,168,4,150],p:[[108,366],[390,366],[390,141]]}];
    var TAIL=[[780,141],[1010,141],[1010,300]];
    var aceBox=gid('wct-ace'),msg=gid('wct-msg'),dot=gid('wct-dot'),xs=gid('wct-x'),oks=gid('wct-ok'),tog=gid('wct-tog'),badge=gid('wct-badge'),bt=gid('wct-badget');
    var on=true,tok=0;
    aceBox.innerHTML=ACE.map(function(e,i){return '<div data-i="'+i+'"><i>'+(i+1)+'</i><span>'+e.a+' '+show(e.ip)+' '+show(e.w)+'<small>'+e.t+'</small></span></div>'}).join('')+'<div class="imp" data-i="3"><i>·</i><span>deny any (implícito)<small>Invisible: frena lo que ninguna fila aceptó</small></span></div>';
    gid('wct-send').innerHTML=S.map(function(s,i){return '<button class="btn" type="button" data-s="'+i+'">'+s.n+'</button>'}).join('');
    var rows=function(){return [].slice.call(aceBox.children)};
    function clear(){rows().forEach(function(r){r.className=r.dataset.i==='3'?'imp':''});xs.style.opacity=0;oks.style.opacity=0;dot.style.fill='var(--lav-d)'}
    function put(p){dot.setAttribute('cx',p[0]);dot.setAttribute('cy',p[1])}
    async function travel(pts,my){
      for(var i=0;i<pts.length-1;i++){var a=pts[i],b=pts[i+1],L=Math.hypot(b[0]-a[0],b[1]-a[1]),T=rm?0:L/0.6,t0=performance.now();
        while(true){if(my!==tok)return false;var k=T?Math.min(1,(performance.now()-t0)/T):1;put([a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k]);if(k>=1)break;await new Promise(requestAnimationFrame)}}
      return true;
    }
    async function run(i){
      var my=++tok,s=S[i];clear();msg.className='verdict ok';msg.textContent='Enviando desde '+show(s.ip)+'…';
      if(!await travel(s.p,my))return;
      var verdict=null;
      if(on){
        for(var j=0;j<ACE.length;j++){
          var r=rows()[j];r.classList.add('on');await sleep(650);if(my!==tok)return;
          if(match(s.ip,ACE[j].ip,ACE[j].w)){r.classList.remove('on');r.classList.add(ACE[j].a==='permit'?'ok':'no');verdict={a:ACE[j].a,j:j};
            rows().slice(j+1).forEach(function(x){x.classList.add('skip')});break}
          r.classList.remove('on');r.classList.add('skip');
        }
        if(!verdict){rows()[3].classList.add('no');verdict={a:'deny',j:3}}
      }else verdict={a:'permit',j:-1};
      if(verdict.a==='deny'){
        dot.style.fill='var(--rose-d)';xs.style.opacity=1;msg.className='verdict bad';
        msg.innerHTML='✕ Se descarta en Router1<small>'+show(s.ip)+' coincide con la fila '+(verdict.j+1)+' ('+(verdict.j===3?'deny implícito':'deny')+'). El router ya no revisa más filas.</small>';return}
      msg.className='verdict ok';
      msg.innerHTML='✓ Pasa a Internet<small>'+(verdict.j<0?'La ACL está apagada: todos pasan.':show(s.ip)+' coincide con la fila '+(verdict.j+1)+' (permit).')+'</small>';
      if(await travel([[390,141]].concat(TAIL),my))oks.style.opacity=1;
    }
    gid('wct-send').addEventListener('click',function(e){var b=e.target.closest('[data-s]');if(b)run(+b.dataset.s)});
    tog.addEventListener('click',function(){on=!on;tok++;clear();tog.setAttribute('aria-pressed',on);tog.textContent=on?'ACL activa':'ACL apagada';badge.style.fill=on?'var(--mint)':'var(--rose)';bt.textContent=on?'ACL 10 · out':'sin ACL';dot.setAttribute('cx',-60);msg.className='verdict ok';msg.textContent='Elige quién envía un paquete a Internet.'});
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
})();
</script>


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

/* Lógica do jogo: telas, pontuação, pistas e suspeitos. */
var st,app=document.getElementById('app');
function init(){st={v:'intro',i:0,tries:0,ok:false,sc:0,cl:[],fb:'',bad:[],done:0};draw()}
function tg(){var r=document.documentElement;var d=r.dataset.theme==='dark'||(!r.dataset.theme&&matchMedia('(prefers-color-scheme:dark)').matches);r.dataset.theme=d?'light':'dark'}
function flow(){var h='<div class="flow">';F.forEach(function(f,k){h+='<span class="'+(st.v==='end'||k<st.done?'done':k===st.i&&st.v==='stage'?'on':'')+'">'+f+'</span>'});return h+'</div>'}
function side(){var p=Math.round((st.v==='end'?7:st.done)/7*100);var h='<aside class="card side"><div class="tube"><div class="tb"><i style="height:'+p+'%"></i></div><div><h3>📓 Caderno do caso</h3><div style="color:var(--mut);font-size:13px">Amostra analisada: '+p+'%</div></div></div><h3>🕵️ Suspeitos</h3>';
SUS.forEach(function(s){var o=st.done>s.at;h+='<div class="sus '+(o?'out':'')+'"><span>'+s.n+'</span>'+(o?'<em>'+s.w+'</em>':'')+'</div>'});
h+='<h3 style="margin-top:14px">🔎 Pistas</h3>';if(!st.cl.length)h+='<div class="clue" style="color:var(--mut)">Nenhuma ainda.</div>';
st.cl.forEach(function(c){h+='<div class="clue">'+c+'</div>'});return h+'</aside>'}
function draw(){document.getElementById('pts').textContent=st.v==='intro'?'':'⭐ '+st.sc+' pts';
if(st.v==='intro'){app.innerHTML='<div class="card" style="padding:32px 24px"><div class="stamp">Caso confidencial</div><h1>Caso Maria: o mistério do líquido amniótico</h1><div class="art">'+ART_I+'</div><p style="max-width:60ch">Você é o(a) analista do laboratório. Siga a amostra da coleta até a interpretação, responda a cada etapa e descubra o diagnóstico antes do obstetra. Cada fase revela novas pistas e elimina suspeitos.</p><div class="how"><span>1. Leia a cena</span><span>2. Responda</span><span>3. Colete pistas</span><span>4. Dê o diagnóstico</span></div><button class="btn" onclick="st.v=\'stage\';draw()">▶ Abrir o prontuário</button></div>';return}
if(st.v==='end'){end();return}
var s=S[st.i],h=flow()+'<div class="grid"><div class="card"><div class="step">Etapa '+(st.i+1)+' de 7</div><h2>'+s.t+'</h2><div class="dlg">'+GUIDE+'<div class="story">'+s.st+'</div></div><div class="art">'+ART[st.i]+'</div><h3>'+s.q+'</h3>';
s.o.forEach(function(o,j){var b=st.bad.indexOf(j)>-1,g=st.ok&&o[1];h+='<button class="opt '+(b?'bad':g?'good':'')+'" '+(st.ok||b?'disabled':'')+' onclick="pick('+j+')"><b class="ltr">'+'ABCD'.charAt(j)+'</b><span>'+o[0]+'</span></button>'});
if(st.fb)h+='<div class="fb '+(st.ok?'ok':'bad')+'" role="status">'+st.fb+'</div>';
if(st.ok){if(s.rv)h+='<h3>Resultados</h3>'+s.rv;h+='<div class="note"><h3>'+s.n[0]+'</h3>'+s.n[1]+'</div><p style="margin-top:16px"><button class="btn" onclick="nxt()">Próxima etapa ▶</button></p>'}
app.innerHTML=h+'</div>'+side()+'</div>'}
function pick(j){var s=S[st.i],o=s.o[j];st.fb=o[2];if(o[1]){var a=s.final?[40,20,10]:[10,5,0];st.sc+=a[Math.min(st.tries,2)];st.ok=true;if(s.c)st.cl.push(s.c);st.done=st.i+1}else{st.tries++;st.bad.push(j)}draw()}
function nxt(){if(S[st.i].final){st.v='end'}else{st.i++;st.tries=0;st.ok=false;st.fb='';st.bad=[]}draw();window.scrollTo(0,0)}
function end(){var r=st.sc>=90?'Perito(a) chefe':st.sc>=70?'Detetive clínico':st.sc>=50?'Estagiário(a) promissor(a)':'De volta ao laboratório';
app.innerHTML=flow()+'<div class="grid"><div class="card"><div class="stamp">Caso resolvido</div><div class="art">'+ART_E+'</div><h1>'+r+'</h1><div class="big">'+st.sc+'/100</div><p><b>Diagnóstico:</b> defeito aberto do tubo neural. A AFP muito alta e a AChE positiva mostram que o conteúdo fetal extravasa para o líquido. O cariótipo normal, a bilirrubina normal e o PCR negativo descartaram Down, doença hemolítica e infecção. Prevenção: ácido fólico antes e no início da gestação.</p><h2 style="margin-top:22px">Ficha completa do líquido amniótico</h2><div class="scroll"><table>'+
[['Origem','Filtrado materno e membranas; depois urina e secreção pulmonar fetal'],['Função','Proteção mecânica e térmica, movimento fetal, desenvolvimento pulmonar, barreira antimicrobiana'],['Indicações','Cariótipo, defeitos do tubo neural, infecções, hemólise, maturidade pulmonar'],['Coleta','Amniocentese transabdominal guiada por ultrassom, a partir de 15 a 16 semanas'],['Recipiente','Tubo estéril, âmbar ou protegido da luz'],['Conservação e transporte','Identificado, rápido, sem congelar a parte da cultura'],['Aspecto normal','Incolor a amarelo-pálido, límpido'],['Bioquímica','AFP, acetilcolinesterase, bilirrubina (ΔDO 450), L/E'],['Análise celular','Cultura de amniócitos, cariótipo, QF-PCR, FISH, PCR de infecções'],['Alterações','AFP alta (tubo neural), bilirrubina alta (hemólise), verde (mecônio), turvo (infecção), cariótipo alterado']].map(function(r){return'<tr><th>'+r[0]+'</th><td>'+r[1]+'</td></tr>'}).join('')+
'</table></div><p style="margin-top:16px"><button class="btn" onclick="init()">Jogar de novo</button></p><p style="color:var(--mut);font-size:13px">Caso fictício, criado para fins didáticos.</p></div>'+side()+'</div>'}
init();

/* teclado: A-D ou 1-4 escolhem a resposta */
document.addEventListener('keydown',function(ev){if(ev.ctrlKey||ev.metaKey||ev.altKey||st.v!=='stage'||st.ok)return;var k=ev.key.toLowerCase(),j='abcd'.indexOf(k);if(j<0)j='1234'.indexOf(k);if(j>-1&&j<S[st.i].o.length&&st.bad.indexOf(j)<0)pick(j)});

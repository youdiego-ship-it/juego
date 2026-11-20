/* Cofre de oro y tienda del guardián */
var G={gold:'#f2c35a'};
var SIMG=['cofre','escudo','lampara','est_paloma','est_estrella','pista','est_cruz','aura','tit_valiente','tit_sabio','tit_fiel'];
function ico(k,s){s=s||64;if(SIMG.indexOf(k)>=0)return '<img class="sico" src="img/shop/'+k+'.jpg" width="'+s+'" height="'+s+'" alt="">';var g='<defs><linearGradient id="go'+k+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a6"/><stop offset=".5" stop-color="#e2a93a"/><stop offset="1" stop-color="#8a5a12"/></linearGradient></defs>';
var f='url(#go'+k+')',I={
cofre:'<path d="M8 30 Q8 12 32 12 Q56 12 56 30Z" fill="#6b3a17" stroke="'+f+'" stroke-width="3"/><rect x="8" y="30" width="48" height="24" rx="2" fill="#5a2f12" stroke="'+f+'" stroke-width="3"/><rect x="8" y="29" width="48" height="5" fill="'+f+'"/><rect x="28" y="27" width="8" height="12" rx="1" fill="'+f+'"/><circle cx="32" cy="35" r="1.6" fill="#3a1d08"/><path d="M14 12v42M50 12v42" stroke="'+f+'" stroke-width="2.5" opacity=".8"/>',
moneda:'<circle cx="32" cy="32" r="22" fill="'+f+'" stroke="#7a4c0e" stroke-width="2"/><circle cx="32" cy="32" r="16" fill="none" stroke="#fff3c4" stroke-opacity=".6" stroke-width="1.5"/><path d="M32 21v22M24 29h16" stroke="#7a4c0e" stroke-width="3" stroke-linecap="round"/>',
pista:'<path d="M14 14h32v36H18a4 4 0 0 1-4-4Z" fill="#e9d7a8" stroke="#8a6a2f" stroke-width="2"/><rect x="10" y="10" width="40" height="7" rx="3.5" fill="'+f+'"/><rect x="14" y="47" width="40" height="7" rx="3.5" fill="'+f+'"/><path d="M20 25h20M20 31h20M20 37h14" stroke="#7a5a2a" stroke-width="2"/>',
escudo:'<path d="M32 6 54 14v16c0 15-10 24-22 30C20 54 10 45 10 30V14Z" fill="#1d3b78" stroke="'+f+'" stroke-width="3.5"/><path d="M32 16v30M22 28h20" stroke="'+f+'" stroke-width="4" stroke-linecap="round"/>',
lampara:'<path d="M12 40 Q32 54 52 40 L46 34 H18Z" fill="'+f+'" stroke="#7a4c0e" stroke-width="2"/><path d="M50 37 Q60 32 56 26" fill="none" stroke="'+f+'" stroke-width="3"/><path d="M14 38 Q8 34 10 30" fill="none" stroke="'+f+'" stroke-width="3"/><path d="M32 10 Q40 22 32 30 Q24 22 32 10Z" fill="#ffd35a"/><circle cx="32" cy="22" r="14" fill="#ffd35a" opacity=".18"/>',
aura:'<circle cx="32" cy="32" r="12" fill="#fff4c8"/>'+[0,1,2,3,4,5,6,7,8,9,10,11].map(function(i){var a=i*Math.PI/6;return '<path d="M'+(32+Math.cos(a)*16)+' '+(32+Math.sin(a)*16)+'L'+(32+Math.cos(a)*27)+' '+(32+Math.sin(a)*27)+'" stroke="'+f+'" stroke-width="3" stroke-linecap="round"/>'}).join(''),
est_cruz:'<path d="M18 6h28v44l-14-8-14 8Z" fill="#7a1a14" stroke="'+f+'" stroke-width="2.5"/><path d="M32 14v22M24 21h16" stroke="'+f+'" stroke-width="4" stroke-linecap="round"/><path d="M14 6h36" stroke="'+f+'" stroke-width="3"/>',
est_paloma:'<path d="M18 6h28v44l-14-8-14 8Z" fill="#e8e8f2" stroke="'+f+'" stroke-width="2.5"/><path d="M22 28c6-1 9-6 10-11 2 5 6 9 11 9-4 3-8 4-12 3-3 2-6 2-9-1Z" fill="#2a4a8a"/><path d="M14 6h36" stroke="'+f+'" stroke-width="3"/>',
est_estrella:'<path d="M18 6h28v44l-14-8-14 8Z" fill="#1d3b78" stroke="'+f+'" stroke-width="2.5"/><path d="M32 14l3.5 8 8.5.8-6.5 5.6 2 8.4L32 32.5 24.5 36.8l2-8.4-6.5-5.6 8.5-.8Z" fill="'+f+'"/><path d="M14 6h36" stroke="'+f+'" stroke-width="3"/>',
titulo:'<path d="M8 22h48v20H8Z" fill="#e9d7a8" stroke="#8a6a2f" stroke-width="2"/><path d="M8 22l-4 10 4 10M56 22l4 10-4 10" fill="#c9a45c" stroke="#8a6a2f" stroke-width="2"/><path d="M16 32h32" stroke="#7a5a2a" stroke-width="3"/>'
};
return '<svg viewBox="0 0 64 64" width="'+s+'" height="'+s+'" aria-hidden="true">'+g+(I[k]||I.moneda)+'</svg>'}

var SHOP=[
{id:'pista',t:'Pergamino de pista',ico:'pista',p:40,c:1,d:'En un desafío, elimina una respuesta incorrecta.'},
{id:'escudo',t:'Escudo de la fe',ico:'escudo',p:80,c:1,d:'Si te equivocas, te protege: puedes volver a intentar esa pregunta.'},
{id:'lampara',t:'Lámpara de la Palabra',ico:'lampara',p:90,c:1,d:'Ilumina el camino: deja solo dos respuestas, y una es la correcta.'},
{id:'est_cruz',t:'Estandarte de la Cruz',ico:'est_cruz',p:150,g:'est',d:'Un estandarte rojo que acompaña tu nombre.'},
{id:'est_paloma',t:'Estandarte de la Paloma',ico:'est_paloma',p:150,g:'est',d:'La paloma, señal del Espíritu Santo.'},
{id:'est_estrella',t:'Estandarte de la Estrella',ico:'est_estrella',p:200,g:'est',d:'La estrella que guio a los magos.'},
{id:'tit_valiente',t:'Título «el Valiente»',ico:'tit_valiente',p:100,g:'tit',v:'el Valiente',d:'«Esfuérzate y sé valiente» (Josué 1:9).'},
{id:'tit_sabio',t:'Título «el Sabio»',ico:'tit_sabio',p:100,g:'tit',v:'el Sabio',d:'Como Salomón, que pidió sabiduría.'},
{id:'tit_fiel',t:'Título «el Fiel»',ico:'tit_fiel',p:100,g:'tit',v:'el Fiel',d:'«Sé fiel hasta la muerte» (Apocalipsis 2:10).'},
{id:'aura',t:'Aura de luz',ico:'aura',p:450,g:'aura',d:'Tu guardián brilla con luz dorada. «Vosotros sois la luz del mundo».'}];
var MULT={facil:5,normal:10,experto:15};

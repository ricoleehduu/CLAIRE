'use strict';
(() => {
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let metal='amalgam', method='amifound', loadVersion=0;
const names={amifound:'AMIFound',horuseye:'HorusEye',reference:'Clean reference'};
const range=$('#compare-range');
function split(){ $('#compare').style.setProperty('--split',range.value+'%');range.setAttribute('aria-valuetext',range.value+' percent metal-affected image'); }
range.addEventListener('input',split);
async function changeImages(){
 const version=++loadVersion, before=`assets/${metal}-before.webp`,after=`assets/${metal}-${method}.webp`;
 $('#image-status').textContent='Loading comparison';
 try {
  await Promise.all([before,after].map(src=>new Promise((resolve,reject)=>{const img=new Image();img.onload=resolve;img.onerror=reject;img.src=src;})));
  if(version!==loadVersion)return;
  $('#before-image').src=before;$('#after-image').src=after;
  $('#before-image').alt=`ToothFairy3 slice with simulated ${metal} artifacts`;
  $('#after-image').alt=`${names[method]} of the same simulated ${metal} slice`;
  $('#after-label').textContent=method==='reference'?'CLEAN REFERENCE':'RESTORED';
  $('#image-status').textContent=`${metal} comparison ready, ${names[method]}`;
 }catch{if(version===loadVersion)$('#image-status').textContent='Could not load this comparison. Please try again.';}
}
$$('[data-metal]').forEach(b=>b.addEventListener('click',()=>{metal=b.dataset.metal;$$('[data-metal]').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active));});changeImages();}));
$('#method-select').addEventListener('change',e=>{method=e.target.value;changeImages();});
$('#expand-viewer').addEventListener('click',()=>{$('#modal-before').src=$('#before-image').src;$('#modal-after').src=$('#after-image').src;$('#modal-label').textContent=names[method];$('#image-dialog').showModal();});
$('#close-viewer').addEventListener('click',()=>$('#image-dialog').close());
$('#image-dialog').addEventListener('click',e=>{if(e.target===$('#image-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
$('.menu-toggle').addEventListener('click',()=>{const opened=$('.nav nav').classList.toggle('open');$('.menu-toggle').setAttribute('aria-expanded',String(opened));$('.menu-toggle').setAttribute('aria-label',opened?'Close navigation':'Open navigation');});
$$('.nav nav a').forEach(a=>a.addEventListener('click',()=>{$('.nav nav').classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false');}));
const rubric={
 crown:[['C1','Margin sharpness','Is the crown/bridge margin sharp and clearly traceable, without over-smoothing or over-sharpening?'],['C2','Geometric accuracy','Is the crown/bridge shape geometrically accurate with a recognizable contour?'],['C3','Contact clarity','Are the contact areas and connector boundaries distinct and distinguishable?'],['C4','Margin continuity','Can the crown/bridge margin be followed continuously without interruption?'],['C5','Internal density','Is the crown/bridge internal density relatively uniform, without abnormal dark bands or streaks?']],
 adjacent:[['N1','Tooth contour','Is the adjacent tooth contour intact and traceable?'],['N2','Anatomical visibility','Are the adjacent tooth anatomical structures recognizable?'],['N3','Interproximal space','Is the interproximal space clear and distinguishable?'],['N4','Edge sharpness','Is the adjacent tooth edge sharp and clear?'],['N5','Enamel–dentin junction','Is the enamel-dentin junction (DEJ) clear and identifiable?']]
};
let region='crown',answers={},locked=null,finalAnswers={},events=[],evidence={};
const answerNames={yes:'Yes',no:'No',uncertain:'Cannot determine'};
function renderRubric(){
 $('#rubric-items').innerHTML=rubric[region].map(([code,title,question])=>`<div class="rubric-row"><div class="rubric-item-name"><small>${code}</small><span title="${safe(question)}">${title}</span></div><div class="answer-options" role="group" aria-label="${safe(code+': '+question)}">${[['yes','Y','Yes'],['no','N','No'],['uncertain','?','Cannot determine']].map(([value,label,full])=>`<button type="button" data-item="${code}" data-answer="${value}" aria-label="${code}: ${full}" aria-pressed="false" title="${full}">${label}</button>`).join('')}</div></div>`).join('');
 $('#answer-progress').textContent='0 of 5 observations recorded';$('#lock-button').disabled=true;
}
$('#rubric-items').addEventListener('click',e=>{
 const b=e.target.closest('[data-answer]');if(!b||locked)return;
 answers[b.dataset.item]=b.dataset.answer;
 $$(`[data-item="${b.dataset.item}"]`).forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
 const count=Object.keys(answers).length;$('#answer-progress').textContent=`${count} of 5 observations recorded`;$('#lock-button').disabled=count!==5;
});
$('#rubric-region').addEventListener('change',e=>{if(locked)return;region=e.target.value;answers={};renderRubric();});
function progress(n){$$('[data-step]').forEach(x=>x.classList.toggle('active',Number(x.dataset.step)<=n));}
function audit(){
 $('#audit-body').innerHTML=rubric[region].map(([code,title])=>`<tr><td>${code} · ${title}</td><td>${answerNames[locked.answers[code]]}</td><td>${answerNames[finalAnswers[code]]}</td><td>${safe(evidence[code]||'Original observation retained')}</td></tr>`).join('');
}
$('#lock-button').addEventListener('click',()=>{
 if(locked||Object.keys(answers).length!==5)return;
 locked=Object.freeze({answers:Object.freeze({...answers}),region,visualEvidence:$('#observation-note').value.trim(),lockedAt:new Date().toISOString()});
 finalAnswers={...answers};events=[{action:'LOCK',at:locked.lockedAt}];
 $$('[data-answer]').forEach(x=>x.disabled=true);$('#observation-note').disabled=true;$('#rubric-region').disabled=true;$('#lock-button').disabled=true;$('#lock-button').textContent='Observation locked ✓';$('#answer-progress').textContent='Original answers are immutable';
 $('#reference-stage').hidden=false;progress(2);
 const cards=window.LAB.demo.filter(x=>x.tasks.includes(region)).slice(0,3);
 $('#precedent-cards').innerHTML=cards.map((c,i)=>`<article class="precedent-card">${window.phantom(c.seed+40)}<div><h4>Illustrative precedent ${String(i+1).padStart(2,'0')}</h4><p>Synthetic teaching card · not expert labels</p><div class="precedent-labels">${c.ratings.filter(r=>r.task===region).map((r,j)=>`<span>${rubric[region][j][0]}: ${r.value?'Y':'N'}</span>`).join('')}</div></div></article>`).join('');
 $('#revise-item').innerHTML=rubric[region].map(([code,title])=>`<option value="${code}">${code} · ${title}</option>`).join('');audit();
 $('#reference-stage').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
});
$('#apply-revision').addEventListener('click',()=>{
 if(!locked)return;
 const item=$('#revise-item').value,value=$('#revise-answer').value,reason=$('#revision-reason').value.trim();
 if(!reason){events.push({action:'REJECT',item,reason:'Missing visual evidence',at:new Date().toISOString()});$('#revision-status').textContent='Revision rejected: add visual evidence from the query image. The current answer is unchanged.';return;}
 if(value===finalAnswers[item]){$('#revision-status').textContent='That is already the current answer. Choose another answer or keep the original.';return;}
 events.push({action:'REVISE',item,from:finalAnswers[item],to:value,reason,at:new Date().toISOString()});finalAnswers[item]=value;evidence[item]=reason;
 $('#revision-status').textContent=`${item} revised. The locked answer remains ${answerNames[locked.answers[item]]}.`;$('#revision-reason').value='';progress(3);audit();
});
$('#keep-original').addEventListener('click',()=>{if(!locked)return;const item=$('#revise-item').value;finalAnswers[item]=locked.answers[item];evidence[item]='Kept locked observation';events.push({action:'KEEP',item,at:new Date().toISOString()});$('#revision-status').textContent=`${item}: locked observation retained.`;progress(3);audit();});
$('#download-audit').addEventListener('click',()=>{
 if(!locked)return;
 const convert=a=>Object.fromEntries(Object.entries(a).map(([key,v])=>[key,v==='uncertain'?null:v==='yes']));
 const record={schema:'claire-walkthrough-v1',status:'visitor_demonstration_not_expert_ground_truth',sample:'ToothFairy3S_0026_z0052_amalgam_amifound',region,original:{...locked,answers:convert(locked.answers)},final:{answers:convert(finalAnswers),evidence},events,precedents:'synthetic_teaching_cards_not_retrieval',modelInference:false};
 const url=URL.createObjectURL(new Blob([JSON.stringify(record,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='claire-observation-audit.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
$('#reset-protocol').addEventListener('click',()=>{locked=null;answers={};finalAnswers={};evidence={};events=[];$('#reference-stage').hidden=true;$('#observation-note').value='';$('#observation-note').disabled=false;$('#rubric-region').disabled=false;$('#lock-button').innerHTML='Lock observation <span>↗</span>';$('#revision-reason').value='';$('#revision-status').textContent='A revision needs visual evidence. Without it, the locked observation is retained.';progress(0);renderRubric();$('#rubric-region').focus();});
renderRubric();
// Reuse the existing atlas source counts, aligning display labels with the manuscript.
const sourceNames={'Shenzhen University':'Collection G / STS24'};
$('#source-bars').innerHTML=window.LAB.sources.map(([name,cases,pairs])=>`<div class="source-row"><span>${safe(sourceNames[name]||name)}</span><div class="source-track" role="img" aria-label="${safe(name)}: ${pairs.toLocaleString()} pairs"><span style="width:${pairs/3046*100}%"></span></div><b>${pairs.toLocaleString()}</b></div>`).join('');
const results=[{name:'Native',detail:'R0 · no grounding',agreement:[29,33.1],coverage:[100,100]},{name:'CLAIRE-Base',detail:'R1 · clinical standard',agreement:[45.5,49.6],coverage:[100,99]},{name:'CLAIRE-Loc',detail:'R2 · localized rubric',agreement:[48.6,60.8],coverage:[99.5,93.3]},{name:'CLAIRE-Lock',detail:'R3 · observation locked',agreement:[42.5,62.8],coverage:[99.5,97.6]}];
function drawResults(metric){
 $('#result-bars').innerHTML=results.map(r=>`<div class="result-row"><div class="result-name">${r.name}<span>${r.detail}</span></div><div class="bar-pair">${r[metric].map((v,i)=>`<div class="result-bar ${i?'adjacent':''}" style="width:${v}%" role="img" aria-label="${r.name}, ${i?'adjacent':'crown'} ${metric}: ${v}%"><span>${v.toFixed(1)}</span></div>`).join('')}</div></div>`).join('');
 $('#result-description').textContent=metric==='agreement'?'Item agreement is measured on valid responses. CLAIRE-Loc raises agreement from 29.0% / 33.1% to 48.6% / 60.8%; locking targets retrieval stability, not a guaranteed increase over localization.':'Valid coverage is reported separately from item agreement. CLAIRE-Lock maintains 99.5% / 97.6% coverage. High coverage alone does not demonstrate correctness.';
}
$$('[data-result]').forEach(b=>b.addEventListener('click',()=>{$$('[data-result]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});drawResults(b.dataset.result);}));drawResults('agreement');
})();

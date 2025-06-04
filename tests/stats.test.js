const assert = require('assert');

function pad(n){
  return String(n).padStart(2,'0');
}

function parseFrDate(str){
  if (typeof str !== 'string') return null;
  str = str.trim();
  const monthNames = {
    'janvier':1,'février':2,'fevrier':2,'mars':3,'avril':4,
    'mai':5,'juin':6,'juillet':7,'août':8,'aout':8,
    'septembre':9,'octobre':10,'novembre':11,'décembre':12,'decembre':12
  };
  let m=str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if(m){
    let[,j,mois,an]=m.map(Number);
    if(an<100) an+=2000;
    const d=new Date(an,mois-1,j);
    if(d.getFullYear()===an && d.getMonth()===mois-1 && d.getDate()===j) return d;
    return null;
  }
  m=str.match(/^(\d{1,2})\s+([\p{L}]+)/iu);
  if(m){
    let j=parseInt(m[1],10);
    let reste=str.slice(m[0].length).trim();
    const moisNom=m[2].toLowerCase();
    const mois=monthNames[moisNom];
    if(!mois) return null;
    m=reste.match(/^(\d{2,4})$/);
    if(!m) return null;
    let an=parseInt(m[1],10);
    if(an<100) an+=2000;
    const d=new Date(an,mois-1,j);
    if(d.getFullYear()===an && d.getMonth()===mois-1 && d.getDate()===j) return d;
  }
  return null;
}

function updateStatsData(rows){
  const byJur={};
  rows.forEach(r=>{
    const j=r.Court||r.Juridiction||'–';
    byJur[j]=(byJur[j]||0)+1;
  });
  const byYear={};
  rows.forEach(r=>{
    const d=parseFrDate(r.Date||r.Dates)||new Date(r.Date||r.Dates);
    if(!isNaN(d)) byYear[d.getFullYear()]=(byYear[d.getFullYear()]||0)+1;
  });
  const years=Object.keys(byYear).map(Number).sort((a,b)=>b-a).slice(0,3);
  const monthly={}, juris=new Set();
  rows.forEach(r=>{
    const d=parseFrDate(r.Date||r.Dates)||new Date(r.Date||r.Dates); if(isNaN(d)) return;
    const m=`${d.getFullYear()}-${pad(d.getMonth()+1)}`;
    const j=r.Court||r.Juridiction||'–';
    monthly[m]=monthly[m]||{};
    monthly[m][j]=(monthly[m][j]||0)+1;
    juris.add(j);
  });
  const months=Object.keys(monthly).sort();
  const lineDatasets=[...juris].map(j=>({label:j,data:months.map(m=>monthly[m][j]||0)}));
  const jurChart={labels:Object.keys(byJur),data:Object.values(byJur)};
  const lineChart={labels:months,datasets:lineDatasets};
  return {total:rows.length,byJur,byYear,years,jurChart,lineChart};
}

(function run(){
  const store={
    main:[
      {Date:'15/02/2024',Court:'Tribunal A',Dates:'15/02/2024'},
      {Date:'01/01/2023',Court:'Tribunal B',Dates:'01/01/2023'},
      {Date:'20/03/2024',Court:'Tribunal A',Dates:'20/03/2024'},
      {Date:'05/06/2022',Court:'Tribunal C',Dates:'05/06/2022'}
    ]
  };
  const stats=updateStatsData(store.main);
  assert.strictEqual(stats.total,4);
  assert.strictEqual(stats.byJur['Tribunal A'],2);
  assert.strictEqual(stats.byYear[2024],2);
  assert.deepStrictEqual(stats.jurChart.labels,['Tribunal A','Tribunal B','Tribunal C']);
  assert.deepStrictEqual(stats.jurChart.data,[2,1,1]);
  assert.deepStrictEqual(stats.lineChart.labels,['2022-06','2023-01','2024-02','2024-03']);
  const dsA=stats.lineChart.datasets.find(d=>d.label==='Tribunal A');
  assert.deepStrictEqual(dsA.data,[0,0,1,1]);
  console.log('Tous les tests updateStats passent.');
})();

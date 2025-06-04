const assert = require('assert');

function computeDuplicates(store){
  const map = {};
  const add = (num, tbl) => {
    num = String(num || '').trim();
    if(!num) return;
    if(!map[num]) map[num] = {count:0,tables:new Set()};
    map[num].count++;
    map[num].tables.add(tbl);
  };
  store.retained.forEach(r=>{
    add(r["Numéro de l'affaire"],'Retenues');
    add(r["Numéro de l'ordonnance"],'Retenues');
  });
  store.excluded.forEach(r=>{
    add(r["Numéro de l'affaire"],'Exclues');
    add(r["Numéro de l'ordonnance"],'Exclues');
  });
  return Object.entries(map)
    .filter(([_,v])=>v.count>1)
    .map(([num,v])=>({num,count:v.count,tables:[...v.tables]}));
}

(function run(){
  const store = {
    retained:[
      {"Numéro de l'affaire":"123","Numéro de l'ordonnance":"A1"},
      {"Numéro de l'affaire":"124","Numéro de l'ordonnance":"A2"}
    ],
    excluded:[
      {"Numéro de l'affaire":"125","Numéro de l'ordonnance":"A3"},
      {"Numéro de l'affaire":"123","Numéro de l'ordonnance":"A4"}
    ]
  };
  const res = computeDuplicates(store);
  assert.strictEqual(res.length,1);
  assert.strictEqual(res[0].num,'123');
  assert.strictEqual(res[0].count,2);
  assert.deepStrictEqual(res[0].tables.sort(),['Exclues','Retenues']);
  console.log('Tous les tests computeDuplicates passent.');
})();

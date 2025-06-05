const assert = require('assert');

function computeFlags(store){
  const toTokens=v=>String(v||'').split(/\s+/).filter(Boolean);
  const rSet=new Set(
    store.retained.flatMap(r=>[
      ...toTokens(r["Numéro de l'affaire"]),
      ...toTokens(r["Numéro de l'ordonnance"])
    ])
  );
  const eSet=new Set(
    store.excluded.flatMap(r=>[
      ...toTokens(r["Numéro de l'affaire"]),
      ...toTokens(r["Numéro de l'ordonnance"])
    ])
  );
  store.main.forEach(row=>{
    const ids=toTokens(row.Registry);
    row._flag = ids.some(t=>eSet.has(t))   ? 'excluded'
               : ids.some(t=>rSet.has(t)) ? 'retained'
               : null;
  });
}

(function run(){
  const store={
    main:[
      {Registry:'A123'},
      {Registry:'A456'},
      {Registry:'O1 A456'},
      {Registry:'O1 A123'},
      {Registry:'A789'}
    ],
    retained:[
      {"Numéro de l'affaire":"A123","Numéro de l'ordonnance":"O1"}
    ],
    excluded:[
      {"Numéro de l'affaire":"A456","Numéro de l'ordonnance":"O2"}
    ]
  };
  computeFlags(store);
  assert.strictEqual(store.main[0]._flag,'retained');
  assert.strictEqual(store.main[1]._flag,'excluded');
  assert.strictEqual(store.main[2]._flag,'excluded');
  assert.strictEqual(store.main[3]._flag,'retained');
  assert.strictEqual(store.main[4]._flag,null);
  console.log('Tous les tests computeFlags passent.');
})();

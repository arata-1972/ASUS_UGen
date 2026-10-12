import test from'node:test';import assert from'node:assert/strict';import{CareNote,fixture,spans,csvCell,hash}from'../core.mjs';
function ready(){const s=new CareNote();s.load(fixture);for(const f of s.flags())s.resolve(f.id,'Checked synthetic source');s.approve('Demo reviewer');return s}
test('exact source spans roundtrip',()=>{for(const s of spans(fixture))assert.equal(fixture.slice(s.start,s.end),s.text)});
test('faithful draft copies source without diagnosis',()=>{const s=new CareNote();s.load(fixture);assert.equal(s.items.map(i=>i.value).join(''),fixture)});
test('left and right discrepancy flag',()=>{const s=new CareNote();s.load(fixture,{controlledFault:true});assert.match(s.flags().find(f=>f.type==='SIDE').label,/inconsistent/)});
test('quantity discrepancy flag',()=>{const s=new CareNote();s.load(fixture,{controlledFault:true});assert.match(s.flags().find(f=>f.type==='QUANTITY').label,/inconsistent/)});
test('negation candidate preserves evidence',()=>{const s=new CareNote();s.load(fixture);assert.equal(s.flags().find(f=>f.type==='NEGATION').evidence.text,'沒有頭暈。')});
test('unspecified units flagged',()=>{const s=new CareNote();s.load('喝水200，單位未記載。');assert.ok(s.flags().some(f=>f.type==='MISSING_UNIT'))});
test('approval blocked by unresolved checks',()=>{const s=new CareNote();s.load(fixture);assert.throws(()=>s.approve('Reviewer'),/REVIEW_REQUIRED/)});
test('export blocked before approval',()=>{const s=new CareNote();s.load(fixture);assert.throws(()=>s.export('json'),/APPROVAL_REQUIRED/)});
test('draft edit invalidates approval and resolutions',()=>{const s=ready();s.editItem(s.items[0].id,s.items[0].value+'（確認）');assert.equal(s.approval,null);assert.ok(s.flags().every(f=>!f.resolved))});
test('source edit invalidates approved hash',()=>{const s=ready();const before=s.source;s.editSource(before+'時間未確認。');assert.throws(()=>s.export('json'),/APPROVAL_REQUIRED/)});
test('export hash recheck catches unauthorized mutation',()=>{const s=ready();s.items[0].value='changed';assert.throws(()=>s.export('json'),/APPROVAL_REQUIRED/)});
test('JSON CSV share same approved version and audit',()=>{const s=ready(),j=JSON.parse(s.export('json')),c=s.export('csv');assert.equal(j.approval.source_hash,hash(fixture));assert.ok(c.includes(j.approval.source_hash));assert.ok(c.includes('review_resolved'));assert.equal(j.events.at(-1).type,'approved')});
test('CSV quotes comma newline quote and neutralizes formula',()=>{assert.equal(csvCell('a,"b\nc'), '"a,""b\nc"');assert.equal(csvCell('=1+1'),'"\'=1+1"')});
test('empty reviewer or resolution rejected',()=>{const s=new CareNote();s.load(fixture);assert.throws(()=>s.resolve(s.flags()[0].id,''),/INVALID_RESOLUTION/);assert.throws(()=>s.approve(''),/REVIEW_REQUIRED/)});

test('review decision change requires new approval',()=>{const s=ready();s.resolve(s.flags()[0].id,'Changed source check');assert.equal(s.approval,null);assert.throws(()=>s.export('json'),/APPROVAL_REQUIRED/)});
test('review hash detects mutation after approval',()=>{const s=ready();s.resolutions[s.flags()[0].id].note='tampered';assert.throws(()=>s.export('csv'),/APPROVAL_REQUIRED/)});

import{controls}from'../public/ui-state.mjs';
test('unsaved source draft or review text locks controls even for approved content',()=>{const s=ready().snapshot();assert.equal(controls(s,false).export,true);assert.equal(controls(s,true).export,false);assert.equal(controls(s,true).approve,false);assert.match(controls(s,true).approvalText,/Unsaved/)});

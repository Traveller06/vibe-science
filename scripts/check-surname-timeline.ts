import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
// @ts-ignore Node executes the explicit TypeScript extension.
import {SCENES,CAPTIONS,TOTAL_FRAMES,FPS} from '../src/SurnameEvolution/script.ts';
assert.equal(FPS,30); assert.equal(TOTAL_FRAMES,3600);
assert.deepEqual([...SCENES.map((s: {start:number})=>s.start),TOTAL_FRAMES],[0,450,1200,1800,2550,3240,3600]);
for(let i=0;i<SCENES.length;i++) assert.equal(SCENES[i].start+SCENES[i].duration,SCENES[i+1]?.start??TOTAL_FRAMES);
for(let i=0;i<CAPTIONS.length;i++) {
 const c=CAPTIONS[i]; assert(c.start>=0&&c.end>c.start&&c.end<=TOTAL_FRAMES); assert(c.start>=(CAPTIONS[i-1]?.end??0));
 assert(SCENES.some((s: {start:number;duration:number})=>c.start>=s.start&&c.end<=s.start+s.duration));
 assert(c.text.length<=60,'Caption exceeds two-line budget');
}
const draft=readFileSync('docs/surname-video-draft.md','utf8');
for(const c of CAPTIONS) assert(draft.includes(c.text),`Unapproved narration: ${c.text}`);
assert.equal(CAPTIONS.length,22);
console.log('PASS: 6 contiguous scenes, 22 approved caption cues, 3600 frames');

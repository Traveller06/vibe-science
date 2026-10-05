"""Build a reproducible mix and captions from cached measured voice takes.
Requires FFmpeg and numpy. Voice generation is a separate resumable step.
"""
import json,math,subprocess,wave
from pathlib import Path
import numpy as np
root=Path(__file__).resolve().parent.parent
work=root/'out/audio-work'; dest=root/'public/surname'; dest.mkdir(parents=True,exist_ok=True)
takes=json.loads((work/'takes.json').read_text())
fps=30;sr=48000;bounds=[0,450,1200,1800,2550,3240,3720];duration=bounds[-1]/fps
parts=[]
for r in takes['takes']:
    raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(work/r['file']),'-f','f32le','-ac','1','-ar',str(sr),'-'])
    parts.append(np.frombuffer(raw,dtype='<f4').copy())
voice=np.zeros(round(duration*sr),dtype=np.float32); cues=[];groups=[(0,4),(4,8),(8,11),(11,15),(15,18),(18,22)]
for scene,(lo,hi) in enumerate(groups):
    lengths=[math.ceil(len(p)/sr*fps) for p in parts[lo:hi]]
    spare=bounds[scene+1]-bounds[scene]-sum(lengths)
    assert spare>=0,'Natural narration exceeds scene: adjust budget, never truncate'
    gap=spare/(hi-lo+1); cursor=bounds[scene]+gap
    for i,n in zip(range(lo,hi),lengths):
        start=round(cursor);sample=round(start/fps*sr);p=parts[i]
        voice[sample:sample+len(p)]+=p
        cues.append(dict(index=i,scene=scene,startFrame=start,endFrame=start+n,measuredSeconds=len(p)/sr,text=takes['takes'][i]['text']))
        cursor=start+n+gap
peak=float(np.max(np.abs(voice)));voice*=0.76/max(peak,0.001)
# Original synthesized ambient bed: sustained pentatonic tones, no sampled recording.
t=np.arange(len(voice),dtype=np.float64)/sr
music=np.zeros_like(t)
for i,hz in enumerate([130.8128,196.0,261.6256,293.6648]):
    env=0.6+0.4*np.sin(2*np.pi*(t/24+i/5))**2
    music+=0.004*env*np.sin(2*np.pi*hz*t+0.04*np.sin(2*np.pi*t/11))
fade=np.minimum(np.minimum(t/3,(duration-t)/4),1).clip(0,1);music*=fade
# Quiet soft chimes at chapter boundaries.
for frame in bounds[1:-1]:
    delta=t-frame/fps;mask=(delta>=0)&(delta<2)
    music[mask]+=0.012*np.sin(2*np.pi*523.25*delta[mask])*np.exp(-delta[mask]*3)*(1-np.exp(-delta[mask]*40))
mix=(voice+music).clip(-0.96,0.96)
for name,data in [('voice.wav',voice),('mix.wav',mix)]:
    with wave.open(str(work/name),'wb') as f:f.setnchannels(1);f.setsampwidth(2);f.setframerate(sr);f.writeframes((data*32767).astype('<i2').tobytes())
subprocess.run(['ffmpeg','-y','-v','error','-i',str(work/'mix.wav'),'-c:a','libopus','-b:a','48k',str(dest/'soundtrack.ogg')],check=True)
manifest=dict(voice=takes['voice'],engine=takes['engine'],rate=takes['rate'],fps=fps,durationSeconds=duration,sceneBoundaries=bounds,cues=cues,music='Original synthesized pentatonic ambient tones; no sampled music',peak=float(np.max(np.abs(mix))))
(dest/'audio-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
def stamp(frame):
    ms=round(frame/fps*1000);h,ms=divmod(ms,3600000);m,ms=divmod(ms,60000);s,ms=divmod(ms,1000)
    return f'{h:02}:{m:02}:{s:02},{ms:03}'
(dest/'surname.srt').write_text('\n\n'.join(f'{i+1}\n{stamp(r["startFrame"])} --> {stamp(r["endFrame"])}\n{r["text"]}' for i,r in enumerate(cues))+'\n',encoding='utf-8')
p=root/'src/SurnameEvolution/script.ts';s=p.read_text();head=s.split('export const CAPTIONS:')[0].replace('TOTAL_FRAMES = 3600','TOTAL_FRAMES = 3720').replace('duration: 360,','duration: 480,');rows=[dict(start=r['startFrame'],end=r['endFrame'],text=r['text']) for r in cues]
p.write_text(head+'export const CAPTIONS: CaptionCue[] = '+json.dumps(rows,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
print(f'Built {duration}s soundtrack, {len(cues)} measured cues, peak {manifest["peak"]:.3f}')

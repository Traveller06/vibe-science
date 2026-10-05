"""Generate cached voice takes. pip install edge-tts; run from repo root.
No product npm dependencies are changed. Preserves TLS certificate verification.
"""
import asyncio,json,os,subprocess
from pathlib import Path
import edge_tts
import edge_tts.communicate
ROOT=Path(__file__).resolve().parent.parent
WORK=ROOT/'out/audio-work'
WORK.mkdir(parents=True,exist_ok=True)
text=(ROOT/'docs/surname-video-draft.md').read_text(encoding='utf-8')
lines=[x for x in text.split('## 旁白初稿\n')[1].split('\n## 分镜草案')[0].strip().splitlines() if x.strip()]
assert len(lines)==22
if os.environ.get('SSL_CERT_FILE'):
    edge_tts.communicate._SSL_CTX.load_verify_locations(cafile=os.environ['SSL_CERT_FILE'])
def duration(path):
    return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(path)],text=True))
async def main():
    sem=asyncio.Semaphore(3)
    async def one(i,line):
        async with sem:
            path=WORK/f'cue-{i:02}.mp3'
            if not path.exists() or path.stat().st_size<100:
                for attempt in range(3):
                    try:
                        await edge_tts.Communicate(line,'zh-CN-YunxiNeural',rate='-8%').save(str(path))
                        break
                    except Exception:
                        if attempt==2: raise
                        await asyncio.sleep(1)
            seconds=duration(path)
            print(f'{i+1:02}/22 {seconds:.3f}s',flush=True)
            return dict(index=i,text=line,file=path.name,seconds=seconds)
    rows=await asyncio.gather(*(one(i,t) for i,t in enumerate(lines)))
    (WORK/'takes.json').write_text(json.dumps({'voice':'zh-CN-YunxiNeural','engine':'edge-tts','rate':'-8%','takes':rows},ensure_ascii=False,indent=2),encoding='utf-8')
    print('Total speech',sum(x['seconds'] for x in rows))
asyncio.run(main())

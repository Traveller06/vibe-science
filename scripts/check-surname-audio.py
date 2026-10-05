"""Validate measured audio placement, exact narration, and exported captions."""
import json,subprocess
from pathlib import Path
root=Path(__file__).resolve().parent.parent
x=json.loads((root/'public/surname/audio-manifest.json').read_text())
assert x['fps']==30 and 110<=x['durationSeconds']<=140
rows=x['cues']; assert len(rows)==22
previous=0
for r in rows:
    assert r['startFrame']>=previous
    assert r['endFrame']>r['startFrame']
    assert r['endFrame']<=x['sceneBoundaries'][r['scene']+1]
    assert r['startFrame']>=x['sceneBoundaries'][r['scene']]
    assert abs((r['endFrame']-r['startFrame'])/30-r['measuredSeconds'])<=1/30+1e-5
    previous=r['endFrame']
text=(root/'docs/surname-video-draft.md').read_text().split('## 旁白初稿\n')[1].split('\n## 分镜草案')[0]
assert [r['text'] for r in rows]==[s for s in text.strip().splitlines() if s]
d=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(root/'public/surname/soundtrack.ogg')]))
assert abs(d-x['durationSeconds'])<0.1
srt=(root/'public/surname/surname.srt').read_text()
assert all(r['text'] in srt for r in rows)
assert srt.count('-->')==22
print('PASS: 22 measured cues, exact narration, no overlap/truncation, audio duration and SRT')

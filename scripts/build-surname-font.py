"""Subset the approved Chinese font. pip install fonttools brotli.
Download official Noto CJK Sans Regular and OFL into out/audio-work first.
"""
from pathlib import Path
from fontTools import subset
root=Path(__file__).resolve().parent.parent
text=''.join(p.read_text(encoding='utf-8') for p in (root/'src/SurnameEvolution').rglob('*.ts*'))+''.join(chr(i) for i in range(32,127))+'有声版·合成旁白'
opts=subset.Options();opts.flavor='woff2';opts.name_IDs=['*'];opts.name_legacy=True;opts.name_languages=['*']
font=subset.load_font(str(root/'out/audio-work/NotoSansCJKsc-Regular.otf'),opts)
sub=subset.Subsetter(options=opts);sub.populate(text=text);sub.subset(font)
# This is a subset: rename the modified font rather than using the original family.
for n in font['name'].names:
    if n.nameID in (1,4,6):
        n.string=('SurnameCJK' if n.nameID==6 else 'Surname CJK').encode(n.getEncoding())
font.flavor='woff2'
(root/'public/surname').mkdir(parents=True,exist_ok=True)
font.save(str(root/'public/surname/SurnameCJK.woff2'))
(root/'public/surname/OFL.txt').write_bytes((root/'out/audio-work/OFL.txt').read_bytes())
print('Font subset saved')

"""Verkleint public/img/og.png naar een palet van 256 kleuren.

    python3 design/og/verklein.py

Een deelafbeelding wordt alleen door Facebook, LinkedIn en WhatsApp opgehaald en
nooit door een bezoeker van de site, dus hij blokkeert niets — maar 340 KB voor een
vlak met een verloop en wat tekst is onnodig, en een eerder ticket heeft deze
afbeelding juist bewust verkleind. Met een palet zakt hij naar zo'n 60 KB zonder
zichtbaar verschil; de dithering houdt het verloop glad.
"""
import os
from PIL import Image

pad = os.path.join(os.path.dirname(__file__), '..', '..', 'public', 'img', 'og.png')
pad = os.path.normpath(pad)

voor = os.path.getsize(pad)
afb = Image.open(pad).convert('RGB')
palet = afb.quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
palet.save(pad, optimize=True)
na = os.path.getsize(pad)
print('og.png: %d KB -> %d KB' % (voor // 1024, na // 1024))

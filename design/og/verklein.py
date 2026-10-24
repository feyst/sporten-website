"""Verkleint de deelafbeeldingen naar een palet van 256 kleuren.

    python3 design/og/verklein.py

Een deelafbeelding wordt alleen door Facebook, LinkedIn en WhatsApp opgehaald en
nooit door een bezoeker van de site, dus hij blokkeert niets. Maar 340 KB voor een
vlak met een verloop en wat tekst is onnodig. Met een palet zakt hij naar zo'n
60 KB zonder zichtbaar verschil; de dithering houdt het verloop glad.
Neemt alles in public/img/og/ mee.
"""
import glob
import os
from PIL import Image

img = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '..', 'public', 'img'))
paden = sorted(glob.glob(os.path.join(img, 'og', '*.png')))

for pad in paden:
    voor = os.path.getsize(pad)
    afb = Image.open(pad)
    if afb.mode == 'P':
        print('%s: al verkleind (%d KB)' % (os.path.relpath(pad, img), voor // 1024))
        continue
    palet = afb.convert('RGB').quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
    palet.save(pad, optimize=True)
    print('%s: %d KB -> %d KB' % (os.path.relpath(pad, img), voor // 1024, os.path.getsize(pad) // 1024))

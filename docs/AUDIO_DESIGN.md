# D20 Dungeon Studio — Original RTS Audio

The playable demo uses an original procedural Web Audio sound set. It is designed to evoke the pacing and production language of classic command-center RTS audio without reproducing any Command & Conquer or Red Alert recording, melody, sample, voice line, or proprietary asset.

## Sound palette
- Title music: low industrial synth ostinato, gated pulse, metallic percussion.
- Select/move: short tactical command confirmations.
- Attack/impact: low-frequency launch and noise transients.
- Build: ascending construction tones.
- Resource: bright pickup confirmation.
- Error: descending command rejection.
- Victory/defeat: original short stingers.

## Runtime
Audio is generated in src/audio/rtsAudio.ts with the browser Web Audio API. This keeps the GitHub Pages build self-contained and avoids third-party copyrighted samples. initRtsAudio() should be called from a user gesture before playback.

## Offline exports
A later Blender/DAW export pass can render the same designs to WAV/OGG.
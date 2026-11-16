# টোটোওয়ালা: Kolkata Toto Rush 3D

A Bengali 3D browser driving game: drive a toto through Kolkata and other West Bengal towns, pick up passengers, dodge trams, buses, processions and road blockades, and escape the crowd when things go wrong.

**Play:** https://mcodexvb.github.io/totowala/

Runs in any modern browser on phone or computer. Built with three.js (r128, bundled in `vendor/`).

## Folder layout

```
index.html            page markup and the order the scripts load in
css/style.css         all styles (HUD, menu, touch controls)
css/polish.css        button styling and the control-layout editor
css/menu2.css         start menu layout and the sound-pack panel
manifest.webmanifest  app name and icons for installing
sw.js                 offline cache for the installed app
vendor/three.min.js   three.js r128
assets/sfx/*.mp3      sound effects (replace these to customise sounds)
js/lib/NN-*.js        function definitions, grouped by topic
js/run/NN-*.js        state and start-up code, same topics
```

Every `js/lib` file loads before any `js/run` file, so code in one topic can call functions from another while the game starts. Inside each folder, files load in number order:

| No. | Topic | What's in it |
|---|---|---|
| 01 | setup | constants, helpers, cities and zones, save data |
| 02 | audio | synthesised fallback sounds and music |
| 03 | engine | renderer, camera, lights, textures |
| 04 | models | vehicles, people, props |
| 05 | world | road grid, blocks, buildings, traffic AI |
| 06 | game | game loop, player driving, passengers, crowd chase |
| 07 | look | sky, colour grading, shadows |
| 08 | toto-city | toto model, landmarks, posters, processions, blockades, roadworks |
| 09 | kolkata | Kolkata buses, lorries, trams, street-name boards, Howrah Bridge, crash effects, sound loader |
| 10 | ui | keyboard, touch controls, menus |
| 11 | polish | app name, control-layout editor (move and resize each touch button) |
| 12 | soundpack | tidy start menu, on-device sound pack, install button |
| 13 | packzip | sound pack import/export as .zip |

## Custom sounds

Drop a new file into `assets/sfx/` with the same name to replace a sound. MP3 works everywhere; OGG and WAV work in most browsers if you also change the extension in the `SND` list (`js/run/09-kolkata.js`).

| File | Used for |
|---|---|
| `engine.mp3` | toto motor (seamless loop; pitch follows speed) |
| `amb.mp3` | city background (loop) |
| `horn.mp3`, `horn2.mp3` | your horn |
| `carhorn.mp3` | other vehicles honking |
| `airhorn.mp3` | bus and lorry horns |
| `bell.mp3` | passenger boarding, tram bell |
| `crash.mp3`, `bump.mp3`, `skid.mp3` | collisions |
| `punch.mp3`, `shout1.mp3`, `shout2.mp3`, `crowd.mp3` | crowd and beating |
| `whistle.mp3`, `siren.mp3` | police |
| `hiss.mp3` | boost (টান) |

### Sound pack (on the device)

Menu → **সাউন্ড প্যাক** lets each player add their own clips and lines without changing the repo. Everything is stored in the browser (IndexedDB) on that device and is never uploaded.

- **📦 অনেক ফাইল একসাথে যোগ করো**: pick many audio files at once; they are sorted into moments by file name (crash, fail, wow, rizz…). Each clip can be moved to another moment afterwards.
- Each moment also takes **⬆ ফাইল**, **🎙 রেকর্ড** or **✎ শুধু লেখা** (a text line that pops up as a speech bubble). Audio clips can carry a text line too.
- Moments: খেলা শুরু, যাত্রী উঠল, ভাড়া পেলাম, টান দিলে, বড় ধাক্কা, মানুষে ধাক্কা, জরিমানা / পুলিশ, পাবলিক তাড়া, ধরা পড়লে, খেলা শেষ, রাস্তার রোমিও.

**Default pack (optional):** if the site has `assets/pack/pack.json`, its clips play for everyone by default (players can switch it off in the sound-pack screen, and their own clips are added on top). Format:

```json
{ "crash": [ { "file": "my-crash.mp3", "text": "optional caption" } ], "over": [ ... ] }
```

with the audio files next to it in `assets/pack/`. Slots: `start, pax, paid, boost, crash, hit, fine, chase, caught, over, romeo`. Only put clips here that you have the right to share publicly; film dialogue, TV clips and songs usually belong to someone else.

- **📥 প্যাক ইমপোর্ট / 📤 প্যাক এক্সপোর্ট**: save the whole pack (clips, moments and captions) as one `.zip`, and load it on another phone or share it with friends. A zip contains `pack.json` plus a `sounds/` folder; plain zips of audio files also work and are sorted by file name.

The older line-by-line voice recorder is still available from the sound-pack screen.

## Touch control layout

In the pause panel (or the menu) tap **🎛 বোতাম সাজাও**. Drag any button to move it; select one and use the slider (or pinch) to resize it. With nothing selected the slider resizes all buttons. **আগের মতো** resets the layout. The layout is saved on the device.

## Install as an app

On Android/Chrome or desktop Chrome/Edge, the menu shows **⬇ অ্যাপ ইনস্টল**. On iPhone, use Safari's Share button → *Add to Home Screen*. The installed app runs full-screen and works offline after the first load. When files change, bump `VERSION` in `sw.js` so players get the update.

## Running locally

The game fetches its sounds, so open it through a local web server rather than by double-clicking `index.html`:

```
python3 -m http.server 8000
```

then visit http://localhost:8000/.

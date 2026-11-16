# টোটোওয়ালা: Kolkata Toto Rush 3D

A Bengali 3D browser driving game: drive a toto through Kolkata and other West Bengal towns, pick up passengers, dodge trams, buses, processions and road blockades, and escape the crowd when things go wrong.

**Play:** https://mcodexvb.github.io/totowala/

Runs in any modern browser on phone or computer. Built with three.js (r128, bundled in `vendor/`).

## Folder layout

```
index.html            page markup and the order the scripts load in
css/style.css         all styles (HUD, menu, touch controls)
css/polish.css        button styling and the control-layout editor
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

Voice lines can also be recorded in-game from the menu (ভয়েস প্যাক); those stay in the player's browser.

## Touch control layout

In the pause panel (or the menu) tap **🎛 বোতাম সাজাও**. Drag any button to move it; select one and use the slider (or pinch) to resize it. With nothing selected the slider resizes all buttons. **আগের মতো** resets the layout. The layout is saved on the device.

## Running locally

The game fetches its sounds, so open it through a local web server rather than by double-clicking `index.html`:

```
python3 -m http.server 8000
```

then visit http://localhost:8000/.

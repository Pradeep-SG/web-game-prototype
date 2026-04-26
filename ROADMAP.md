# Ember — Solo Dev Roadmap

**Project:** Ember (web-based 2.5D stylized game with async multiplayer/leaderboards)
**Team:** 1 developer (Pradeep) + AI assistant
**Testers:** Pradeep + friends
**Budget:** ~$0 (free tiers + maybe $30 one-time for a domain and Aseprite)
**Target platforms:** Desktop web + mobile web (equal priority)
**Estimated timeline:** ~12 months at 10–20 hrs/week to a public launch

---

## Guiding principles

1. **Fun before fidelity.** Gray boxes that feel great beat pretty things that don't. Don't draw a single piece of art until the core loop is provably fun.
2. **Ship every week.** A deployed build on Cloudflare Pages every Sunday — even if nothing changed visibly. Momentum is the only currency a solo dev has.
3. **Cut scope, don't extend dates.** When something slips, remove a feature, never push the launch.
4. **Mobile is a constraint, not an afterthought.** Test on the cheapest phone you can borrow every two weeks. If it doesn't run there, it doesn't ship.
5. **Stylized over realistic.** Cohesion beats polish. Pick a palette, pick a silhouette language, stick to it.
6. **Free assets are fine.** Kenney, Quaternius, Polyhaven, freesound. Mix them, recolor them, no one will notice.
7. **Build in public (lightly).** A devlog every 2 weeks on X/Bluesky/YouTube. Free marketing, free accountability, free feedback.

---

## Stack

**Solo-dev rule:** every dependency installed on day one is a dependency you carry, debug, update, and pay bundle-size for. Install the spine first; add the rest the moment the work demands it.

### Day 1 — install during Phase 0

| Layer        | Choice                                                                                                   |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| Rendering    | Three.js + WebGL2, WebGPU progressive                                                                    |
| Language     | TypeScript (strict)                                                                                      |
| Build        | Vite                                                                                                     |
| UI           | React + Tailwind + Zustand (or skip React for vanilla HTML/CSS overlays — pick the one you already know) |
| 3D animation | glTF skeletal (built into Three.js — no extra dep)                                                       |
| Audio        | Howler.js                                                                                                |
| Backend      | Supabase (Postgres + auth + realtime)                                                                    |
| Hosting      | Cloudflare Pages                                                                                         |
| Analytics    | PostHog (cloud free tier)                                                                                |
| Crashes      | Sentry (free tier)                                                                                       |
| Source/CI    | GitHub + GitHub Actions                                                                                  |

### Add only when the work actually needs it

| Dependency                                            | Add when                                                                                                                                                                      | Why defer                                                                                                                                                                                                             |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rapier** (physics, ~500KB WASM)                     | First time the mechanic needs real collision response, momentum, or simulated forces. Likely Phase 1 if Ember is physics-driven; possibly never if it's grid/tile/turn-based. | If gameplay is grid- or tile-based, hand-rolled AABB checks are lighter and simpler. Score validation can use **input-replay** (record keypresses + RNG seed) instead of physics-replay — same anti-cheat, no engine. |
| **Rive** (2D vector animation)                        | First time you want UI animation that CSS + a sprite sheet can't do. Usually mid-Phase 2.                                                                                     | Free tier is limited. Most game UI ships fine with CSS transitions and Tailwind.                                                                                                                                      |
| **gltf-transform** (asset compression — Draco + KTX2) | Phase 2, the moment the first real 3D model is imported.                                                                                                                      | No models = nothing to compress. Auto-runs in the Vite build once added.                                                                                                                                              |
| **nipplejs** (virtual touch joystick)                 | Phase 3, when mobile touch controls are wired.                                                                                                                                | Tiny and obvious to drop in then.                                                                                                                                                                                     |
| **Tween.js / popmotion** (animation tweens)           | Phase 2, during the game-feel pass.                                                                                                                                           | Three.js has manual interpolation that's fine for Phase 1.                                                                                                                                                            |

### Decision log (so future-you remembers why)

- **Three.js over Babylon/Phaser/A-Frame:** Babylon is a peer but smaller community; Phaser is 2D-only (Ember is 2.5D); A-Frame is for VR.
- **Supabase over Firebase:** Postgres beats Firestore for leaderboard queries.
- **Cloudflare Pages over Vercel/Netlify:** larger free tier, no surprise bandwidth bills.
- **TypeScript strict over plain JS:** solo dev has no second pair of eyes — let the compiler be the second pair.
- **Defer Rapier:** physics may not be needed; input-replay anti-cheat is just as effective for non-physics games.

---

## Phase 0 — Foundation (Week 1–2)

**Goal:** Get a deployed "hello cube" so deploys are never a question again.

- Initialize repo, Vite + React + TypeScript, Tailwind, ESLint, Prettier.
- Add Three.js, render a rotating cube on a canvas.
- Wire React UI overlay (a fake menu, a fake HUD).
- Set up GitHub Actions: lint + typecheck + Playwright smoke test on PR.
- Deploy to Cloudflare Pages with preview URLs per branch.
- Create Supabase project (free tier), connect anon client, log a heartbeat row.
- PostHog and Sentry SDKs wired with feature flag plumbing.
- Buy domain (~$10–15/yr) — `ember.game`, `playember.com`, whatever's available.

**Exit criteria:** Pushing to `main` deploys to ember.yourdomain.com in under 90 seconds. A heartbeat shows up in Supabase. PostHog logs page views.

**Cost so far:** ~$15 (domain).

---

## Phase 1 — Core mechanic prototype (Week 3–6)

**Goal:** Find out if Ember is fun. This is the make-or-break phase.

- Decide what the **single 60-second loop** is. Write it in one sentence and tape it to the wall.
  - Example shape: "Player controls X, encounters Y, must do Z, gets feedback W, loop restarts."
- Build the player controller: movement, input (keyboard + touch), camera follow.
- Build the world: gray boxes, simple terrain, the one mechanic you're testing.
- Collision: start with hand-rolled AABB checks (10 lines of code). **Only install Rapier** if the mechanic clearly needs real physics — momentum, ragdolls, complex contact resolution. If it's grid-based or simple platforming, skip it permanently.
- **Zero art. Zero sound. Zero menus.** Just the loop.
- Playtest with 3–5 friends every Friday. Record their screens (OBS, free) if they'll let you.
- Watch where they smile, where they're confused, where they quit.

**Exit criteria (kill criteria):** By end of Week 6, at least 3 of 5 testers say "I want to play that again" _unprompted_. If not, **stop and redesign the core mechanic** before continuing. This is the cheapest phase to throw away.

**Cost so far:** ~$15.

---

## Phase 2 — Vertical slice (Week 7–14)

**Goal:** Take ~2 minutes of gameplay and make it look and feel shippable. Prove Ember can be addictive.

This is where the "juice" goes in. Juice = the difference between a tech demo and a game people show their friends.

- **Art direction document.** One page. Palette (5–7 colors), silhouette rules, lighting mood, reference images. Do this BEFORE making art.
- Player character: a single 3D model with idle/run/action animations.
  - Free options: Mixamo for animations, Quaternius/Kenney for base models, Blender to customize.
  - AI options: Meshy.ai or Rodin for AI-generated 3D models (free tiers).
- Environment: one biome only. Modular pieces. Reuse aggressively.
- Lighting: bake what you can. One key directional light + ambient + a couple of point lights for accents.
- Particles: dust on landing, sparks on hits, ember/glow trails (this IS the game's name — lean in).
- **Game feel pass:**
  - Screen shake on impact (small — 2–4 px)
  - Hit pause / freeze frames (50–80ms on big hits)
  - Tween everything — install Tween.js or popmotion now
  - Squash and stretch on sprites/models
  - Audio cue on every meaningful action
- Audio: 1 music track (Suno free tier), 10–15 SFX (freesound + ElevenLabs voice for any vocals).
- One UI pass: title screen, pause menu, basic HUD. Plain CSS animations first; **install Rive only** if you hit a UI animation that can't be done with CSS + a sprite sheet.
- Asset pipeline: install `gltf-transform` and wire it into the Vite build to auto-compress meshes (Draco) and textures (KTX2) on every build.

**Test cadence:** Every 2 weeks, a 2-min recorded trailer cut from real gameplay. If you can't make a 2-min cut that gives YOU goosebumps, the slice isn't done.

**Exit criteria:** A 2-minute demo on the public URL. 5 friends play it on phones AND desktops. Average playtime ≥ the demo length (they don't quit early).

**Cost so far:** ~$35 (domain + maybe Aseprite).

---

## Phase 3 — Mobile parity + performance (Week 15–18)

**Goal:** Ember runs at 30+ fps on a 3-year-old mid-range Android.

- Touch controls: virtual joystick (use `nipplejs`) or tap-and-drag, depending on mechanic. Test with thumbs, not fingers — thumbs cover more screen than you think.
- Asset pipeline:
  - Texture compression to KTX2/Basis (saves 60–80% bandwidth).
  - glTF Draco compression for meshes.
  - Two asset tiers: `mobile` (lower poly, smaller textures) and `desktop`. Detect on load.
- Performance budget:
  - Initial bundle: < 5 MB.
  - First playable: < 15 MB total downloaded.
  - Frame time: 16ms desktop, 33ms mobile (30fps acceptable on mobile, 60fps target).
- Profile with Chrome DevTools Performance tab and `stats.js`. Find the top 3 frame-time costs and fix them.
- iOS Safari testing: borrow an iPhone. Audio unlock, viewport quirks, and WebGL context loss are the three things that will burn time.
- Browser matrix: Chrome desktop, Firefox desktop, Safari desktop, Chrome Android, Safari iOS. Document any browser you decide not to support.

**Exit criteria:** Stable 30fps on the worst phone in your friend group. < 15 MB initial download. No console errors on any of the 5 supported browsers.

**Cost so far:** ~$35.

---

## Phase 4 — Content build-out (Week 19–30)

**Goal:** Enough levels/runs/stages to support 2–4 hours of play, OR a procedural system that generates effectively infinite content.

This is the longest phase by a wide margin. Solo content production is brutal. Plan accordingly.

- Decide: handcrafted content vs. procedural generation.
  - **Handcrafted:** higher quality, very slow. Realistic target solo: ~15–25 levels.
  - **Procedural:** faster to ship, harder to make consistently fun. Use seeded RNG so daily/weekly seeds work for leaderboards.
  - **Recommended for solo:** procedural with ~5–10 handcrafted "set piece" moments.
- Build content tools, not content. Spend a week making a level editor or generator config that you'll use for the rest of the project.
- Difficulty curve: pencil-and-paper sketch first. Run it past friends.
- Progression: what does the player unlock, and why do they care?
- Save system: localStorage for offline progress, Supabase sync when online.

**Risk:** This phase will run long. Plan for it to take 14 weeks instead of 12. Cut content scope ruthlessly if Week 26 arrives and you're behind.

**Exit criteria:** A friend can sit down and play for 30 minutes without you explaining anything.

**Cost so far:** ~$35.

---

## Phase 5 — Backend, leaderboards, social (Week 31–34)

**Goal:** Async multiplayer is live, leaderboards work, scores can't be trivially cheated.

- Supabase schema:
  - `users` (anonymous-first auth, Google sign-in optional)
  - `runs` (player_id, seed, score, duration, replay_blob, created_at)
  - `friend_links` (share-code based — no friend system, just shareable codes)
- Auth: anonymous by default. Sign-in only required to claim a username on the leaderboard. Reduces friction massively.
- **Score validation:** server-side replay. Two flavors depending on what Phase 1 settled:
  - _If physics-driven (Rapier installed):_ replay the deterministic physics simulation server-side, accept score if it matches within tolerance.
  - _If non-physics (no Rapier):_ record the player's input log + RNG seed; replay the inputs server-side through the same game logic and verify the resulting score. Same anti-cheat strength, smaller bundle.
  - Either approach stops ~95% of casual cheating (localStorage edits, dev-tool tweaks).
- Daily seed: midnight UTC, everyone gets the same procedural seed. Compete on that day's run.
- Weekly seed: bigger event, larger leaderboard.
- Share-code system: each run produces a code; sharing the code lets a friend play the same seed and ghost-race.

**Exit criteria:** You and 3 friends can compete on the same daily seed, see each other on a leaderboard, and the obvious cheats (editing localStorage, dev tools) don't post invalid scores.

**Cost so far:** ~$35. Supabase free tier covers ~50k monthly active users for this workload.

---

## Phase 6 — Closed beta (Week 35–40)

**Goal:** 30–80 real players. Find the show-stoppers before launch.

- Recruit: friends, friends of friends, a single post in r/IndieDev or r/WebGames with the demo link.
- Discord server (free) — one channel for bugs, one for feedback, one for screenshots.
- Onboarding focus: instrument the first 60 seconds with PostHog. Where do players drop off? That's where to fix.
- Crash triage: Sentry alerts to email. Fix any crash that affects > 2 users within 24h.
- Weekly build cadence: every Friday, ship the week's changes. Tag the build version in PostHog so you can correlate metrics with releases.
- Feature flags via PostHog: A/B test difficulty, tutorial styles, control schemes.

**Metrics to watch:**

- Session length (target: > 5 min median).
- Day-1 retention (target: > 25%).
- Day-7 retention (target: > 8%).
- Crash-free session rate (target: > 99%).

**Exit criteria:** Day-7 retention above 8%, no P0 bugs open, you and 5 friends agree it's launch-ready.

**Cost so far:** ~$35.

---

## Phase 7 — Polish + launch (Week 41–48)

**Goal:** Ember is publicly playable, has a press page, and gets in front of an audience for cheap.

- Onboarding: ruthless polish on the first 60 seconds. New player → fun within 30 seconds → first leaderboard score within 2 minutes.
- Trailer: 60-second cut. Use OBS to capture, DaVinci Resolve (free) to edit. Music from Suno or freesound.
- Social previews: Open Graph image, Twitter card image, page title and description that don't suck.
- Press/launch surfaces (all free):
  - itch.io page (also lets you collect tips/donations).
  - Reddit: r/WebGames, r/IndieGaming, r/IndieDev (read each subreddit's rules).
  - Hacker News: "Show HN" post on a Tuesday morning.
  - X / Bluesky: thread with the trailer + a play link.
  - IndieDB.
  - YouTube short of a "best moment" cut from your own gameplay.
  - Email any small streamer who plays browser games — find them via Twitch's "Web Games" category.
- Day-of-launch: be online. Reply to every comment for the first 12 hours. Feedback now is gold.

**Post-launch:** plan one feature update at +30 days (new biome, new modifier, new event seed) to give players a reason to return and a fresh excuse to post.

**Cost so far:** ~$35.

---

## Weekly cadence (every week, every phase)

- **Monday:** Plan the week's three deliverables. No more than three.
- **Wed/Thu evening:** Mid-week check — am I on track?
- **Friday:** Ship a build. Even if it's tiny.
- **Saturday:** Playtest with friends (in person or via shared link).
- **Sunday:** Devlog. 1 short post. A GIF, a sentence, a lesson.

If you skip a week, don't try to make it up. Just ship the next one.

---

## Tools — every single one used by Ember (cost in parens)

**Code:** VS Code or Cursor (free), GitHub (free), Claude / ChatGPT (free or $20/mo if you upgrade).

**Engine and runtime:** Three.js (free), Rapier (free), Howler (free), Vite (free), TypeScript (free), React (free), Tailwind (free), Zustand (free).

**Backend and hosting:** Supabase (free tier), Cloudflare Pages (free), Cloudflare Workers (free if needed).

**Telemetry:** PostHog cloud (free up to 1M events/mo), Sentry (free up to 5k errors/mo).

**3D art:** Blender (free), Quaternius models (free, public domain), Kenney models (free), Polyhaven materials/HDRIs (free), Mixamo animations (free), Meshy.ai (free tier — AI 3D).

**2D art:** Aseprite ($20 one-time, optional — LibreSprite is free), Krita (free), Figma (free), Rive (free tier).

**Audio:** Suno (free tier — music), ElevenLabs (free tier — voice/SFX), freesound.org (free, CC-licensed), sfxr/jsfxr (free, retro SFX), Audacity (free, editing).

**Video:** OBS (free, capture), DaVinci Resolve (free, edit).

**Domain:** ~$10–15/year.

**Total project cost over 12 months:** ~$30–50, depending on whether you buy Aseprite and how many domain extensions you grab.

---

## Risks and how a solo dev handles them

| Risk                                         | Likelihood | Mitigation                                                                                                 |
| -------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------- |
| Burnout                                      | High       | 3 deliverables/week max. Take a real weekend off every 6 weeks. Skip Sunday devlog if needed.              |
| Scope creep                                  | Very high  | Feature freeze at end of Phase 4. Anything new goes in a "v1.1" file, not the codebase.                    |
| Performance debt                             | Medium     | Profile every 2 weeks, not at the end. Mobile-first asset budget from Phase 0.                             |
| Art quality plateau                          | High       | Lean stylized. One palette. One silhouette rule. Cohesion > polish. Steal from references shamelessly.     |
| Backend downtime                             | Low        | Supabase has 99.9% uptime; game must work offline for single-player. Sync when reconnected.                |
| Cheaters ruining leaderboards                | Medium     | Server-side replay validation from day one. Daily seeds reset the meta if a cheat slips through.           |
| No one plays it at launch                    | High       | Build in public. Devlog every 2 weeks. Have 50 followers before launch — they're your launch-day audience. |
| You decide the core loop isn't fun in Week 5 | Medium     | Phase 1 is short on purpose. Pivot then, not after Phase 4.                                                |

---

## Kill criteria (the hardest part)

Be honest with yourself at these checkpoints. If you fail one, **stop and redesign**, don't push through.

- **End of Week 6:** Is the core loop fun without art or sound? If no → redesign loop.
- **End of Week 14:** Does the vertical slice make YOU want to keep playing? If no → cut features, don't add them.
- **End of Week 30:** Can a friend play 30 minutes without your help? If no → onboarding crisis, fix before continuing.
- **End of Week 40:** Is day-7 retention above 8%? If no → the game isn't sticky enough yet, fix before launch.

Failing a kill criterion isn't failure. Pushing through one is.

---

## What I (the AI) can do for you each phase

- Phase 0–1: Scaffold the repo, write the player controller, set up CI, debug Three.js gotchas.
- Phase 2: Pair on shaders, particles, audio code, game-feel tweens.
- Phase 3: Find perf hotspots, suggest asset compression strategies, write touch controls.
- Phase 4: Generate content config, write level generators, balance numbers from playtest data.
- Phase 5: Design the Supabase schema, write replay-validation code, anti-cheat brainstorming.
- Phase 6: Triage Sentry crashes, parse PostHog funnels, write A/B test hypotheses.
- Phase 7: Draft launch copy, write the trailer script, write Show HN post.

Ask any time. The roadmap is the spine; the work happens phase by phase.

---

## Next concrete step

Phase 0, Week 1, Task 1: I scaffold the repo. You give me a green light, I produce a working `ember/` project (Vite + React + TS + Three.js + Tailwind + Three.js rotating cube + Supabase client + Cloudflare Pages config + GitHub Actions CI) committed to a fresh GitHub repo. Then we deploy.

Say the word and I'll start.

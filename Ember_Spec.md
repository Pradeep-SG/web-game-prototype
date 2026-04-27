# Ember — Unified Spec v1

**Status:** Source of truth as of 2026-04-27. Supersedes `ROADMAP.md` (delivery-only) and `Ember_Game_Design_Document.md` (product-only). Where they conflict, this file wins.

**One-line pitch:** A solo-developed 2.5D web game where your real-world discipline powers a living realm. Each week, your discipline becomes a public score on a friends leaderboard; meanwhile, your personal Oaths and Chains shape your Warden's identity over months.

**Why merge:** The roadmap and GDD describe pieces of the same game. The bridge is **"discipline is the score, Shadow Battle is the loop."** Real-world habits drive a weekly leaderboard; the Shadow Battle (the GDD's craving-intervention mini-game) is the moment-to-moment encounter for both passive Chain ticks and on-demand resistance.

---

## 1. Core loop

The atomic gameplay unit is the **Shadow Battle** — a 3-phase encounter (~3–5 min):

1. **Rhythm Breathing** (~90 s) — tap to a 4-7-8 cadence; clinically reduces craving, deals damage in-game.
2. **Choice Phase** (~60 s) — branching dialogue with the Demon mirroring real cognitive distortions; right counters tied to your Class's CBT-informed skills.
3. **Finisher** (~30 s) — reflex mini-game; lands a crit on success.

Two contexts use the same encounter system:

| | **Personal Chain Demon** (active resist) | **Nightly Tick** (passive abstinence) |
|---|---|---|
| **Trigger** | Tap "Resist" button on craving | Bedtime, automatic |
| **Damage source** | Active battle play | Just from not relapsing today |
| **Visibility** | Private (yours only) | Private |
| **Outcome on win** | XP burst, Clarity buff, leaderboard score |  Small steady damage to Demon |

Public competitive surface = **Hearth Heat** (§3.6) — a weekly leaderboard derived from your week's discipline, not from a separate game mode.

---

## 2. Daily player loop

| Time | What happens | Duration |
|---|---|---|
| **Morning — Dawn Council** | See realm state overnight, get 3 Daily Quests (drawn from active Oaths) | ~30 s |
| **Throughout the day — Quest completion** | Log a habit → loot drop, hearth brightens, character line | ~5 s each |
| **Throughout the day — Resist (when craving)** | Tap "Resist" → personal Chain Battle (active) | ~3–5 min |
| **Bedtime — Nightly Tick** | Auto chip damage on personal Demon for the day's abstinence | passive |
| **Evening — The Tending** | Walk the realm: assign loot, upgrade a structure, narrative beat | 1–2 min |
| **Sunday — Hearth Night** | Hardest Chain at full HP, narrative chapter, **Hearth Heat reveal** + weekly leaderboard | 15–20 min |

---

## 3. Systems

### 3.1 Class & Identity

Choose a Class when taking your first Oath. Class drives skill tree, dialogue counters, visual transformation at Lv 10/25/50.

**MVP classes (2):** Warrior (fitness/strength), Monk (meditation/mindfulness). Cover the broadest behavior cluster.
**v1.1:** Scholar (reading/learning), Ranger (sleep/outdoors).

### 3.2 Oaths (positive habits)

- 3–5 active. Logging = quest done = XP + variable-rarity loot + hearth fuel.
- Different habits feed different stats (Strength/Wisdom/etc.) → real-world action shapes character.
- **Weekly XP cap per oath** to flatten extreme grinders and disincentivize lying-to-climb.

### 3.3 Chains (negative habits)

- **1 active Chain** at MVP. Naming a Chain summons a persistent personal Demon NPC.
- Daily abstinence → bedtime tick deals small steady damage.
- Active resistance during a craving → Shadow Battle, big damage on win.
- Relapse → Demon regains HP proportional to severity. **Never resets.**
- Kill the Demon (~30–90 days) → permanent badge + class evolution + lorebook entry.

### 3.4 Shadow Battle outcomes

| | **Win** | **Lose/Retreat** |
|---|---|---|
| Reward | Big XP, guaranteed rare drop, 24 h Clarity buff (boosts all habit rewards) | Small consolation, "the Demon is strong today" line |
| Tone | Hearth-surge animation, victory cry | **No shaming, ever.** Return-quest unlocks tomorrow. |
| Leaderboard contribution | Yes (counts toward Hearth Heat) | No |

### 3.5 Resonance (streak replacement)

- 0–100 % meter. Charges on strong days, **decays gradually** on weak days instead of resetting.
- Tiered passive buffs: better loot drops, brighter hearth, stronger Shadow Battle hits.
- **Resonance decays independently of Hearth Heat** — losing a week on the leaderboard doesn't tank Resonance, so the "what-the-hell" Sunday-crash effect is structurally limited.
- One **Sanctuary Day** per week preserves Resonance entirely.

### 3.6 Hearth Heat (weekly leaderboard) — *the public competitive surface*

A single abstract score per week, surfaced at Sunday Hearth Night. Resets every Monday 00:00 UTC.

**Score formula (MVP):**
```
hearth_heat = (oaths_completed_this_week × class_weight)
            + (shadow_battles_won_this_week × 50)
            + (resonance_avg_this_week × 100)
            + streak_bonus_if_no_sanctuary_used
```

**Rules:**
- **Friends-only by default.** Global leaderboard is opt-in (toggle in settings).
- **Chains contribute only via Shadow Battle wins** — raw abstinence is *not* leaderboarded. Sidesteps the long-quitter-vs-short-quitter trap. You're rewarded for how hard you fought, not for what you didn't do.
- **Score is abstract** ("Hearth Heat: 1,420"). The UI never says "you smoked X times this week." Feels game-y, not surveillance-y.
- **Weekly XP caps** apply per oath to disincentivize lying or extreme grinding.
- **Class weights** balance asymmetry (a Warrior's gym session and a Monk's meditation count comparably).
- Ghost-race share codes: every Sunday, a player can generate a shareable code that lets a friend see *that week's* Hearth Heat history & class progression as a side-by-side comparison view. Not real-time competition; just a shareable post-mortem.

### 3.7 Realm

- One biome at MVP (forest is the working assumption — easy to evoke with stylized 3D + plenty of free reference assets).
- ~8 upgradeable structures.
- Visual state reflects your week: thriving, tense, or shadowed. Auto-rendered at app open.

### 3.8 Loot

- **80 % cosmetic / 20 % functional** (functional = Shadow-Battle potions/scrolls).
- ~50 cosmetic items at MVP across realm decor and Warden outfits.

### 3.9 Lorebook

- Auto-generated from player events. The "sunk narrative cost" that hooks Month 3+ players.

### 3.10 Failure handling

- **Missed habit day:** Resonance decays, structure dims, narrative line, **no XP loss.**
- **Bad week on leaderboard:** No special punishment. Resonance unaffected. The realm keeps your weekly history, narratively framed not punitively.
- **Relapse on Chain:** Demon regains HP proportional to severity, never full reset. Return Quest unlocks the next morning.
- **3 days away:** Dormancy mode, push notifications reduce, Return-to-Hearth quest primed.
- **14 days away:** App offers to reset Oaths to easier versions ("the original scope was probably wrong, not you").

---

## 4. MVP scope

### In

- 1 Warden, 1 realm biome, ~8 structures
- 2 Classes (Warrior, Monk), Lv 1–25, one class evolution at Lv 10
- 3–5 Oaths, 1 Chain, 1 personal Demon
- Shadow Battle (active Resist + nightly tick)
- **Weekly Hearth Heat leaderboard, friends-only by default, global opt-in**
- Anonymous-first auth (sign-in only required to claim a leaderboard name)
- Server-side oath-log validation + Shadow Battle replay validation
- Resonance + Sanctuary Days
- Dawn Council, Evening Tending, Sunday Hearth Night
- Auto-generated lorebook
- ~50 cosmetic items
- Weekly ghost-race share code (Hearth Heat side-by-side comparison)

### Out (deferred — see §11 for upgrade paths)

- Daily Demon mode (procedurally-generated public boss everyone fights)
- Multiplayer, guilds, trading, marketplace, real-time raids
- Multiple concurrent Chains / Demons
- Custom realm creation
- Apple Health / Google Fit / Strava integrations
- Prestige / Ascension (Lv 50+)
- Scholar & Ranger classes
- Photo-receipt verification for oaths
- Ember+ subscription
- Cosmetic battle pass

---

## 5. Architecture

| Layer | Choice |
|---|---|
| Rendering | Three.js (WebGL2; WebGPU progressive) |
| Language | TypeScript strict |
| Build | Vite |
| UI | React + Tailwind v4 + Zustand |
| Audio | Howler |
| Backend | Supabase (Postgres + auth + realtime) |
| Hosting | Cloudflare Workers-with-Assets |
| Telemetry | PostHog (direct `/i/v0/e/` ingest), Sentry |
| Anti-cheat | Server-side oath-log + Shadow Battle input-replay validation |
| Offline | Habit logging in localStorage, syncs on reconnect. Leaderboard is online-only. |

### 5.1 Forward-compatible data model

Designed so v1.1+ features (especially Daily Demon) plug in without schema rewrites.

**Core tables (MVP):**

```sql
-- Players
create table users (id uuid pk, anon_id text unique, display_name text nullable, created_at timestamptz);

-- Habits
create table oaths (id, user_id, class_kind, name, schedule, created_at);
create table chains (id, user_id, name, demon_template_id, hp_max, hp_current, created_at, broken_at nullable);

-- Events (the canonical log)
create table habit_events (id, user_id, oath_id nullable, kind enum('oath_complete','chain_relapse','sanctuary'), payload jsonb, created_at);

-- Encounters (the canonical battle log — DESIGNED FOR EXTENSION)
create table encounters (
  id uuid pk,
  user_id uuid,
  encounter_type enum('chain_active', 'chain_nightly', 'hearth_night_boss', /* v1.1: */ 'daily_seed', 'weekly_seed', 'guild_raid'),
  source_chain_id uuid nullable,        -- null for non-Chain encounters
  seed text nullable,                   -- null for personal encounters; populated for any seeded encounter
  result enum('win','retreat','loss'),
  score integer,
  duration_ms integer,
  replay_blob bytea,                    -- input replay for validation
  created_at timestamptz
);

-- Leaderboards (DESIGNED FOR EXTENSION)
create table leaderboard_runs (
  id uuid pk,
  user_id uuid,
  scope enum('weekly_hearth_heat', /* v1.1: */ 'daily_seed', 'weekly_seed', 'guild_weekly'),
  scope_key text,                       -- '2026-W18' for weekly, '2026-04-27' for daily, etc.
  score integer,
  rank_at_close integer nullable,
  metadata jsonb                        -- breakdown, class, etc.
);
```

The `encounters` and `leaderboard_runs` tables are deliberately polymorphic (typed enums) so Daily Demon, weekly-seed events, guild raids, and PvP modes can be added as new enum values without DDL migrations beyond `alter type ... add value`.

### 5.2 Pluggable scoring system

`hearth_heat = f(events)` is a single pure function in `src/scoring/hearthHeat.ts`. v1.1+ scoring schemes (e.g., `dailySeedScore`) are sibling files. The leaderboard read-path picks a scoring function based on the `scope` of the leaderboard query.

This means MVP ships exactly one scoring function, but adding Daily Demon scoring later is a new file, not a refactor.

### 5.3 Pluggable encounter sources

Shadow Battle's "what Demon is this" is parameterized:

```ts
type DemonSource =
  | { kind: 'personal_chain'; chainId: string }
  | { kind: 'hearth_night_boss'; chainId: string };
// v1.1:
//  | { kind: 'daily_seed'; date: string; seed: string }
//  | { kind: 'weekly_seed'; week: string; seed: string }
//  | { kind: 'guild_raid'; guildId: string }
```

Adding Daily Demon = adding a new union variant + a procedural generator that fills the `Demon` shape from a seed. Battle UI/logic stays unchanged.

### 5.4 Deferred dependencies

Add only when work demands:

- **Rapier** if Shadow Battle physics ever need momentum/contact resolution. Likely never — encounter is rhythm + dialogue + reflex.
- **gltf-transform** when first real 3D model lands (Phase 2).
- **nipplejs** when mobile touch joystick is wired (Phase 3).
- **Tween.js** during the Phase 2 game-feel pass.

---

## 6. Phase plan (~48 weeks, with weekly slack)

| Phase | Weeks | Goal | Kill criterion |
|---|---|---|---|
| **0** ✓ | 1–2 | Foundation (done 2026-04-27) | Push deploys < 90 s, Supabase + PostHog wired |
| **1** | 3–8 | Shadow Battle prototype (gray boxes only) | **3/5 testers want to fight again, unprompted, by W8** |
| **2** | 9–18 | Vertical slice: art direction, juice, audio, one biome, Oath system, single personal Demon | 2-min trailer cut from real gameplay gives YOU goosebumps |
| **3** | 19–22 | Mobile parity + perf budget (30 fps on 3-yr-old Android, < 15 MB first playable) | Stable on the worst phone in your friend group |
| **4** | 23–32 | Hearth Heat scoring + weekly leaderboard + replay validation + ghost-race codes + content build-out + lorebook | A friend plays 30 min unattended without you explaining anything |
| **5** | 33–40 | Closed beta (30–80 testers), retention metrics, P0 fixes | Day-7 retention > 8 %, no P0 bugs |
| **6** | 41–48 | Polish + launch + +30-day content update | Public on itch.io, Show HN, devlog audience > 50 followers |

**Realistic launch:** ~48 weeks base + month-of-buffer slack → **~2027-04**, ~12 months from now. (Daily-Demon removal saved 4–6 weeks vs. previous spec.)

**Weekly cadence (every week, every phase):** Monday plan ≤ 3 deliverables • Friday ship a build • Saturday playtest • Sunday devlog.

---

## 7. Monetization (post-launch)

- **Free base game forever.** Habit change is a public good; gating triggers adverse selection.
- **Cosmetic battle pass**, seasonal (90 days, ~$8). Free track has 30 % of cosmetics; paid has full set + biome skin.
- **One-off cosmetic IAPs** for realm themes / outfits.
- **Ember+ subscription (~$5/mo):** deep analytics export, more Oath slots, custom Demon art commissions, community.

**Hard noes:** No paid XP, no paid streak/Resonance freezes, no paid Shadow Battle wins, no loot boxes, no gacha.

---

## 8. Risks

| Risk | Mitigation |
|---|---|
| Shadow Battle isn't fun (kill-criterion fail at W8) | Phase 1 is short on purpose. Pivot the encounter design before Phase 2 starts. |
| Solo burnout | 3 deliverables/week max. Real weekend off every 6 weeks. Skip Sunday devlog if needed. |
| Scope slip | Feature freeze at end of Phase 4. New ideas → `v1.1.md`, not the codebase. |
| Players lying to climb the leaderboard | Weekly XP caps per oath, Class weights to prevent obvious grinder strategies, photo-receipt deferred to v1.1 once we have data on where cheating actually happens. |
| "What-the-hell" Sunday crashes ("I lost this week, no point logging tomorrow") | **Resonance decays independently of Hearth Heat.** Leaderboard is a sprint; the realm is a marathon. Narrative copy reinforces this every Monday. |
| Identity ambiguity on first install | Onboarding frames it as "Warden of a realm; discipline is fuel" → first action is a Shadow Battle (the loop) → leaderboard is introduced *after* the player has already won once. |
| Class fairness on leaderboard | Weighted scoring tunable in beta. Class weights live in PostHog feature-flag-style config, not hardcoded. |
| Backend load if it pops | Supabase free tier covers ~50 k MAU at expected event volume. Replay validation is async — slow path, doesn't block leaderboard reads. |
| `posthog-js` regression-prone | Already replaced with direct `/i/v0/e/` ingest in Phase 0. Re-evaluate if feature flags become important. |

---

## 9. Decisions baked in (recommendations)

| Decision | Choice | Why |
|---|---|---|
| Public competitive surface | **Weekly Hearth Heat** (single derived score from oaths + Shadow Battles + Resonance) | Real discipline drives the score (Strava/Duolingo-proven model), without the toxic Chain-vs-Chain comparison trap. |
| Leaderboard scope at MVP | **Friends-only default**, global opt-in | Privacy by default. Reduces stranger-shame. Global is there for the player who wants it. |
| Class count at MVP | **2** (Warrior, Monk) | Covers fitness + mindfulness — broadest user base. Scholar/Ranger in v1.1. |
| Personal Chain damage cadence | **Both** — passive nightly tick + on-demand Resist button | Nightly tick rewards mere abstinence; Resist taps reward active intervention. |
| Anti-cheat strategy | **Input-replay** (record keypresses + RNG seed; replay server-side) for Shadow Battles + **server-side rate-limits + spike anomaly detection** on oath logs | No Rapier dependency. Cheap to implement. |
| Auth onboarding | **Anonymous-first** | Sign-in only required to claim a leaderboard name. Reduces install-to-first-Shadow-Battle friction. |
| Weekly reset timezone | **Monday 00:00 UTC** | Simpler, fairer, avoids timezone-shopping. Hearth Night reveal happens at Sunday-evening *local* time via a UI animation, but the score window is UTC-defined. |

---

## 10. Open questions still worth Pradeep's time (decide before Phase 2)

1. **Realm biome choice for MVP.** Forest, valley, desert, ruins? Affects all art direction. Forest is safest (most reference + free assets).
2. **Visual identity of the Shadow Demons.** Stylized silhouette? Glitchy-cyber? Painterly fantasy? Locks shader work for Phase 2.
3. **Tone of the Warden character (the in-app voice).** Stoic? Wry? Earnest-sincere? Affects every dialogue line.
4. **PWA install on mobile (offline + home-screen icon).** Free retention boost, ~1 week of work in Phase 3. Worth it?
5. **Class weight tuning.** Defer to closed beta — instrument early, tune from real data.

---

## 11. Forward compatibility — how v1.1+ features plug in

This section exists so future-Pradeep can add big features without a rewrite. Each entry: *what it is*, *what MVP foundation already supports it*, *what it adds*.

### 11.1 Daily Demon (deferred from Pradeep's earlier request — re-introducible at any point)

- *What:* Procedurally-generated boss that everyone faces at midnight UTC. Daily leaderboard alongside the existing weekly Hearth Heat.
- *Already supported:*
  - `encounters.encounter_type` accepts a new `'daily_seed'` enum value (no schema migration beyond `alter type`).
  - `encounters.seed` column exists from MVP; just unused for personal Chain encounters.
  - `leaderboard_runs.scope` accepts `'daily_seed'`. `scope_key` slot for the date string.
  - Pluggable `DemonSource` union (§5.3) accepts a new variant for `daily_seed`.
- *What's added:* Procedural Demon generator (~2 weeks), daily-seed RNG infrastructure (~1 week), tutorial moment for "today's Demon" (~1 week), separate leaderboard widget (~1 week). Total ~5 weeks.
- *Cost of doing it later vs. now:* Negligible. The data model already accommodates it.

### 11.2 Weekly seed event (separate from Hearth Heat — a different kind of weekly competition)

- *What:* A handcrafted/procedural Demon for the week, fought during Hearth Night, ranked separately from Hearth Heat. Like a raid boss.
- *Already supported:* `'weekly_seed'` slots in both enums. Hearth Night already exists in MVP.
- *What's added:* The Demon design, the leaderboard surface. ~3 weeks.

### 11.3 Multiple concurrent Chains

- *What:* Track and battle multiple negative habits simultaneously.
- *Already supported:* `chains` table is one-row-per-Chain, no `singleton` constraint. UI is the only blocker.
- *What's added:* UI for switching between Chains, tuning the XP/loot economy so it doesn't break with N Demons. ~2 weeks.

### 11.4 Apple Health / Google Fit / Strava integration

- *What:* Auto-log fitness Oaths from device sensors.
- *Already supported:* `habit_events.payload` is `jsonb` — accepts arbitrary auto-log metadata (steps, distance, heart rate). `oaths.schedule` already supports "auto-detected" sources conceptually.
- *What's added:* OAuth integration with each provider, server-side webhook handlers (Cloudflare Workers), trust score for auto-logged events (count weight differently? configurable). ~3 weeks.

### 11.5 Photo-receipt verification

- *What:* Optional photo proof for select oaths (gym selfie, book cover, meal). Snapchat-style ephemeral.
- *Already supported:* `habit_events.payload` accepts `{photo_url}`. Supabase Storage is available.
- *What's added:* Camera UX, storage policy, optional ML-based "is this actually a gym?" check. ~2 weeks.

### 11.6 Guilds / friend groups

- *What:* Shared realms or aggregated leaderboards for groups of friends.
- *Already supported:* `leaderboard_runs.scope` accepts a `'guild_weekly'` value. New `guilds` and `guild_members` tables would be additive.
- *What's added:* Guild creation/invitation, group-realm rendering, guild leaderboard query. ~3 weeks.

### 11.7 Co-op / raid Shadow Battles

- *What:* Team up to fight a hard boss synchronously.
- *Already supported:* `encounters.encounter_type` accepts `'guild_raid'`. Supabase Realtime is in the stack already.
- *What's added:* Real-time sync layer for the encounter, much harder Demon design, group reward scheme. ~6 weeks. Largest expansion; most worth charging Ember+ for.

### 11.8 Custom realm creation

- *What:* Players design/decorate their own biome from a tile set.
- *Already supported:* Realm rendering is data-driven (structures + decor JSON), so an editor UI is additive.
- *What's added:* Editor UI, share-realm codes, moderation. ~4 weeks.

### 11.9 Prestige / Ascension (Lv 50+)

- *What:* Reset progression for cosmetic perks + harder realms.
- *Already supported:* `users` table can hold a `prestige_level` int with no breaking change.
- *What's added:* Ascension narrative arc, harder realm content, cosmetic perk system. ~4 weeks.

### 11.10 Scholar & Ranger classes

- *What:* Two more classes covering reading/learning and sleep/outdoors.
- *Already supported:* `oaths.class_kind` enum extends without schema break. `class_weight` is config-driven.
- *What's added:* Class-specific skill trees, dialogue counters, Class Evolution art. ~3 weeks each.

### 11.11 Ember+ subscription, battle pass, IAPs

- *What:* Monetization surfaces.
- *Already supported:* Anonymous-first auth supports upgrading to a paid account. Cosmetic system is data-driven.
- *What's added:* Stripe integration, subscription tier checks in the API, battle-pass progression UI. ~4 weeks combined.

### 11.12 Forward-compat things to AVOID in MVP

These are the "don't do" decisions that keep upgrade paths open:

- **Don't hardcode "Hearth Heat" in URLs or table names.** Use `weekly_hearth_heat` as one of many leaderboard scopes from day one.
- **Don't make `chains.user_id` unique.** That would lock us to single-Chain forever.
- **Don't bake "Monday-UTC reset" into every score function.** Pass the window as a parameter; daily/seasonal/per-event windows reuse the same code.
- **Don't ship a Class enum — use a `class_kind` text column** with check-constraint. Easier to extend than to migrate an enum across millions of rows.
- **Don't render the realm from imperative code.** Render from a JSON layout that an editor (v1.1) can write to.

---

## 12. What I (the AI) can do for you each phase

- **Phase 1:** Prototype the Shadow Battle — rhythm input, dialogue branching, finisher reflex game. Get the gray-box loop fun before any art exists.
- **Phase 2:** Pair on shaders, particles (ember/glow trails — lean into the name), audio code, game-feel tweens.
- **Phase 3:** Find perf hotspots, asset compression strategy, touch controls, PWA setup if we go that way.
- **Phase 4:** Hearth Heat scoring function, Supabase schema, leaderboard queries, replay validation, ghost-race code generation.
- **Phase 5:** Triage Sentry crashes, parse PostHog funnels, A/B test hypotheses, tutorial iteration.
- **Phase 6:** Trailer script, launch copy, Show HN draft, devlog drafts.

---

*End of spec. Iterate this file in place; don't fork a v2 unless we hit a true reset.*

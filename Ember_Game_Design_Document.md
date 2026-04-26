# Ember — A Gamified Habit RPG

**Game Design Document**
Version 1.0

---

## Table of Contents

1. [Core Concept](#1-core-concept)
2. [Gameplay Loop](#2-gameplay-loop)
3. [Habit System](#3-habit-system)
4. [Gamification Mechanics](#4-gamification-mechanics)
5. [Craving Intervention System](#5-craving-intervention-system)
6. [Retention Strategy](#6-retention-strategy)
7. [MVP Scope](#7-mvp-scope)
8. [Monetization](#8-monetization)
9. [Failure Handling](#9-failure-handling)
10. [Open Questions & Risks](#10-open-questions--risks)

---

## 1. Core Concept

**Ember** is a single-player RPG where your real-world discipline is the only currency that exists. You play a Warden of a small, magical realm — a forest, a valley, a city, whatever aesthetic you pick — and the realm literally runs on the heat of your habits. Every positive action you take (workout, reading, sleep) throws fuel on a central hearth-fire. Every negative habit (cigarette, doomscroll, junk food) is personified as a Shadow entity that creeps in from the edges of the map when you feed it.

The core fantasy is not "track your progress." It's _you are the protagonist of a living world that visibly thrives or decays based on how you actually lived today._ Close the app at 11pm and the realm renders its state — glowing, tense, or overrun — before you sleep.

### Why this beats standard trackers

Habit apps fail because the feedback loop is **informational** (a checkmark, a % bar) when habits are actually an **identity and emotion** problem. Ember converts abstract discipline into a visible, narratively-stakeful place you care about. James Clear's identity-based habit research, B.J. Fogg's behavior model, and the broader literature on embodied cognition all point the same way: people stick with behaviors that confirm a self-story, not behaviors that tick a box. Ember gives you a self-story with graphics.

---

## 2. Gameplay Loop

### Daily Loop

1. **Morning — The Dawn Council (30 sec).** Open app, see your realm's state overnight, get 3 Daily Quests (drawn from your active Oaths). Each quest has XP + a loot hint ("a rare shard may drop").
2. **Throughout the day — Quest completion.** Log a habit and a short, satisfying animation plays: a loot drop rolls (variable rarity), the hearth brightens, a character line triggers. This takes ~5 seconds — deliberately frictionless.
3. **Craving window — Shadow Incursions.** When you feel an urge, you tap a persistent "Resist" button on the home screen. This launches a 3-5 minute tactical mini-battle (detail in §5).
4. **Evening — The Tending (1-2 min).** You walk your realm: assign loot, upgrade a structure, read a short narrative beat tied to your week's performance. This is the "cozy" pillar.
5. **Weekly — Hearth Night (Sundays).** A longer session: a boss encounter tied to your biggest negative habit, a dungeon that unlocks new cosmetics, review of the week's Resonance.

### Feedback Horizons

**Immediate feedback** comes from the loot drop + hearth reaction on every habit log — variable ratio reinforcement, the most addictive schedule we know of.

**Long-term progression** is the realm itself evolving: biomes transform, structures unlock, your Warden class branches at Lv 10, 25, 50. At ~6 months, players prestige into "Ascended" Wardens who keep cosmetic perks and unlock harder realms.

---

## 3. Habit System

### Creation — Oaths and Chains

You don't "add a habit." You take an **Oath** (positive) or name a **Chain** (negative) you want to break. The language is deliberately heavier than a checklist because commitment devices work: the more ritualized the onboarding, the higher the follow-through.

An Oath asks: what, how often, for what deeper reason, and what Class does this align with:

- **Warrior** — fitness, strength training
- **Scholar** — reading, learning
- **Monk** — meditation, mindfulness
- **Ranger** — sleep, outdoors, nature

Answering these grants a Class skill tree, which is the long-term carrot.

### Positive Habits (Quests)

Positive habits work as Quests: complete them, get XP + loot + hearth fuel. Different habits yield different resources (Strength from gym, Wisdom from reading), and resources feed into the skill tree, so _what you do in real life shapes what your character becomes._ This is the identity-fusion lever.

### Negative Habits (Chains and Demons)

Negative habits are radically different — they're **not tracked as completions**. Instead, naming a Chain summons a persistent NPC enemy:

- **Craving Demon** — smoking, nicotine
- **Glutton** — junk food, binge eating
- **Voidwalker** — doomscroll, phone addiction

Every day without relapse, you deal damage to it in a short bedtime ritual. Kill the Demon (typically 30–90 days depending on habit) and you earn a permanent cosmetic badge, a class evolution, and the Chain is marked Broken in your realm's lorebook. Relapse doesn't reset anything — the Demon simply regains HP proportional to the slip (one cigarette ≠ full reset; a 3-day bender is a bigger setback).

### The Key Design Decision

**Positive habits are additive, negative habits are combative.**

Tracking cigarettes as "ate 2 today ✓" actively reinforces the behavior. Reframing as "I fought the Demon and lost today, and I can re-engage tomorrow" preserves agency and avoids the shame spiral that causes most quit-attempts to fail.

---

## 4. Gamification Mechanics

### XP and Leveling

XP comes only from real-world actions and Shadow Battles — **never** from grinding inside the app. Level cap at 50 for MVP; each level unlocks one tangible thing (a new structure, a class skill, a cosmetic). No level ever feels empty. This maps to self-determination theory's competence pillar — visible, earned mastery.

### Rewards — Cosmetic-First, Functional-Second

Loot drops are:

- **80% cosmetic** — realm decor, outfits, title flavors
- **20% functional** — potions, scrolls that give temporary buffs in Shadow Battles

This ratio matters: functional rewards create extrinsic motivation that displaces intrinsic motivation (Deci & Ryan's over-justification effect). Cosmetics are pure expressive reward and don't break the intrinsic loop.

### Resonance (Streak Replacement)

Traditional streaks cause catastrophic drop-off: research on the "what-the-hell effect" shows one broken day kills future attempts. Ember uses a **Resonance meter** that:

- Charges up over consecutive strong days (0–100%)
- Decays gradually on missed days instead of resetting
- Grants tiered passive buffs (better loot, bigger hearth glow)

Players can also bank **Sanctuary Days** — one pre-scheduled rest day per week preserves Resonance entirely. This is anti-fragile by design: the system expects imperfection.

### Penalties

**No XP loss, ever.** Consequences are visual and narrative:

- Parts of the map go shadowed
- A Chain-enemy gains territory
- A Warden NPC expresses concern

These create loss aversion without triggering shutdown behavior. Importantly, every penalty has a clear, achievable reversal quest — usually completable in 24–48 hours of normal play. The pain is real but the way back is always lit.

### Justification Summary

| Mechanic                  | Behavioral Lever                                    |
| ------------------------- | --------------------------------------------------- |
| Variable-rarity loot      | Variable ratio reinforcement (addictive engagement) |
| Cosmetic-dominant rewards | Preserves intrinsic motivation                      |
| Resonance meter           | Solves streak fragility                             |
| Narrative penalties       | Loss aversion without demotivation                  |
| Class identity            | Identity-based habit formation                      |

---

## 5. Craving Intervention System

This is the mechanic most habit apps completely lack, and it's the highest-leverage feature in Ember.

Urges peak within 3–10 minutes and subside if not acted on. The app's job during that window is to be **more compelling than the cigarette/cookie/scroll**. A "take a deep breath" screen is not.

### Shadow Battle

A persistent "Resist" button sits on the home screen. Tapping it launches a short tactical encounter against a personified version of the current craving.

**Phase 1 — Rhythm Breathing (~90 sec).**
You tap in time with a pulsing circle at 4-7-8 breath cadence, which deals damage. This is clinical — paced breathing actually reduces craving intensity — but dressed as a combat mechanic.

**Phase 2 — Choice Phase (~60 sec).**
A brief branching dialogue with the Demon that mirrors common rationalizations ("just one won't hurt") — picking the right counters is tied to your class's actual CBT-informed skill descriptions.

**Phase 3 — Finisher (~30 sec).**
A reflex mini-game; landing it gives a crit.

### Outcomes

**Win:**

- Big XP burst
- Guaranteed rare drop
- Hearth-surge animation
- 24-hour **Clarity** buff that boosts all habit rewards

The dopamine hit is engineered to compete with the neurochemical pull of the substance.

**Lose or retreat:**

- Small consolation reward
- Sincere "the Demon is strong today" line
- **No shaming, ever**

The goal is that _opening the app_ during a craving is itself a win condition, because the 3–5 minutes spent in-app are 3–5 minutes the urge peak burns off.

---

## 6. Retention Strategy

The classic habit-app death curve is: Day 1 excitement → Week 2 novelty drop → Month 2 silence. Ember's retention is defended at three time horizons.

### Daily Hook

The realm state at dawn is different every single day, shaped by what you did yesterday. Curiosity plus variable reward (_what dropped overnight? what happened in my absence?_) drives the open. Total time required: 30 seconds. Low friction to open is the most underrated retention mechanic.

### Weekly Hook

Hearth Night on Sundays is a 15–20 minute longer session with boss fights, seasonal events, and a narrative chapter. This gives the app a rhythm — you never need a push notification to remind someone of Sunday if Sunday is interesting enough on its own.

### Long-Term Hook

Class evolutions at Lv 10, 25, 50, and the Prestige/Ascension system beyond. Your Warden visually transforms, your realm biome transforms (forest → ancient grove → mythic sanctum), and new Demons unlock for new Chains. Month 6+ players are playing a different game from Month 1 players, which is how you beat the novelty curve — the game itself evolves.

### Secondary Defenses

- The **Craving Intervention** is a pull mechanic (users open during stress, not just habit reminders), which multiplies opens beyond the scheduled loop.
- The **Lorebook** — a slowly filling journal of your own history — creates sunk narrative that is genuinely painful to abandon by Month 3.

---

## 7. MVP Scope

### Build

- Single Warden avatar + one realm biome with ~8 upgradeable structures
- Oath system (3–5 active positive habits) with one class per habit type
- Chain system (1 active negative habit) with one Demon type
- Core daily loop: Dawn quests, habit logging with loot drops, Evening Tending
- One Shadow Battle mini-game with breathing + choice + finisher mechanics
- Resonance meter + Sanctuary Days
- Level 1–25 progression with one class evolution at Lv 10
- ~50 cosmetic items across realm decor and Warden outfits
- Lorebook auto-generated from player events

### Exclude from MVP

- Multiplayer / guilds
- Trading, marketplace
- Real-time raids
- Multiple concurrent Demons
- Custom realm creation
- Deep skill trees
- Integrations with Apple Health / Google Fit (defer to v1.1)
- Prestige system

### Rule of Thumb

If a feature doesn't appear in the Day 1 through Day 30 experience, it doesn't ship at launch.

Buildable by a small team in ~4–6 months. Compelling because the core loop — tangible realm + Shadow Battles + Resonance — is itself novel, not just a skin over a checklist.

---

## 8. Monetization

### Free Base Game Forever

Habit change is a public-good product and gating it triggers adverse selection (the people who most need help are least able to pay).

### Revenue Streams

**Cosmetic battle pass**, seasonal (90-day), ~$8.
Free track has ~30% of cosmetics so non-payers aren't visually excluded; paid track has the full set plus a unique realm biome skin. This is the primary revenue driver.

**Cosmetic-only in-app purchases** for one-off realm themes or outfits.
No loot boxes, no gacha, no pay-for-gems-that-buy-cosmetics indirection.

**Ember+ subscription (~$5/mo)** for:

- Deep analytics and data export
- Additional Oath slots beyond 5
- Custom Demon artwork commissions
- Community features

Targets power users and people using Ember as a clinical-adjacent tool.

### Hard No's

- No paid XP
- No paid streak freezes
- No paid Resonance
- No paid Shadow Battle wins

The instant money can buy behavior change, the game breaks.

---

## 9. Failure Handling

### Missed Habit Day

- Resonance decays a few percent instead of resetting
- Visual: a structure dims slightly
- Narrative: "The hearth burned low — it is waiting"
- One strong next-day performance fully restores

### Streak Loss on a Negative Habit (Relapse)

- Demon regains HP proportional to severity — one cigarette is 10–20% of fight progress, not 100%
- A special **Return Quest** unlocks the next morning: a small, almost-guaranteed-win encounter designed to re-engage the player without asking much

Research on lapse-vs-relapse (Marlatt's Relapse Prevention model) is unambiguous here — the single biggest predictor of full relapse is the shame response to the lapse. **Ember explicitly refuses to punish in that moment.**

### Motivation Loss / Disengagement

**After 3 days away:**
The app shifts into Dormancy mode: push notification load reduces, expectations reset, and a "Return to the Hearth" quest is primed. The returning user sees their realm in a shadowed but recoverable state, with one tiny, 30-second quest: light the hearth. One action to re-engage.

**After 14 days away:**
Ember offers to reset the user's Oaths to easier versions — because the original scope was probably wrong, not the user.

### Structural Safety Valves

Users can always:

- **Pause an Oath** — goes dormant, no penalty
- **Retire a Chain** — acknowledged as a life-season change, not a failure
- **Enter Low Power Mode** — reduces quest difficulty by 50% for a week with no narrative penalty

The app assumes life happens.

---

## 10. Open Questions & Risks

### Biggest Open Question

The craving-to-Shadow-Battle pipeline is what could make this a category-defining product, but it only works if the battle is genuinely more engaging than a 10-minute phone habit. That's a real game-design problem, not a product-strategy one, and it's worth prototyping that mini-game **first** before building anything else. If that one piece doesn't land, the rest of the architecture can't carry the app.

### Other Risks to Validate

- Whether identity-first onboarding (Oaths, Classes) increases drop-off vs. faster setup
- Whether the 80/20 cosmetic/functional loot ratio holds its motivational properties at scale
- Whether Hearth Night (weekly) can hold attention without social/multiplayer pressure
- Whether Ember+ pricing finds a market without walled-off core value

---

_End of Document_

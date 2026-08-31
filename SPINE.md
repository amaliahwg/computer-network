# The Spine: Standard Structure for Every Lecture Deck

Intelligent Network Design (지능형네트워크설계), 한경국립대학교 Hankyong National
University. This document is the standard. Every deck (`slides/moduleNN-*.md`)
should follow it. If a deck and this document disagree, fix the deck.

Each weekly session is 3×50-minute periods (150 min total): the deck fills
the first ~1 hour (lecture/theory), the book's Guided Lab fills the
remaining ~2 hours (hands-on practice) - see `book/src/introduction.md`'s
"Class Format" section. Size every full-spine deck for roughly an hour;
17-21 slides at the pace of the existing decks is the target range.

## Principle

**Motivation always precedes definition.** A student should never meet a term
before meeting the concrete problem that forced someone to invent it. Every
module opens with a real-world failure - a heist, an outage, a hospital
attack - not a formal definition.

**Modules chain.** The "Limits" slide that closes module N is, almost
verbatim, the "Pain" slide that opens module N+1. The semester should read as
one build-up toward a working, secured, routed network - not eleven
independent talks.

## The 17 slots

Acts 0, 1, 2, 4 are **fixed**: same slot numbers, same order, every full-spine
deck. Act 3 (Build) expands or contracts to fit the topic.

### Act 0: LOCATE

| # | Slide | Rule |
|---|---|---|
| 1 | Title | Module #, topic, course name, instructor, department |
| 2 | Where we are | Shared roadmap graphic (`slides/_shared/roadmap.md`), current module highlighted |
| 3 | Recap + open wound | One sentence on what last module delivered, one sentence on what it left broken. Renders as a `.thread` line on the same physical slide as slot 4, not its own slide |

### Act 1: MOTIVATE

| # | Slide | Rule |
|---|---|---|
| 4 | The pain | Concrete broken scenario - real incident or realistic failure. **Zero jargon.** If a technical term appears here, the slide is wrong. Physically one slide with slot 3 (`_class: callout`, vertically centered - see Enforcement) |
| 5 | Cost of not knowing | What breaks downstream (outages, breaches, failed labs) *and* where this bites in industry (interviews, job postings, real incidents). Its own slide, `_class: callout` |
| 6 | Driving question | One sentence the module must answer |
| 7 | Learning outcomes | 3–5 verbs, each traceable to the module's Learning Outcomes in the book |

**Hard rule:** no formal definition before slot 8. If you need one earlier,
the pain slide (4) is too abstract - fix it instead of breaking the rule.

### Act 2: GROUND

| # | Slide | Rule |
|---|---|---|
| 8 | Origin | Who, when, what forced this technology into existence. Protocols are answers to historical pain, not arbitrary convention |
| 9 | Core concept | First formal definition of the module |

### Act 3: BUILD (flexible)

| # | Slide | Rule |
|---|---|---|
| 10..N-3 | Mechanics | Stepwise, as many slides as the topic needs - configuration patterns, tables, protocol behavior |
| N-2 | Worked example | The module's guided-lab topology, walked through at a glance - full step-by-step stays in the book |
| N-1 | Common mistakes | Misconfigurations students actually make and why each is tempting |
| N | Check yourself | 2–3 questions, drawn from the module's Pre-Lab questions; answers on the slide immediately after, never the same slide |

### Act 4: CLOSE

| # | Slide | Rule |
|---|---|---|
| N+1 | Limits | What this module's technique cannot do. **This text becomes next module's slot 4** |
| N+2 | Bridge | "Module N leaves X unsolved; Module N+1 addresses it." Explicit, one sentence. Physically one slide with slot N+1 (`_class: callout`) - the bridge sentence renders as a `.thread` line under the limits box |
| N+3 | Summary | Deliverables + assessment weight, condensed from the book |
| N+4 | Thank You | Template end slide, link back to the book chapter |

## Enforcement

- Copy `slides/_template/module-XX.md` for every new module. It carries all
  17 slots as HTML comments; fill them in, don't renumber them.
- `slides/_shared/roadmap.md`: single source for the Act 0 roadmap graphic.
- Course logistics (grading, schedule, policies) live in a prelude block at
  the front of `slides/module-01.md` only, outside the spine numbering -
  after slot 2 (roadmap), before slot 3+4 (pain hook).
- Full step-by-step lab instructions, deliverable checklists, and rubrics
  stay in the book (`book/src/`) - slides summarize, they never duplicate.
- Slides teach concepts in tool-agnostic language. Packet Tracer UI
  mechanics (panels, click sequences, device categories, cable palette)
  belong in the book's Guided Lab only, not the lecture deck.
- `_class: callout` (`themes/hankyong.css`): vertically centers a slide that
  holds only an H1 and one short pain/why/limits box, so it doesn't render
  with dead space in the lower half. Mark it on slots 3+4, 5, and N+1+N+2.
  Don't use it on content-heavy slides (tables, multi-item lists) - those
  read better top-aligned.
- No decorative arrows (`→`, `->`) in slide or chain-document prose. Use
  plain connectors ("to", "leads to", a semicolon) instead. Mermaid diagram
  syntax and UI click-path breadcrumbs in the book are exempt - that's
  required rendering code and standard technical-writing convention, not
  decoration.

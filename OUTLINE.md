# Outline: Intelligent Network Design (지능형네트워크설계)

Software Convergence 001, 한경국립대학교 Hankyong National University.
Instructor: Amalia. Department: 컴퓨터응용수학부 소프트웨어융합전공.

Full pedagogical rules (chain-linking, slot structure) live in `SPINE.md`;
this file is the flat semester-level view. Full step-by-step lab content,
deliverables, and rubrics live in the book (`book/src/`) - this outline
covers the lecture decks only.

## Class Format

Each weekly session is 3×50-minute periods (150 min total): ~1 hour of
lecture/theory via the slide deck listed below, then ~2 hours of hands-on
lab via the matching book chapter. See `book/src/introduction.md`'s "Class
Format" section for the full breakdown.

| Wk | Topic | Deck | Format |
|---|---|---|---|
| 1 | Orientation & Lab Environment | `slides/module-01.md` | Full |
| 2 | Network Review 1 & Packet Tracer Intro | `slides/module-02.md` | Full |
| 3 | Network Review 2 & Router/Switch Basic Config | `slides/module-03.md` | Full |
| 4 | IOS Management Commands | `slides/module-04.md` | Full |
| 5 | Routing Fundamentals & Static Routing | `slides/module-05.md` | Full |
| 6 | Dynamic Routing: RIP & EIGRP | `slides/module-06.md` | Full |
| 7 | Access Control Lists | `slides/module-07.md` | Full |
| 8 | Midterm Exam (Wk 1–7) | - | Practical + written, no deck |
| 9 | Switching & VLANs | `slides/module-09.md` | Full |
| 10 | WAN: PPP & NAT | `slides/module-10.md` | Full |
| 11 | OSPF (Advanced Routing) | `slides/module-11.md` | Full |
| 12 | DHCP | `slides/module-12.md` | Full |
| 13 | Project Proposal Presentations | - | Student presentation day |
| 14 | Project Results Presentations | - | Student presentation day |
| 15 | Final Exam (Wk 1–14) | - | Practical + written, no deck |

## Chain (Limits to Pain), see SPINE.md for full text

1. **Orientation** - you can read a live host's diagnostic state and build a
   2-PC LAN, but you don't yet know what happens to a packet moving through
   OSI layers on a switch/router path. Continues in **W2**.
2. **Network Review 1** - you can trace a packet layer by layer, but the router in
   your topology has no hostname, no password, nothing configured. Continues in **W3**.
3. **Basic Config** - the router is hardened, but you don't yet know the
   vocabulary of `show` commands to diagnose it at 3 AM. Continues in **W4**.
4. **IOS Management** - you can read a router's live state perfectly, but two
   sites still can't reach each other because nobody told the router how.
   Continues in **W5**.
5. **Static Routing** - static routes connect two or three sites, but a
   network with dozens of buildings can't be hand-updated the moment a link
   dies at 3 AM. Continues in **W6**.
6. **Dynamic Routing** - RIP/EIGRP find alternate paths automatically, but
   nothing stops an unauthorized source from reaching a vulnerable service in
   the first place. Continues in **W7**.
7. **ACLs** - ACLs filter Layer 3 traffic between subnets, but they can't
   stop a broadcast storm inside one flat Layer 2 network. Continues in **W9**.
   *(Week 8 midterm: no chain link)*
8. **VLANs** - VLANs isolate broadcast domains across campus switches, but
   connecting to a remote site over a WAN - with authentication, and enough
   public IPs for everyone - is a different problem. Continues in **W10**.
9. **WAN: PPP & NAT** - PAT lets a whole office share one public IP outward,
   but a large multi-building campus still needs routing that converges
   faster and scales further than RIP/EIGRP. Continues in **W11**.
10. **OSPF** - OSPF gets routes to every subnet in seconds, but none of those
    devices have an IP address until someone configures each one by hand.
    Continues in **W12**.
11. **DHCP** - DHCP automates addressing for thousands of devices, but this
    course has only shown small topologies - the capstone project must
    design and defend a network at realistic scale. Continues in **W13-14**.

## Running case study

Two-site company network, built up module by module: a single diagnosed
host (Module 1), layered packet tracing (Module 2), a hardened router pair
(Module 3), verified with `show` commands (Module 4), connected by static
then dynamic routing (Modules 5–6), secured with ACLs (Module 7), segmented
with VLANs (Module 9), extended over a WAN with NAT (Module 10), scaled with
OSPF (Module 11), and automated with DHCP (Module 12) - the same topology
family growing one capability per week toward the Week 13–14 capstone.

## Status

All 11 lecture decks (Modules 1–7, 9–12) drafted, built, and themed.
Handout/worksheet/quiz materials are not yet authored - see the book
(`book/src/`) for full lab instructions, deliverables, and rubrics.

---
marp: true
theme: hankyong
paginate: true
footer: '컴퓨터응용수학부 소프트웨어융합전공'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Module 11: OSPF (Advanced Routing Protocol)

<span class="subtitle">Intelligent Network Design (지능형네트워크설계)</span>

<div class="meta">
Amalia · 컴퓨터응용수학부 소프트웨어융합전공 · 한경국립대학교
</div>

---

<!-- SLOT 2: Where we are -->

# Where We Are

<div class="roadmap">
<div class="wk"><div class="n">Wk 1</div><div class="t">Orientation</div></div>
<div class="wk"><div class="n">Wk 2</div><div class="t">Network Review 1</div></div>
<div class="wk"><div class="n">Wk 3</div><div class="t">Basic Config</div></div>
<div class="wk"><div class="n">Wk 4</div><div class="t">IOS Management</div></div>
<div class="wk"><div class="n">Wk 5</div><div class="t">Static Routing</div></div>
<div class="wk"><div class="n">Wk 6</div><div class="t">Dynamic Routing</div></div>
<div class="wk"><div class="n">Wk 7</div><div class="t">ACLs</div></div>
<div class="wk review"><div class="n">Wk 8</div><div class="t">Midterm Exam</div></div>
<div class="wk"><div class="n">Wk 9</div><div class="t">VLANs</div></div>
<div class="wk"><div class="n">Wk 10</div><div class="t">WAN: PPP &amp; NAT</div></div>
<div class="wk now"><div class="n">Wk 11</div><div class="t">OSPF</div></div>
<div class="wk"><div class="n">Wk 12</div><div class="t">DHCP</div></div>
<div class="wk review"><div class="n">Wk 13</div><div class="t">Proposal Presentation</div></div>
<div class="wk review"><div class="n">Wk 14</div><div class="t">Results Presentation</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

---

<!-- SLOT 3+4: Recap and the pain -->
<!-- _class: callout -->

# Two Minutes of Black-Holed Traffic

<span class="thread">Last time: a large multi-building campus still needs routing that converges faster and scales further than RIP or EIGRP.</span>

<div class="pain">

A route changes in a data center. RIP routers at the edge of a large
enterprise network might not learn about it for two or three minutes -
during which traffic is routed into a black hole. On a network of hundreds
of routers, that's not a rare event; it's a daily one.

</div>

---

<!-- SLOT 5: Cost of not knowing -->
<!-- _class: callout -->

# What This Actually Costs

- RIP's 15-hop limit makes it structurally unusable past a certain network size
- Minutes of lost traffic on every topology change, at scale, every day

<div class="why">
<strong>In industry:</strong> if you work on a multi-campus network, the protocol running between buildings and data centers is almost certainly OSPF.
</div>

---

<!-- SLOT 6: Driving question -->
<!-- _class: section -->

# This Module's Question

<div class="driving-q">"How does a large network compute the best path to every subnet in seconds, not minutes?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Module, You Can

1. Explain OSPF vs RIP: algorithm, metric, convergence, scalability
2. Configure single-area OSPFv2 on multiple routers
3. Configure passive interfaces
4. Verify with `show ip ospf neighbor`, `show ip ospf database`, `show ip route`

---

<!-- SLOT 8: Origin -->

# Where This Idea Came From

**OSPF** (John Moy, RFC 1131 in 1989, revised as RFC 2328 in 1998) was
designed explicitly to replace RIP's hop-count ceiling and slow
convergence. It applies **Dijkstra's shortest-path algorithm (1959)** - over
30 years old at the time - to a live, self-updating network map.

---

<!-- SLOT 9: Core concept -->

# Link-State Routing: Definition

> Every OSPF router floods a **Link State Advertisement** describing its
> own links and costs. All routers in an area build an identical **Link
> State Database**, then each independently runs Dijkstra's algorithm to
> compute its own shortest-path tree.

| Property | OSPF | RIPv2 |
|----------|------|-------|
| Algorithm | Dijkstra SPF | Bellman-Ford |
| Convergence | Seconds | Minutes |

---

<!-- Act 3 / BUILD -->

# Cost & Configuration

OSPF cost = 10⁸ / interface bandwidth. Lower cost = preferred path.

```
router ospf <process-id>
 router-id <A.B.C.D>
 network <network> <wildcard-mask> area <area-id>
 passive-interface <interface>
```

**Why `passive-interface` on LAN ports:** they connect to end devices, not
other routers - sending Hellos there wastes bandwidth. Passive interfaces
still *advertise* the network; they just don't Hello on that port.

---

<!-- SLOT N-2: Worked example -->

# Guided Lab at a Glance

**Part A** - configure OSPF area 0 on three routers, with passive LAN interfaces

**Part B** - verify: neighbor FULL state, LSA count, `O` entries + cost

**Part C** - link failure & reconvergence: shut a link, watch the ~40s dead-interval timeout, restore, watch adjacency states progress to FULL

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **Mismatched area ID:** two routers with different area numbers on the
  same link never form an adjacency - no error, just silence, same as a
  mismatched EIGRP AS number
- **Forgetting `passive-interface` on LAN ports:** wastes bandwidth and can
  expose OSPF Hellos to end devices that have no business seeing them

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. What algorithm does OSPF use to calculate the shortest path?
2. What is a passive interface in OSPF, and why configure one on a LAN-facing interface?

---

# Answers

1. Dijkstra's Shortest Path First (SPF) algorithm, run over the Link State Database
2. An interface that still advertises its network but sends/accepts no Hellos - used on LAN-facing ports since there's no router neighbor to discover there

---

<!-- SLOT N+1+N+2: Limits and bridge -->
<!-- _class: callout -->

# What OSPF Cannot Do

<div class="limits">
OSPF now gets routes to every subnet in seconds. But none of those devices
have an IP address, a gateway, or a DNS server configured - until someone
sets each one up by hand.
</div>

<span class="thread">Next: Module 12 addresses address assignment at scale - DHCP.</span>

---

<!-- SLOT N+3: Summary -->

# Summary

- OSPF's link-state design converges in seconds, not minutes, at any scale
- Passive interfaces keep Hellos off LAN-facing ports without losing advertisement
- **Deliverables & assessment:** OSPF config across three routers, FULL-state
  neighbors, link-failure comparison to RIP - see the book for the full
  rubric

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You

<div class="meta">
Full step-by-step lab instructions:<br>
<a href="../book/module-11.html">Open Module 11 in the Book</a>
</div>

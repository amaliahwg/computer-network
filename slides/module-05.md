---
marp: true
theme: hankyong
paginate: true
footer: '컴퓨터응용수학부 소프트웨어융합전공'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Module 5: Routing Fundamentals & Static Routing

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
<div class="wk now"><div class="n">Wk 5</div><div class="t">Static Routing</div></div>
<div class="wk"><div class="n">Wk 6</div><div class="t">Dynamic Routing</div></div>
<div class="wk"><div class="n">Wk 7</div><div class="t">ACLs</div></div>
<div class="wk review"><div class="n">Wk 8</div><div class="t">Midterm Exam</div></div>
<div class="wk"><div class="n">Wk 9</div><div class="t">VLANs</div></div>
<div class="wk"><div class="n">Wk 10</div><div class="t">WAN: PPP &amp; NAT</div></div>
<div class="wk"><div class="n">Wk 11</div><div class="t">OSPF</div></div>
<div class="wk"><div class="n">Wk 12</div><div class="t">DHCP</div></div>
<div class="wk review"><div class="n">Wk 13</div><div class="t">Proposal Presentation</div></div>
<div class="wk review"><div class="n">Wk 14</div><div class="t">Results Presentation</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

---

<!-- SLOT 3+4: Recap and the pain -->
<!-- _class: callout -->

# Seoul Can't Reach Busan

<span class="thread">Last time: two sites still can't reach each other, because nobody has told either router how.</span>

<div class="pain">

Two branch offices, each with its own local network. Every PC can ping its
own router - but no one in Seoul can ping anyone in Busan. Orders never
reach the warehouse. Email fails silently. The link between the offices is
physically connected - the router just doesn't know to use it.

</div>

---

<!-- SLOT 5: Cost of not knowing -->
<!-- _class: callout -->

# What This Actually Costs

- Two perfectly healthy local networks stay functionally isolated from each other
- The failure is silent - no error, no alarm, just packets that quietly go nowhere

<div class="why">
<strong>In industry:</strong> misrouted or missing static routes are one of the most common real-world multi-site outage causes - and one of the fastest to fix, once diagnosed correctly.
</div>

---

<!-- SLOT 6: Driving question -->
<!-- _class: section -->

# This Module's Question

<div class="driving-q">"How does a router know where to send a packet it isn't directly connected to?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Module, You Can

1. Explain how a router makes a forwarding decision using its routing table
2. Configure static routes: next-hop IP syntax and exit-interface syntax
3. Configure a default route (gateway of last resort)
4. Diagnose and fix broken inter-network connectivity

---

<!-- SLOT 8: Origin -->

# Where This Idea Came From

Static routing is the oldest form of inter-network routing - before any
dynamic protocol existed, every router in the early ARPANET era needed an
operator to hand-enter which networks were reachable through which
neighbor. Every dynamic protocol that came later (Modules 6 and 11) exists
to automate exactly this manual step.

---

<!-- SLOT 9: Core concept -->

# Forwarding Decision: Definition

> When a packet arrives, the router looks at the destination IP, searches
> its routing table for the **longest prefix match**, and forwards out the
> matching interface or next hop. No match → use the **default route**
> (`0.0.0.0/0`) if one exists; otherwise, drop the packet.

```
ip route <network> <mask> <next-hop-IP>
ip route 0.0.0.0 0.0.0.0 <next-hop-IP>   ← default route
```

---

<!-- Act 3 / BUILD -->

# Routing Table Codes

| Code | Meaning |
|------|---------|
| `C` | Directly connected |
| `L` | Local (router's own interface, /32) |
| `S` | Static route |
| `S*` | Static default route |

**Routing is never one-way** - request *and* reply packets each need a
path, so both routers need a route to the other's LAN.

---

# Reading Ping Failures

| Ping Output | Meaning | Fix Where? |
|-------------|---------|-----------|
| `Destination Host Unreachable` | Source's gateway couldn't forward | Router **nearest the source** |
| `Request Timed Out` | Reached destination, no reply came back | Router **nearest the destination** |

This heuristic saves real diagnostic time in the field.

---

<!-- SLOT N-2: Worked example -->

# Guided Lab at a Glance

**Part A** - build a two-site topology, observe the failed cross-site ping

**Part B** - add static routes on both routers, verify, test successful ping

**Part C** - add an ISP-gateway router, configure a default route (`S*`)

**Part D** - break-and-fix: diagnose an injected fault using only `show ip route` and `ping`

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **Configuring only one direction:** a route on the source router without
  a matching route on the destination router - the request arrives, the
  reply has nowhere to go
- **Confusing next-hop IP with exit-interface syntax:** both work, but
  mixing up which one you meant to type produces a route to the wrong
  place, not an error

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. What is the difference between `ip route 192.168.2.0 255.255.255.0 10.0.0.2` and `ip route 192.168.2.0 255.255.255.0 Serial0/0`?
2. What is a default route, and when is it used?

---

# Answers

1. The first specifies a next-hop IP (router still ARPs to find the MAC); the second specifies an exit interface directly
2. A route matching `0.0.0.0/0`, used when no more specific route matches - the "gateway of last resort"

---

<!-- SLOT N+1+N+2: Limits and bridge -->
<!-- _class: callout -->

# What Static Routing Cannot Do

<div class="limits">
Static routes connect two or three sites fine. But a network with dozens
of buildings can't be hand-updated the moment a link fails at 3 AM - every
affected site stays isolated until someone notices and logs in manually.
</div>

<span class="thread">Next: Module 6 addresses routing at scale - dynamic routing protocols that update automatically.</span>

---

<!-- SLOT N+3: Summary -->

# Summary

- Routing is bidirectional - both ends need a path
- Ping failure symptoms tell you *which side* is missing a route
- **Deliverables & assessment:** both routing tables, successful cross-site
  ping, default route, break-and-fix diagnostic narrative - see the book
  for the full rubric

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You

<div class="meta">
Full step-by-step lab instructions:<br>
<a href="../book/module-05.html">Open Module 5 in the Book</a>
</div>

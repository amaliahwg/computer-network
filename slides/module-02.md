---
marp: true
theme: hankyong
paginate: true
footer: '컴퓨터응용수학부 소프트웨어융합전공'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Module 2: Network Review 1 & Packet Tracer Intro

<span class="subtitle">Intelligent Network Design (지능형네트워크설계)</span>

<div class="meta">
Amalia · 컴퓨터응용수학부 소프트웨어융합전공 · 한경국립대학교
</div>

---

<!-- SLOT 2: Where we are -->

# Where We Are

<div class="roadmap">
<div class="wk"><div class="n">Wk 1</div><div class="t">Orientation</div></div>
<div class="wk now"><div class="n">Wk 2</div><div class="t">Network Review 1</div></div>
<div class="wk"><div class="n">Wk 3</div><div class="t">Basic Config</div></div>
<div class="wk"><div class="n">Wk 4</div><div class="t">IOS Management</div></div>
<div class="wk"><div class="n">Wk 5</div><div class="t">Static Routing</div></div>
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

# "The Network Is Down" - But Where?

<span class="thread">Last time: you still don't know what happens to a packet's headers as it crosses a switch and a router.</span>

<div class="pain">

A junior engineer says "the network is down." Usually it means one
application on one machine stopped working. Is the cable unplugged? Is the
address wrong? Is the port blocked? Is the server itself down? Without a
systematic way to check, "down" is just a guess.

</div>

---

<!-- SLOT 5: Cost of not knowing -->
<!-- _class: callout -->

# What This Actually Costs

- Without a layer-by-layer checklist, troubleshooting becomes random guessing
- Wrong fixes get applied at the wrong layer, wasting time without resolving anything

<div class="why">
<strong>In industry:</strong> "which layer would you check first" is one of the most common networking interview questions - it tests whether you troubleshoot systematically or guess.
</div>

---

<!-- SLOT 6: Driving question -->
<!-- _class: section -->

# This Module's Question

<div class="driving-q">"When someone says 'the network is down,' which layer do you check first?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Module, You Can

1. Describe the function of each OSI layer and map it to the TCP/IP layer
2. Use Simulation Mode to observe encapsulation and decapsulation
3. Identify which protocols operate at which layers via packet capture
4. Trace a full HTTP request, naming each envelope added/removed per hop

---

<!-- SLOT 8: Origin -->

# Where This Idea Came From

The **OSI model** (ISO, 1984) was designed by committee to let any vendor's
equipment interoperate - a teaching and interoperability reference, mostly
never implemented layer-for-layer. The **TCP/IP model** (Cerf & Kahn, DARPA,
1974) was the pragmatic, already-shipping protocol suite that became the
real internet. Today we use OSI's vocabulary to talk about TCP/IP's reality.

---

<!-- SLOT 9: Core concept -->

# Encapsulation: Definition

> Each layer adds a **header** (and sometimes a trailer) to the data handed
> down from above - **encapsulation**. At the receiving end, each layer
> strips its own header and passes the remainder up - **decapsulation**.

| OSI | TCP/IP | PDU | Key Protocols |
|-----|--------|-----|---------------|
| Application / Presentation / Session | Application | Data | HTTP, DNS, TLS |
| Transport | Transport | Segment | TCP, UDP |
| Network | Internet | Packet | IP, ICMP, ARP |
| Data Link / Physical | Network Access | Frame / Bit | Ethernet, PPP |

---

<!-- Act 3 / BUILD -->

# Switch vs Router - Which Layer Do They Read?

- **Switch (Layer 2):** reads the destination **MAC** in the Ethernet frame, forwards to the correct port - never looks at the IP header
- **Router (Layer 3):** strips the Ethernet frame, reads the **IP** destination, makes a routing decision, re-encapsulates for the next hop

This is why routing is needed **between** subnets but not **within** them -
and why layer-by-layer troubleshooting works: each device answers only for
its own layer.

---

# Why ARP Must Precede ICMP

ARP is a **Layer 2 broadcast** - every device on the local segment receives
it, but only the device owning the target IP replies.

This is why ARP works within a subnet but **cannot cross a router**
(routers don't forward broadcasts) - and why your PC must resolve a MAC
address before sending its first ICMP Echo Request to a new neighbor.

---

<!-- SLOT N-2: Worked example -->

# Guided Lab at a Glance

**Part A** - build a 3-subnet review topology (same-subnet pings work;
cross-router pings intentionally fail - routing comes in Module 3)

**Part B** - Simulation Mode: watch ARP + ICMP for a same-subnet ping

**Part C** - Simulation Mode: trace a full HTTP request (DNS → TCP → HTTP)

**Part D** - ARP cause-and-effect: why `arp -a` output changes after a ping

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **Assuming a switch reads IP headers:** it doesn't - a switch never looks
  past Layer 2, so "the switch dropped it because of a bad IP" is never the
  right diagnosis
- **Testing HTTP before checking ARP/ICMP:** if the lower layers aren't
  confirmed working first, a failed HTTP request tells you nothing about
  *where* the problem is

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. What is encapsulation? Describe it in one sentence without using the word "wrap."
2. A frame is received by a switch. Does the switch look at the IP header? Why or why not?

---

# Answers

1. Each layer adds its own header to the data before passing it down to the layer below
2. No - a switch operates at Layer 2 and only reads the destination MAC address to decide which port to forward the frame out of

---

<!-- SLOT N+1+N+2: Limits and bridge -->
<!-- _class: callout -->

# What Layer-by-Layer Tracing Cannot Do

<div class="limits">
You can now trace a packet through every layer. But the router in your
topology has no hostname, no password, nothing configured - anyone with
access to it could type <code>enable</code> and change anything.
</div>

<span class="thread">Next: Module 3 addresses the unsecured router - IOS mode navigation and basic hardening.</span>

---

<!-- SLOT N+3: Summary -->

# Summary

- Every "network is down" report starts with: which layer?
- Switches read Layer 2 only; routers read up to Layer 3
- **Deliverables & assessment:** topology diagram, annotated ARP/ICMP and
  HTTP simulation screenshots, switch-vs-router explanation - see the book
  for the full rubric

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You

<div class="meta">
Full step-by-step lab instructions:<br>
<a href="../book/module-02.html">Open Module 2 in the Book</a>
</div>

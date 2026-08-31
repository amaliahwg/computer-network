---
marp: true
theme: hankyong
paginate: true
footer: '컴퓨터응용수학부 소프트웨어융합전공'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Module 12: DHCP

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
<div class="wk"><div class="n">Wk 11</div><div class="t">OSPF</div></div>
<div class="wk now"><div class="n">Wk 12</div><div class="t">DHCP</div></div>
<div class="wk review"><div class="n">Wk 13</div><div class="t">Proposal Presentation</div></div>
<div class="wk review"><div class="n">Wk 14</div><div class="t">Results Presentation</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

---

<!-- SLOT 3+4: Recap and the pain -->
<!-- _class: callout -->

# 300 Manual Configurations Before Class Starts

<span class="thread">Last time: none of those devices have an IP address until someone configures each one by hand.</span>

<div class="pain">

A university manages 3,000 laptops across 50 classrooms. Without
automatic addressing, every laptop in every new room needs its IP, mask,
gateway, and DNS entered by hand - 300 manual setups before a single
300-seat exam hall can go online.

</div>

---

<!-- SLOT 5: Cost of not knowing -->
<!-- _class: callout -->

# What This Actually Costs

- Manual addressing doesn't scale past a handful of devices, let alone thousands
- A rogue DHCP server can hand out malicious gateway/DNS settings, redirecting all traffic through an attacker

<div class="why">
<strong>In industry:</strong> DHCP is running on essentially every corporate, campus, and home network in the world - and DHCP Snooping (detecting rogue servers) is standard switch security configuration.
</div>

---

<!-- SLOT 6: Driving question -->
<!-- _class: section -->

# This Module's Question

<div class="driving-q">"How does a new device get a full network configuration automatically, in milliseconds?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Module, You Can

1. Explain the DHCP DORA process
2. Configure a router as a DHCP server - pools, exclusions, lease, DNS
3. Configure a DHCP relay agent (`ip helper-address`)
4. Troubleshoot with `ipconfig /release` and `/renew`

---

<!-- SLOT 8: Origin -->

# Where This Idea Came From

**DHCP (RFC 1531, 1993, R. Droms)** was built to replace **BOOTP**, whose
static IP-to-MAC mapping table required a human to update it for every new
device. DHCP added automatic, time-limited **leases** - the same
foundational idea BOOTP never had.

---

<!-- SLOT 9: Core concept -->

# DORA: Definition

> A DHCP client obtains its configuration through four messages: **D**iscover
> (broadcast), **O**ffer (server responds with an available lease),
> **R**equest (client formally claims it), **A**cknowledge (server
> confirms). All four share one Transaction ID.

| # | Message | Direction |
|---|---------|-----------|
| 1–3 | Discover, Request | Client → Server (broadcast) |
| 2, 4 | Offer, Acknowledge | Server → Client (unicast) |

---

<!-- Act 3 / BUILD -->

# Server Config & Relay

```
ip dhcp excluded-address <start> <end>
ip dhcp pool <name>
 network <network> <mask>
 default-router <gateway-IP>
 dns-server <DNS-IP>
```

**DHCP relay** - since Discover is a broadcast and routers don't forward
broadcasts between subnets, a relay converts it to unicast toward the
server: `ip helper-address <DHCP-server-IP>`, applied on the **client-facing**
interface.

---

<!-- SLOT N-2: Worked example -->

# Guided Lab at a Glance

**Part A** - configure a router as a DHCP server; verify pool/binding/statistics

**Part B** - client verification: `ipconfig /all`, release/renew, observe DORA live

**Part C** - DHCP relay: DHCP fails across a router without a relay, succeeds once `ip helper-address` is configured

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **Forgetting exclusions:** without `ip dhcp excluded-address`, the pool
  can hand out the router's or a server's own static IP to a client
- **Relay on the wrong interface:** `ip helper-address` must go on the
  **client-facing** interface, not the one facing the DHCP server

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. Why does the DHCP Discover message use a broadcast destination?
2. What is a DHCP relay agent, and why is it needed when the server is on a different subnet?

---

# Answers

1. The client has no IP yet and doesn't know the server's address, so it broadcasts to reach any listening DHCP server
2. A relay agent converts the client's broadcast Discover into a unicast message toward the server, since routers don't forward broadcasts across subnets

---

<!-- SLOT N+1+N+2: Limits and bridge -->
<!-- _class: callout -->

# What DHCP Cannot Do

<div class="limits">
DHCP now automates addressing for thousands of devices. But every
topology this semester has been two to five routers - the real test is
whether you can design, build, and defend a network at realistic scale,
end to end, on your own.
</div>

<span class="thread">Next: Weeks 13-14, the capstone - designing and defending a complete network of your own, at realistic scale.</span>

---

<!-- SLOT N+3: Summary -->

# Summary

- DORA automates in milliseconds what used to take a person by hand
- Relay agents extend one DHCP server across every subnet in a campus
- **Deliverables & assessment:** DHCP pool + binding table, DORA event
  capture, relay before/after - see the book for the full rubric

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You

<div class="meta">
Full step-by-step lab instructions:<br>
<a href="../book/module-12.html">Open Module 12 in the Book</a>
</div>

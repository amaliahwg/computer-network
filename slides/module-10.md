---
marp: true
theme: hankyong
paginate: true
footer: '컴퓨터응용수학부 소프트웨어융합전공'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Module 10: WAN - PPP & NAT

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
<div class="wk now"><div class="n">Wk 10</div><div class="t">WAN: PPP &amp; NAT</div></div>
<div class="wk"><div class="n">Wk 11</div><div class="t">OSPF</div></div>
<div class="wk"><div class="n">Wk 12</div><div class="t">DHCP</div></div>
<div class="wk review"><div class="n">Wk 13</div><div class="t">Proposal Presentation</div></div>
<div class="wk review"><div class="n">Wk 14</div><div class="t">Results Presentation</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

---

<!-- SLOT 3+4: Recap and the pain -->
<!-- _class: callout -->

# The Internet Ran Out of Addresses

<span class="thread">Last time: connecting to a remote site over a WAN - with authentication, and enough public IPs for everyone - is a different problem entirely.</span>

<div class="pain">

IPv4 has 4.3 billion addresses. In 2011, the last remaining blocks were
allocated to the world's registries. Today, a new public IPv4 address
costs real money or a long wait - impossible for every device in an office
to have its own.

</div>

---

<!-- SLOT 5: Cost of not knowing -->
<!-- _class: callout -->

# What This Actually Costs

- Without address sharing, an entire office cannot get online on a single internet connection
- WAN links without authentication let anyone who taps the line masquerade as the other site

<div class="why">
<strong>In industry:</strong> NAT/PAT runs on nearly every home router and enterprise edge device in the world - it is the single most-deployed IPv4 workaround in networking history.
</div>

---

<!-- SLOT 6: Driving question -->
<!-- _class: section -->

# This Module's Question

<div class="driving-q">"How can hundreds of devices share one public IP address, safely and authenticated?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Module, You Can

1. Configure PPP encapsulation and CHAP authentication on a serial WAN link
2. Configure static NAT (one-to-one) and PAT/NAT overload (many-to-one)
3. Verify NAT operation with `show ip nat translations`
4. Explain inside/outside, local/global NAT terminology

---

<!-- SLOT 8: Origin -->

# Where This Idea Came From

**PPP (RFC 1661, 1994)** replaced the earlier SLIP protocol, adding
authentication and error detection that raw serial links lacked. **NAT
(RFC 1631, 1994)** was proposed the same year as an explicit *stopgap*
while IPv6 was developed - thirty years later, it's still the primary
mechanism keeping IPv4 alive.

---

<!-- SLOT 9: Core concept -->

# CHAP Authentication: Definition

> **CHAP** authenticates a WAN link without ever sending the password
> across it: the authenticator sends a random challenge, the responder
> replies with an MD5 hash of (challenge + password), and the
> authenticator verifies the hash locally.

Same principle as `enable secret` (Module 3): never send or store
passwords in plaintext.

---

<!-- Act 3 / BUILD -->

# NAT Terminology

| Term | Meaning | Example |
|------|---------|---------|
| Inside local | Private IP of an inside host | 192.168.1.10 |
| Inside global | Public IP representing that host outside | 203.0.113.5 |

| | Static NAT | PAT (Overload) |
|---|---|---|
| Mapping | 1 local ↔ 1 global | Many local ↔ 1 global (port-multiplexed) |
| Use case | Hosting a server | Sharing one public IP outbound |

---

<!-- SLOT N-2: Worked example -->

# Guided Lab at a Glance

**Part A** - PPP & CHAP: configure encapsulation and matching credentials; break the password deliberately, observe, then recover

**Part B** - static NAT: map an inside server to a public IP

**Part C** - PAT (overload): an entire LAN shares one public IP, verified with port-multiplexed translation entries

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **CHAP username mismatch:** the username configured on each router must
  match the **hostname of the other router**, not its own - a common
  reversal
- **Forgetting `ip nat inside`/`outside`:** NAT rules exist but do nothing
  until both the inside and outside interfaces are explicitly marked

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. What does PPP provide that raw serial encapsulation does not?
2. How does PAT allow multiple inside hosts to share one outside IP address?

---

# Answers

1. Authentication (CHAP/PAP), error detection, and negotiated Layer 3 protocol support via NCP
2. Each connection is distinguished by a unique source port number, multiplexed onto the single shared outside IP

---

<!-- SLOT N+1+N+2: Limits and bridge -->
<!-- _class: callout -->

# What PPP & NAT Cannot Do

<div class="limits">
PAT now lets a whole office share one public IP outward. But a large
multi-building campus still needs routing that converges faster and
scales further than RIP or EIGRP - the WAN link works, the campus core
still doesn't scale.
</div>

<span class="thread">Next: Module 11 addresses large-scale routing convergence - OSPF.</span>

---

<!-- SLOT N+3: Summary -->

# Summary

- PPP/CHAP secures the link; NAT/PAT solves address scarcity
- Static NAT is one-to-one; PAT is many-to-one via port multiplexing
- **Deliverables & assessment:** PPP/CHAP failure-and-recovery, static NAT
  and PAT translation tables - see the book for the full rubric

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You

<div class="meta">
Full step-by-step lab instructions:<br>
<a href="../book/module-10.html">Open Module 10 in the Book</a>
</div>

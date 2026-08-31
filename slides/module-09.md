---
marp: true
theme: hankyong
paginate: true
footer: '컴퓨터응용수학부 소프트웨어융합전공'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Module 9: Switching & VLANs

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
<div class="wk now"><div class="n">Wk 9</div><div class="t">VLANs</div></div>
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

# One Bad Program, One Dead Floor

<span class="thread">Before the midterm: ACLs never see traffic that never needed to be routed - a flat Layer 2 network has no isolation at all.</span>

<div class="pain">

A department connects 80 PCs to the same switches. A poorly written
program floods the network with broadcast frames. Every single PC must
process every broadcast - 80 PCs processing an endless flood means no CPU
cycles left for anything else. The entire floor stops responding.

</div>

---

<!-- SLOT 5: Cost of not knowing -->
<!-- _class: callout -->

# What This Actually Costs

- A flat network means one misbehaving device can take down every device sharing its switches
- No isolation between departments that shouldn't be able to reach each other at all

<div class="why">
<strong>In industry:</strong> VLAN design is one of the first things a network engineer touches on any campus or enterprise deployment - it's assumed baseline knowledge.
</div>

---

<!-- SLOT 6: Driving question -->
<!-- _class: section -->

# This Module's Question

<div class="driving-q">"How do you divide one physical switch infrastructure into isolated logical networks?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Module, You Can

1. Explain what a VLAN is and how it differs from a physical LAN
2. Create VLANs, assign ports
3. Configure a trunk link, verify VLAN propagation
4. Implement inter-VLAN routing - router-on-a-stick

---

<!-- SLOT 8: Origin -->

# Where This Idea Came From

Before VLANs, logical segmentation meant physically separate switches and
cabling for every department. **IEEE 802.1Q (1998)** standardized a way to
tag frames with a VLAN ID, letting one physical switch infrastructure
behave as many isolated logical ones - no rewiring required.

---

<!-- SLOT 9: Core concept -->

# VLAN: Definition

> A VLAN is a logical partition of a switched network: frames tagged VLAN
> 10 only forward to other VLAN-10 ports - broadcasts stay inside the
> VLAN. A PC in VLAN 10 cannot directly reach a PC in VLAN 20, even on the
> same physical switch.

---

<!-- Act 3 / BUILD -->

# Access Ports vs Trunk Ports

| Port Type | Belongs To | Tagging |
|-----------|------------|---------|
| **Access** | Exactly one VLAN | None (switch adds/strips internally) |
| **Trunk** | Multiple VLANs | 802.1Q tag (4-byte insert with VLAN ID) |

Trunks connect switch-to-switch and switch-to-router.

---

# Router-on-a-Stick

One physical router interface, divided into **sub-interfaces**, one per
VLAN:

```
interface FastEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0
```

The trunk carries tagged frames for every VLAN to the router; it strips,
routes, and re-tags for the destination VLAN.

---

<!-- SLOT N-2: Worked example -->

# Guided Lab at a Glance

**Part A** - create VLANs, assign ports; same-VLAN pings succeed, cross-VLAN pings fail (isolated, as expected)

**Part B** - add a second switch, configure a trunk link, verify propagation

**Part C** - router-on-a-stick: configure sub-interfaces, cross-VLAN ping succeeds

**Part D** - verification: `show vlan brief`, `show interfaces trunk`, `show ip route`

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **Forgetting the trunk's allowed-VLAN list:** a trunk with no explicit
  `switchport trunk allowed vlan` may still work by default, but silently
  carries VLANs you never intended to extend between switches
- **Sub-interface encapsulation mismatch:** the `dot1Q` VLAN number on the
  sub-interface must match the VLAN configured on the switch exactly

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. What is the difference between an access port and a trunk port?
2. What is "router-on-a-stick" inter-VLAN routing? Why is it called that?

---

# Answers

1. An access port belongs to one VLAN and carries untagged frames; a trunk port carries tagged frames from multiple VLANs
2. One physical router interface (the "stick"), divided into per-VLAN sub-interfaces, handles routing for every VLAN through a single trunk link

---

<!-- SLOT N+1+N+2: Limits and bridge -->
<!-- _class: callout -->

# What VLANs Cannot Do

<div class="limits">
VLANs isolate broadcast domains across your campus switches. But
connecting to a remote site over a WAN link - with authentication, and
enough public IP addresses for everyone - is a completely different
problem.
</div>

<span class="thread">Next: Module 10 addresses inter-site WAN connectivity - PPP and NAT.</span>

---

<!-- SLOT N+3: Summary -->

# Summary

- One flat network is one big failure domain - VLANs fix that
- Router-on-a-stick lets one interface route for every VLAN
- **Deliverables & assessment:** `show vlan brief`, trunk verification,
  successful inter-VLAN ping - see the book for the full rubric

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You

<div class="meta">
Full step-by-step lab instructions:<br>
<a href="../book/module-09.html">Open Module 9 in the Book</a>
</div>

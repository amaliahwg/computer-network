---
marp: true
theme: hankyong
paginate: true
footer: '컴퓨터응용수학부 소프트웨어융합전공'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Module 4: IOS Management Commands

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
<div class="wk now"><div class="n">Wk 4</div><div class="t">IOS Management</div></div>
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

# The Midnight Call

<span class="thread">Last time: you still can't read what's actually happening inside the router when something goes wrong.</span>

<div class="pain">

A branch office can't reach headquarters. You log into the router
remotely. Nothing looks obviously wrong. Is an interface down? Is there a
duplicate IP? Did someone apply a filter? Is a route missing? You need to
see inside the device, right now, without guessing.

</div>

---

<!-- SLOT 5: Cost of not knowing -->
<!-- _class: callout -->

# What This Actually Costs

- Without a systematic set of diagnostic commands, "nothing looks wrong" is where troubleshooting stalls
- Engineers who don't know these commands cold spend hours where others spend minutes

<div class="why">
<strong>In industry:</strong> reading <code>show ip route</code> / <code>show interfaces</code> output correctly is the single most common on-the-job skill tested in networking role interviews.
</div>

---

<!-- SLOT 6: Driving question -->
<!-- _class: section -->

# This Module's Question

<div class="driving-q">"How do you see a router's live internal state in seconds, without external documentation?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Module, You Can

1. Use `?` (context-sensitive help) to discover commands without memorizing them
2. Execute and interpret key `show` commands
3. Configure all interfaces (IP address, `no shutdown`) and verify them
4. Compare running-config vs startup-config and explain the implications

---

<!-- SLOT 8: Origin -->

# Where This Idea Came From

Cisco's IOS CLI was designed around one goal: an operator should be able to
diagnose a device without memorizing hundreds of commands or having a
manual on hand. The `?` context-help system and the layered `show` command
family both trace back to that same 1980s design principle - discoverable
over memorized.

---

<!-- SLOT 9: Core concept -->

# Interface State: Definition

> Every Cisco interface reports two independent status indicators:
> **physical** (up/down/administratively down) and **data link** (up/down).
> If Layer 1 is down, Layer 2 is always down too - but Layer 1 up with
> Layer 2 down often signals an encapsulation mismatch.

```
FastEthernet0/0 is up, line protocol is up
```

---

<!-- Act 3 / BUILD -->

# Key `show` Commands

| Command | Reveals |
|---------|---------|
| `show version` | IOS version, uptime, memory |
| `show ip interface brief` | Compact table: all interfaces, IP, state |
| `show running-config` / `show startup-config` | Live vs saved config |
| `show ip route` | Routing table |
| `show arp` | IP-to-MAC mappings learned |
| `show cdp neighbors` | Directly connected Cisco devices |

---

# Ping & Traceroute as Diagnostic Tools

IOS ping symbol patterns:

- `!!!!!` full connectivity · `.....` no route near the **source**
- `U....` "no route to host" from the router near the **destination**

**Traceroute** sends probes with increasing TTL; each router that
decrements TTL to 0 replies "Time Exceeded," revealing the path hop by hop.

---

<!-- SLOT N-2: Worked example -->

# Guided Lab at a Glance

**Part A** - `?` context-help at every mode level

**Part B** - configure both interfaces with student-ID-based addressing

**Part C** - `show` command deep-dive across the full toolkit

**Part D** - extended ping/traceroute options

**Part E** - save config, add a loopback, reload without saving, observe what survives

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **Reading "administratively down" as a cable fault:** it means someone ran
  `shutdown` - the fix is `no shutdown`, not a new cable
- **Trusting `running-config` alone:** a config that looks correct on screen
  can vanish on reload if it was never saved to `startup-config`

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. What does `show ip interface brief` show that `show interfaces` does not?
2. An interface shows `up, line protocol is down`. What does this suggest?

---

# Answers

1. A compact one-line-per-interface summary of IP and state - `show interfaces` gives deep per-interface detail (counters, errors, MTU) but not an at-a-glance table of all interfaces
2. Layer 1 (physical) is fine, but Layer 2 isn't - often an encapsulation mismatch on WAN links

---

<!-- SLOT N+1+N+2: Limits and bridge -->
<!-- _class: callout -->

# What `show` Commands Cannot Do

<div class="limits">
You can now read a router's live state perfectly. But two sites still
can't reach each other, because nobody has told either router how to get
traffic to the other's network.
</div>

<span class="thread">Next: Module 5 addresses inter-site connectivity - static routing.</span>

---

<!-- SLOT N+3: Summary -->

# Summary

- `?` and `show` commands turn a black box into a readable device
- running-config vs startup-config: what's live vs what survives a reboot
- **Deliverables & assessment:** annotated `show` command screenshots,
  student-ID-based interface addressing, RAM/NVRAM explanation - see the
  book for the full rubric

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You

<div class="meta">
Full step-by-step lab instructions:<br>
<a href="../book/module-04.html">Open Module 4 in the Book</a>
</div>

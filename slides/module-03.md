---
marp: true
theme: hankyong
paginate: true
footer: '컴퓨터응용수학부 소프트웨어융합전공'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Module 3: Network Review 2 & Router/Switch Basic Config

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
<div class="wk now"><div class="n">Wk 3</div><div class="t">Basic Config</div></div>
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

# An Open Door

<span class="thread">Last time: the router in your topology has no hostname, no password, nothing configured.</span>

<div class="pain">

Every Cisco device leaves the factory the same way: no hostname, no
passwords, no IP addresses, every interface shut down. The moment it's
installed in a real network, it becomes a target - attackers actively scan
for unconfigured routers, because default credentials are public knowledge.

</div>

---

<!-- SLOT 5: Cost of not knowing -->
<!-- _class: callout -->

# What This Actually Costs

- The 2016 Bangladesh Bank heist - $81 million stolen via SWIFT - began with attackers who had already compromised router-level access
- A router with no console password, no enable password, no management restrictions is an open door to everything behind it

<div class="why">
<strong>In industry:</strong> device hardening (passwords, banners, disabling unused services) is the first line item in almost every network security audit checklist.
</div>

---

<!-- SLOT 6: Driving question -->
<!-- _class: section -->

# This Module's Question

<div class="driving-q">"What's the first thing you must do to a factory-default router before it touches a real network?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Module, You Can

1. Access a router/switch's CLI via its Console port
2. Navigate the IOS mode hierarchy
3. Apply hardening: hostname, console password, VTY password, enable secret, MOTD banner
4. Verify the active configuration with `show` commands

---

<!-- SLOT 8: Origin -->

# Where This Idea Came From

Cisco IOS (1986) was one of the first commercial router operating systems,
and its earliest versions supported only a plaintext `enable password`.
Once operators realized that password showed up in cleartext in any
`show running-config` printout - readable by anyone who could see the
screen - Cisco added `enable secret`, storing the password as an MD5 hash
instead.

---

<!-- SLOT 9: Core concept -->

# IOS Mode Hierarchy: Definition

> Cisco IOS uses a hierarchical command structure. The **prompt** tells you
> exactly where you are: `Router>` (User EXEC) → `Router#` (Privileged EXEC)
> → `Router(config)#` (Global Config) → `Router(config-if)#` (Interface
> Config).

```
Router> enable                     → Privileged EXEC
Router# configure terminal         → Global Config
Router(config)# interface Fa0/0    → Interface Config
Router(config)# end  (Ctrl+Z)      → back to Privileged EXEC
```

---

<!-- Act 3 / BUILD -->

# Config Storage: RAM vs NVRAM

| Store | Memory | Contents | Persists reboot? |
|-------|--------|----------|-------------------|
| running-config | RAM (volatile) | Currently active | No |
| startup-config | NVRAM (non-volatile) | Loaded at boot | Yes |

Save with: `copy running-config startup-config` (or `wr`)

Anything only in `running-config` - hostname, passwords, interface
config - is **lost** on reload unless it's saved first.

---

<!-- SLOT N-2: Worked example -->

# Guided Lab at a Glance

**Part A** - physical UTP crimping (if hardware available) *or* subnetting
review drills

**Part B** - IOS mode navigation: observe the prompt change through all
four modes

**Part C** - basic router hardening: hostname, MOTD banner, console
password, VTY password, `enable secret`, save config, `reload` and observe

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **Using `enable password` instead of `enable secret`:** the former stores
  the password in cleartext in the config file - always use `enable secret`
- **Forgetting to save before `reload`:** every hardening command you just
  typed lives only in `running-config` until `copy running-config
  startup-config` runs

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. What is the difference between `enable password` and `enable secret`? Which should always be used in production?
2. What happens to unsaved configuration changes if a router loses power?

---

# Answers

1. `enable password` stores the password in cleartext; `enable secret` stores an MD5 hash. Always use `enable secret`
2. They are lost - `running-config` lives in volatile RAM and is not preserved across a power loss or reload

---

<!-- SLOT N+1+N+2: Limits and bridge -->
<!-- _class: callout -->

# What Basic Hardening Cannot Do

<div class="limits">
The router is now hardened with passwords and a hostname. But you don't yet
know the vocabulary of <code>show</code> commands needed to diagnose what's
actually happening inside it when something goes wrong.
</div>

<span class="thread">Next: Module 4 addresses it - the `show` command toolkit.</span>

---

<!-- SLOT N+3: Summary -->

# Summary

- Factory-default devices are insecure by design - hardening is step one
- `running-config` (RAM) vs `startup-config` (NVRAM) - save or lose it
- **Deliverables & assessment:** all four IOS prompts, hardening commands
  applied, encrypted `enable secret` visible in running-config - see the
  book for the full rubric

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You

<div class="meta">
Full step-by-step lab instructions:<br>
<a href="../book/module-03.html">Open Module 3 in the Book</a>
</div>

# Week 13 - Project Proposal Presentation

## Overview

In Week 13, each team presents a **10-minute proposal** followed by **5 minutes of Q&A** from the instructor and other teams. The proposal is not a finished product - it is a design plan. The goal is to surface misunderstandings, ambiguities, and design flaws *before* you spend hours building the wrong thing.

A proposal that identifies a design flaw during Week 13 Q&A is a success, not a failure. The Q&A is where you get free advice.

## Proposal Template

Your proposal slides (or document) must address each section below.

---

### 1. Team & Scenario

| Field | Your answer |
|-------|-------------|
| Team name | |
| Team members (name + student ID) | |
| Chosen scenario | A / B / C / D |
| Scenario rationale | Why this scenario? (2–3 sentences) |

---

### 2. Problem Statement

Describe the **real-world problem** your network must solve:
- What organization are you designing for?
- What are the business/operational requirements?
- What breaks or becomes dangerous without a well-designed network?

*Recommended length: 1 paragraph.*

---

### 3. Network Topology Diagram

Include a **logical topology diagram** showing:
- All routers and switches (with hostnames)
- All VLANs and which devices belong to them
- All WAN links (type: serial/Ethernet, encapsulation)
- All device types (PC, server, etc.) at least representative

You may draw this by hand, use draw.io, or export from Packet Tracer. Label every link with the subnet it carries.

---

### 4. Addressing Table

Provide a complete IP addressing plan:

| Device | Interface | IP Address | Subnet Mask | VLAN | Notes |
|--------|-----------|------------|-------------|------|-------|
| R0 | Fa0/0 | | | | |
| R0 | Fa0/0.10 | | | 10 | VLAN 10 subif |
| ... | | | | | |

- Show your subnet calculation: how many hosts per subnet? Which prefix length did you choose and why?
- Identify which addresses are excluded from DHCP pools.
- Identify which devices have static IPs and justify each.

---

### 5. Routing Plan

- Which routing protocol(s) will you use (OSPF, EIGRP, static)?
- If OSPF: area design (area 0 for single-area; explain if multi-area).
- If EIGRP: AS number.
- Show the expected routing table for your core router (even if approximate at this stage).

---

### 6. Security Design

For each ACL you plan to implement:

| ACL name / number | Purpose | Applied on (interface, direction) | Permits | Denies |
|-------------------|---------|-----------------------------------|---------|--------|
| | | | | |

Explain the **business justification** for each ACL. "Block access" is not sufficient - state *why* that access must be blocked (regulatory requirement, attack-surface reduction, data sensitivity, etc.).

---

### 7. DHCP Plan

| Pool name | Subnet | Excluded range | Gateway | DNS |
|-----------|--------|----------------|---------|-----|
| | | | | |

If any subnets require a DHCP relay: identify which router interface will carry `ip helper-address` and what IP it points to.

---

### 8. WAN & NAT Plan

- Which interfaces use PPP? Will you configure CHAP? (If yes, list the username/password convention.)
- Where is NAT configured? Which interface is `inside`, which is `outside`?
- Is it static NAT, PAT, or both? Justify.

---

### 9. Division of Work

| Team member | Responsible for |
|-------------|----------------|
| | |

---

### 10. Known Risks / Open Questions

List 2–3 things you are **not sure about** or are worried might be difficult. This is where you ask the instructor for guidance. There are no wrong answers here - this section shows intellectual honesty.

---

## Proposal Grading

| Criterion | Points |
|-----------|--------|
| Problem statement is clear and motivates the design | 10 |
| Topology diagram is complete and readable | 20 |
| Addressing table is complete with justified subnet choices | 25 |
| Routing, ACL, DHCP, and NAT plans are present | 30 |
| Open questions demonstrate critical thinking | 10 |
| Presentation is 10 minutes or less | 5 |
| **Total** | **100** |

The proposal score contributes 15% to the overall project grade (see [Rubric](rubric.md)).

# Week 14 - Implementation & Final Presentation

## Overview

By Week 14 you have incorporated feedback from your Week 13 proposal and built the full network in Packet Tracer. The final session is divided into two parts:

1. **LMS submission** (before class): upload your `.pka` file and supporting documentation.
2. **In-class presentation** (15 minutes per team): live demonstration + Q&A.

There is no grace period for the `.pka` submission - the instructor will review it during your presentation slot. A broken topology that you cannot explain is worse than a working topology you can explain fully.

---

## Final Submission Checklist

Submit all of the following to the LMS before Week 14 class begins:

- [ ] **`TeamName_Project.pka`** - complete, working Packet Tracer file
- [ ] **Addressing Table** (final version, may differ from proposal)
- [ ] **Topology Diagram** (final version, labeled with all IP addresses)
- [ ] **ACL Documentation** - each ACL rule with its security rationale
- [ ] **Test Report** - results of the 10 mandatory connectivity tests (see below)
- [ ] **Individual Reflection** - 1 page per team member (due 1 week after Week 14)

---

## 10 Mandatory Connectivity Tests

Before your presentation, verify all of the following and document each result (screenshot + pass/fail):

| # | Test | Expected Result |
|---|------|-----------------|
| 1 | Ping within VLAN 10 (same switch) | Pass |
| 2 | Ping within VLAN 20 (same switch) | Pass |
| 3 | Ping cross-VLAN (VLAN 10 → VLAN 20) via router | Pass |
| 4 | Ping from a DHCP client - verify it received a valid IP | Pass |
| 5 | Ping from a restricted VLAN to a protected server | **Fail** (ACL working) |
| 6 | Ping from a permitted VLAN to the same protected server | Pass |
| 7 | Ping across the WAN (PPP/CHAP link) between routers | Pass |
| 8 | Ping from an inside NAT host to the simulated internet | Pass |
| 9 | Verify DHCP relay - client on remote subnet gets IP | Pass |
| 10 | `show ip ospf neighbor` (or EIGRP equivalent) - all neighbors `FULL` | Pass |

Include screenshots of every test in your test report. Annotate each screenshot to show which test it corresponds to.

---

## Presentation Format

**Duration:** 15 minutes total (12 minutes presentation + 3 minutes Q&A)

**Structure:**

### Part 1 - Problem & Design (3 minutes)
- What organization and scenario did you choose?
- What is the core network problem your design solves?
- Show your final topology diagram.
- What changed between your Week 13 proposal and the final design? Why?

### Part 2 - Live Demonstration (7 minutes)

The instructor will watch you demonstrate, live in Packet Tracer:

1. Run the 10 mandatory connectivity tests (or a representative subset - the instructor may choose which to verify live).
2. Show one `show` command output for each major technology:
   - `show ip ospf neighbor` or `show ip eigrp neighbors`
   - `show vlan brief`
   - `show ip nat translations`
   - `show ip dhcp binding`
   - `show access-lists`
3. The instructor may ask you to make a **live change** (e.g., "add a static route," "block a new host," "delete and restore the DHCP pool") to verify you understand what you built, not just that it works.

### Part 3 - Design Reflection (2 minutes)
- What was the hardest technical challenge you faced?
- What would you do differently with another week?
- What real-world attack or failure does your design protect against, and how?

---

## Individual Reflection

Submitted by each team member independently, 1 week after Week 14.

**Length:** 1 page (approximately 400–600 words)

**Prompts (address at least 3):**
1. Describe one specific technical concept that became clearer to you during this project. What confused you before? What made it click?
2. What was your individual contribution to the team? How did you handle disagreements about design decisions?
3. If the network you designed were attacked tomorrow, what would be the weakest point? How would you fix it?
4. Which of the 12 lab modules was most directly useful to the project? Which module's content surprised you most during implementation?
5. What would you add to this network if the course continued for another semester?

The reflection is graded on thoughtfulness and specificity, not length. Vague answers ("it was challenging but rewarding") receive minimal credit.

---

## Presentation Grading

| Criterion | Points |
|-----------|--------|
| Problem statement is clear and motivates the design | 10 |
| Topology diagram is accurate and complete | 10 |
| Live demonstration: all 10 tests verified (pass or documented fail) | 30 |
| Live `show` command outputs interpreted correctly | 20 |
| Response to instructor's live changes / questions | 20 |
| Design reflection: honest, specific, technically accurate | 10 |
| **Total** | **100** |

The presentation score contributes 20% to the overall project grade.

See [Project Rubric](rubric.md) for full weighting across all project components.

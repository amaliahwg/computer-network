# Project Grading Rubric

The team project contributes **20% of Other** (기타) grade, plus the lab reports feed the **Assignments (과제) 10%** component. The project itself is assessed across four components:

| Component | Weight within Project |
|-----------|----------------------|
| Technical Completeness | 40% |
| Network Design Quality | 25% |
| Week 13 Proposal Presentation | 15% |
| Week 14 Final Presentation | 20% |

---

## Component 1 - Technical Completeness (40%)

Assessed from the submitted `.pka` file.

| Requirement | Full credit | Partial credit | No credit |
|-------------|-------------|---------------|-----------|
| **OSPF or EIGRP** - dynamic routing configured and all routes propagated | All routers have correct adjacencies and full route tables | Protocol configured but some routes missing | Static routes only |
| **VLANs** - at least 3 VLANs, all ports assigned, trunk configured | All VLANs named, all ports assigned, trunk carries all VLANs | VLANs exist but ports or trunk misconfigured | No VLANs |
| **Inter-VLAN routing** - router-on-a-stick or L3 switch | All VLANs can route to each other per design | Routing works for some VLANs only | No inter-VLAN routing |
| **NAT/PAT** - inside hosts can reach outside via NAT | PAT working, `show ip nat translations` shows entries | NAT configured but not working | No NAT |
| **DHCP** - at least one pool with exclusions, gateway, DNS | Clients receive valid IPs, gateway, DNS | Pool configured but clients not getting addresses | No DHCP |
| **PPP/CHAP** - at least one serial link with PPP and CHAP | CHAP working, `show interfaces serial` shows PPP open | PPP configured without CHAP | Default HDLC |
| **ACL** - at least one functional ACL with documented rationale | ACL blocks intended traffic, documented rationale | ACL configured but wrong effect | No ACL |
| **10 mandatory tests** - all pass or documented fail | All 10 tests screenshotted with results | 7–9 tests | Fewer than 7 |

---

## Component 2 - Network Design Quality (25%)

Assessed from the topology diagram, addressing table, and ACL documentation.

| Dimension | Excellent | Good | Needs Work |
|-----------|-----------|------|-----------|
| **Addressing efficiency** | Subnets are sized to actual host requirements (e.g., /30 for WAN links, /24 or /25 for LANs); no wasteful /8 or /16 where a /24 suffices | Minor inefficiencies | Arbitrary address choices with no rationale |
| **Security rationale** | Each ACL rule has a specific, documented business or threat justification | Most rules have rationale | ACL rules without justification ("just to block it") |
| **Scalability** | Design can accommodate 2× more hosts per VLAN without reconfiguring routing | Some growth possible | Addressing or routing would break at 2× scale |
| **Documentation clarity** | Topology diagram is unambiguous; addressing table is complete and consistent with the `.pka` file | Minor inconsistencies | Diagram and implementation differ significantly |
| **Redundancy** (bonus) | At least one failover path demonstrated (floating static, alternate OSPF path) | - | - |

---

## Component 3 - Week 13 Proposal Presentation (15%)

| Criterion | Points |
|-----------|--------|
| Problem statement motivates the design clearly | 10 |
| Topology diagram is complete and readable | 20 |
| Addressing table is complete with justified subnet choices | 25 |
| Routing, ACL, DHCP, and NAT plans are all present | 30 |
| Open questions demonstrate critical thinking | 10 |
| Presentation within 10-minute limit | 5 |
| **Total** | **100** |

---

## Component 4 - Week 14 Final Presentation (20%)

| Criterion | Points |
|-----------|--------|
| Problem statement and design change explanation | 10 |
| Topology diagram is accurate and final | 10 |
| Live demonstration: 10 mandatory tests verified | 30 |
| `show` commands interpreted correctly on the spot | 20 |
| Response to instructor's live modifications / questions | 20 |
| Design reflection: honest, specific, technically accurate | 10 |
| **Total** | **100** |

---

## Individual Reflection (ungraded - but required)

The individual reflection does not carry a numerical grade but is **required for full project credit**. A missing reflection reduces the project grade by 10 points. Reflections are assessed for:

- Specificity (generic statements earn no comment; specific ones earn feedback)
- Technical accuracy (incorrect technical claims are flagged, not penalized - they become learning moments)
- Intellectual honesty (admitting confusion is rewarded; overclaiming is not)

---

## Academic Honesty

All submitted `.pka` files are compared. Topologies that are structurally identical (same hostnames, same addresses, same ACL rules) across different teams are treated as a single submission and graded as one - regardless of which team "originated" the work. Anti-copying measures in the weekly labs (student-ID-derived addressing) extend to the project: your addressing scheme should trace back to your team's student IDs.

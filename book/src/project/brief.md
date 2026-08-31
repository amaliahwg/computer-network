# Project Brief & Scenarios

The team project (Weeks 13–14) is the capstone of this course. It integrates everything from Modules 1–12 into a single, coherent network design that you build, test, and present. This is the PBL (Problem-Based Learning) and capstone design component of the course, representing 20% of your final grade.

## Team Formation

- Teams of **3–4 students**
- Each team selects **one scenario** from the options below
- Team composition and scenario selection must be submitted by the end of Week 10

## Requirements (All Scenarios)

Regardless of scenario, every project must include:

| Requirement | Minimum |
|-------------|---------|
| Routing protocol | OSPF or EIGRP (static routing alone is insufficient) |
| Layer 2 segmentation | VLANs with at least 3 VLANs |
| Address conservation | NAT/PAT on the WAN egress |
| Automation | DHCP for at least one subnet |
| Security | At least one ACL with a documented security rationale |
| WAN encapsulation | PPP on at least one serial link |
| Documentation | Addressing table, topology diagram, and presentation |

### Network Design Checklist

Good network design starts with counting all IP-consuming devices before opening Packet Tracer. For each site in your scenario, complete this checklist before choosing your subnets:

**Device inventory (count IPs for each):**
- [ ] Workstation/student PCs
- [ ] Servers (file server, DHCP server, web server - each needs a *static* IP outside the DHCP pool)
- [ ] Printers (static IP recommended so clients always know the printer's address)
- [ ] Router interfaces (each LAN interface consumes one IP; WAN links need /30 subnets)
- [ ] Switch management interfaces (if managed switches are used, each needs an IP)
- [ ] Reserve at least 20 IPs for exclusion (routers, servers, printers, future growth)

**Private address range selection:**
| Range | Prefix | Usable Hosts | When to use |
|-------|--------|-------------|-------------|
| 10.0.0.0/8 | /8 | ~16.7 million | Large enterprise / university backbone |
| 172.16.0.0/12 | /12 | ~1 million | Medium-sized organization |
| 192.168.0.0/16 | /16 | ~65,000 | Small office / lab environment |

**Physical layer constraints (relevant when drawing topology and justifying cabling):**
- UTP copper cable: maximum segment length **100 m** (beyond this, a switch or repeater is required)
- Each cable run needs two RJ-45 connectors; budget connector count = (cable runs) × 2
- Label each cable in the topology diagram with: media type (UTP/fiber), expected length, and the two devices it connects

**Deliverable:** Before writing your proposal, complete and submit the device inventory table for your chosen scenario. This shows your design is grounded in capacity planning, not just topology aesthetics.

---

## Project Scenarios

Choose one of the following real-world scenarios. Each gives you a different organizational context, but all share the same technical requirements above.

---

### Scenario A - University Campus Network

**Context:** A regional university has three buildings: Administration, Faculty, and Student dormitories. Each building has its own department network. The university connects to the internet through a single ISP uplink.

**Network requirements:**
- Administration VLAN (staff management systems, restricted access)
- Faculty VLAN (research servers, limited student access)
- Student VLAN (internet access only, no access to Admin or Faculty servers)
- Wi-Fi simulation (add wireless PCs to the student VLAN via a wireless router if available in PT)
- Internet connectivity via NAT to a simulated ISP router
- DHCP for all three VLANs
- ACL policy: students cannot reach Admin servers; faculty can reach Admin; Admin can reach everything

---

### Scenario B - Small Enterprise with Branch Office

**Context:** A tech startup has its headquarters in Seoul and a branch office in Busan. Each site has separate departments. The two sites connect via a WAN serial link.

**Network requirements:**
- HQ: Engineering VLAN, HR VLAN, Server VLAN
- Branch: Sales VLAN, Support VLAN
- WAN link between sites using PPP/CHAP
- OSPF or EIGRP for routing between sites
- NAT at HQ for internet egress; branch routes internet-bound traffic to HQ
- DHCP servers at each site (or one central DHCP at HQ via relay to branch)
- ACL: branch Sales cannot directly access HQ Server VLAN; Support can

---

### Scenario C - Hospital Network

**Context:** A hospital must separate patient data networks from administrative and public networks strictly - patient data breaches carry heavy regulatory penalties. The hospital has three wings plus a data center.

**Network requirements:**
- Clinical VLAN (patient monitoring systems - highly restricted)
- Administrative VLAN (billing, HR)
- Public VLAN (patient Wi-Fi - internet only)
- Data Center VLAN (servers - DHCP excluded, all static IPs)
- Strict ACL policy: Public cannot reach any internal network; Clinical can only reach Data Center; Admin can reach Clinical and Data Center
- OSPF between the core router and wing routers
- NAT for Public VLAN internet access
- Document the regulatory justification (HIPAA-style) for each ACL rule

---

### Scenario D - Industrial/Smart Building Network

**Context:** A manufacturing plant integrates IT (office) and OT (operational technology / factory floor) networks. Strict separation is required: the PLC (Programmable Logic Controllers) network must never be reachable from the internet or from general office PCs.

**Network requirements:**
- Office VLAN (general IT, internet access via NAT)
- PLC/OT VLAN (factory floor - no internet access, no route from Office VLAN)
- Management VLAN (IT administrators only - access to everything)
- Camera/IoT VLAN (factory cameras - isolated from IT and OT)
- EIGRP for routing between the factory segments
- ACL: Office cannot reach PLC/OT; Management can reach everything; PLC/OT cannot initiate traffic to Office; internet cannot reach OT under any circumstances
- DHCP for Office and Camera VLANs; static IPs for PLC and Management

---

## Deliverables Summary

| Deliverable | Due | Format |
|-------------|-----|--------|
| Team registration + scenario selection | End of Week 10 | LMS submission |
| Project Proposal | Week 13 presentation | [Proposal Template](proposal.md) |
| Final Packet Tracer file (`.pka`) | Week 14 presentation day | LMS submission |
| Final Presentation | Week 14 in-class | [Presentation format](implementation.md) |
| Individual Reflection (1 page) | 1 week after Week 14 | LMS submission |

## Grading

Full grading rubric: [Project Rubric](rubric.md)

| Component | Weight |
|-----------|--------|
| Technical completeness (all requirements met) | 40% |
| Network design quality (addressing, security rationale, efficiency) | 25% |
| Week 13 proposal presentation | 15% |
| Week 14 final presentation | 20% |

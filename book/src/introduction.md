# Intelligent Network Design - Lab Manual

**Course:** 지능형네트워크설계 (Intelligent Network Design)  
**Department:** 컴퓨터응용수학부 소프트웨어융합전공  
**University:** 한경국립대학교 Hankyong National University  
**Unit:** Software Convergence 001  
**Instructor:** Amalia

*Prefer PDF? Every chapter of this manual is also released individually - see the [chapter PDF index](pdf/). Unfamiliar abbreviation in a lab step? Check the [Glossary](appendix/glossary.md) - it works standalone, chapter by chapter. Want extra practice beyond the weekly labs? See [Appendix F](appendix/resources.md).*

---

## Course Goal

Students will be able to **build and operate computer networks** using Cisco Packet Tracer. The course builds directly on your prior Computer Networks course - you already understand the theory; here you implement, observe failures, and fix them.

By the end of the semester, you will have designed and presented a complete simulated network from scratch, integrating multiple technologies covered in the weekly labs.

## Teaching Methods

| Method | Description |
|--------|-------------|
| Lecture (강의) | Brief concept intro at the start of each session |
| Lab Practice (실험·실습) | Hands-on Packet Tracer guided labs - the majority of class time |
| PBL (Problem-Based Learning) | Each module begins with a real-world problem your configuration must solve |
| Capstone Design | Weeks 13–14: design, build, and present a complete network project |

## Class Format

Each weekly session is **3 × 50-minute periods (150 minutes total)**:

| Segment | Duration | Material |
|---------|----------|----------|
| Lecture: concept & theory | ~1 hour | Slide deck - see [Lecture Slides](../slides/module-01.html) |
| Hands-on lab: guided practice | ~2 hours | This book's Guided Lab (Parts A–D below) |

The lecture covers *Why This Matters*, *Learning Outcomes*, and *Theory Review* before the lab begins - the module pages below assume that context going in. Guided Lab activities in each module run roughly 90 minutes; the remaining time in the 2-hour block covers troubleshooting, Challenge Tasks, and lab-report writeup.

## Grading

| Component | Weight |
|-----------|--------|
| Attendance (출석) | 10% |
| Midterm Exam (중간평가) - Week 8 | 30% |
| Final Exam (기말평가) - Week 15 | 30% |
| Lab Reports / Assignments (과제) | 10% |
| Other (project, participation) | 20% |

**Lab Reports (실습결과보고서)** must be submitted via the course LMS (Learning Management System) within one week of each lab session. Use the template in [Appendix D](appendix/report-template.md).

## 15-Week Schedule

| Week | Topic | Notes |
|------|-------|-------|
| 1 | Orientation & Lab Environment Setup | This book, Module 1 |
| 2 | Network Review (1) & Packet Tracer Intro | Module 2 |
| 3 | Network Review (2) & Router/Switch Basic Config | Module 3 |
| 4 | IOS Management Commands | Module 4 |
| 5 | Routing Protocols & Static Routing | Module 5 |
| 6 | Dynamic Routing: RIP & EIGRP | Module 6 |
| 7 | Access Control List | Module 7 |
| 8 | **Midterm Exam** | Practical + written |
| 9 | Switching & VLAN | Module 9 |
| 10 | PPP & NAT | Module 10 |
| 11 | OSPF (Advanced Routing) | Module 11 |
| 12 | DHCP | Module 12 |
| 13 | **Project Proposal Presentations** | [Details](project/proposal.md) |
| 14 | **Project Results Presentations** | [Details](project/implementation.md) |
| 15 | **Final Exam** | Practical + written |

## Main Textbook

This lab manual is your primary course material (개인 강의 자료). Supplementary reading: *패킷트레이서를 이용한 네트워크 입문* (Introduction to Networks Using Packet Tracer).

## Lab Rules

1. **Save your work constantly.** Packet Tracer does not auto-save. Use **File → Save As** at the beginning of every session with the filename format `StudentID_ModuleN.pka`.
2. **Personalize your configurations.** Every module asks you to set your hostname to your name and use your student ID in IP addressing. Identical configurations across submissions will be treated as academic dishonesty.
3. **Document as you go.** Take screenshots at each step marked 📸 - you will need them for your lab report. This manual includes schematic diagrams of Packet Tracer's interface (IP Configuration, CLI console, PDU details, link lights) so you know what to expect - but they are reference mockups, not your submission. Every 📸 still means: capture it from your own running Packet Tracer session.
4. **Simulation Mode is your friend.** Use PT Simulation Mode (the clock icon) to watch packets travel hop-by-hop. Many lab questions require you to observe and explain packet behavior.
5. **No late reports without prior approval.** Lab reports lose 20% per day late.
6. **Packet Tracer has no internet connectivity by default.** There is no implicit "internet" behind any topology you build - every hop, including the ISP's own equipment, has to be explicitly placed, cabled, and configured by you. See Module 1's orientation for a hands-on demonstration of why.

## How Each Module is Structured

Every lab module follows the same template so you always know where you are:

| Section | Purpose |
|---------|---------|
| **Why This Matters** | The real-world problem this week's technology solves |
| **Learning Outcomes** | What you can do after the lab |
| **Pre-Lab** | Reading + questions to answer *before* class |
| **Equipment & Materials** | Software versions, any hardware needed |
| **Estimated Time** | Breakdown of session time |
| **Theory Review** | Concise concept summary, tied back to the motivation |
| **Guided Lab** | Step-by-step activity with observe-and-explain prompts |
| **Challenge Tasks** | Unguided extensions for those who finish early |
| **Deliverables** | Numbered checklist for your lab report |
| **Assessment Rubric** | How your report is graded |

## Week 8 Midterm - Format

The midterm is a **timed practical exam** (50 minutes) administered in Packet Tracer. You will be given a partially-configured network topology and must:

1. Diagnose what is broken (connectivity test will show failing pings)
2. Apply correct IOS commands to restore full connectivity
3. Submit your `.pka` file and a brief written explanation

Topics in scope: Modules 1–7 (everything before Week 8).

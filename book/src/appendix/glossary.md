# Appendix B - Abbreviations & Glossary

Every abbreviation used across Modules 1-12, in one place. If a guided-lab step uses a term you don't recognize, look it up here - it does not require flipping back to an earlier chapter, so this appendix works the same whether you are reading the full book or a single chapter PDF.

Each module's Theory Review also expands an abbreviation the first time it matters for that chapter's lab; this appendix is the complete reference, not a replacement for that.

---

## Models & Layers

| Abbreviation | Full form | Meaning |
|---|---|---|
| OSI | Open Systems Interconnection | The 7-layer reference model (Physical, Data Link, Network, Transport, Session, Presentation, Application) used to describe where a protocol operates. |
| L1 - L7 | Layer 1 - Layer 7 | Shorthand for an OSI layer by number - "L3" means "the Network layer," "L2" means "the Data Link layer." Used constantly once a device's behavior is tied to a specific layer. |
| TCP/IP model | Transmission Control Protocol / Internet Protocol model | The 4-layer model (Network Access, Internet, Transport, Application) that real networks actually run; OSI's 7 layers map onto it. |
| PDU | Protocol Data Unit | The name for a unit of data at a given layer - *bit* at L1, *frame* at L2, *packet* at L3, *segment* at L4, *data* at L5-7. |

## Protocols

| Abbreviation | Full form | Meaning |
|---|---|---|
| IP | Internet Protocol | The L3 protocol that addresses and routes packets between networks. |
| ICMP | Internet Control Message Protocol | The protocol behind `ping` (Echo Request/Reply) and `traceroute` (Time Exceeded, Port/Destination Unreachable). |
| ARP | Address Resolution Protocol | Resolves a known IP address to the MAC address needed to actually deliver a frame on the local segment. |
| DNS | Domain Name System | Translates a hostname (`google.com`) into an IP address via a distributed, hierarchical lookup. |
| DHCP | Dynamic Host Configuration Protocol | Automatically assigns IP address, mask, gateway, and DNS to a client. See DORA below. |
| DORA | Discover, Offer, Request, Acknowledge | The four-message exchange a DHCP client and server use to hand out an address. |
| TCP | Transmission Control Protocol | Connection-oriented L4 transport - reliable, ordered delivery (three-way handshake). |
| UDP | User Datagram Protocol | Connectionless L4 transport - no handshake, no delivery guarantee, lower overhead. |
| HTTP | Hypertext Transfer Protocol | The application-layer protocol web browsers use to fetch pages. |
| FTP | File Transfer Protocol | Application-layer protocol for transferring files. |
| Telnet | Teletype Network | Unencrypted remote terminal access - superseded by SSH in production, still used in labs for simplicity. |
| SSH | Secure Shell | Encrypted remote terminal access - the production replacement for Telnet. |
| RIP | Routing Information Protocol | A distance-vector dynamic routing protocol; metric is hop count, 15-hop limit. |
| EIGRP | Enhanced Interior Gateway Routing Protocol | Cisco's advanced distance-vector protocol; composite metric, faster convergence than RIP. |
| OSPF | Open Shortest Path First | A link-state dynamic routing protocol; metric is cost (based on bandwidth), no hop limit. |
| BGP | Border Gateway Protocol | The routing protocol that connects autonomous systems (ISPs) across the internet. |
| IGP | Interior Gateway Protocol | A routing protocol used *within* one organization's network (RIP, EIGRP, OSPF are all IGPs, as opposed to BGP). |
| SPF | Shortest Path First | The Dijkstra-based algorithm OSPF uses to compute the best path from its link-state database. |
| LSA / LSDB | Link State Advertisement / Link State Database | An LSA is one router's description of its own links; the LSDB is the complete collection of LSAs every OSPF router in an area holds identically. |
| DR / BDR | Designated Router / Backup Designated Router | On a multi-access OSPF network (like Ethernet), the elected router(s) that all others synchronize through, instead of every router peering with every other router. |
| PPP | Point-to-Point Protocol | A Layer 2 encapsulation for serial links that adds authentication and multi-protocol support over plain HDLC. |
| HDLC | High-Level Data Link Control | Cisco's default serial-link encapsulation; simpler than PPP, no authentication. |
| LCP / NCP | Link Control Protocol / Network Control Protocol | PPP's two sub-protocols: LCP negotiates the link itself; NCP (e.g. IPCP) negotiates which L3 protocol runs over it. |
| PAP | Password Authentication Protocol | A PPP authentication method that sends the password in cleartext - avoid in practice. |
| CHAP | Challenge Handshake Authentication Protocol | A PPP authentication method using an MD5-hashed challenge-response, so the password never crosses the link in cleartext. |
| NAT | Network Address Translation | Rewrites the source (or destination) IP of packets crossing a router, letting private addresses reach the public internet. |
| PAT | Port Address Translation | NAT "overload" mode - many private IPs share one public IP, distinguished by port number. |
| ACL | Access Control List | An ordered set of permit/deny rules a router applies to traffic on an interface. |
| CDP | Cisco Discovery Protocol | Lets directly-connected Cisco devices discover each other automatically. |
| VLAN | Virtual Local Area Network | A logical partition of a physical switch into separate broadcast domains. |
| 802.1Q | IEEE 802.1Q | The standard that defines the VLAN tag inserted into an Ethernet frame on a trunk link. |

## Hardware & Cabling

| Abbreviation | Full form | Meaning |
|---|---|---|
| NIC | Network Interface Card | The hardware (physical or virtual) that connects a device to a network - what a PC's IP address is bound to. |
| MAC | Media Access Control | The 48-bit hardware address burned into a NIC, used for L2 delivery on the local segment. |
| UTP | Unshielded Twisted Pair | The copper cable type used for Ethernet - pairs of wires twisted together to reduce interference, no shielding. |
| Cat5e | Category 5e | A UTP cable grade rated for Fast/Gigabit Ethernet - what this course's cabling exercises use. |
| RJ-45 | Registered Jack 45 | The 8-pin connector on the end of an Ethernet cable. |
| Auto-MDIX / MDIX | Medium Dependent Interface Crossover | A feature that lets a port electronically detect and correct cable type, so a straight-through cable works even between like devices. |
| DCE / DTE | Data Communications Equipment / Data Terminal Equipment | On a serial link, the DCE end provides clocking (`clock rate`); the DTE end receives it. In Packet Tracer, right-click the serial cable to see which end is which. |
| WIC-2T | WAN Interface Card, 2-port Serial | A module added to a router to provide two serial ports - the 1841 needs one before it can use `Se0/0/x` interfaces. |
| NVRAM | Non-Volatile Random Access Memory | Where `startup-config` is stored - survives a reboot. |
| RAM | Random Access Memory | Where `running-config` lives while the device is powered on - lost on reboot unless saved to NVRAM. |

## Addressing & Notation

| Abbreviation | Full form | Meaning |
|---|---|---|
| `/24`, `/30`, etc. | CIDR prefix length | Shorthand for a subnet mask, counting the number of network bits. `/24` = `255.255.255.0`; `/30` = `255.255.255.252` (a 2-usable-host link, common between routers). |
| CIDR | Classless Inter-Domain Routing | The addressing scheme that replaced fixed Class A/B/C boundaries with arbitrary prefix lengths (the `/N` notation above). |
| TTL | Time To Live | A field in the IP header that counts down by 1 at every router hop; when it reaches 0, the packet is dropped and an ICMP Time Exceeded message is sent back - this is what makes `tracert`/`traceroute` work. |
| MTU | Maximum Transmission Unit | The largest packet size an interface will forward without fragmenting it. |
| APIPA | Automatic Private IP Addressing | A `169.254.x.x` address a Windows PC assigns itself when DHCP fails - a strong sign "no DHCP server reachable." |
| GW | Gateway | Short for default gateway - the router a host sends traffic to for any destination outside its own subnet. |

## Cisco IOS & Packet Tracer

| Abbreviation | Full form | Meaning |
|---|---|---|
| IOS | Internetwork Operating System | The operating system Cisco routers and switches run; what you configure via the CLI. |
| CLI | Command Line Interface | The text-based interface (as opposed to a GUI) used to configure IOS devices. |
| VTY | Virtual Teletype | The virtual terminal lines used for remote access (Telnet/SSH) into a router or switch. |
| MOTD | Message of the Day | A banner displayed to anyone connecting to a device, before login. |
| PT | Packet Tracer | Shorthand used throughout this book and its slides for Cisco Packet Tracer. |
| `.pka` | Packet Tracer Activity (file extension) | The file format Packet Tracer saves a topology and its configuration to. |
| Fa0/0, Se0/0/0, Gi0/0 | FastEthernet 0/0, Serial 0/0/0, GigabitEthernet 0/0 | Cisco's interface-naming shorthand: type + slot/port. `Fa0/0` and `interface FastEthernet 0/0` refer to the exact same interface - IOS accepts both the abbreviated and full form. |
| SVI | Switch Virtual Interface | A virtual Layer 3 interface on a switch (e.g. `interface vlan 99`), used to give the switch itself an IP for management. |

## Course & Miscellaneous

| Abbreviation | Full form | Meaning |
|---|---|---|
| LAN | Local Area Network | A network confined to one site/building - everything on one side of a router in this book's diagrams. |
| WAN | Wide Area Network | A network connecting sites across a distance - the serial/router-to-router links in this book's diagrams. |
| ISP | Internet Service Provider | The organization that connects a site to the internet - simulated in this book by a router labeled "ISP Gateway." |
| PBL | Problem-Based Learning | The teaching method this course uses: each module opens with a real-world problem your configuration must solve. |
| LMS | Learning Management System | The course's online platform where lab reports and pre-lab answers are submitted. |
| IANA | Internet Assigned Numbers Authority | The organization that allocates global IP address blocks - referenced in Module 10 for IPv4 exhaustion context. |

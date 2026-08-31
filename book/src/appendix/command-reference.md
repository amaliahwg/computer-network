# Appendix A - IOS Command Reference

A quick-reference of every command used across Modules 1–12. Commands are grouped by function.

---

## Navigation

| Command | Mode | Effect |
|---------|------|--------|
| `enable` | User EXEC | Enter Privileged EXEC |
| `disable` | Privileged EXEC | Return to User EXEC |
| `configure terminal` | Privileged EXEC | Enter Global Config |
| `exit` | Any | Return to previous mode |
| `end` or `Ctrl+Z` | Any | Return to Privileged EXEC |
| `?` | Any | List available commands |
| `<partial>?` | Any | List commands starting with partial |
| `Tab` | Any | Autocomplete command |

---

## Basic Device Configuration

| Command | Mode | Effect |
|---------|------|--------|
| `hostname <name>` | Global Config | Set device hostname |
| `banner motd # <text> #` | Global Config | Set login banner |
| `enable secret <password>` | Global Config | Set encrypted enable password |
| `service password-encryption` | Global Config | Encrypt all plaintext passwords |
| `no ip domain-lookup` | Global Config | Disable DNS lookup for typos |

### Console & VTY Passwords

```
line console 0
 password <password>
 login

line vty 0 4
 password <password>
 login
```

---

## Interface Configuration

| Command | Mode | Effect |
|---------|------|--------|
| `interface <type> <number>` | Global Config | Enter interface config |
| `ip address <IP> <mask>` | Interface Config | Assign IP address |
| `no ip address` | Interface Config | Remove IP address |
| `no shutdown` | Interface Config | Bring interface up |
| `shutdown` | Interface Config | Administratively shut interface down |
| `description "<text>"` | Interface Config | Add interface description |
| `clock rate <bps>` | Interface Config | Set clock on DCE serial interface |
| `encapsulation ppp` | Interface Config | Use PPP on serial interface |
| `ppp authentication chap` | Interface Config | Enable CHAP authentication |

### Sub-interfaces (Router-on-a-Stick)

```
interface Fa0/0.<vlan-id>
 encapsulation dot1Q <vlan-id>
 ip address <IP> <mask>
```

---

## Routing

### Static Routes

```
ip route <network> <mask> <next-hop-IP>
ip route <network> <mask> <exit-interface>
ip route 0.0.0.0 0.0.0.0 <next-hop-IP>    # default route
```

### RIPv2

```
router rip
 version 2
 network <classful-network>
 no auto-summary
```

### EIGRP

```
router eigrp <AS-number>
 network <network> <wildcard-mask>
 no auto-summary
```

### OSPF

```
router ospf <process-id>
 router-id <A.B.C.D>
 network <network> <wildcard-mask> area <area-id>
 passive-interface <interface>
```

---

## VLANs & Switching

```
vlan <id>
 name <name>

interface <port>
 switchport mode access
 switchport access vlan <id>

interface <port>
 switchport mode trunk
 switchport trunk allowed vlan <id-list>

interface vlan <id>
 ip address <IP> <mask>         # management VLAN on switch
```

---

## ACLs

### Standard ACL

```
access-list <1-99> {permit|deny} <source> <wildcard>
interface <type>
 ip access-group <number> {in|out}
```

### Extended ACL

```
access-list <100-199> {permit|deny} <protocol> <src> <src-wild> <dst> <dst-wild> [eq <port>]
```

### Named ACL

```
ip access-list {standard|extended} <name>
 {permit|deny} ...
interface <type>
 ip access-group <name> {in|out}
```

---

## NAT

```
ip nat inside source static <local-IP> <global-IP>   # static NAT
ip nat inside source list <acl> interface <if> overload  # PAT
interface <if>
 ip nat inside
interface <if>
 ip nat outside
```

---

## DHCP

```
ip dhcp excluded-address <start> [end]
ip dhcp pool <name>
 network <network> <mask>
 default-router <IP>
 dns-server <IP>
 lease <days>

interface <if>
 ip helper-address <dhcp-server-IP>   # relay
```

---

## PPP & CHAP

```
username <remote-hostname> password <password>
interface Serial0/0/0
 encapsulation ppp
 ppp authentication chap
```

---

## Verification (show commands)

| Command | Shows |
|---------|-------|
| `show version` | IOS version, memory, hardware |
| `show interfaces` | Per-interface state, counters, errors |
| `show ip interface brief` | Compact table: all interfaces, IP, state |
| `show running-config` | Current active config (RAM) |
| `show startup-config` | Saved config (NVRAM) |
| `show ip route` | Routing table |
| `show arp` | ARP cache |
| `show cdp neighbors` | Directly connected Cisco devices |
| `show cdp neighbors detail` | Neighbor IOS version and IP |
| `show vlan brief` | VLAN list and port assignments |
| `show interfaces trunk` | Trunk status and allowed VLANs |
| `show access-lists` | All ACLs and hit counts |
| `show ip interface <if>` | ACL applied to interface |
| `show ip nat translations` | Current NAT translation table |
| `show ip nat statistics` | NAT counters |
| `show ip dhcp pool` | DHCP pool info |
| `show ip dhcp binding` | IP-to-MAC bindings |
| `show ip dhcp server statistics` | DORA message counts |
| `show ip ospf neighbor` | OSPF neighbors and state |
| `show ip ospf database` | LSDB contents |
| `show ip protocols` | Routing protocol parameters |
| `show ip eigrp neighbors` | EIGRP neighbors |
| `show ip rip database` | RIP database |

---

## Configuration Management

| Command | Effect |
|---------|--------|
| `copy running-config startup-config` | Save config to NVRAM |
| `copy startup-config running-config` | Load saved config |
| `erase startup-config` | Wipe NVRAM (factory reset) |
| `reload` | Reboot the device |
| `show running-config | include &lt;pattern&gt;` | Filter config output |
| `show running-config | section interface` | Show only interface sections |
| `debug ip rip` | Show RIP update messages (verbose) |
| `debug ppp authentication` | Show CHAP exchange messages |
| `no debug all` | Turn off all debug output |

---

## Pipe Filters

| Filter | Usage | Effect |
|--------|-------|--------|
| `include` | `show ... | include &lt;pattern&gt;` | Show only matching lines |
| `exclude` | `show ... | exclude &lt;pattern&gt;` | Hide matching lines |
| `begin` | `show ... | begin &lt;pattern&gt;` | Start output from first match |
| `section` | `show ... | section &lt;pattern&gt;` | Show matching section block |

---
title: "Zero-Downtime PostgreSQL Upgrade: The Physical-to-Logical Trick"
date: 2025-12-30T23:30:00+01:00
tags: ["postgresql", "database", "migration", "sre", "high availability"]
summary: "A strategy for zero-downtime upgrades: use physical replication for the bulk transfer, then switch to logical replication for the final cutover."
layout: "signals"
---

Upgrading a critical PostgreSQL cluster (e.g., v13 to v16) usually involves a choice: fast but risky `pg_upgrade`, or slow logical replication. Palark shared a practical method to get the best of both worlds.

The core strategy involves a clever pivot:
1.  **Start with Physical Replication** to bulk transfer data quickly (10x faster than logical).
2.  **Switch to Logical Replication** by advancing a replication slot to a specific LSN (Log Sequence Number) from the physical replica logs.
3.  **Upgrade the Logical Replica** and cut over with only seconds of downtime.

This method solves the "catch-up" problem of logical replication on large datasets.

[Read the full guide: Upgrading PostgreSQL with no data loss →](https://palark.com/blog/postgresql-upgrade-no-data-loss-downtime/)

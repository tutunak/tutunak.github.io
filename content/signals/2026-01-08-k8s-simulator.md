---
title: "Open-Source Simulator for Kubernetes Certifications"
date: 2026-01-08T20:00:00+01:00
tags: ["kubernetes", "certification", "cka", "cks", "aws", "terraform", "leetcode devops"] 
summary: "Stop watching videos. This open-source platform is the 'LeetCode' for DevOps: real AWS clusters, broken scenarios, and automated checks for CKA/CKS."
layout: "signals"
---

Preparing for CKA, CKS, or CKAD usually involves expensive courses or limited simulators. The **SRE Learning Platform** (ViktorUJ/cks) is an open-source alternative that provisions **real environments on AWS**.

It uses Terraform and Terragrunt to spin up clusters on Spot Instances (to keep costs low) and provides:
* **"LeetCode-style" Drills:** Specific scenarios for CKA/CKS/CKAD.
* **Mock Exams:** Full-scale practice exams with checking scripts (`check_result`).
* **Infrastructure as Code:** You learn Terraform while setting up your learning environment.

[Check out the repository on GitHub →](https://github.com/ViktorUJ/cks)

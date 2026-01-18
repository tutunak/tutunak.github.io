---
title: "Open-Source Simulator for Kubernetes Certifications"
date: 2026-01-08T20:00:00+01:00
tags: ["kubernetes", "certification", "cka", "cks", "aws", "terraform"]
summary: "An open-source alternative to expensive CKA/CKS courses. Provisions real AWS clusters using Terraform for hands-on exam practice."
layout: "signals"
---

Preparing for CKA, CKS, or CKAD usually involves expensive courses or limited simulators. The **SRE Learning Platform** (ViktorUJ/cks) is an open-source alternative that provisions **real environments on AWS**.

It uses Terraform and Terragrunt to spin up clusters on Spot Instances (to keep costs low) and provides:
* **Hands-on Labs:** Scenarios for CKA, CKS, CKAD, and even AWS EKS.
* **Mock Exams:** Full-scale practice exams with checking scripts (`check_result`).
* **Infrastructure as Code:** You learn Terraform while setting up your learning environment.

[Check out the repository on GitHub →](https://github.com/ViktorUJ/cks)

---
title: "AWS CodeBuild & GitHub: The 'CodeBreach' Vulnerability"
date: 2026-01-21T17:00:00+01:00
tags: ["security", "aws", "github", "codebuild", "vulnerability"]
summary: "A combination of AWS CodeBuild misconfiguration and predictable GitHub identifiers allowed admin access to the AWS GitHub account, as reported by Wiz."
layout: "signals"
---

![Image](/images/1768406761-image8.webp)

You can do everything right but still be hacked through the official SDK. A couple of mistakes (CI/CD misconfiguration, unanchored regular expressions) in the configuration of AWS CodeBuild by AWS, combined with predictable identifier generation in GitHub, resulted in granting admin access to the AWS GitHub account. The Wiz team reported a case of gaining access to the AWS GitHub. But how many companies have made similar mistakes, enabling a hacker to have already injected vulnerabilities inside widely used libraries?

[Read the Wiz Research: CodeBreach Vulnerability →](https://www.wiz.io/blog/wiz-research-codebreach-vulnerability-aws-codebuild)

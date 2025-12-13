---
title: "Terraform Expertise: Valuable Takeaways from Years in Production"
description: "In the article, I want to share my insights on the most important lessons learned from years of using Terraform in production."
date: 2023-11-27
tags:
  - devops
  - terraform
  - iac
categories:
  - Guides
  - Best Practices
  - Infrastructure as Code
draft: false
---

## Use versioning in remote states

![Image description](/images/1bnqi2f57gmdac6rn6ms.png)
Everyone makes mistakes. Some of them may break a Terraform state, and in such situations, availability of a previous state version can help you to avoid completely reimporting the whole infrastructure. You simply roll back the state to the previous version and resolve all problems in the code or in the infrastructure manually. Often, those issues will be resolved after applying the previous state of the code to this version of state. Moreover, it can help you avoid situations where the state is updated not because of changes but due to the major version update of Terraform, and your pipelines or providers aren't ready yet, or there's a bug, leading you to roll back the state instead of editing it directly. You might have noticed this if you have gone through the process of updating the Terraform version from 0.12.x to 1.2.x

## Backup your state

![Image description](/images/tf-exp-val/ayeh6orrfxk8w7gd4x1l.png)
Even if you have state versioning, it's better to have a backup. For example, if you are using an AWS S3 backend, you can replicate the entire bucket containing your state or states to another S3 bucket in a different region. Even with the protection that AWS S3 provides, it's better to have a couple of separate copies of the state for disaster situations.

## Don't create big states

![Image description](/images/tf-exp-val/attahq000a2fmg3fi6ah.png)
Large states are very inconvenient to use:
- Building a plan takes too long.
- Applying changes takes too long.
- Simultaneous work is difficult:
	- Many people want to make changes in one state and have to wait for other people's state plan and apply.
	- A broken state paralyzes work with infrastructure as code.

It's better to use multiple small states with small amounts of resources. For example: 
- State for VPC (Amazon Virtual Private Cloud)
- State for EKS (Amazon Elastic Kubernetes Service)
- State for RDS (Amazon Relational Database Service) instance and infrastructure for it ()
- State for SES (Simple Email Services in AWS)
- etc.

If a state becomes broken, the blast radius will be minimal. Each folder containing Terraform configurations can be tracked separately in pipelines and executed only when there are changes.
This also allows people to avoid using the `--target` option during terraform apply. People tend to use this option when they know about the problems in the state. They would rather not spend much time waiting for the pipeline, especially not wanting to see errors caused by resources they haven't touched.

## Always run Terraform in pipelines, store changes in a version control system

![Image description](/images/tf-exp-val/dobi0kpw55zlptlok4ae.png)
Try to avoid situations where you need to make changes locally and run Terraform on your workstation. Always use pipelines. This approach ensures that all changes (plan/apply outputs) are visible, and if you need to ask for help, it will be best to have all the necessary information in one place.

## Don't use destroy

![Image description](/images/tf-exp-val/2mvvrk82y9718apk2scw.png)
The opposite of the `apply` command in Terraform is `destroy`. Supporting the `destroy` command in pipelines is a difficult task. This command is rarely used. Instead, when you want to delete the entire infrastructure, particularly with small Terraform states that contain only a few items, simply delete everything that describes resources or calls modules, and leave the `.tf` files empty. After git commit and reviewing the plan to verify everything, you can just use the same `apply` pipeline. Don't worry about leaving an empty state stored in an S3 bucket; it doesn't take up much space, but it simplifies your workflow and allows you to look back at the history of changes if needed.

## Don't be afraid to use third-party modules

![Image description](/images/tf-exp-val/6lzdzm4dafgjtzis4x6k.png)
Use already existing Terraform modules rather than writing your own:
-  It takes less time; you just need to understand how to use third-party modules, as almost all of them provide examples.
- You don't need to maintain your modules, write tests, or manage the right versioning to enable rolling updates in your infrastructure.
- Using third-party modules and blueprints, you can get help from people who have already encountered problems with them and found solutions.
- Additionally, most modules navigate potential pitfalls and strive for universality; using these modules can offer flexibility in implementing changes or adopting new features.


## Automated checks for new versions of modules, providers, and Terraform itself using Renovate

![Image description](/images/tf-exp-val/toaaf2pkxvjfo64kldnv.png)
As the modern world moves faster and faster, you need to stay up-to-date with your modules, providers, and Terraform versions. This is not only because new features appear and bugs are fixed, but also because many Terraform providers change their APIs, remove deprecated features, and so on. Therefore, you have to be prepared, especially for certain Terraform codes that you run only a few times a year (e.g., for VPC).
In that case, [Renovate](https://docs.renovatebot.com/) can help you get information about new module and provider updates. For example, I had a case where Terraform stopped working because the AWS provider was deprecated; we were using Terraform version 0.12.21, and the AWS provider version was 2.20.0, with the state containing everything in the AWS region. Consequently, I had to update Terraform to version 1.1.7 and the AWS provider to 4.6.0. Therefore, pay attention to warnings about deprecation; you wouldn't want to find out that you can't use Terraform, especially at the most crucial moment

There is a good video about using renovate for that purpose:

{{< youtube w7Ft2ymGmfc >}}


## Always check the migration guide for modules and providers when updating to a major version.

![Image description](/images/tf-exp-val/2pxvl4odzxjspm3459kf.png)
You can avoid many problems by reading migration guides, which are provided by the developers of modules and providers. Even if you are not concerned about infrastructure and recreating resources doesn’t frighten you, the process can halt in the middle of an update, leaving you with inconsistent state and infrastructure. Spending five minutes reading a migration guide can help you avoid hours spent resolving issues.  
There is another fundamental way to do it: delete all resources (refer to the section where I discuss not using 'destroy') and the infrastructure, and then recreate it. This approach will work if you:
- Are not concerned about maintaining your existing infrastructure.
- Seek an easier way to update across more than one major version of a module or provider.

## GitHub and Issue Terraform module's and provider's Issue tracker are your best friends

![Image description](/images/tf-exp-val/oukb6d7z1n6uxj5v9q5g.png)
Whether or not you use third-party modules, the issue trackers of providers and modules are the second-best source of information after official documentation. They have often helped me solve issues. This has replaced the need for Googling and reading articles, which usually just provide straightforward solutions. Simply search for your error or issue in the search box, and you'll often find that someone else has already encountered this problem. Even if the issue persists, you might find workarounds that help solve the problem, or gather ideas on what to do next.
Even if you don’t use third-party modules, the source code can still be useful as a source of standard solutions or ideas for writing your own.  Checking it can save you a lot of time, but be mindful of code licenses when copying code.

## Maintain an infrastructure managed by Terraform that is as close as possible to the production infrastructure

![Image description](/images/tf-exp-val/neteca2yy1yb3x71t6nm.png)
It's not always possible, but it's better to have a place where you can test your changes. Sometimes, even if your changes seem safe and the Terraform plan appears unsuspicious, they can still cause difficulties. At times, the provider may have a bug, and it's better to discover this by applying changes to a less critical infrastructure rather than risking damage to the production one

## Practical Approaches for Navigating Unclear Documentation in Terraform

![Image description](/images/tf-exp-val/uka2gt2r5vvobzqtako3.png)
Sometimes the documentation for a module or provider is not obvious, and it's unclear how to achieve specific goals. In that case, you can apply changes manually (remember the previous advice about having a separate infrastructure for tests), and then simply review the Terraform plan. In most cases, you just need to add parameters that are changed in the plan to your Terraform file, and everything will work. However, occasionally, you may need to use the import command. Both scenarios help you to practically understand what exactly happened and how to handle it.

## Conclusion

![Image description](/images/tf-exp-val/nffrm0jm0oq5kb0jmfu4.png)

In the ever-evolving landscape of infrastructure management, the lessons I learn from experience are invaluable. Throughout this article, we've navigated through a series of crucial practices for using Terraform effectively in production environments. From the importance of versioning and backing up your state, to the wisdom of avoiding large states and incorporating third-party modules, each point underscores a broader principle: the need for vigilance, foresight, and adaptability in managing our digital infrastructure.

As Terraform continues to evolve, so too must our strategies for leveraging its power. Remember, the goal isn't just to avoid errors but to create a robust, efficient, and scalable infrastructure that can withstand the tests of time and change. Embracing tools like Renovate for staying updated, adhering to migration guides, and keeping an eye on issue trackers are not just best practices, but essential habits for any infrastructure manager seeking excellence.

Finally, it's important to note that while Terraform provides us with a powerful toolset, the real strength lies in the community and the shared knowledge we gain from each other. Articles, forums, and discussions like this are not just for solving today's challenges but are stepping stones towards a more resilient and dynamic future in infrastructure management.

As we continue our journey with Terraform, let's carry these lessons forward, always looking for new ways to refine our approach, adapt to new challenges, and share our insights with the community. After all, the most powerful tool in our arsenal is the collective wisdom and experience we share.

import type { GuideCategory } from "@/types/guide";

export const certs: GuideCategory = {
  id: "certs",
  label: "Certifications",
  skills: [
    {
      name: "AWS Cloud Practitioner (CLF-C02)",
      status: "cert",
      priority: 1,
      hot: true,
      why: "Most impactful cert for your profile. Shows AWS commitment beyond just deploying a project. Appears on many JDs as 'nice to have' or required.",
      levels: [
        {
          label: "exam domains — 4 areas to study",
          topics: [
            "<strong>Domain 1 — Cloud Concepts (24%):</strong> what is cloud, benefits of AWS, IaaS/PaaS/SaaS, total cost of ownership, cloud economics",
            "<strong>Domain 2 — Security (30%):</strong> shared responsibility model, IAM, MFA, encryption, compliance (HIPAA, GDPR), Shield, WAF, Inspector",
            "<strong>Domain 3 — Technology (34%):</strong> compute (EC2, Lambda, ECS), storage (S3, EBS, EFS, Glacier), database (RDS, DynamoDB, ElastiCache), networking (VPC, CloudFront, Route53), developer tools (CodePipeline, CloudFormation)",
            "<strong>Domain 4 — Billing (12%):</strong> pricing models, Free Tier, cost explorer, budgets, support plans, organizations",
          ],
        },
        {
          label: "study strategy",
          topics: [
            "<strong>Week 1:</strong> Watch freeCodeCamp YouTube course (14 hours — do 2hrs/day)",
            "<strong>Week 2:</strong> AWS Skill Builder official free modules, take notes",
            "<strong>Week 3:</strong> Practice exams — Examtopics.com (free), target 80%+ score",
            "<strong>Week 4:</strong> Review weak areas, final practice, schedule and take exam",
            "<strong>Question format:</strong> multiple choice and multiple response — eliminate wrong answers first",
            "<strong>No coding:</strong> this is conceptual — you're tested on when to use which service",
          ],
        },
        {
          label: "services you must know for the exam",
          topics: [
            "<strong>Compute:</strong> EC2 (virtual servers), Lambda (serverless), ECS (containers), Elastic Beanstalk (PaaS)",
            "<strong>Storage:</strong> S3 (object), EBS (block, attached to EC2), EFS (shared file), Glacier (archive)",
            "<strong>Database:</strong> RDS (managed relational), DynamoDB (NoSQL), ElastiCache (Redis/Memcached), Redshift (data warehouse)",
            "<strong>Networking:</strong> VPC, Subnets, Security Groups, NACLs, Route53 (DNS), CloudFront (CDN), Direct Connect",
            "<strong>Security:</strong> IAM (identity), KMS (key management), Secrets Manager, Shield (DDoS), WAF",
            "<strong>Management:</strong> CloudWatch (monitoring), CloudTrail (audit), CloudFormation (IaC), Trusted Advisor",
          ],
        },
      ],
      resources: [
        {
          name: "freeCodeCamp AWS Practitioner Full Course (YouTube)",
          url: "https://www.youtube.com/watch?v=NhDYbskXRgc",
          type: "YouTube",
          desc: "Free 14-hour comprehensive video course. All you need for the exam.",
          covers: "Covers: every exam domain, all AWS services tested — by exam topic",
        },
        {
          name: "AWS Cloud Practitioner Essentials (Skill Builder)",
          url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials",
          type: "Course",
          desc: "Official free AWS course on Skill Builder. Structured modules.",
          covers: "Covers: official AWS training content aligned directly to exam objectives",
        },
        {
          name: "Examtopics CLF-C02 Practice Questions (free)",
          url: "https://www.examtopics.com/exams/amazon/clf-c02/",
          type: "Practice",
          desc: "Free practice exam questions with community explanations.",
          covers: "Covers: real exam-style questions, see rationale for each answer",
        },
        {
          name: "AWS Whitepapers (free)",
          url: "https://aws.amazon.com/whitepapers/",
          type: "Reference",
          desc: "Official AWS whitepapers — Well-Architected Framework and Overview of AWS are exam-relevant.",
          covers: "Covers: architectural best practices, service comparisons",
        },
      ],
      cert: {
        name: "Cost: $100 | Study time: 3-4 weeks | Pass score: 700/1000 | Validity: 3 years",
        desc: "Book the exam at Pearson VUE testing center or online proctored. Study until you score 80%+ on practice tests consistently. This is the one certification that most frequently appears in recruiter conversations and job descriptions.",
      },
    },
    {
      name: "Redis Certified Developer",
      status: "cert",
      priority: 2,
      why: "Completely free — courses and exam. Quick win that adds backend credibility.",
      levels: [
        {
          label: "courses to take on Redis University (all free)",
          topics: [
            "<strong>RU101 — Introduction to Redis Data Structures:</strong> strings, lists, hashes, sets, sorted sets — with hands-on labs",
            "<strong>RU102JS — Redis for JavaScript developers:</strong> use node-redis and ioredis — most relevant for you",
            "<strong>RU102 — Redis Streams:</strong> persistent message streaming — XADD, XREAD, consumer groups",
            "<strong>RU203 — Querying, Indexing, Full-Text Search:</strong> RediSearch module",
          ],
        },
        {
          label: "certification exam",
          topics: [
            "<strong>Format:</strong> 60 questions, 90 minutes, online proctored or at home",
            "<strong>Topics:</strong> data structures, streams, persistence, replication, clustering, security",
            "<strong>Passing score:</strong> 67%",
            "<strong>Cost:</strong> FREE — unlimited attempts",
            "<strong>Timeline:</strong> 1-2 weeks after finishing RU101 and RU102JS",
          ],
        },
      ],
      resources: [
        {
          name: "Redis University (all courses + exam free)",
          url: "https://university.redis.com",
          type: "Course",
          desc: "Enroll in RU101 first. All courses have interactive exercises and real Redis clusters to use.",
          covers: "Covers: RU101 (data types), RU102JS (Node.js), RU102 (Streams), RU203 (Search) — all free",
        },
      ],
      cert: {
        name: "Cost: FREE (courses + exam) | Timeline: 1-2 weeks | Priority: medium",
        desc: "Do this immediately after adding Redis to a project. It's free, quick, and adds genuine credibility to your backend resume. One of the only truly free industry certifications.",
      },
    },
    {
      name: "HashiCorp Terraform Associate (003)",
      status: "cert",
      priority: 3,
      why: "Shows IaC knowledge. Good for backend and DevOps-adjacent roles.",
      levels: [
        {
          label: "exam objectives — 9 areas",
          topics: [
            "<strong>Understand IaC concepts:</strong> benefits, use cases, Terraform's place in the IaC landscape",
            "<strong>Terraform purpose:</strong> what problems it solves, key features",
            "<strong>Terraform basics:</strong> providers, resources, state, variables, outputs, modules",
            "<strong>Use the Terraform CLI:</strong> init, plan, apply, destroy, workspace, output, state, fmt, validate",
            "<strong>Interact with Terraform modules:</strong> use public modules, create modules, input/output",
            "<strong>Navigate the core workflow:</strong> write → plan → apply cycle",
            "<strong>Implement and maintain state:</strong> remote state, state locking, state commands",
            "<strong>Read, generate, and modify configuration:</strong> data sources, functions, count/for_each",
            "<strong>Understand Terraform Cloud:</strong> workspaces, variable sets, remote runs",
          ],
        },
        {
          label: "study strategy",
          topics: [
            "<strong>Week 1:</strong> HashiCorp Learn AWS path — do all tutorials hands-on with real AWS",
            "<strong>Week 2:</strong> Write Terraform for your own AWS project (EC2 + RDS + S3)",
            "<strong>Week 3:</strong> Take practice exams, review weak areas",
            "<strong>Cost:</strong> $70, Pearson VUE",
          ],
        },
      ],
      resources: [
        {
          name: "HashiCorp Learn — Terraform AWS Path (free)",
          url: "https://developer.hashicorp.com/terraform/tutorials/aws-get-started",
          type: "Course",
          desc: "Official free tutorials that directly cover exam content.",
          covers: "Covers: all 9 exam objectives with hands-on labs",
        },
        {
          name: "freeCodeCamp Terraform Course (YouTube)",
          url: "https://www.youtube.com/watch?v=SLB_c_ayRMo",
          type: "YouTube",
          desc: "Free 2.5-hour Terraform + AWS course.",
          covers: "Covers: HCL syntax, providers, state, modules — beginner to certification ready",
        },
      ],
      cert: {
        name: "Cost: $70 | Study time: 2-3 weeks | Validity: 2 years | Priority: optional",
        desc: "Take after AWS cert and Terraform practice on real projects. Lower priority than AWS cert and Redis cert but good for roles that list Terraform in the JD.",
      },
    },
  ],
};

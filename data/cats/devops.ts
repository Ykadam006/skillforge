import type { GuideCategory } from "@/types/guide";

export const devops: GuideCategory = {
  id: "devops",
  label: "Cloud & DevOps",
  skills: [
    {
      name: "AWS",
      status: "have",
      priority: 1,
      hot: true,
      why: "You already deploy on AWS. Go deeper on the services you use and understand enough to speak to architecture decisions in interviews.",
      levels: [
        {
          label: "beginner",
          topics: [
            "<strong>IAM:</strong> users, groups, roles, policies — principle of least privilege, never use root",
            "<strong>EC2:</strong> instance types, AMIs, key pairs, security groups (stateful firewall), elastic IPs",
            "<strong>S3:</strong> buckets, objects, storage classes, presigned URLs, bucket policies, CORS",
            "<strong>RDS:</strong> managed PostgreSQL, parameter groups, automated backups, read replicas, Multi-AZ",
            "<strong>VPC basics:</strong> subnets (public vs private), route tables, internet gateway, NAT gateway",
          ],
        },
        {
          label: "intermediate",
          topics: [
            "<strong>CloudFront:</strong> distributions, origins, cache behaviors, invalidations, Lambda@Edge",
            "<strong>Cognito:</strong> user pools vs identity pools, hosted UI, JWT tokens, app clients",
            "<strong>Lambda:</strong> function creation, triggers (API Gateway, S3, SQS), cold starts, memory vs duration",
            "<strong>API Gateway:</strong> REST API vs HTTP API, integration with Lambda, CORS configuration",
            "<strong>SQS and SNS:</strong> queue vs topic, fan-out pattern, dead letter queues",
            "<strong>ECS Fargate:</strong> running Docker containers without managing EC2 servers",
            "<strong>CloudWatch:</strong> logs, metrics, alarms, log groups, insights queries",
          ],
        },
        {
          label: "advanced",
          topics: [
            "<strong>CDK (Cloud Development Kit):</strong> define AWS infra with TypeScript — better than clicking console",
            "<strong>Well-Architected Framework:</strong> 6 pillars — operational excellence, security, reliability, performance, cost, sustainability",
            "<strong>Cost optimization:</strong> Reserved Instances, Savings Plans, Spot instances, right-sizing",
            "<strong>Multi-region:</strong> Route53 health checks, failover routing, data residency considerations",
          ],
        },
      ],
      resources: [
        {
          name: "AWS Free Tier (use it)",
          url: "https://aws.amazon.com/free/",
          type: "Tool",
          desc: "Always on free tier: EC2 t2.micro, S3 5GB, RDS db.t2.micro 20GB, Lambda 1M requests/mo.",
          covers: "Deploy every project here. Hands-on practice is irreplaceable.",
        },
        {
          name: "freeCodeCamp AWS Cloud Practitioner (YouTube)",
          url: "https://www.youtube.com/watch?v=NhDYbskXRgc",
          type: "YouTube",
          desc: "Free 14-hour comprehensive AWS course covering all exam domains.",
          covers: "Covers: every AWS service category — compute, storage, database, networking, security",
        },
        {
          name: "AWS Skill Builder (free courses)",
          url: "https://skillbuilder.aws",
          type: "Course",
          desc: "Official AWS training platform. Many courses are free with just an email.",
          covers: "Covers: AWS Cloud Practitioner prep, service-specific deep dives",
        },
        {
          name: "Cloud Quest (free game on Skill Builder)",
          url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/11458/aws-cloud-quest-cloud-practitioner",
          type: "Course",
          desc: "Free AWS learning game. Build real cloud solutions in a simulated environment.",
          covers: "Covers: EC2, S3, RDS, VPC through hands-on missions",
        },
      ],
      cert: {
        name: "AWS Cloud Practitioner (CLF-C02) — $100, highest ROI cert for your resume",
        desc: "Study for free with freeCodeCamp YouTube + AWS Skill Builder. Take ~20 practice exams on Examtopics.com (free). Schedule when scoring 80%+ consistently. This cert appears on most job descriptions as 'nice to have' and signals real AWS commitment beyond just using it for projects.",
      },
    },
    {
      name: "Docker",
      status: "need",
      priority: 1,
      hot: true,
      why: "Docker is on nearly every job description and is the gateway to understanding containers, microservices, and Kubernetes. Not having it is an easy filter.",
      levels: [
        {
          label: "beginner — start here this week",
          topics: [
            "<strong>Why Docker:</strong> 'works on my machine' problem, containers vs VMs, image vs container",
            "<strong>Docker architecture:</strong> Docker daemon, client, registry (Docker Hub), images, containers",
            "<strong>Your first Dockerfile:</strong> FROM (base image), WORKDIR, COPY, RUN (build time), EXPOSE, CMD/ENTRYPOINT (run time)",
            "<strong>Core commands:</strong> docker build -t name . | docker run -p 3000:3000 name | docker ps | docker stop | docker rm | docker logs",
            "<strong>Port mapping:</strong> -p hostPort:containerPort — why this is needed",
            "<strong>Environment variables:</strong> --env-file .env or -e KEY=value",
            "<strong>Volumes:</strong> -v hostPath:containerPath — persist data, dev hot reload",
            "<strong>Docker Hub:</strong> docker pull, docker push, public vs private registries",
          ],
        },
        {
          label: "intermediate",
          topics: [
            "<strong>Multi-stage builds:</strong> use node:alpine to build, then copy only dist/ to smaller final image — reduces image size 10x",
            "<strong>Docker Compose:</strong> define multiple services (app + postgres + redis) in docker-compose.yml",
            "<strong>Compose commands:</strong> docker compose up -d, down, logs, exec, ps",
            "<strong>Networking in Compose:</strong> service names as hostnames (your app talks to 'postgres' not 'localhost')",
            "<strong>Health checks:</strong> HEALTHCHECK in Dockerfile, depends_on with condition in Compose",
            "<strong>.dockerignore:</strong> exclude node_modules, .env, .git from build context",
            "<strong>Non-root user:</strong> security best practice — don't run containers as root",
            "<strong>Docker in GitHub Actions:</strong> build and push image as part of CI pipeline",
          ],
        },
        {
          label: "advanced",
          topics: [
            "<strong>Docker with Next.js:</strong> standalone output mode (output: 'standalone' in next.config.js) for minimal images",
            "<strong>Docker with Spring Boot:</strong> layered JARs, Jib plugin (no Dockerfile needed)",
            "<strong>Container scanning:</strong> docker scout, trivy — vulnerability scanning images",
            "<strong>Buildx:</strong> multi-platform builds (amd64 + arm64)",
            "<strong>Kubernetes concepts from Docker:</strong> pods = containers, deployments, services, ingress",
          ],
        },
      ],
      resources: [
        {
          name: "Docker Official Docs + Get Started Tutorial",
          url: "https://docs.docker.com/get-started/",
          type: "Docs",
          desc: "Official free tutorial. Walks from installation to multi-container Compose apps.",
          covers: "Covers: Dockerfile, docker run, Compose, networking, volumes — step by step",
        },
        {
          name: "TechWorld with Nana — Docker Full Course (YouTube)",
          url: "https://www.youtube.com/watch?v=3c-iBn73dDE",
          type: "YouTube",
          desc: "Free 3-hour course. Most recommended Docker intro on YouTube. Very clear.",
          covers: "Covers: containers, images, Dockerfile, Compose, networking, volumes",
        },
        {
          name: "Play with Docker (free online lab)",
          url: "https://labs.play-with-docker.com",
          type: "Tool",
          desc: "Free browser-based Docker environment. No installation needed. 4-hour sessions.",
          covers: "Covers: practice all Docker commands without installing anything",
        },
        {
          name: "freeCodeCamp Docker + Kubernetes (YouTube)",
          url: "https://www.youtube.com/watch?v=9zUHg7xjIqQ",
          type: "YouTube",
          desc: "Free comprehensive course covering Docker through Kubernetes.",
          covers: "Covers: Docker fundamentals, Compose, then Kubernetes concepts",
        },
      ],
      note: "Task this week: Dockerize DailyHabitz or ApplyVibe. Write Dockerfile for Next.js app + docker-compose.yml with the database. Push to GitHub. Update resume. This single action removes the biggest gap on your profile.",
    },
    {
      name: "GitHub Actions / CI-CD",
      status: "have",
      priority: 1,
      why: "You already use GitHub Actions. Go deeper to be able to design complete pipelines in interviews.",
      levels: [
        {
          label: "beginner",
          topics: [
            "<strong>Workflow YAML structure:</strong> name, on, jobs, steps — understand every key",
            "<strong>Triggers:</strong> push, pull_request, workflow_dispatch, schedule (cron)",
            "<strong>Runners:</strong> ubuntu-latest, windows-latest, macos-latest, self-hosted",
            "<strong>Steps:</strong> uses (actions), run (shell commands), with (inputs), env",
            "<strong>Common actions:</strong> actions/checkout@v4, actions/setup-node@v4, actions/setup-java@v4",
            "<strong>Secrets:</strong> Settings → Secrets, reference as ${{ secrets.SECRET_NAME }}",
          ],
        },
        {
          label: "intermediate",
          topics: [
            "<strong>Job dependencies:</strong> needs: [job1, job2] — run jobs sequentially or in parallel",
            "<strong>Matrix builds:</strong> test on Node 18, 20, 22 simultaneously",
            "<strong>Caching:</strong> actions/cache for node_modules, .m2 Maven cache — speeds up pipelines",
            "<strong>Artifacts:</strong> actions/upload-artifact, download-artifact — pass files between jobs",
            "<strong>Environments:</strong> staging, production environments with required reviewers",
            "<strong>Deploy to Vercel from Actions:</strong> vercel CLI in workflow or use Vercel GitHub integration",
            "<strong>Deploy to AWS from Actions:</strong> configure-aws-credentials action with OIDC (no long-lived keys)",
            "<strong>Docker in Actions:</strong> build image, push to ECR or Docker Hub",
          ],
        },
        {
          label: "advanced",
          topics: [
            "<strong>Reusable workflows:</strong> workflow_call trigger, pass inputs — avoid duplication across repos",
            "<strong>Composite actions:</strong> create your own custom actions in JavaScript or shell",
            "<strong>OIDC authentication:</strong> passwordless AWS access from GitHub Actions — no AWS keys in secrets",
            "<strong>Semantic release:</strong> automate versioning and changelog from commit messages",
          ],
        },
      ],
      resources: [
        {
          name: "GitHub Actions Official Docs",
          url: "https://docs.github.com/en/actions",
          type: "Docs",
          desc: "Complete free reference. The 'Understanding GitHub Actions' page is essential.",
          covers: "Covers: every workflow keyword, context variables, environment protection",
        },
        {
          name: "TechWorld with Nana CI/CD (YouTube)",
          url: "https://www.youtube.com/watch?v=R8_veQiYBjI",
          type: "YouTube",
          desc: "Free 2-hour GitHub Actions crash course.",
          covers: "Covers: workflows, secrets, Docker integration, deployment pipelines",
        },
      ],
    },
    {
      name: "Terraform",
      status: "need",
      priority: 2,
      why: "IaC knowledge shows you understand production infrastructure. Appears on many backend/DevOps-adjacent JDs.",
      levels: [
        {
          label: "beginner",
          topics: [
            "<strong>Why IaC:</strong> reproducible infrastructure, version controlled, no manual clicking",
            "<strong>HCL syntax:</strong> resource blocks, variable blocks, output blocks, locals",
            "<strong>Providers:</strong> hashicorp/aws provider, provider configuration, authentication",
            "<strong>Core commands:</strong> terraform init, terraform plan, terraform apply, terraform destroy",
            "<strong>State file:</strong> terraform.tfstate — what it contains, why you should not edit it manually",
            "<strong>First resource:</strong> write Terraform to create an S3 bucket and EC2 instance",
          ],
        },
        {
          label: "intermediate",
          topics: [
            "<strong>Variables:</strong> variable blocks, tfvars files, sensitive = true, validation rules",
            "<strong>Outputs:</strong> output blocks — expose resource attributes for use elsewhere",
            "<strong>Modules:</strong> reusable infrastructure components, module sources, input/output",
            "<strong>Remote state:</strong> S3 backend + DynamoDB locking — never use local state in production",
            "<strong>Data sources:</strong> look up existing AWS resources not managed by this Terraform",
            "<strong>Reproduce your AWS project:</strong> write Terraform for your EC2 + RDS + S3 + CloudFront setup",
          ],
        },
        {
          label: "advanced",
          topics: [
            "<strong>Workspaces:</strong> dev/staging/prod — separate state per environment",
            "<strong>Terraform Cloud free tier:</strong> remote state, variable sets, remote runs",
            "<strong>Import:</strong> import existing manually-created resources into Terraform state",
            "<strong>Testing:</strong> terraform validate, tflint, terratest for integration testing",
          ],
        },
      ],
      resources: [
        {
          name: "HashiCorp Learn — Terraform (free official tutorials)",
          url: "https://developer.hashicorp.com/terraform/tutorials",
          type: "Course",
          desc: "Official free tutorials. Structured paths for AWS, Azure, GCP.",
          covers: "Covers: every Terraform concept with hands-on labs using real AWS",
        },
        {
          name: "freeCodeCamp Terraform + AWS (YouTube)",
          url: "https://www.youtube.com/watch?v=SLB_c_ayRMo",
          type: "YouTube",
          desc: "Free 2.5-hour Terraform course focused on AWS.",
          covers: "Covers: HCL syntax, AWS provider, state, modules — complete beginner course",
        },
        {
          name: "Terraform Official Docs",
          url: "https://developer.hashicorp.com/terraform/docs",
          type: "Docs",
          desc: "Complete free reference for all Terraform features.",
          covers: "Covers: every configuration block, provider docs, state management",
        },
      ],
      cert: {
        name: "HashiCorp Terraform Associate (003) — $70 exam, optional",
        desc: "Study for free with HashiCorp Learn tutorials. Good for backend/DevOps-adjacent roles. Lower priority than AWS cert. Take it once you've written real Terraform for your projects.",
      },
    },
  ],
};

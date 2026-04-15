import type { GuideCategory } from "@/types/guide";

export const design: GuideCategory = {
  id: "design",
  label: "System Design",
  skills: [
    {
      name: "System Design for Interviews",
      status: "need",
      priority: 1,
      hot: true,
      why: "System design rounds are now standard even at mid-level SWE roles. Being able to talk through architecture decisions signals seniority.",
      levels: [
        {
          label: "fundamentals — know these cold",
          topics: [
            "<strong>Client-server model:</strong> how a request goes from browser to server and back, every step",
            "<strong>DNS:</strong> domain → IP resolution, A records, CNAME, TTL",
            "<strong>HTTP/HTTPS:</strong> request/response, headers, methods, status codes, HTTP/2 vs HTTP/1.1",
            "<strong>TCP vs UDP:</strong> reliability vs speed, when each is used (TCP=HTTP, UDP=video streaming)",
            "<strong>IP addressing:</strong> IPv4, CIDR notation, public vs private IPs",
            "<strong>Load balancers:</strong> L4 vs L7, algorithms (round robin, least connections, IP hash), health checks",
            "<strong>Horizontal vs vertical scaling:</strong> add more servers vs bigger server, trade-offs",
            "<strong>CAP theorem:</strong> Consistency, Availability, Partition Tolerance — pick 2 in distributed systems",
          ],
        },
        {
          label: "intermediate — design components",
          topics: [
            "<strong>Caching layers:</strong> browser cache, CDN, application cache (Redis), database cache — know when each applies",
            "<strong>Database scaling:</strong> read replicas for read-heavy loads, sharding for write-heavy, when to denormalize",
            "<strong>Indexes in system design context:</strong> trade-off: faster reads, slower writes, more storage",
            "<strong>Message queues:</strong> Kafka/SQS — async decoupling, event-driven, fan-out, dead letter queues",
            "<strong>Rate limiting:</strong> token bucket algorithm, sliding window — protect your APIs",
            "<strong>Content Delivery Network (CDN):</strong> static assets at edge, CloudFront, cache-control headers",
            "<strong>Consistent hashing:</strong> distribute load across nodes without reshuffling everything",
            "<strong>SQL vs NoSQL decision:</strong> structured/relational = SQL, flexible schema/scale = NoSQL",
          ],
        },
        {
          label: "interview problems — practice designing these",
          topics: [
            "<strong>URL shortener:</strong> hashing, redirects, analytics, custom slugs — very common interview",
            "<strong>Rate limiter:</strong> token bucket in Redis, per-user vs global limits",
            "<strong>Notification system:</strong> push, email, SMS — fan-out, delivery guarantees, deduplication",
            "<strong>Job application tracker (ApplyVibe):</strong> YOU KNOW THIS — scale to 1M users: read replicas, Redis cache, CDN, queue for AI processing",
            "<strong>Chat application:</strong> WebSockets, message ordering, read receipts, push notifications",
            "<strong>File storage service (like S3):</strong> chunked upload, deduplication, CDN distribution",
          ],
        },
      ],
      resources: [
        {
          name: "System Design Primer (GitHub — free)",
          url: "https://github.com/donnemartin/system-design-primer",
          type: "Reference",
          desc: "Best free system design resource. 255k+ GitHub stars. Covers every fundamental.",
          covers: "Covers: every component (load balancer, cache, DB, message queue) with diagrams and explanations",
        },
        {
          name: "ByteByteGo Blog (free tier)",
          url: "https://blog.bytebytego.com",
          type: "Blog",
          desc: "Alex Xu's system design newsletter. Many articles free. Visual explanations.",
          covers: "Covers: rate limiting, URL shortener, notification system, consistent hashing — all with clear diagrams",
        },
        {
          name: "Gaurav Sen System Design (YouTube)",
          url: "https://www.youtube.com/@gkcs",
          type: "YouTube",
          desc: "Free system design deep dives. Excellent for building intuition.",
          covers: "Covers: Whatsapp design, Netflix design, consistent hashing, CAP theorem",
        },
        {
          name: "Hussein Nasser (YouTube)",
          url: "https://www.youtube.com/@hnasr",
          type: "YouTube",
          desc: "Backend engineering fundamentals that underpin all system design.",
          covers: "Covers: TCP/IP, HTTP internals, databases, connection pooling, proxies",
        },
        {
          name: "hello-interview.com System Design (free)",
          url: "https://www.hello-interview.com/learn/system-design/entry-level/introduction",
          type: "Course",
          desc: "Free structured system design guide aimed at SWE interviews specifically.",
          covers: "Covers: interview framework, common system designs, how to structure your answer",
        },
        {
          name: "Excalidraw (free diagramming tool)",
          url: "https://excalidraw.com",
          type: "Tool",
          desc: "Free, browser-based whiteboard for drawing system diagrams. Use this to practice.",
          covers: "Practice drawing: load balancer → app servers → DB → cache → CDN architectures",
        },
      ],
      note: "Interview framework: (1) clarify requirements (2) estimate scale (3) high-level design (4) deep dive components (5) identify bottlenecks. Practicing the framework matters as much as knowing the concepts.",
    },
  ],
};

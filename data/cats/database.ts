import type { GuideCategory } from "@/types/guide";

export const database: GuideCategory = {
  id: "database",
  label: "Databases",
  skills: [
    {
      name: "PostgreSQL (deep)",
      status: "have",
      priority: 1,
      why: "PostgreSQL is your primary database. Interview questions go beyond basic CRUD into performance and design.",
      levels: [
        {
          label: "beginner",
          topics: [
            "<strong>Setup:</strong> install locally or use Neon (you use this), psql CLI commands",
            "<strong>Data types:</strong> integer, bigint, text, varchar, boolean, timestamp, uuid, jsonb, array",
            "<strong>Constraints:</strong> PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT",
            "<strong>Relationships:</strong> one-to-one, one-to-many, many-to-many with junction tables",
            "<strong>Prisma ORM (you use this):</strong> schema.prisma, relations, migrations, Prisma Client queries",
          ],
        },
        {
          label: "intermediate",
          topics: [
            "<strong>Indexes deep dive:</strong> B-tree (default), Hash, GIN (jsonb, arrays), GiST, BRIN — when to use each",
            "<strong>EXPLAIN ANALYZE:</strong> Seq Scan vs Index Scan vs Index Only Scan vs Bitmap Heap Scan",
            "<strong>Composite indexes:</strong> column order matters — leftmost prefix rule",
            "<strong>Partial indexes:</strong> WHERE clause in index — index only active users for example",
            "<strong>N+1 problem:</strong> what it is, how Prisma include/select prevents it",
            "<strong>Connection pooling:</strong> why databases max out connections, PgBouncer, Neon's pooler",
            "<strong>VACUUM and AUTOVACUUM:</strong> dead tuples, bloat, why PostgreSQL needs this",
          ],
        },
        {
          label: "advanced",
          topics: [
            "<strong>Row-level security (RLS):</strong> ALTER TABLE ENABLE ROW LEVEL SECURITY, CREATE POLICY — for multi-tenant SaaS",
            "<strong>pgvector extension:</strong> vector similarity search for AI/RAG — you use Neon which supports this",
            "<strong>Partitioning:</strong> range partitioning by date, list partitioning by region",
            "<strong>Logical replication:</strong> publication/subscription — for read replicas",
            "<strong>Full-text search:</strong> tsvector, tsquery, to_tsvector, GIN index on tsvector column",
          ],
        },
      ],
      resources: [
        {
          name: "PostgreSQL Official Docs",
          url: "https://www.postgresql.org/docs/current/",
          type: "Docs",
          desc: "The complete reference. Bookmark the index types page and window functions page.",
          covers: "Covers: every feature, data type, function, configuration",
        },
        {
          name: "pgexercises.com",
          url: "https://pgexercises.com",
          type: "Practice",
          desc: "Free PostgreSQL exercises in your browser. Covers all SQL levels.",
          covers: "Covers: basic queries through window functions and recursive CTEs",
        },
        {
          name: "Hussein Nasser PostgreSQL Playlist",
          url: "https://www.youtube.com/playlist?list=PLQnljOFTspQXjD0HOzN7P2tgzu7scWpl2",
          type: "YouTube",
          desc: "Free deep dives on PostgreSQL internals — MVCC, indexes, EXPLAIN.",
          covers: "Covers: how PostgreSQL works internally — essential for senior interviews",
        },
        {
          name: "Prisma Official Docs",
          url: "https://www.prisma.io/docs",
          type: "Docs",
          desc: "Complete free Prisma reference.",
          covers: "Covers: schema modeling, relations, migrations, raw queries, performance",
        },
        {
          name: "pgvector GitHub README",
          url: "https://github.com/pgvector/pgvector",
          type: "Reference",
          desc: "Free guide to adding vector search to PostgreSQL — needed for AI/RAG features.",
          covers: "Covers: setup, indexing, similarity queries, integration with Neon",
        },
      ],
    },
    {
      name: "MongoDB",
      status: "have",
      priority: 2,
      why: "MongoDB is used in DailyHabitz. Know it well enough to explain schema design decisions.",
      levels: [
        {
          label: "beginner",
          topics: [
            "<strong>Document model:</strong> collections, documents, BSON, _id field",
            "<strong>CRUD:</strong> insertOne/Many, findOne/find, updateOne/Many with $set/$inc/$push, deleteOne/Many",
            "<strong>Query operators:</strong> $eq, $ne, $gt, $lt, $in, $nin, $and, $or, $not, $exists, $regex",
            "<strong>Mongoose:</strong> Schema, Model, virtual fields, timestamps, validation, middleware hooks",
          ],
        },
        {
          label: "intermediate",
          topics: [
            "<strong>Aggregation pipeline:</strong> $match, $group, $project, $sort, $limit, $skip, $lookup (join), $unwind, $addFields",
            "<strong>Indexes in MongoDB:</strong> createIndex, compound indexes, text indexes, TTL indexes",
            "<strong>Schema design:</strong> embedding (1-to-few) vs referencing (1-to-many or many-to-many)",
            "<strong>Pagination:</strong> skip/limit vs cursor-based pagination",
            "<strong>Atlas free tier:</strong> M0 cluster, Atlas Search, connection URI with SRV",
          ],
        },
        {
          label: "advanced",
          topics: [
            "<strong>Transactions:</strong> multi-document ACID, startSession, withTransaction",
            "<strong>Change streams:</strong> watch() for real-time data change events",
            "<strong>Atlas Search:</strong> full-text search with fuzzy matching, autocomplete",
            "<strong>Sharding concepts:</strong> shard key selection, range vs hash sharding",
          ],
        },
      ],
      resources: [
        {
          name: "MongoDB University (completely free)",
          url: "https://learn.mongodb.com",
          type: "Course",
          desc: "Official free courses from MongoDB with certificates. Best structured learning.",
          covers: "Covers: CRUD, aggregation, indexes, schema design, Atlas — multiple free courses",
        },
        {
          name: "Mongoose Docs",
          url: "https://mongoosejs.com/docs/",
          type: "Docs",
          desc: "Complete free Mongoose reference.",
          covers: "Covers: schemas, validation, middleware, population, aggregation",
        },
        {
          name: "MongoDB Manual",
          url: "https://www.mongodb.com/docs/manual/",
          type: "Docs",
          desc: "Complete official MongoDB reference.",
          covers: "Covers: every operator, index type, aggregation stage in detail",
        },
      ],
    },
    {
      name: "Redis",
      status: "need",
      priority: 1,
      hot: true,
      why: "Redis appears in a huge percentage of backend job descriptions. Rate limiting, caching, and session management are all common interview topics.",
      levels: [
        {
          label: "beginner",
          topics: [
            "<strong>What Redis is:</strong> in-memory data store, not a primary DB, persistence options",
            "<strong>String commands:</strong> SET key value EX seconds, GET key, DEL key, EXISTS key, INCR key",
            "<strong>Key expiry:</strong> EXPIRE, TTL, PERSIST — how Redis handles time-to-live",
            "<strong>List commands:</strong> LPUSH, RPUSH, LPOP, RPOP, LRANGE — use as queue or stack",
            "<strong>Hash commands:</strong> HSET, HGET, HGETALL, HDEL — like a nested object",
            "<strong>Set commands:</strong> SADD, SMEMBERS, SISMEMBER, SUNION, SINTER",
            "<strong>Sorted set commands:</strong> ZADD, ZRANGE, ZRANK, ZSCORE — leaderboards, rate limiting",
            "<strong>Upstash setup:</strong> create free serverless Redis, get connection URL, use @upstash/redis in Next.js",
          ],
        },
        {
          label: "intermediate",
          topics: [
            "<strong>Cache-aside pattern:</strong> check Redis → if miss, query DB → store in Redis → return",
            "<strong>Rate limiting with Redis:</strong> INCR + EXPIRE pattern, sliding window with sorted sets",
            "<strong>Session storage:</strong> store JWT sessions, token blocklist for logout",
            "<strong>Pub/Sub:</strong> SUBSCRIBE channel, PUBLISH channel message — real-time messaging",
            "<strong>MULTI/EXEC transactions:</strong> atomic operations",
            "<strong>Connection management:</strong> ioredis vs @upstash/redis — when to use each",
            "<strong>Cache invalidation:</strong> the hard problem — strategies: TTL, write-through, event-driven",
          ],
        },
        {
          label: "advanced",
          topics: [
            "<strong>Redis Streams:</strong> XADD, XREAD, XREADGROUP — persistent message queue (Kafka-lite)",
            "<strong>Lua scripting:</strong> EVAL for atomic multi-step operations",
            "<strong>Redis Cluster:</strong> horizontal sharding, hash slots",
            "<strong>Redis persistence:</strong> RDB snapshots vs AOF append-only file",
            "<strong>Redis with BullMQ:</strong> job queue library on top of Redis — background job processing",
          ],
        },
      ],
      resources: [
        {
          name: "Redis University (free courses + free certification)",
          url: "https://university.redis.com",
          type: "Course",
          desc: "All courses AND certification are completely free. Best structured Redis learning.",
          covers: "Covers: RU101 data structures, RU102 streams, RU203 search — all free",
        },
        {
          name: "Redis Official Docs with Interactive Tutorials",
          url: "https://redis.io/docs/",
          type: "Docs",
          desc: "Documentation includes interactive sandbox to run Redis commands in browser.",
          covers: "Covers: every command, pattern, and configuration option",
        },
        {
          name: "Upstash Docs",
          url: "https://upstash.com/docs/redis/overall/getstarted",
          type: "Docs",
          desc: "Serverless Redis that works with Vercel/Next.js. Free tier is generous.",
          covers: "Covers: setup, @upstash/redis SDK, rate limiting examples",
        },
        {
          name: "BullMQ Docs",
          url: "https://docs.bullmq.io",
          type: "Docs",
          desc: "Job queue library on Redis. Free. Useful for background jobs in Node.js.",
          covers: "Covers: queues, workers, schedulers, rate limiting jobs",
        },
      ],
      cert: {
        name: "Redis Certified Developer — completely free exam",
        desc: "Complete RU101 on Redis University (free), then take the certification attempt (also free). Adds real credibility to your backend resume. Do this after adding Redis to one project.",
      },
    },
  ],
};

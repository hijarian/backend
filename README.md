# A backend

 1. [x] `npm` instead of `yarn` to reduce amount of dependencies. This assumes `package.json`.
    NPM is mature enough and we don't require different package manager anymore
 2. [x] `prettier` as a standard for code formatting. This assumes `.prettierrc`.
 3. [x] `eslint` as a standard for code linting. This assumes `.eslintrc`.
 4. [x] `typescript` because type safety. This assumes `tsconfig.json` with `strict: true`.
 5. [ ] Docker because it's a standard for deploy now. This assumes `Dockerfile` and `.dockerignore`.
 6. [x] `jest` as an all-in-one solution for testing.
 7. [ ] `supertest` for HTTP testing.
 8. [x] `nestjs` as an architecture layer. It includes logger. We get rxjs for free!
 9. [ ] `prisma` for ORM, because it has integration with Nest.js and it is compiled.
10. [x] `fastify` for web server because it has integration with Nest.js
11. [ ] `dotenv` for configuration management because it has integration with Nest.js
12. [x] `passportjs` for authentication
13. [ ] `swagger` for OpenAPI spec. It has integration with Nest.js
14. [x] `.editorconfig` file.
15. [ ] `bullmq` for queues. It has integration with Nest.js
16. [ ] `node-cron` for scheduled tasks. It has integration with Nest.js
17. [x] `helmet` as an ubiquitous library for headers manipulation, and which sets "important security headers". For Fastify we have to use specifically `fastify-helmet`.
18. [ ] `fastify-cookie` with the support of Nest.js
19. [x] `fastify-cors` with the support of Nest.js
20. [ ] `fastify-session` with the support of Nest.js

## External software

 1. `snyk` for security testing.
 2. `apm` for monitoring.
 3. `sonarqube` for static analysis.
 4. `elk` for logs.

## External services

 1. Redis - cache, sessions storage
 2. PostgreSQL - persistent storage
 3. Elasticsearch - logs, monitoring, search index

## Wishlist

 1. Package with a `pkg`?

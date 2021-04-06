import { User } from 'src/users/users.service';

/**
 * Declarations merging as per https://www.fastify.io/docs/latest/TypeScript/#creating-a-typescript-fastify-plugin
 */
declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}

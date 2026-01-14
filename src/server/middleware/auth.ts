import { createMiddleware } from "hono/factory";
import { jwtVerify, createRemoteJWKSet } from "jose";

interface Env {
  POLICY_AUD: string;
  CF_ACCESS_DOMAIN: string;
  ENVIRONMENT: "dev" | "staging" | "production";
}
export const accessAuth = createMiddleware(async (c, next) => {
  console.log("midleware reached");
  const { env }: { env: Env } = c;

  if (env.ENVIRONMENT === "dev") {
    return await next();
  }
  // Verify the POLICY_AUD environment variable is set
  if (!env.POLICY_AUD) {
    return c.json("Missing required audience", 403);
  }

  //   // Get the JWT from the request headers
  const token = c.req.header("cf-access-jwt-assertion");

  //   // Check if token exists
  if (!token) {
    return c.json("Missing required CF Access JWT", 403);
  }

  try {
    // Create JWKS from your team domain
    const JWKS = createRemoteJWKSet(
      new URL(`${env.CF_ACCESS_DOMAIN}/cdn-cgi/access/certs`),
    );

    // Verify the JWT
    await jwtVerify(token, JWKS, {
      issuer: env.CF_ACCESS_DOMAIN,
      audience: env.POLICY_AUD,
    });

    await next();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return c.json(`Invalid token: ${message}`, 403);
  }
});

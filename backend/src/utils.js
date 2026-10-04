import dotenv from "dotenv";

dotenv.config();

const envCheck = () => {
  const requiredVars = {
    MONGODB_URI: process.env.MONGODB_URI,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  };

  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value) {
      throw new Error("Missing environment variable: " + key);
    }
  }
};

export { envCheck };

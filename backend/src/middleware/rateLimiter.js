import ratelimit from "../config/upstash.js";

export const rateLimiter = async (req, res, next) => {
  try {
    const scope = req.method === "GET" ? "read" : "write";
    const id = req.auth?.payload?.sub
      ? `user:${req.auth.payload.sub}`
      : `ip:${req.ip}`;
    const limitKey = `rate:notes:${scope}:${id}`;

    const config = getConfig(req);

    const { success } = await ratelimit.limit(limitKey, config);

    if (!success) {
      return res
        .status(429) // Too Many Requests
        .json({ message: "Too many requests, please try again later." });
    }

    next();
  } catch (error) {
    console.log("Rate limiter error: ", error);
    next(error);
  }
};

const getConfig = (req) => {
  const method = req.method;

  if (method === "GET") return { window: 60, limit: 120 };
  if (method === "POST") return { window: 60, limit: 20 };
  if (method === "PUT" || method === "PATCH")
    return {
      window: 60,
      limit: 20,
    };
  if (method === "DELETE") return { window: 60, limit: 10 };

  return { window: 60, limit: 100 };
};

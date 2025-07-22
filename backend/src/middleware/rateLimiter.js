import ratelimit from "../config/upstash.js";

export const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("limit-max");

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

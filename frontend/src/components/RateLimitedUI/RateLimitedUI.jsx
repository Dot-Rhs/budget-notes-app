import { ZapIcon } from "lucide-react";
import React from "react";
import { useState } from "react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="flex-shrink-0 bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
            <ZapIcon className="size-10 text-primary" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-">Rate Limit Reached</h3>
            <p className="text-base-content mb-1">
              Bruv you're making too many requests... Hang on a sec like.
            </p>
            <p className="text-sm text-base-content/70">
              Try again in a few seconds, or dont, I don't know.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;

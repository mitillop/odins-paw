import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  preview: {
    buckets: {
      "pet-images": { access: "public_read" },
    },
  },
});

# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate  

COPY . .
# Ensure uploads directory exists inside the image so it gets copied to the final image
RUN mkdir -p /app/public/uploads/articles \
  && chown -R node:node /app/public/uploads || true

RUN npm run build


# ---------- RUN STAGE ----------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy hasil build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Ensure uploads dir exists and permissions are correct at runtime
RUN mkdir -p /app/public/uploads/articles \
  && chown -R node:node /app/public /app/node_modules || true

# Expose a volume mount point so users can mount host dir or named volume for persistence
VOLUME ["/app/public/uploads"]

EXPOSE 3000

# Run as non-root user for better security
USER node

CMD ["npm", "start"]

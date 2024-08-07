# ENVIRONMENT VARS
ARG NODE_VERSION=21.1.0

# Install dependencies
FROM node:${NODE_VERSION}-alpine AS deps
# RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the app
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_BASE_PATH
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_WEBSOCKET_NOTIFICATIONS_SERVER_URL
ARG NEXT_PUBLIC_WEBSOCKET_NOTIFICATIONS_RECONNECTION_DELAY
ARG NEXT_PUBLIC_WEBSOCKET_NOTIFICATIONS_INCOMING_HEARTBEAT
ARG NEXT_PUBLIC_WEBSOCKET_NOTIFICATIONS_OUTGOING_HEARTBEAT

ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_WEBSOCKET_NOTIFICATIONS_SERVER_URL=$NEXT_PUBLIC_WEBSOCKET_NOTIFICATIONS_SERVER_URL
ENV NEXT_PUBLIC_WEBSOCKET_NOTIFICATIONS_RECONNECTION_DELAY=$NEXT_PUBLIC_WEBSOCKET_NOTIFICATIONS_RECONNECTION_DELAY
ENV NEXT_PUBLIC_WEBSOCKET_NOTIFICATIONS_INCOMING_HEARTBEAT=$NEXT_PUBLIC_WEBSOCKET_NOTIFICATIONS_INCOMING_HEARTBEAT
ENV NEXT_PUBLIC_WEBSOCKET_NOTIFICATIONS_OUTGOING_HEARTBEAT=$NEXT_PUBLIC_WEBSOCKET_NOTIFICATIONS_OUTGOING_HEARTBEAT
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Run the app
FROM alpine:3.20.2 AS runner
WORKDIR /app

# Install Node.js and npm
RUN apk add --no-cache nodejs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

#RUN addgroup --system --gid 1001 nodejs
#RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# https://nextjs.org/docs/advanced-features/output-file-tracing
#COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
#COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
#
#COPY --from=builder /app/.next/standalone ./
#COPY --from=builder /app/.next/static ./.next/static
#
#USER nextjs

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]

# Gunakan base image Node.js
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy file package.json dan package-lock.json / pnpm-lock.yaml / yarn.lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code
COPY . .

# Build project Astro (hasilnya ke /dist)
RUN npm run build


# Stage kedua: gunakan image ringan untuk serving
FROM node:18-alpine AS runner

WORKDIR /app

# Install hanya dep yang perlu untuk production
COPY package*.json ./
RUN npm install --omit=dev

# Copy hasil build dari stage builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 4321

# Jalankan server Astro
CMD ["npx", "astro", "preview", "--host", "0.0.0.0", "--port", "4321"]

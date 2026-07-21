FROM mcr.microsoft.com/devcontainers/javascript-node:22

# Electron / Chromium runtime libraries (no passwordless sudo).
RUN apt-get update && apt-get install -y --no-install-recommends \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpango-1.0-0 \
    libcairo2 \
    libgtk-3-0 \
    libxshmfence1 \
    libxss1 \
    fonts-liberation \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Honor package.json packageManager (pnpm@11.x).
RUN corepack enable

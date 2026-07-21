# Dev Container

Hardened [Development Container](https://containers.dev) for day-to-day work on MKK Companion.

## Why

- `pnpm install` and Electron run inside Linux, not on your host — a compromised package cannot read host SSH keys, keychain, browser cookies, or cloud credentials.
- Root and `docs` `node_modules` (and the pnpm store under `node_modules/.pnpm-store`) live in Docker volumes — not on the host filesystem. `initializeCommand` chowns those volumes to the `node` user so installs work with `no-new-privileges`.
- SSH agent forwarding is disabled; Chromium’s in-container sandbox is off (`ELECTRON_DISABLE_SANDBOX`) because Docker lacks the needed user namespaces — the container is the outer sandbox.
- Lifecycle scripts are allowlisted in `pnpm-workspace.yaml`; new publishes must be at least 7 days old unless explicitly excluded. The committed lockfile is trusted for install (`trustLockfile`); age/trust checks still apply when you add or update packages.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (or compatible engine) running
- [VS Code](https://code.visualstudio.com) or [Cursor](https://cursor.com/) with the **Dev Containers** extension

## Setup

1. Open this repository in VS Code / Cursor.
2. Run **Dev Containers: Reopen in Container**.
3. Wait for the image build and `postCreateCommand` (`pnpm install`).
4. In the **Ports** panel, open **6080** (Desktop / noVNC) in a browser.
5. In the container terminal:

```bash
pnpm run dev
```

The Electron window appears on the virtual desktop in the browser tab.

## What is isolated

| Isolated from host                  | Still possible inside the container       |
| ----------------------------------- | ----------------------------------------- |
| Home directory, SSH keys, keychain  | Reading/writing the mounted workspace     |
| Host `node_modules`                 | Network egress (registry, git, APIs)      |
| SSH agent (`SSH_AUTH_SOCK` cleared) | Secrets you export into the container env |

⚠️ **DO NOT PUT PRIVATE TOKENS OR KEYS INTO CONTAINER ENVIRONMENT VARIABLES UNLESS REQUIRED FOR A SPECIFIC TASK.** ⚠️

## Limits

- Native Instruments / Maschine library paths on macOS or Windows are not available unless you add bind mounts later.
- `electron-builder` packaging for macOS/Windows stays a host or CI concern; use this container for secure development, linting, and Linux Electron smoke tests.

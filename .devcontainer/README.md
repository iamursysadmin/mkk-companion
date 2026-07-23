# Dev Container

Hardened [Development Container](https://containers.dev) for day-to-day work on MKK Companion.

## Why

- `pnpm install` and Electron run inside Linux, not on your host — a compromised package cannot read host SSH keys, keychain, browser cookies, or cloud credentials.
- Root and `docs` `node_modules` (and the pnpm store under `node_modules/.pnpm-store`) live in Docker volumes — not on the host filesystem. `initializeCommand` chowns those volumes to the `node` user so installs work with `no-new-privileges`.
- Chromium’s in-container sandbox is off (`ELECTRON_DISABLE_SANDBOX`) because Docker lacks the needed user namespaces — the container is the outer sandbox.
- Lifecycle scripts are allowlisted in `pnpm-workspace.yaml`; new publishes must be at least 7 days old unless explicitly excluded. The committed lockfile is trusted for install (`trustLockfile`); age/trust checks still apply when you add or update packages.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (or compatible engine) running
- [VS Code](https://code.visualstudio.com) or [Cursor](https://cursor.com/) with the **Dev Containers** extension
- Host SSH signing key at `~/.ssh/id_ed25519` (public key mounted read-only; private key stays on the host)
- That public key added to GitHub as a **Signing key** (Settings → SSH and GPG keys → New SSH key → Key type: Signing Key) — reuse the same key every time, do not generate a per-container key

## Setup

1. Open this repository in VS Code / Cursor.
2. Run **Dev Containers: Reopen in Container**.
3. Wait for the image build and `postCreateCommand` (`pnpm install`).
4. In the **Ports** panel, open **6080** (Desktop / noVNC) with **Open in Browser** (system browser).
   - Avoid the in-editor Simple Browser / Preview — noVNC needs WebSockets and often shows a blank page there.
   - Click **Connect**. Password auth is disabled (`noPassword`).
   - You should see a dark Fluxbox desktop with a thin toolbar at the bottom. **Right-click** the desktop for the app menu.
5. In the container terminal:

```bash
pnpm run dev
```

The Electron window appears on the virtual desktop in the browser tab.

> Rebuild the container after pulling changes that touch `.devcontainer/` (`Dev Containers: Rebuild Container`) so `shm-size`, noVNC, and wallpaper settings apply.

## Signed commits (no new keys per container)

Git on the host is configured for SSH signing (`gpg.format=ssh`, `commit.gpgsign=true`) with `user.signingkey` pointing at a macOS path like `/Users/…/.ssh/id_ed25519.pub`. That path does not exist inside the container.

The container instead:

1. Bind-mounts **only** `~/.ssh/id_ed25519.pub` from the host (read-only)
2. Runs `.devcontainer/setup-git-signing.sh` on start **and** from the Husky `pre-commit` hook
3. Sets a **repo-local** `user.signingkey` (`.git/config`) so Cursor’s habit of re-syncing the host path into `~/.gitconfig` cannot break commits mid-session
4. Uses VS Code's / Cursor’s forwarded SSH agent for the private-key operation — the private key never enters the container filesystem

Verify once after rebuild:

```bash
ssh-add -l
git config --global --get user.signingkey   # should be /home/node/.ssh/id_ed25519.pub
git commit --allow-empty -m 'test: signing' # should succeed and show "gpg: Signature made …"
git reset --soft HEAD~1                     # drop the empty test commit
```

If your signing key is not named `id_ed25519`, change the mount target/source in `devcontainer.json` to match, or run:

```bash
bash .devcontainer/setup-git-signing.sh
```

after `ssh-add -L` works (agent fallback writes `~/.ssh/signing_key.pub`).

**Security note:** the agent can create signatures (and may authenticate to Git remotes if the same key is also an auth key). Prefer a **signing-only** SSH key on GitHub (not also an authentication key). Never mount `id_ed25519` (the private key) or your full `~/.ssh` directory into the container.

## What is isolated

| Isolated from host                         | Still possible inside the container                         |
| ------------------------------------------ | ----------------------------------------------------------- |
| Home directory, private SSH keys, keychain | Reading/writing the mounted workspace                       |
| Host `node_modules`                        | Network egress (registry, git, APIs)                        |
| Private key files                          | SSH agent signing via Cursor + read-only public signing key |

⚠️ **DO NOT PUT PRIVATE TOKENS OR KEYS INTO CONTAINER ENVIRONMENT VARIABLES UNLESS REQUIRED FOR A SPECIFIC TASK.** ⚠️

## Limits

- Native Instruments / Maschine library paths on macOS or Windows are not available unless you add bind mounts later.
- `electron-builder` packaging for macOS/Windows stays a host or CI concern; use this container for secure development, linting, and Linux Electron smoke tests.
- Signed commits need the host SSH agent (Cursor forwards it) plus the mounted public key; there is no per-container key to register on GitHub.

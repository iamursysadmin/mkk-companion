#!/usr/bin/env bash
# Wire SSH commit signing to the host agent without copying private keys.
#
# Cursor keeps syncing ~/.gitconfig from the host, which rewrites
# user.signingkey to a macOS path like /Users/…/id_ed25519.pub that does not
# exist here. Always re-point at the mounted (or agent-derived) pubkey, and set
# a repo-local override so the next Cursor sync of the global config cannot
# break `git commit`.
set -euo pipefail

MOUNTED_PUB="${HOME}/.ssh/id_ed25519.pub"
AGENT_PUB="${HOME}/.ssh/signing_key.pub"

if [[ -f "${MOUNTED_PUB}" ]]; then
  TARGET_PUB="${MOUNTED_PUB}"
elif [[ -n "${SSH_AUTH_SOCK:-}" ]] && ssh-add -L >"${AGENT_PUB}.tmp" 2>/dev/null; then
  head -n1 "${AGENT_PUB}.tmp" >"${AGENT_PUB}"
  rm -f "${AGENT_PUB}.tmp"
  chmod 644 "${AGENT_PUB}"
  TARGET_PUB="${AGENT_PUB}"
else
  echo "setup-git-signing: no mounted pubkey and no SSH agent identities; skipping" >&2
  exit 0
fi

apply_signing_key() {
  local scope="$1"
  git config "${scope}" user.signingkey "${TARGET_PUB}"
  git config "${scope}" gpg.format ssh
}

apply_signing_key --global

# Local beats global — survives Cursor rewriting ~/.gitconfig mid-session.
if git rev-parse --git-dir >/dev/null 2>&1; then
  apply_signing_key --local
fi

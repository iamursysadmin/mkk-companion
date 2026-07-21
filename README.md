# MKK Companion

Companion app for [Maschine](https://www.native-instruments.com/en/products/maschine/production-systems/maschine) and [Komplete Kontrol](https://www.native-instruments.com/en/products/komplete/bundles/komplete-kontrol) by [Native Instruments](https://www.native-instruments.com)

## DECLAIMER

THIS APP IS NOT OFFICIAL BY NATIVE INSTRUMENTS OR ENDORSED BY **NATIVE INSTRUMENTS**.

## Features

- Create and maintain User chords manager for Maschine
- Create and maintain User expansions manager for Maschine & KK
- Tag manager for samples and loops

## Documentation

Project and documentation are under development and will be available soon. Once ready, the docs URL will be added to the GitHub project description and to this Documentation section.

## Contributing to development

The sections below are for contributors who want to build, test, or release the app from source. If you only want to **use** the app, wait for the documentation and installers — you do not need to set up the development environment.

See also [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md).

### Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (recommended) **or** [Node.js](https://nodejs.org/) 20+ and [pnpm](https://pnpm.io/) 9+
- VS Code / Cursor with the [Dev Containers](https://containers.dev) extension (for the recommended workflow)

### Getting started

#### Dev Container (recommended)

Isolates installs and Electron from your host so a compromised npm package cannot reach host secrets. See [`.devcontainer/README.md`](.devcontainer/README.md).

1. Open the repo in VS Code or Cursor.
2. **Dev Containers: Reopen in Container**.
3. Open forwarded port **6080** (virtual desktop) in a browser.
4. Run:

```bash
pnpm run dev
```

`node_modules` stays in a Docker volume. Packaging for macOS/Windows remains a host/CI step. Maschine library paths on the host are not mounted by default.

#### Host machine

```bash
pnpm install
pnpm run dev
```

`pnpm install` will:

- install dependencies (lifecycle scripts allowlisted in `pnpm-workspace.yaml`)
- download and extract the Electron binary
- set up Husky git hooks (commitlint + lint-staged)

### Scripts

| Command                    | Description                                           |
| -------------------------- | ----------------------------------------------------- |
| `pnpm run dev`             | Start the Vite + Electron app                         |
| `pnpm run build`           | Type-check, build, and package with electron-builder  |
| `pnpm run build:app`       | Type-check and build renderer + Electron (no package) |
| `pnpm run test`            | Run unit + Electron e2e tests                         |
| `pnpm run test:unit`       | Run Vitest unit / snapshot tests                      |
| `pnpm run test:e2e`        | Build app and run Playwright Electron e2e tests       |
| `pnpm run test:e2e:update` | Rebuild and refresh Playwright visual snapshots       |
| `pnpm run lint`            | Run ESLint                                            |
| `pnpm run format`          | Format files with Prettier                            |
| `pnpm run changelog`       | Preview changelog from conventional commits           |
| `pnpm run release:beta`    | Local beta release (`X.Y.Z-beta.N`) via changelogen   |
| `pnpm run release:stable`  | Local stable release (`X.Y.Z`) via changelogen        |

### Releases

Releases use [changelogen](https://github.com/unjs/changelogen) and follow [SemVer](https://semver.org/).

| Channel | Workflow           | Version form   | GitHub release        |
| ------- | ------------------ | -------------- | --------------------- |
| Beta    | **Release Beta**   | `X.Y.Z-beta.N` | marked **prerelease** |
| Stable  | **Release Stable** | `X.Y.Z`        | marked **latest**     |

1. Merge the changes you want into `main`.
2. On GitHub: **Actions → Release Beta** or **Release Stable → Run workflow**.
3. The workflow bumps `package.json`, updates `CHANGELOG.md`, pushes a `v*` tag, creates the GitHub Release, then builds installers and attaches them.

**Beta bumps**

- `prerelease` — next beta of the current line (`1.2.0-beta.1` → `1.2.0-beta.2`), or start `…-beta.0` from a stable version
- `prepatch` / `preminor` / `premajor` — start a new beta line on the next patch/minor/major (`1.2.3` → `1.2.4-beta.0` / `1.3.0-beta.0` / `2.0.0-beta.0`)

**Stable bumps**

- `patch` / `minor` / `major` — normal SemVer bumps
- From a beta, `patch` graduates to the base version (`1.2.0-beta.3` → `1.2.0`)

Or set an explicit version (e.g. `1.0.0-beta.0` / `1.0.0`) to override the bump.

Local dry-run (no commit/tag):

```bash
pnpm run changelog
```

### Testing

- **Unit / value snapshots** — Vitest (`shared/**/*.spec.ts`, `src/**/*.spec.ts`)
- **Electron e2e + visual snapshots** — Playwright `_electron` against a production Vite build (`e2e/*.e2e.ts`)

E2E uses Electron’s bundled Chromium (no `playwright install` browsers required). In the Dev Container, ensure the desktop display is up (`DISPLAY=:1`) before running e2e.

```bash
pnpm run test:unit
pnpm run test:e2e
# after intentional UI changes:
pnpm run test:e2e:update
```

<div align="center">

## Sponsors

Thanks to the sponsors who support this project:

<a href="https://curatedfrequencies.com/">
  <img src=".github/sponsors/curated-frequencies.png" alt="Curated Frequencies" width="160" />
</a>

<p>
  <a href="https://github.com/sponsors/iamursysadmin">Become a sponsor on GitHub</a>
</p>

</div>

## Credits

This project is built on the shoulders of giants.

- Built with Electron, TypeScript, Vue, and Vite — started from the [electron-vite-vue](https://github.com/electron-vite/electron-vite-vue) boilerplate
- UI: [Nuxt UI](https://ui.nuxt.com/)
- Music theory: [Tonal](https://tonaljs.github.io/tonal/docs)
- DX: [UnJs](https://unjs.io)
- Testing: [Vitest](https://vitest.dev/) and [Playwright](https://playwright.dev/)
- Dev environment: [Dev Containers](https://containers.dev/)
- Docs: [Docus](https://docus.dev)

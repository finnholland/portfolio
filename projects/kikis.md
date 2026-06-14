# Kiki's Content Delivery Service

<p align="center"><img src="../public/images/kiki.png" alt="kiki" width="400" /></p>

CLI tool for managing AWS infrastructure — Lambda, ECS, RDS, and static hosting — without writing CloudFormation directly.

Kiki generates AWS CDK apps on the fly and runs them via Docker, so you don't need CDK or a specific Node version installed locally.

## Install

```sh
npm install -g .
```

Or run directly during development:

```sh
./bin/dev.js <command>
```

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) — running locally
- [AWS CLI](https://aws.amazon.com/cli/) — configured with credentials

## Commands

### `kiki init`

Bootstrap a project. Run once per project — sets your AWS region, account, VPC, Route53 routing, ACM certificates, and creates a minimum-privilege IAM role. Writes `infra/kiki.defaults.json`.

```
USAGE
  $ kiki init [--dir <value>] [--force] [--certify]

FLAGS
  -d, --dir=<value>  Project directory [default: .]
  -f, --force        Overwrite existing config
      --certify      Set up ACM certificates per environment

EXAMPLES
  $ kiki init
  $ kiki init --dir ./my-service
  $ kiki init --certify
```

### `kiki deliver`

Main deployment command. Run interactively or target a specific resource type with a flag. Manages Lambda functions, ECS services, RDS databases, S3/CloudFront hosting, and Secrets Manager integration.

```
USAGE
  $ kiki deliver [--lambda] [--ecs] [--rds] [--s3] [--secrets] [--env <value>]

FLAGS
      --lambda         Manage Lambda functions
      --ecs            Manage ECS services
      --rds            Manage RDS databases
      --s3             Manage S3/CloudFront hosting
      --secrets        Manage Secrets Manager secrets
  -e, --env=<value>    Target environment [default: production]

EXAMPLES
  $ kiki deliver
  $ kiki deliver --lambda
  $ kiki deliver --rds --env staging
  $ kiki deliver --secrets
```

### `kiki service`

View running service status, tail logs, or roll back ECS task definitions.

```
USAGE
  $ kiki service [--status] [--logs] [--env <value>]

FLAGS
      --status         Show status of running services
      --logs           Tail service logs
  -e, --env=<value>    Target environment [default: production]
```

### `kiki shell`

Open an interactive shell into an ECS container or tunnel into an RDS database via a bastion Fargate task.

```
USAGE
  $ kiki shell [--ecs] [--rds]

FLAGS
      --ecs    Shell into an ECS container
      --rds    Open a database tunnel via bastion task
```

### `kiki configure`

Set AWS credentials, profile, and SSO. Aliases: `config`, `cfg`.

```
USAGE
  $ kiki configure [--switch <value>] [--sso] [--reset]

FLAGS
      --switch=<value>  Switch to an AWS profile
      --sso             Configure SSO login
      --reset           Reset stored credentials
```

### `kiki destroy`

List and interactively destroy CloudFormation stacks.

```
USAGE
  $ kiki destroy [--region <value>] [--force]

FLAGS
      --region=<value>  AWS region
      --force           Skip confirmation prompts
```

## Configuration

Kiki stores configuration in two places:

- **`~/.kikirc`** — machine-specific, AES-256-GCM encrypted. Holds AWS profile, region, account ID, credentials, SSO config, and the kiki IAM role ARN. Never committed.
- **`infra/kiki.defaults.json`** — project-wide defaults (VPC, region, routing). Safe to commit.
- **`infra/kiki.defaults.<env>.json`** — environment-specific overrides (ARNs, endpoints). Auto-added to `.gitignore` by `kiki init`.

## How it works

1. `kiki init` writes `infra/kiki.defaults.json` and creates a minimum-privilege IAM role in your account.
2. `kiki deliver --<resource>` runs an interactive wizard on first use, then saves the resource config to `kiki.defaults.json`.
3. On deploy, kiki generates a CDK TypeScript app in a temporary `cdk-*/` directory, then runs it inside Docker. No local CDK installation required.
4. All commands are idempotent — re-running them is safe.

## Development

```sh
npm install
npm run build          # compile TypeScript
./bin/dev.js deliver   # run in dev mode
npm run lint           # lint
npm test               # run tests
```

## Adding new commands

Create a new file in `src/commands/`:

```sh
touch src/commands/logs.ts
```

Each command extends `BaseCommand` from `src/lib/baseCommand.ts`, which provides the global `--env` flag and AWS role assumption. See `src/commands/deliver.ts` as a template.

## Demo

See [`demo/`](demo/) for a complete end-to-end example: an RDS PostgreSQL database, a Node 22 Lambda API, and a Vite + React frontend deployed via S3 + CloudFront.

```
React (S3 + CloudFront)
   │  fetch(VITE_API_URL + "/games")
   ▼
API Gateway (HTTP)  →  Lambda  ──Secrets Manager──▶  RDS (postgres)
```

See [demo/README.md](demo/README.md) for the step-by-step run order.

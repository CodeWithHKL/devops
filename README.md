# Haikal App – DevOps Project

A small [Next.js](https://nextjs.org) web app used to demonstrate an end-to-end DevOps workflow: source control, a Jenkins CI/CD pipeline, Docker containerization, and Kubernetes (Minikube) deployment.

Course project for **CSEB5143 – Semester 2 2025/2026**.

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- Docker (multi-stage build, Node 20 Alpine)
- Jenkins (declarative pipeline)
- Kubernetes (Deployment + Service)

## Project Structure

```
app/
  page.tsx            Landing page
  hello/page.tsx      Hello page
  health/page.tsx     Health page
  api/hello/route.ts  GET /api/hello  – simple JSON greeting
  api/health/route.ts GET /api/health – service and system health JSON
Dockerfile            Multi-stage image build
Jenkinsfile           CI/CD pipeline
deployment.yaml       Kubernetes Deployment (2 replicas)
service.yaml          Kubernetes Service (LoadBalancer, port 80 → 3000)
```

## Getting Started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the development server     |
| `npm run build` | Create a production build        |
| `npm start`     | Run the production build         |
| `npm run lint`  | Lint the code with ESLint        |

## Endpoints

| Route          | Description                                                                 |
| -------------- | --------------------------------------------------------------------------- |
| `/`            | Landing page                                                                |
| `/hello`       | Hello page                                                                  |
| `/health`      | Health page                                                                 |
| `/api/hello`   | JSON greeting with timestamp, environment, and process uptime               |
| `/api/health`  | JSON with status, memory/CPU/load info, Node version, uptime, and PID        |

```bash
curl http://localhost:3000/api/health
```

## Docker

Build and run the image locally:

```bash
docker build -t devops:latest .
docker run -d -p 3000:3000 --name devops devops:latest
```

The Dockerfile copies `.next/standalone`, so `next.config.ts` must set `output: "standalone"`.

## CI/CD Pipeline (Jenkins)

The `Jenkinsfile` defines these stages (run on a Windows agent using `bat`):

1. **Checkout** – clone the `main` branch from GitHub
2. **Install & Build** – `npm install && npm run build`
3. **Unit Test** – placeholder health check
4. **Dockerize** – build `devops:<BUILD_ID>` and `devops:latest`
5. **Deploy** – replace the running `devops` container and expose port 3000

The workspace is cleaned after every run.

## Kubernetes (Minikube)

The manifests expect the image `devops:latest` to exist locally (`imagePullPolicy: Never`), so build it against Minikube's Docker daemon first:

```bash
# PowerShell
minikube docker-env | Invoke-Expression
docker build -t devops:latest .

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

minikube service devops-service
```

## Author

HKL

# AdviceHealth-Web - React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR, ESLint rules, and a professional Docker-based deployment.

Currently, two official plugins are available:

* [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
* [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

---

## Docker Setup for Development and Production

### Requirements

* Docker 24+ installed on your machine
* Node.js >= 22 for local development (if not using container)
* npm >= 9

### Dockerfile

```dockerfile
# ---------------- stage 1: Build the app ----------------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --silent

COPY . .

# Build production-ready app
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

# ---------------- stage 2: Serve with Nginx ----------------
FROM nginx:1.25-alpine AS runtime

RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    location / {
        try_files $uri /index.html;
    }

    location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|ttf|svg)$ {
        expires 1y;
        access_log off;
        add_header Cache-Control "public, immutable";
    }
}
```

### .dockerignore

```
node_modules
dist
.git
.gitignore
Dockerfile
docker-compose.yml
.env*
```

## Environment Variables

This project uses `.env` files to manage API base URLs and other environment-specific settings. Two main environments are configured:

### `.env.development`
Used for local development with Vite's dev server:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### `.env.production`
```env
Uncomment and replace with your production API URL when deploying
VITE_API_BASE_URL=https://api.your-domain.com

Local testing with production build
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Build Commands
### Docker Build/Run

* **Build image for development pointing to local backend:**

```bash
docker build -t advicehealth-frontend --build-arg VITE_API_BASE_URL=http://host.docker.internal:8000 .
```

* **Run container mapping port 3000 on host:**

```bash
docker run -d -p 3000:80 --name advicehealth-frontend advicehealth-frontend
```

* **Rebuild after changes:**

```bash
docker rm -f advicehealth-frontend
docker build -t advicehealth-frontend --build-arg VITE_API_BASE_URL=http://host.docker.internal:8000 .
docker run -d -p 3000:80 --name advicehealth-frontend advicehealth-frontend
```

* **Access frontend:** `http://localhost:3000`

### Notes

* Use `host.docker.internal` when the frontend container needs to access a backend running on your host machine.
* For production, set `VITE_API_BASE_URL` to your production API endpoint.
* This setup includes proper caching for static assets via Nginx.
* ESLint and TypeScript configs are production-ready and enforce type-aware linting.

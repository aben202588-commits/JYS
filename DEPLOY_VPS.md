# VPS Deployment Guide (Docker)

This project is configured for easy deployment on any VPS using Docker. It consists of two services:
1.  **Web App**: The Next.js frontend and API.
2.  **Worker**: The OKX Adapter for realtime market data.

## Prerequisites

- A VPS (Ubuntu/Debian recommended)
- Docker and Docker Compose installed on the VPS

## Deployment Steps

1.  **Clone the repository** to your VPS:
    ```bash
    git clone https://github.com/aben202588-commits/JYS.git
    cd JYS
    ```

2.  **Create an environment file**:
    Create a `.env` file in the root directory and fill in your secrets:
    ```bash
    nano .env
    ```
    Content:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key (Optional, for better permission handling)
    ```

3.  **Start the application**:
    Run the following command to build and start the containers in the background:
    ```bash
    docker-compose up -d --build
    ```

4.  **Verify**:
    - Web App: `http://YOUR_VPS_IP:3000`
    - Check Logs: `docker-compose logs -f`

## Updates

To update the application after pushing new code to GitHub:

```bash
git pull
docker-compose up -d --build
```

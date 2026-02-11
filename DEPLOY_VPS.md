# VPS Deployment Guide (Docker)

This project is configured for easy deployment on any VPS using Docker.

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
    ```

3.  **Start the application**:
    Run the following command to build and start the container in the background:
    ```bash
    docker-compose up -d --build
    ```

4.  **Verify**:
    Your app should now be running on `http://YOUR_VPS_IP:3000`.

## Updates

To update the application after pushing new code to GitHub:

```bash
git pull
docker-compose up -d --build
```

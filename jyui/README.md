# JYUI - Trading Platform UI Kit

This folder contains the extracted UI components, layouts, and styles from the trading platform project. It is designed to be a drop-in UI foundation for a new trading portal.

## Directory Structure

- `app/`: Next.js App Router files (layouts, globals.css, page.tsx).
- `components/`: Reusable UI components (Hero, Header, Footer, etc.).
- `context/`: React Context providers (Language, User).
- `hooks/`: Custom hooks (including mock data hooks).
- `lib/`: Utility libraries (translations).
- `public/`: Static assets (images, icons).

## Getting Started

1.  **Initialize a new Next.js project** (if you haven't already):
    ```bash
    npx create-next-app@latest my-trading-app --typescript --tailwind --eslint
    ```

2.  **Copy the contents** of this `jyui` folder into your new project's root directory. You can overwrite existing files like `app/page.tsx` and `app/globals.css`.

3.  **Install Dependencies**:
    Ensure your `package.json` includes the following dependencies (based on the original project):

    ```bash
    npm install lucide-react @iconify/react framer-motion clsx tailwind-merge
    ```
    *(Note: Check `package.json` for exact versions used)*

4.  **Configuration**:
    -   Ensure `tailwind.config.ts` is properly configured (it is included in this kit).
    -   Ensure `next.config.ts` is compatible.

## Features Included

-   **Responsive Layout**: Mobile and Desktop specific views.
-   **Theme System**: Dark mode optimized with custom color variables (`globals.css`).
-   **Animations**: Custom Tailwind animations (wander, pulse, etc.).
-   **Internationalization**: Basic structure via `LanguageContext`.
-   **Components**:
    -   `Hero`: Landing page hero section with video/animation support.
    -   `BannerCards`: Marketing feature cards.
    -   `PlatformStats`: Statistics display.
    -   `StrategySection`: Trading strategy showcase.
    -   `PortfolioSection`: Portfolio management preview.
    -   `NFTSection`: NFT marketplace preview.
    -   `SplashScreen`: Initial loading animation.

## Mocks & Exclusions

-   **Market Data**: Real-time market data components (`MarketList`, `TradingChart`, `MobileTicker`) have been excluded or commented out to ensure the UI kit is standalone.
-   **Hooks**: `useCryptoPrice` is included as a mock implementation in `hooks/` to demonstrate UI functionality without backend connection.

## Usage

You can start editing `app/page.tsx` to compose your new landing page using the provided components.

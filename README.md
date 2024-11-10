# Media Scraper UI

This project is a media scraper UI built with Next.js, React, and TypeScript. It supports both server-side rendering (SSR) and client-side rendering (CSR). The application allows users to search for media, upload URLs to scrape media, and display the scraped media.

## Features

- **Server-Side Rendering (SSR) and Client-Side Rendering (CSR)**: Utilizes Next.js to support both SSR and CSR.
- **Media Search**: Allows users to search for media based on text and media type (image or video).
- **URL Upload**: Users can upload URLs to scrape media.
- **Infinite Scrolling**: Automatically loads more media as the user scrolls down.

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/media-scraper-ui.git
   cd media-scraper-ui
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the development server**:
   ```sh
   npm run dev
   ```

4. **Open the application**:
   Open your browser and navigate to `http://localhost:3000`.

## Scripts

- **`npm run dev`**: Runs the development server.
- **`npm run build`**: Builds the application for production.
- **`npm run start`**: Starts the production server.
- **`npm run lint`**: Lints the codebase.
- **`npm run format`**: Formats the codebase using Prettier.
- **`npm run format:check`**: Checks if the codebase is formatted correctly using Prettier.

## Configuration

The application uses the following environment variables: 
  ```sh
  NEXT_PUBLIC_API_URL=https://api.example.com
  NEXT_PUBLIC_AUTH_USERNAME=example
  NEXT_PUBLIC_AUTH_PASSWORD=example
  ```
## Project Structure

- **`/pages`**: Contains the Next.js pages.
- **`/src`**: Contains the source code.
  - **`/api`**: API actions for fetching and uploading media.
  - **`/components`**: React components.
  - **`/constants`**: Application constants.
- **`/public`**: Public assets.
- **`.prettierrc`**: Prettier configuration.
- **`.eslintrc.json`**: ESLint configuration.
- **`package.json`**: Project dependencies and scripts.



import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        baseURL: 'https://example.com',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },
    reporter: [['html', { outputFolder: 'playwright-report' }], ['json', {}]],
    retries: 2,
    workers: 4 // Run tests in parallel using 4 workers
});
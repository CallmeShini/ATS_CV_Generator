import { test, expect } from '@playwright/test';

test.describe(' ATS CV Generator E2E Tests', () => {
    test('Profile page should contain expected elements', async ({ page }) => {
        // Navigate to profile page
        await page.goto('/profile');

        // Expect title snippet
        await expect(page).toHaveTitle(/ATS Resume Generator/);

        // Header check
        const header = page.locator('h1').first();
        await expect(header).toBeVisible();
        await expect(header).toHaveText(/Master Profile/);
    });

    test('Matcher page should load and display UI', async ({ page }) => {
        await page.goto('/match');

        // Header check
        const title = page.getByRole('heading', { name: /Job Matcher/i });
        await expect(title).toBeVisible();

        // Verify text area is present
        const textArea = page.getByPlaceholder(/Cole aqui a descrição/i);
        await expect(textArea).toBeVisible();

        // Verify submit button is present
        const button = page.getByRole('button', { name: /Analisar & Compatibilizar/i });
        await expect(button).toBeVisible();
    });
});

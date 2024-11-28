import { test } from '@playwright/test';
import { asanaLogin, checkRequest, checkTask, openProject } from '../utils/utils';
import { testData } from './testData'

test.describe('Testing Asana', () => {
  test.beforeEach(async ({ page }) => {
    await asanaLogin({ page });
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  testData.forEach(({ description, project, type, details }) => {
    test(description, async ({ page }) => {
      await openProject({ page }, project);

      if (type === "task") {
        await checkTask(
          { page },
          details.name,
          details.priority,
          details.status,
          details.column
        );
        return;
      }
      if (type === "request") {
        await checkRequest(
          { page },
          details.name,
          details.priorityLevel,
          details.effortLevel,
          details.type,
          details.progress,
          details.column
        );
        return;
      }
    });
  });
});
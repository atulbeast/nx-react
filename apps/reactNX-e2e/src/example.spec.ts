import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/page-2"); // Update with your local URL
});
// test('has title', async ({ page }) => {
//   await page.goto('/');

//   // Expect h1 to contain a substring.
//   const nav=await page.locator('[role="navigation"] [role="navigation"] li:nth-child(2) > a')
//   expect(await nav.innerText()).toContain('Home');
//   expect(await nav.innerText())
// });


test("should add a new task", async ({ page }) => {
  await page.fill("input[placeholder='New task...']", "Test Task1");
  await page.selectOption("select", "High");
  await page.click("button:has-text('Add Task')");

  const task1 = page.locator("text=Test Task1");
  await expect(task1).toBeVisible();

  await page.fill("input[placeholder='New task...']", "Test Task2");
  await page.selectOption("select", "Medium");
  await page.click("button:has-text('Add Task')");

  const task2 = page.locator("text=Test Task2");
  await expect(task2).toBeVisible();

  await page.fill("input[placeholder='New task...']", "Test Task3");
  await page.selectOption("select", "Low");
  await page.click("button:has-text('Add Task')");

  const task3 = page.locator("text=Test Task3");
  await expect(task3).toBeVisible();

  
});

test("should change task status", async ({ page }) => {
  await page.fill("input[placeholder='New task...']", "Task to Update");
  await page.click("button:has-text('Add Task')");

  const taskDropdown = page.locator("select[name='task-status']").first();
  await taskDropdown.selectOption("In Progress");

  await expect(taskDropdown).toHaveValue("In Progress");
});

test("should persist multiple tasks", async ({ page }) => {
  await page.fill("input[placeholder='New task...']", "Task 1");
  await page.click("button:has-text('Add Task')");
  const taskDropdown = page.locator("select[name='task-status']").first();
  await taskDropdown.selectOption("Done");
  await page.fill("input[placeholder='New task...']", "Task 2");
  await page.click("button:has-text('Add Task')");

  await expect(page.locator("text=Task 1")).toBeVisible();
  await expect(taskDropdown).toHaveValue("Done");
  await expect(page.locator("text=Task 2")).toBeVisible();
});

test("should delete a task (if delete feature exists)", async ({ page }) => {
  await page.fill("input[placeholder='New task...']", "Task to Delete");
  await page.click("button:has-text('Add Task')");

  // Simulate Delete button
  const deleteButton = page.locator("button:has-text('Delete')").first();
  if (await deleteButton.isVisible()) {
    await deleteButton.click();
    await expect(page.locator("text=Task to Delete")).not.toBeVisible();
  }
});

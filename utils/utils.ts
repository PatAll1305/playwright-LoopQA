import { expect } from '@playwright/test';


export const asanaLogin = async ({ page }) => {
    await page.goto("https://app.asana.com/-/login")

    const inputField = page.locator('.TextInput').last()
    const loginButton = page.locator('.LoginButton')

    await expect(page.getByLabel('Change email')).toBeAttached({ attached: false })
    await inputField.click()
    await inputField.fill("ben+pose@workwithloop.com")
    await loginButton.click()
    await expect(page.getByLabel('Change email')).toBeAttached()
    await inputField.click()
    await inputField.fill("Password123")
    await loginButton.click()
    await expect(page.locator('.HomePageContent-greeting')).toBeAttached({ timeout: 40000 })
}

/**
 * 
 * @param projectName The name of the project to open 
 */
export const openProject = async ({ page }, projectName: String) => {
    await expect(page.locator('.Sidebar-sectionsSortableList')).toBeAttached()
    await page.getByText(projectName).click()
}


/**
 * 
 * @param taskName The name of the task to check
 * @param priority The expected priority level of the task
 * @param status The expected Status of the task
 * @param column The column the task should be in
 */
export const checkTask = async ({ page }, taskName: String, priority: String, status: String, column: String) => {
    await page.getByText(taskName, { exact: true }).click()
    await page.locator(".DisabledTaskProjectGroupLabel").waitFor({ state: 'attached', timeout: 10000 })

    expect(await page.locator(".DisabledTaskProjectGroupLabel").innerText()).toBe(column)
    expect(await page.getByLabel(`Priority ${priority}`).innerText()).toBe(priority)
    expect(await page.getByLabel(`Status ${status}`).innerText()).toBe(status)
}

/**
 * 
 * @param requestName The name of the task to check
 * @param priorityLevel The expected priority level of the task
 * @param type The expected type of the task
 * @param progress The expected progress of the task
 * @param column The column the task should be in
 */
export const checkRequest = async ({ page }, requestName: String, priorityLevel: String, effortLevel: String, type: String, progress: String, column: String) => {
    await page.getByText(requestName, { exact: true }).click()
    await page.locator(".DisabledTaskProjectGroupLabel").waitFor({ state: 'attached', timeout: 10000 })

    expect(await page.locator(".DisabledTaskProjectGroupLabel").innerText()).toBe(column)
    expect(await page.getByLabel(`Priority level? ${priorityLevel}`).innerText()).toBe(priorityLevel)
    expect(await page.getByLabel(`Effort level? ${effortLevel}`).innerText()).toBe(effortLevel)
    expect(await page.getByLabel(`Type (Work Requests - IT) ${type}`).innerText()).toBe(type)
    expect(await page.getByLabel(`Task Progress ${progress}`).innerText()).toBe(progress)
}
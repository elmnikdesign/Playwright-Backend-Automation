import { test, expect } from '@playwright/test';
import { apiUtils } from '../utils/apiUtils';
import testData from '../utils/testData.json';

test.describe.parallel('User Management API Tests', () => {

    let userId: string;

    test.beforeAll(async () => {
        await apiUtils.initializeApiContext();
    });

    test('Create a new user via API', async () => {
        const response = await apiUtils.createUser(testData.newUser);
        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('id');
        userId = responseBody.id;
    });

    test('Get user details via API', async () => {
        const response = await apiUtils.getUser(userId);
        expect(response.status()).toBe(200);

        const user = await response.json();
        expect(user.name).toBe(testData.newUser.name);
    });

    test('Update user details via API', async () => {
        const response = await apiUtils.updateUser(userId, testData.updatedUser);
        expect(response.status()).toBe(200);

        const updatedUser = await response.json();
        expect(updatedUser.name).toBe(testData.updatedUser.name);
    });

    test('Delete user via API', async () => {
        const response = await apiUtils.deleteUser(userId);
        expect(response.status()).toBe(204);
    });

    test('Verify deleted user does not exist', async () => {
        const response = await apiUtils.getUser(userId);
        expect(response.status()).toBe(404);
    });
});
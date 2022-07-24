require('dotenv').config();
const UserModel = require('../database/models');
const request = require('axios');

const baseURL = `http://${process.env.HOST}:${process.env.PORT}`;

describe("User Stream Checks", () => {
    // Initialization
    test('Initialisation - Set/Reset Test Users in Database', done => {
        UserModel.deleteOne({"name": "user-1"});
        UserModel.deleteOne({"name": "user-2"});
        new UserModel({"user_id": "user_1", "name": "User 1", "max_streams": 3, "current_streams": 2});
        new UserModel({"user_id": "user_2", "name": "User 2", "max_streams": 3, "current_streams": 3});
        done();
    }); 
    // Test: User has not reached stream limit
    test('User can add a stream', async () => {
        const response = await request.get(`${baseURL}/add-stream/user/user-1/`).then(response => {
            return response;
          }).catch(err => {
            console.log("Error Handling - Tests");
          });
        expect(response.status).toBe(200);
        expect(response.data.can_add_stream).toBe(true);
    }); 
    // Test: User has reached stream limit
    test('User has reached stream limit', async () => {
        const response = await request.get(`${baseURL}/add-stream/user/user-2/`).then(response => {
            return response;
          }).catch(err => {
            console.log("Error Handling - Tests");
          });
        expect(response.status).toBe(200);
        expect(response.data.can_add_stream).toBe(false);
    }); 
    // Test: User not found in database
    test('Error while checking', async () => {
        const response = await request.get(`${baseURL}/add-stream/user/user-3/`)
        .then(response => response)
        .catch(err => err.response);
        expect(response.status).toBe(404);
        expect(response.data.can_add_stream).toBe(null);
    }); 
});
import request from "supertest";
import {app} from '../src'

describe('Health', () => {
    const url = '/health'
    test('Success - No params', async () => {
        const res = await request(app).get(url)

        expect(res.status).toBe(200)
        expect(res.body.status).toBeDefined()
        expect(res.body.status).toBe("UP")
        expect(res.body.message).toBeDefined()
        expect(res.body.message).toBe("Service is healthy")
    })
})
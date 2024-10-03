import request from "supertest";
import {app, server} from '../src'

describe('Perenual API Endpoints', () => {
    describe('Species List', () => {
        const url = '/api/species-list'
        test('Success - No params', async () => {
            const res = await request(app).get(url)

            expect(res.status).toBe(200)
            expect(res.body.data).toBeDefined()
            expect(res.body.data.length).toBeGreaterThan(0)
        })
    })

    describe('Species Details', () => {
        test('Success - Valid plant ID', async () => {
            const plantId = 1
            const res = await request(app).get(`/api/species/details/${plantId}`)

            expect(res.status).toBe(200)
            expect(res.body).toBeDefined()
            expect(res.body.id).toBe(plantId)
            expect(res.body.common_name).toBeDefined()
            expect(res.body.scientific_name).toBeDefined()
            expect(res.body.description).toBeDefined()
            expect(res.body.origin).toBeDefined()
            expect(res.body.origin.length).toBeGreaterThan(0)
            expect(res.body.cycle).toBeDefined()
            expect(res.body.propagation).toBeDefined()
            expect(res.body.propagation.length).toBeGreaterThan(0)
            expect(res.body.sunlight).toBeDefined()
            expect(res.body.pruning_month).toBeDefined()
            expect(res.body.pruning_month.length).toBeGreaterThan(0)
            expect(res.body.default_image).toBeDefined()
            expect(res.body.default_image.original_url).toBeDefined()
            expect(res.body.default_image.regular_url).toBeDefined()
            expect(res.body.default_image.small_url).toBeDefined()
            expect(res.body.default_image.thumbnail).toBeDefined()
        })
    })

    afterAll((done) => {
        server.close(done)
    })
})
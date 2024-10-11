import request from "supertest";
import {app, server} from '../src'

afterAll((done) => {
    server.close(done)
})

describe('Index', () => {
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
})

describe('Perenual router', () => {
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
        const url = '/api/species/details'
        test('Success - Valid plant ID', async () => {
            const plantId = 1
            const res = await request(app).get(`${url}/${plantId}`)

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

    describe('Species Care Guide', () => {
        const url = '/api/species-care-guide'
        test('Success - Valid plant ID', async () => {
            const plantId = 1
            const res = await request(app).get(`${url}/${plantId}`)

            expect(res.status).toBe(200)
            expect(res.body).toBeDefined()
            expect(res.body.species_id).toBe(plantId)
            expect(res.body.common_name).toBeDefined()
            expect(res.body.scientific_name).toBeDefined()
            expect(res.body.section).toBeDefined()
            expect(res.body.section.length).toBeGreaterThan(0)
            for (const section of res.body.section) {
                expect(section.id).toBeDefined()
                expect(section.description).toBeDefined()
            }
            expect(res.body.section[0].type).toBe("watering")
            expect(res.body.section[1].type).toBe("sunlight")
            expect(res.body.section[2].type).toBe("pruning")
        })
    })
})

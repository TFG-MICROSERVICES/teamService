import request from 'supertest';
import { expect } from 'chai';
import express from 'express';
import dotenv from 'dotenv';
import teamRoutes from '../routes/teamRoutes.js';
import userTeamRoutes from '../routes/userTeamRoutes.js';
import requestTeamRoutes from '../routes/requestsTeam.js';

dotenv.config();

const app = express();
app.use(express.json());

// Configurar las rutas
app.use('/team', teamRoutes);
app.use('/team/user-team', userTeamRoutes);
app.use('/team/request', requestTeamRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.log("Error in test:", err);
    res.status(err.status || 500).json({
        message: err.message,
    });
});

describe('Team Endpoints', () => {
    let createdTeamId;
    let createdUserTeamId;
    let createdRequestTeamId;

    // Test para crear equipo
    describe('POST /team', () => {
        it('Debería crear un equipo correctamente', async () => {
            const teamData = {
                name: 'Equipo de Prueba',
                description: 'Equipo creado para pruebas',
                sport_id: 1,
                user_id: 1
            };

            const response = await request(app)
                .post('/team')
                .set('x-api-key', process.env.API_GATEWAY_KEY)
                .send(teamData);

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('message');
            expect(response.body).to.have.property('data');
            expect(response.body.message).to.equal('Equipo creado correctamente');
            
            createdTeamId = response.body.data.id;
        });

        it('Debería fallar si faltan campos obligatorios', async () => {
            const teamData = {
                name: 'Equipo de Prueba'
                // Faltan campos obligatorios
            };

            const response = await request(app)
                .post('/team')
                .set('x-api-key', process.env.API_GATEWAY_KEY)
                .send(teamData);

            expect(response.status).to.equal(500);
            expect(response.body).to.have.property('message');
        });
    });

    // Test para obtener equipo
    describe('GET /team/:id', () => {
        it('Debería obtener un equipo por ID correctamente', async () => {
            const response = await request(app)
                .get(`/team/${createdTeamId}`)
                .set('x-api-key', process.env.API_GATEWAY_KEY);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('data');
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('Equipo obtenido correctamente');
            expect(response.body.data).to.have.property('id', createdTeamId);
        });

        it('Debería fallar si el equipo no existe', async () => {
            const response = await request(app)
                .get('/team/99999')
                .set('x-api-key', process.env.API_GATEWAY_KEY);

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('message');
        });
    });

    // Test para crear relación usuario-equipo
    describe('POST /team/user-team', () => {
        it('Debería crear una relación usuario-equipo correctamente', async () => {
            const userTeamData = {
                user_email: 'usuario@test.com',
                team_id: createdTeamId,
                sport_id: 1,
                status: '1'
            };

            const response = await request(app)
                .post('/team/user-team')
                .set('x-api-key', process.env.API_GATEWAY_KEY)
                .send(userTeamData);

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('message');
            expect(response.body).to.have.property('data');
            expect(response.body.message).to.equal('Usuario añadido al equipo correctamente');
            
            createdUserTeamId = response.body.data.id;
        });

        it('Debería fallar si el usuario ya está en el equipo', async () => {
            const userTeamData = {
                user_email: 'usuario@test.com',
                team_id: createdTeamId,
                sport_id: 1,
                status: '1'
            };

            const response = await request(app)
                .post('/team/user-team')
                .set('x-api-key', process.env.API_GATEWAY_KEY)
                .send(userTeamData);

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message');
        });
    });

    // Test para crear solicitud de equipo
    describe('POST /team/request/team', () => {
        it('Debería crear una solicitud de equipo correctamente', async () => {
            const requestTeamData = {
                user_email: 'nuevo@test.com',
                team_id: createdTeamId,
                sport_id: 1,
                status: '0'
            };

            const response = await request(app)
                .post('/team/request/team')
                .set('x-api-key', process.env.API_GATEWAY_KEY)
                .send(requestTeamData);

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('message');
            expect(response.body).to.have.property('data');
            expect(response.body.message).to.equal('Solicitud creada correctamente');
            
            createdRequestTeamId = response.body.data.id;
        });
    });

    // Test para obtener solicitudes de equipo
    describe('GET /team/request/team/:id', () => {
        it('Debería obtener las solicitudes de un equipo correctamente', async () => {
            const response = await request(app)
                .get(`/team/request/team/${createdTeamId}`)
                .set('x-api-key', process.env.API_GATEWAY_KEY);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('data');
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('Solicitudes obtenidas correctamente');
            expect(response.body.data).to.be.an('array');
            expect(response.body.data[0]).to.have.property('team_id', createdTeamId);
        });

        it('Debería fallar si el equipo no existe', async () => {
            const response = await request(app)
                .get('/team/request/team/99999')
                .set('x-api-key', process.env.API_GATEWAY_KEY);

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('message');
        });
    });
});

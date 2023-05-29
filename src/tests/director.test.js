const request = require('supertest');
const app = require('../app');

let directorId

test("POST/ directors debe retornar status 201", async () => {
    const newDirector = {
        firtName: "Cristian",
        lastName: "Alzate",
        nationality: "Argentino",
        image:"http://Cristian.jpg",
        birthday: "1993/12/25",
    }

  const res = await request(app).post("/directors").send(newDirector);
  directorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET/ directors debe retornar status 200", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /directors/:id debe actualizar un director", async () => {
  const newDirector = {
    firtName: "Daniel"
  };
  const res = await request(app).put(`/directors/${directorId}`).send(newDirector);
  expect(res.status).toBe(200);
  expect(res.body.firtName).toBe(newDirector.firtName);
});

test("DELETE/ directors debe eliminar un director", async () => {
  const res = await request(app).delete(`/directors/${directorId}`);
  expect(res.status).toBe(204);
});
const request = require('supertest');
const app = require('../app');

let actorId

test("POST/ actors debe retornar status 201", async () => {
    const newActor = {
        firtName: "Angela",
        lastName: "Smart TV's",
        nationality: "colombiana",
        image:"http://angela.jpg",
        birthday: "1993/12/25",
    }

  const res = await request(app).post("/actors").send(newActor);
  actorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET/ actors debe retornar status 200", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /actors/:id debe actualizar un actor", async () => {
  const newActor = {
    lastName: "Villa"
  };
  const res = await request(app).put(`/actors/${actorId}`).send(newActor);
  expect(res.status).toBe(200);
  expect(res.body.lastName).toBe(newActor.lastName);
});

test("DELETE/ actors debe eliminar un actor", async () => {
  const res = await request(app).delete(`/actors/${actorId}`);
  expect(res.status).toBe(204);
});

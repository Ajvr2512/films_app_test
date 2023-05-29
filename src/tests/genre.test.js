const request = require('supertest');
const app = require('../app');

let genreId

test("POST/ genres debe retornar status 201", async () => {
    const newGenre = {
        name:"Accion"
    }

  const res = await request(app).post("/genres").send(newGenre);
  genreId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET/ genres debe retornar status 200", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /genres/:id debe actualizar un genre", async () => {
  const newGenre = {
    name: "romance"
  };
  const res = await request(app).put(`/genres/${genreId}`).send(newGenre);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(newGenre.name);
});

test("DELETE/ genres debe eliminar un genre", async () => {
  const res = await request(app).delete(`/genres/${genreId}`);
  expect(res.status).toBe(204);
});
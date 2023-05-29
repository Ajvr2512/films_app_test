const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models')

let movieId;

test("POST/ movies debe retornar status 201", async () => {
    const newMovie = {
        name: "Futurama",
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/futurama-team-1534442347.jpg?crop=0.7480519480519481xw:1xh;center,top&resize=1200:*",
        synopsis: "sdakdiadoiaioaoiufoiafsyfu",
        releaseYear: 1992
    }

  const res = await request(app).post("/movies").send(newMovie);
  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET/ movies debe retornar status 200", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].genres).toBeDefined();
  expect(res.body[0].actors).toBeDefined();
  expect(res.body[0].directors).toBeDefined();
});

test("PUT /movies/:id debe actualizar una movie", async () => {
  const newMovie = {
    name: "Rapido y furioso"
  };
  const res = await request(app).put(`/movies/${movieId}`).send(newMovie);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(newMovie.name);
});

test("POST/movies/:id/actors ", async () => {
    const actor = await Actor.create({
        firtName: "Angela",
        lastName: "Villa",
        nationality: "colombiana",
        image:"http://angela.jpg",
        birthday: "1993/12/25",
    });
    const res = await request(app).post(`/movies/${movieId}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
  
  test("POST/movies/:id/directors ", async () => {
    const director = await Director.create({
      firtName: "Cristian",
      lastName: "Alzate",
      nationality: "Argentino",
      image:"http://Cristian.jpg",
      birthday: "1993/12/25",
    });
    const res = await request(app).post(`/movies/${movieId}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  test("POST/movies/:id/genres", async () => {
    const genre = await Genre.create({
        name: "accion"
    });
    const res = await request(app).post(`/movies/${movieId}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });


test("DELETE/ movies debe eliminar una movie", async () => {
  const res = await request(app).delete(`/movies/${movieId}`);
  expect(res.status).toBe(204);
});
const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Movie.belongsToMany(Actor, { through: 'MoviesActors'});
Actor.belongsToMany(Movie, { through: 'MoviesActors'});

Movie.belongsToMany(Director, { through: 'MoviesDirector'});
Director.belongsToMany(Movie, { through: 'MoviesDirector'});

Movie.belongsToMany(Genre, { through: 'MovieGenre'});
Genre.belongsToMany(Movie, { through: 'MovieGenre'});

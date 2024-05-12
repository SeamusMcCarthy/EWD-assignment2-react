import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { ListedMovie } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const UpcomingMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<ListedMovie[]>([]);
  const favourites = movies.filter((m) => m.favourite);
  localStorage.setItem("favourites", JSON.stringify(favourites));

  useEffect(() => {
    getUpcomingMovies().then((movies) => {
      setMovies(movies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie: ListedMovie) => {
        return <AddToFavouritesIcon {...movie} />;
      }}
    />
  );
};
export default UpcomingMoviesPage;

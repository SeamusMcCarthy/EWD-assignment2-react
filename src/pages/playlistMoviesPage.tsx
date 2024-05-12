import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MovieT } from "../types/interfaces";
import { getMovie } from "../api/tmdb-api";
import { useQueries } from "react-query";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter } from "../components/movieFilterUI";
import WriteReview from "../components/cardIcons/writeReview";
import { PlaylistContext } from "../contexts/playlistContext";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

export const genreFiltering = {
  name: "genre",
  value: "0",
  condition: function (movie: MovieT, value: string) {
    // Is user selected genre in this movies's genre list?
    // Always true if selected genre ia All (0).
    const genreId = Number(value);
    const genre_ids = movie.genres.map((g) => g.id);
    return genreId > 0 ? genre_ids.includes(genreId) : true;
  },
};

const PlaylistMoviesPage: React.FC = () => {
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    // [],
    [titleFiltering, genreFiltering]
  );

  const playlistContext = useContext(PlaylistContext);
  const playlistMovieQueries = useQueries(
    playlistContext.entries.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  const isLoading = playlistMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const playlistMovies = playlistMovieQueries.map((q) => q.data);
  const displayMovies = playlistMovies ? filterFunction(playlistMovies) : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PageTemplate
        title="Playlist Movies"
        movies={displayMovies}
        action={(movie) => {
          return (
            <>
              <WriteReview {...movie} />
            </>
          );
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};
export default PlaylistMoviesPage;

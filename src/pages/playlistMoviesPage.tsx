import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { ListedMovie, MovieT, PlaylistEntry } from "../types/interfaces";
import {
  getPlaylistEntries,
  getUpcomingMovies,
  getMovie,
} from "../api/tmdb-api";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useQueries } from "react-query";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter } from "../components/movieFilterUI";
import WriteReview from "../components/cardIcons/writeReview";

const styles = {
  root: {
    padding: "20px",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

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
  const [ids, setIds] = useState<number[]>([]);
  const [movies, setMovies] = useState<ListedMovie[]>([]);

  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );
  const { playlistName } = useParams();
  const context = useAuth();
  useEffect(() => {
    getPlaylistEntries(playlistName!, context.token!).then((entries) => {
      entries.map((e: { movieId: number }) => {
        setIds([...ids, e.movieId]);
      });
    });
  }, []);

  const playlistMovieQueries = useQueries(
    ids.map((movieId) => {
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
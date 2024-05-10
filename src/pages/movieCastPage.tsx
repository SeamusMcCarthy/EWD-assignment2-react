import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MovieCastPageTemplate from "../components/templateMovieCastPage";
// import CastList from "../components/castList";
// import useMovie from "../hooks/useMovie";
import { getMovie } from "../api/tmdb-api";
import { getMovieCast } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { CastMember, MovieT } from "../types/interfaces";
import CastList from "../components/castList";

const MovieCastPage: React.FC = () => {
  const { id } = useParams();

  const [cast, setCast] = useState<CastMember[]>([]);
  useEffect(() => {
    getMovieCast(id!).then((res: CastMember[]) => {
      setCast(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: movie,
    error,
    isLoading,
    isError,
  } = useQuery<MovieT, Error>(["movie", id], () => getMovie(id!));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <MovieCastPageTemplate movie={movie}>
            <CastList cast={cast} />
          </MovieCastPageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieCastPage;

import React from "react";
import PageTemplate from "../components/templatePlaylistPage";
// import { MoviesContext } from "../contexts/moviesContext";
import { useQuery } from "react-query";
import { getPlaylists } from "../api/tmdb-api";
import Spinner from "../components/spinner";

import { Playlist } from "../types/interfaces";

import { useAuth } from "../contexts/authContext";

const PlaylistPage: React.FC = () => {
  const context = useAuth();
  const { data, error, isLoading, isError } = useQuery<Playlist[], Error>(
    "discoverPlaylist",
    () => getPlaylists(context.user, context.token!)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const playlists = data ? data : [];

  return (
    <>
      <PageTemplate title="Playlists" playlists={playlists} />
    </>
  );
};

export default PlaylistPage;

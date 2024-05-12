import React, { useState } from "react";
import { getPlaylistEntries } from "../api/tmdb-api";
import { useAuth } from "./authContext";

// Needed to create this context as the playlist movies page was trying to retrieve the playlist entries and action the
// useQueries before the full list was retrieved. The result of which was that only 1 entry was being shown.
// So instead of having it all done in one place, this context was created and the list of relevant entries is set as soon
// as the playlist is selected in the playlist list page. This makes the list of entries immediately available for use in useQueries
// and we can now see all entries in the playlist

interface PlaylistContextInterface {
  entries: number[];
  updateEntries: (playlistName: string) => void;
}

const initialContextState = {
  entries: [],
  updateEntries: (playlistName: string) => {
    playlistName;
  },
};

export const PlaylistContext =
  React.createContext<PlaylistContextInterface>(initialContextState);

const PlaylistContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  const context = useAuth();
  const [entries, setEntries] = useState<number[]>([]);

  const updateEntries = (playlistName: string) => {
    setEntries([]);
    getPlaylistEntries(playlistName!, context.token!).then((movies) => {
      movies.map((e: { movieId: number }) => {
        setEntries((prevState) => [...prevState, e.movieId]);
      });
    });
  };

  return (
    <PlaylistContext.Provider
      value={{
        entries,
        updateEntries,
      }}
    >
      {props.children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContextProvider;

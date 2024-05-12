import React from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { ListedMovie } from "../../types/interfaces";
import { Link } from "react-router-dom";

const AddToPlaylistIcon: React.FC<ListedMovie> = (movie) => {
  return (
    <Link
      to={"/playlists/entries/add"}
      state={{
        movieId: movie.id,
      }}
    >
      <PlaylistAddIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default AddToPlaylistIcon;

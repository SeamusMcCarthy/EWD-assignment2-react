import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Playlist, PlaylistEntry } from "../types/interfaces";
import styles from "./styles";
import { addPlaylistEntry, getPlaylists } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const AddPlaylistEntryPage: React.FC = (props) => {
  const location = useLocation();
  const { movieId } = location.state;
  const context = useAuth();
  const navigate = useNavigate();
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
  const options = playlists.map((m) => {
    return (
      <MenuItem key={m.playlistName} value={m.playlistName}>
        {m.playlistName}
      </MenuItem>
    );
  });

  const defaultValues = {
    defaultValues: {
      movieId,
      playlistName: "",
    },
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PlaylistEntry>(defaultValues);

  const onSubmit: SubmitHandler<PlaylistEntry> = async (playlistEntry) => {
    await addPlaylistEntry(
      playlistEntry.movieId,
      playlistEntry.playlistName,
      context.token!
    );
    navigate("/");
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Add Movie to Playlist
      </Typography>

      <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="movieId"
          control={control}
          rules={{
            required: "Name is required",
            minLength: { value: 6, message: "User name is too short" },
          }}
          defaultValue={movieId}
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              required
              onChange={onChange}
              value={value}
              id="movieId"
              label="Movie ID"
              disabled
            />
          )}
        />
        <Controller
          name="playlistName"
          control={control}
          rules={{
            required: "Playlist name cannot be empty.",
            minLength: { value: 6, message: "Playlist name is too short" },
            pattern: {
              value: /^\S*$/,
              message: "Playlist name cannot contain spaces",
            },
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              required
              onChange={onChange}
              value={value}
              id="playlistName"
              label="Playlist name"
              select
            >
              {options}
            </TextField>
          )}
        />
        {errors.playlistName && (
          <Typography variant="h6" component="p">
            {errors.playlistName.message}
          </Typography>
        )}

        <Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={styles.submit}
            disabled={errors.playlistName || errors.movieId ? true : false}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddPlaylistEntryPage;

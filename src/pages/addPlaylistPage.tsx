import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Playlist } from "../types/interfaces";
import styles from "./styles";
import { addPlaylist } from "../api/tmdb-api";

const AddPlaylistPage: React.FC = () => {
  const context = useAuth();
  const defaultValues = {
    defaultValues: {
      userName: context.user,
      playlistName: "",
    },
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Playlist>(defaultValues);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Playlist> = async (playlist) => {
    await addPlaylist(playlist.userName, playlist.playlistName, context.token!);
    navigate("/");
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Add Playlist
      </Typography>

      <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="userName"
          control={control}
          rules={{
            required: "Name is required",
            minLength: { value: 6, message: "User name is too short" },
          }}
          defaultValue={context.user}
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              required
              onChange={onChange}
              value={value}
              id="username"
              label="Username"
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
              margin="normal"
              required
              onChange={onChange}
              value={value}
              id="playlistName"
              label="Playlist name"
            />
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
            disabled={errors.playlistName || errors.userName ? true : false}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddPlaylistPage;

import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import { PlaylistPageTemplateProps } from "../../types/interfaces";
import PlaylistList from "../playlistList";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
};

const PlaylistPageTemplate: React.FC<PlaylistPageTemplateProps> = (props) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={props.title} />
      </Grid>
      <Grid item container spacing={5}>
        <PlaylistList playlists={props.playlists}></PlaylistList>
      </Grid>
    </Grid>
  );
};
export default PlaylistPageTemplate;

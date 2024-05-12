import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Playlist } from "../../types/interfaces";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { PlaylistContext } from "../../contexts/playlistContext";

interface PlaylistListProps {
  playlists: Playlist[];
}

const PlaylistList: React.FC<PlaylistListProps> = (props) => {
  const context = useContext(PlaylistContext);
  const styles = {
    card: { maxWidth: 345 },
    media: { height: 500 },
    avatar: {
      backgroundColor: "rgb(255, 0, 0)",
    },
  };

  let playlistCards = props.playlists.map((m) => (
    <Grid key={m.playlistName} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card sx={styles.card}>
        <CardHeader
          title={
            <Typography variant="h5" component="p">
              {m.playlistName}{" "}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="h6" component="p">
            Added by {m.userName}{" "}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Link to={`/playlists/${m.playlistName}`}>
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              onClick={() => {
                context.updateEntries(m.playlistName);
              }}
            >
              More Info ...
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  ));
  return playlistCards;
};

export default PlaylistList;

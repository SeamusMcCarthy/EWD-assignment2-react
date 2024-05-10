import React from "react";
import Grid from "@mui/material/Grid";
import { Playlist } from "../../types/interfaces";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { Link } from "react-router-dom";

interface PlaylistListProps {
  playlists: Playlist[];
}

const PlaylistList: React.FC<PlaylistListProps> = (props) => {
  const styles = {
    card: { maxWidth: 345 },
    media: { height: 500 },
    avatar: {
      backgroundColor: "rgb(255, 0, 0)",
    },
  };

  const playlists = props.playlists;

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
            <Button variant="outlined" size="medium" color="primary">
              More Info ...
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  ));
  // <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
  //   <List
  //     sx={{ margin: "50px 30px", width: "100%", bgcolor: "background.paper" }}
  //   >
  //     {playlists.map((value) => (
  //       <ListItem
  //         sx={{
  //           borderRadius: "6%",
  //           width: "100%",
  //           bgcolor: "background.paper",
  //           margin: "20px",
  //         }}
  //         key={value.playlistName}
  //         disableGutters
  //         secondaryAction={
  //           <IconButton aria-label="comment">
  //             <ZoomInIcon />
  //           </IconButton>
  //         }
  //       >
  //         <ListItemText primary={`${value.playlistName}`} />
  //       </ListItem>
  //     ))}
  //   </List>
  // </Grid>
  // );
  return playlistCards;
};

export default PlaylistList;

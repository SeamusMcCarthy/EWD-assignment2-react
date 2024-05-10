import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import { CastMember } from "../../types/interfaces";

const styles = {
  card: { maxWidth: 345, maxHeight: 750 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface CastCardProps {
  cast: CastMember;
}
const CastCard: React.FC<CastCardProps> = ({ cast }) => {
  // const classes = useStyles();

  return (
    <Card sx={styles.card}>
      <CardHeader
        title={
          <Typography variant="h5" component="p">
            <PersonIcon fontSize="medium" />
            {cast.character}{" "}
          </Typography>
        }
      />

      <CardMedia
        sx={styles.media}
        image={
          cast.profile_path
            ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              {/* <PersonIcon fontSize="medium" /> */}
              Actor: {cast.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {cast.popularity}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      {/* <CardActions>
        <Link to={`/movies/${movieCast.id}/profile`}>
          <Button variant="outlined" size="medium" color="primary">
            Profile
          </Button>
        </Link>
        <Link to={`/movies/${movieCast.id}/disco`}>
          <Button variant="outlined" size="medium" color="primary">
            Discography
          </Button>
        </Link>
      </CardActions> */}
    </Card>
  );
};

export default CastCard;

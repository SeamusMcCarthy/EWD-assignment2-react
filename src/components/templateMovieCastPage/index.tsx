import React from "react";
import MovieHeader from "../headerMovie";
import { MovieT } from "../../types/interfaces";
import { Grid } from "@mui/material";

interface TemplateMoviePageProps {
  movie: MovieT;
  children: React.ReactElement;
}

const MovieCastPageTemplate: React.FC<TemplateMoviePageProps> = (props) => {
  // Remove images as I can't get Grid to behave when showing the cast cards as well.
  //
  //   const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
  //     ["images", props.movie.id],
  //     () => getMovieImages(props.movie.id)
  //   );

  //   if (isLoading) {
  //     return <Spinner />;
  //   }

  //   if (isError) {
  //     return <h1>{error.message}</h1>;
  //   }
  //   const images = data as MovieImage[];

  return (
    <>
      <MovieHeader {...props.movie} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        {/* Remove images as I can't get Grid to behave when showing the cast cards as well.
        <Grid item xs={2}>
          <div>
            <ImageList cols={1}>
              {images.map((image: MovieImage) => (
                <ImageListItem
                  key={image.file_path}
                  sx={styles.gridListTile}
                  cols={1}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={"Image alternative"}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid> */}

        <Grid item container xs={12} spacing={5}>
          {props.children}
        </Grid>
      </Grid>
    </>
  );
};

export default MovieCastPageTemplate;

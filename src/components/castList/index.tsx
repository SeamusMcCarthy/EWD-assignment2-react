import React from "react";
import { Grid } from "@mui/material";
import { CastMember } from "../../types/interfaces";
import CastCard from "../castCard";

interface CastListProps {
  cast: CastMember[];
}
const CastList: React.FC<CastListProps> = (props) => {
  let castCards = props.cast.map((c) => (
    <Grid key={c.id} item container xs={2}>
      <CastCard key={c.id} cast={c} />
    </Grid>
  ));
  return castCards;
};

export default CastList;

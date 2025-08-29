import { Grid } from "@mui/material";
import SmallTile from "./SmallTile";

export default function TileContainer() {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid size={3}>
        <SmallTile
          statistic="3"
          title="Unprocessed consults"
          className="bg-orange-100"
        />
      </Grid>
      <Grid size={3}>
        <SmallTile
          statistic="12"
          title="Accepted consults"
          className="bg-green-100"
        />
      </Grid>
      <Grid size={3}>
        <SmallTile
          statistic="2"
          title="Rejected consults"
          className="bg-red-100"
        />
      </Grid>
      <Grid size={3}>
        <SmallTile
          statistic="17"
          title="Total consults"
          className="bg-gray-100"
        />
      </Grid>
    </Grid>
  );
}

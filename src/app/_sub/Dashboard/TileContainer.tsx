import { Grid } from "@mui/material";
import SmallTile from "./SmallTile";
import {
  Assignment,
  AssignmentInd,
  ThumbDown,
  ThumbUp,
} from "@mui/icons-material";

export default function TileContainer() {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid size={3}>
        <SmallTile
          statistic="3"
          title="Unprocessed consults"
          icon={<AssignmentInd />}
          className="bg-orange-100"
        />
      </Grid>
      <Grid size={3}>
        <SmallTile
          statistic="12"
          title="Accepted consults"
          icon={<ThumbUp />}
          className="bg-green-100"
        />
      </Grid>
      <Grid size={3}>
        <SmallTile
          statistic="2"
          title="Rejected consults"
          icon={<ThumbDown />}
          className="bg-red-100"
        />
      </Grid>
      <Grid size={3}>
        <SmallTile
          statistic="17"
          title="Total consults"
          icon={<Assignment />}
          className="bg-gray-100"
        />
      </Grid>
    </Grid>
  );
}

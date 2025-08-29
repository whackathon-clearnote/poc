import { Grid, Stack } from "@mui/material";
import SmallTile from "./SmallTile";
import {
  Assignment,
  AssignmentInd,
  ThumbDown,
  ThumbUp,
} from "@mui/icons-material";
import PatientTile from "./PatientTile";

export default function TileContainer() {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid size={6}>
        <PatientTile />
      </Grid>
      <Grid size={3}>
        <Stack spacing={2}>
          <SmallTile
            statistic="3"
            title="Unprocessed consults"
            icon={<AssignmentInd />}
            className="bg-orange-100"
          />
          <SmallTile
            statistic="12"
            title="Accepted consults"
            icon={<ThumbUp />}
            className="bg-green-100"
          />
        </Stack>
      </Grid>
      <Grid size={3}>
        <Stack spacing={2}>
          <SmallTile
            statistic="2"
            title="Rejected consults"
            icon={<ThumbDown />}
            className="bg-red-100"
          />
          <SmallTile
            statistic="17"
            title="Total consults"
            icon={<Assignment />}
            className="bg-gray-100"
          />
        </Stack>
      </Grid>
    </Grid>
  );
}

import { Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

const leftInfo = [
  ["IC No.", "SXXXX567F"],
  ["Mobile No.", "9876 5432"],
  ["Sex", "Male"],
  ["Age", "27"],
];
const rightInfo = [
  ["Blood pressure", "120/80 mmHg"],
  ["Glucose (fasting)", "4.7 mmol/L"],
  ["Heart rate (resting)", "63 bpm"],
  ["Temperature", "36.2 °C"],
];

export default function PatientTile() {
  return (
    <Card className="h-full" sx={{ bgcolor: blue[50] }}>
      <CardContent>
        <Typography variant="button">Patient Information</Typography>
        <Typography variant="h3">John Doe</Typography>
        <Grid container spacing={2}>
          <Grid size={6}>
            <div className="flex flex-col gap-1">
              {leftInfo.map((info, i) => (
                <div
                  key={i}
                  className="flex flex-row justify-between items-center"
                >
                  <Typography variant="body1">
                    <b>{info[0]}</b>
                  </Typography>
                  <Chip label={info[1]} />
                </div>
              ))}
            </div>
          </Grid>
          <Grid size={6}>
            <div className="flex flex-col gap-1">
              {rightInfo.map((info, i) => (
                <div
                  key={i}
                  className="flex flex-row justify-between items-center"
                >
                  <Typography variant="body1">
                    <b>{info[0]}</b>
                  </Typography>
                  <Chip label={info[1]} />
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
        {/* <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>
                <b>IC No.</b>
              </TableCell>
              <TableCell align="right">SXXXX567F</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Age</b>
              </TableCell>
              <TableCell align="right">27</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Height</b>
              </TableCell>
              <TableCell align="right">175 cm</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Weight</b>
              </TableCell>
              <TableCell align="right">72 kg</TableCell>
            </TableRow>
          </TableBody>
        </Table> */}
      </CardContent>
    </Card>
  );
}

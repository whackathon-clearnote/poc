import { Consultation } from "@/app/api/patients/[id]/consults/model";
import { Box, Button, Paper, Typography } from "@mui/material";

interface Props {
  selected: Consultation | null;
  setSummaryOpen: (open: boolean) => void;
}

const RightPanel = ({ selected, setSummaryOpen }: Props) => {
  return (
    <Box sx={{ width: "60%", p: 3 }}>
      {selected ? (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">
            Doctor&apos;s Notes for {selected.title}
          </Typography>
          <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => setSummaryOpen(true)}
              sx={{ alignSelf: "flex-end" }}
            >
              Generate Summary
            </Button>
            <Typography variant="body1">{selected.notes}</Typography>
          </Box>
        </Paper>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Select a consultation to view notes
        </Typography>
      )}
    </Box>
  );
};

export default RightPanel;

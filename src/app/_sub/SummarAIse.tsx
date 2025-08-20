import { Box, Dialog, Divider, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Consultation } from "@/app/api/patients/[id]/consults/model";
import { Summary } from "@/app/api/summary/model";
import { mockSummary } from "@/app/lib/mocks";

interface Props {
  selected: Consultation | null;
  summaryOpen: boolean;
  setSummaryOpen: (open: boolean) => void;
}

const SummarAIseDialog = ({ selected, summaryOpen, setSummaryOpen }: Props) => {
  if (!selected) {
    return null; // Don't render dialog if no consultation is selected
  }

  const summary: Summary = mockSummary;

  return (
    <Dialog fullScreen open={summaryOpen} onClose={() => setSummaryOpen(false)}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header - Fixed */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid #ccc",
            flexShrink: 0,
          }}
        >
          <Typography variant="h5">SummarAIser</Typography>
          <IconButton onClick={() => setSummaryOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Scrollable Content */}
        <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
          {/* Summary Section - 40% */}
          <Box
            sx={{
              width: "40%",
              p: 3,
              overflowY: "auto",
              borderRight: "1px solid #ccc",
            }}
          >
            <Typography variant="h5">Summary</Typography>
            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1">Start</Typography>
            <ul>
              <li>Metformin 500mg daily</li>
              <li>Amlodipine 10mg daily</li>
            </ul>

            <Typography variant="subtitle1">Change</Typography>
            <ul>
              <li>Increase Furosemide from 20mg → 40mg</li>
            </ul>

            <Typography variant="subtitle1">Stop</Typography>
            <ul>
              <li>Aspirin 75mg</li>
            </ul>
          </Box>

          {/* Notes Section - 60% */}
          <Box sx={{ width: "60%", p: 3, overflowY: "auto" }}>
            <Typography variant="h5">
              Doctor's notes for {selected.title}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {selected?.notes}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default SummarAIseDialog;

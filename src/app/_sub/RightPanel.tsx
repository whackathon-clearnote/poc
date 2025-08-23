import { Consultation } from "@/app/api/patients/[id]/consults/model";
import { Box, Button, Paper, Typography } from "@mui/material";
import { motion } from "motion/react";
import { useState } from "react";

interface Props {
  selected: Consultation | null;
  setSummaryOpen: (open: boolean) => void;
}

const RightPanel = ({ selected, setSummaryOpen }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setSummaryOpen(true);
      setLoading(false);
    }, 200);
  };

  return (
    <Box sx={{ width: "60%", p: 2 }}>
      {selected ? (
        <motion.div
          key={selected.id}
          layout
          layoutId="dialog-panel"
          initial={{ opacity: 0, filter: "blur(16px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(16px)" }}
        >
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">
              Doctor&apos;s Notes for {selected.title}
            </Typography>
            <Box
              sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Button
                color="inherit"
                variant="outlined"
                loading={loading}
                onClick={handleGenerate}
                sx={{ alignSelf: "flex-end" }}
              >
                Generate Summary
              </Button>
              <Typography variant="body1">{selected.notes}</Typography>
            </Box>
          </Paper>
        </motion.div>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Select a consultation to view notes
        </Typography>
      )}
    </Box>
  );
};

export default RightPanel;

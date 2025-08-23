import { Consultation } from "@/app/api/patients/[id]/consults/model";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
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

  const variants = {
    gone: { opacity: 0, transform: "translateY(-100%)" },
    show: {
      opacity: 1,
      transform: "translateY(0%)",
      transition: { delay: 0.6 },
    },
  };

  return (
    <Box sx={{ width: "60%", p: 2, overflowY: "auto" }}>
      <AnimatePresence>
        {selected ? (
          <motion.div
            key={selected.id}
            layout
            layoutId="dialog-panel"
            variants={variants}
            initial="gone"
            animate="show"
            exit="gone"
          >
            <Paper sx={{ p: 2 }}>
              <div className="flex flex-row justify-between items-center">
                <Typography variant="h6">
                  Doctor&apos;s Notes for {selected.title}
                </Typography>
                <Button
                  color="inherit"
                  variant="outlined"
                  loading={loading}
                  onClick={handleGenerate}
                  sx={{ alignSelf: "flex-end" }}
                >
                  Generate Summary
                </Button>
              </div>
              <Divider className="py-1" />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                  {selected.notes}
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        ) : (
          <Typography variant="body1" color="text.secondary">
            Select a consultation to view notes
          </Typography>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default RightPanel;

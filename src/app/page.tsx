"use client";

import { useState } from "react";
import { AppBar, Box, Divider, Toolbar } from "@mui/material";
import { Consultation } from "@/app/api/patients/[id]/consults/model";
import LeftPanel from "./_sub/LeftPanel";
import RightPanel from "./_sub/RightPanel";
import SummarAIseDialog from "./_sub/SummarAIse";

export default function Dashboard() {
  const [selected, setSelected] = useState<Consultation | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* spacer for the actual navbar */}
      <AppBar position="static">
        <Toolbar />
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <LeftPanel selected={selected} setSelected={setSelected} />
        <Divider orientation="vertical" />
        <RightPanel selected={selected} setSummaryOpen={setSummaryOpen} />
      </Box>

      <SummarAIseDialog
        selected={selected}
        summaryOpen={summaryOpen}
        setSummaryOpen={setSummaryOpen}
      />
    </Box>
  );
}

"use client";

import { AppBar, Toolbar, Typography } from "@mui/material";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <AppBar position="absolute" sx={{ bgcolor: "darkred" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {pathname === "/mobile"
            ? "Mobile App Mockup (Patient & Caregiver's POV)"
            : "Epic Systems Simulation (Pharmacist's POV)"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

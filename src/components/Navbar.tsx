import { AppBar, Toolbar, Typography } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="absolute" sx={{ bgcolor: "darkred" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Epic Systems Simulation (Pharmacist&apos;s POV)
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

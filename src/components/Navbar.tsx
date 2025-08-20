import { AppBar, Toolbar, Typography } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "darkred" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ClearNote POC
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

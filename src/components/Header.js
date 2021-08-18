import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

function Header() {
  return (
    <AppBar position="sticky" elevation={3} style={{ height: "12vh" }}>
      <Toolbar>
        <Typography variant="h3">QuickieApps</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

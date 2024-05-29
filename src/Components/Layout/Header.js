import { Avatar, IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="py-7 w-full bg-colorWhite">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <h2 className="text-2xl font-normal uppercase cursor-pointer text-colorPrimary">
              <span className="text-4xl">L</span>egaleey
            </h2>
          </Link>
        </div>

        <div className="flex items-center">
          <IconButton sx={{ p: 0 }}>
            <Avatar alt="Legaleey" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </div>
      </div>
    </header>
  );
};

export default Header;

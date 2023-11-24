"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Renders the navigation bar component. It retrieves the pathname from the usePathname hook via which we render different links.
 *
 * @return {JSX.Element} The navigation bar component.
 */
export default function NavBar() {
  const pathname = usePathname();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React Assignment
          </Typography>
          {pathname !== "/roles" && (
            <Link href="/roles" passHref>
              <Button
                sx={{
                  color: "white",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Roles
              </Button>
            </Link>
          )}
          {pathname !== "/users" && (
            <Link href="/users" passHref>
              <Button
                sx={{
                  color: "white",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Users
              </Button>
            </Link>
          )}
          {pathname !== "/" && (
            <Link href="/" passHref>
              <Button
                sx={{
                  color: "white",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Home
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

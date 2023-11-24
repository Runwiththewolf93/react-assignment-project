"use client";

import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import { RolesContext } from "../../app/context/RolesContext";
import { useRouter } from "next/navigation";

/**
 * Renders a table that displays roles and their descriptions.
 *
 * @return {JSX.Element} The rendered table component.
 */
export default function RolesTable() {
  const { roles, loading } = useContext(RolesContext);
  const router = useRouter();

  /**
   * The function `navigateToRolesForm` uses the `router` object to navigate to the "/roles/form" route.
   */
  const navigateToRolesForm = () => {
    router.push("/roles/form");
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={navigateToRolesForm}
        style={{ marginBottom: "1rem" }}
      >
        Add / Update Role
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Role Name
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Short Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={1} style={{ textAlign: "center" }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              roles.map(role => (
                <TableRow key={role.name}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

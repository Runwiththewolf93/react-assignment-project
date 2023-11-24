"use client";

import { useState, useContext } from "react";
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
  TablePagination,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { UsersContext } from "../../app/context/UsersContext";

/**
 * The UsersTable component renders a table of users.
 * It retrieves the users, loading state, error state, and setError function from the UsersContext.
 * It also uses the router object to navigate to the "/users/form" route.
 * The component handles pagination, rows per page, and error alerts.
 *
 * @return {JSX.Element} The rendered table of users.
 */
export default function UsersTable() {
  const { users, loading, error, setError } = useContext(UsersContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const router = useRouter();

  /**
   * The function `navigateToUsersForm` uses the `router` object to navigate to the "/users/form"
   * route.
   */
  const navigateToUsersForm = () => {
    router.push("/users/form");
  };

  /**
   * The function `handlePageChange` updates the current page to the new page selected by the user.
   * @param event - The event parameter represents the event that triggered the page change.
   * @param newPage - The newPage parameter represents the new page number or value that the user wants
   * to navigate to.
   */
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * The handleChangeRowsPerPage function updates the number of rows per page and resets the current
   * page to 0.
   */
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /**
   * The function handleCloseAlert sets the error variable to null.
   */
  const handleCloseAlert = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <Alert
          severity="error"
          style={{ marginBottom: "1rem" }}
          onClose={handleCloseAlert}
        >
          {error}
        </Alert>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={navigateToUsersForm}
        style={{ marginBottom: "1rem" }}
      >
        Add / Update User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                First Name
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Last Name
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Role name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} style={{ textAlign: "center" }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.roleName}</TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}

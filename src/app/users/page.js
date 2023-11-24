import NavBar from "../../components/shared/Navigation";
import { Box } from "@mui/material";
import UsersTable from "../../components/users/UsersTable";

/**
 * Renders the UsersPage component.
 *
 * @return {ReactNode} The UsersPage component.
 */
export default function UsersPage() {
  return (
    <>
      <NavBar />
      <Box mx={3}>
        <h1>Users</h1>
        <UsersTable />
      </Box>
    </>
  );
}

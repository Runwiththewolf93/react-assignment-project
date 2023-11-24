import NavBar from "../../components/shared/Navigation";
import RolesTable from "../../components/roles/RolesTable";
import { Box } from "@mui/material";

/**
 * Renders the RolesPage component.
 *
 * @return {ReactElement} The rendered RolesPage component.
 */
export default function RolesPage() {
  return (
    <>
      <NavBar />
      <Box mx={3}>
        <h1>Roles</h1>
        <RolesTable />
      </Box>
    </>
  );
}

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NavBar from "../components/shared/Navigation";

/**
 * Renders the home page component.
 *
 * @return {ReactNode} The rendered home page component.
 */
export default function HomePage() {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome dear customer
        </Typography>
      </Box>
    </>
  );
}

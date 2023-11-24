import CssBaseline from "@mui/material/CssBaseline";
import { RolesProvider } from "./context/RolesProvider";
import { UsersProvider } from "./context/UsersProvider";

export const metadata = {
  title: "react-assignment-task",
  description: "react-assignment-task",
};

/**
 * Renders the root layout for the application.
 *
 * @param {Object} children - The child components to render.
 * @return {JSX.Element} The root layout component.
 */
export default function RootLayout({ children }) {
  return (
    <RolesProvider>
      <UsersProvider>
        <CssBaseline />
        <html lang="en">
          <body>{children}</body>
        </html>
      </UsersProvider>
    </RolesProvider>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { RolesContext } from "../../context/RolesContext";

/**
 * The RolesForm component is responsible for rendering a form for managing roles. It allows users
 * to add new roles or update existing ones. The component uses the RolesContext to access the
 * necessary data and functions for managing roles.
 *
 * @returns {ReactNode} The rendered form component.
 */
export default function RolesForm() {
  const { addRole, updateRole, roles, loading } = useContext(RolesContext);
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  /**
   * The function "validate" checks if a role name is between 2-16 characters long and if a description
   * is between 2-50 characters long, returning true if both conditions are met and false otherwise.
   * @returns The function `validate` is returning a boolean value indicating whether the input is valid
   * or not.
   */
  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!roleName.match(/^[A-Za-z0-9_]{2,16}$/)) {
      errors.name = "Role name is required and must be 2-16 characters long.";
      isValid = false;
    }

    if (description.length > 50 || description.length < 2) {
      errors.description =
        "Description must be more than 2 and less than 50 characters";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  /**
   * The handleSubmit function handles form submission by either updating an existing role or adding a
   * new role.
   * @returns The function does not explicitly return anything.
   */
  const handleSubmit = event => {
    event.preventDefault();
    if (!validate()) return;

    const existingRole = roles.find(role => role.name === roleName);
    if (existingRole) {
      const updatedRole = { ...existingRole, description };
      updateRole(updatedRole);
    } else {
      const newRole = { name: roleName, description };
      addRole(newRole);
    }

    setRoleName("");
    setDescription("");

    router.push("/roles");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Roles Management
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Role Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={roleName}
            onChange={e => setRoleName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            id="description"
            autoComplete="description"
            multiline
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Add Role"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

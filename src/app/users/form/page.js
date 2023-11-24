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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { UsersContext } from "../../context/UsersContext";

/**
 * The function `UsersForm` is a React component that renders a form for adding or updating users.
 *
 * @returns {JSX.Element} The function `UsersForm` returns a JSX element representing the user form.
 */
export default function UsersForm() {
  const { addUser, updateUser, users, loading } = useContext(UsersContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [roleName, setRoleName] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  /**
   * The function `validate` checks if the input values for first name, last name, email, and role name
   * are valid and returns true if they are, otherwise it returns false and sets the corresponding error
   * messages.
   * @returns The function `validate` is returning a boolean value `isValid`.
   */
  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!firstName.match(/^[A-Za-z]{2,20}$/)) {
      errors.name =
        "First name is required and must be between 2-20 alphabetic characters.";
      isValid = false;
    }

    if (!lastName.match(/^[A-Za-z]{2,20}$/)) {
      errors.lastName =
        "Last name is required and must be between 2-20 alphabetic characters.";
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is required and must be valid";
      isValid = false;
    }

    if (!roleName) {
      errors.roleName = "Role name is required.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  /**
   * The handleSubmit function is used to handle form submission, validate the form inputs, check if the
   * user already exists or matches an existing user, update or add the user accordingly, reset the form
   * inputs, and navigate to the users page.
   * @returns The function `handleSubmit` is not returning anything. It is performing some operations
   * and then updating the state variables `firstName`, `lastName`, `email`, and `roleName` to empty
   * strings. Finally, it is navigating to the "/users" route using `router.push("/users")`.
   */
  const handleSubmit = event => {
    event.preventDefault();
    if (!validate()) return;

    // Users in json don't have an email field
    const existingUser = users.find(user => user.email === email);

    // Since the new user doesn't have an assigned id at this point, this is the best check I could come up with
    const userMatch =
      !existingUser &&
      users.find(
        user =>
          user.firstName === firstName &&
          user.lastName === lastName &&
          user.roleName === roleName
      );

    if (existingUser || userMatch) {
      const updatedUser = { ...existingUser, firstName, lastName, roleName };
      updateUser(updatedUser);
    } else {
      const newUser = { firstName, lastName, email, roleName };
      addUser(newUser);
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setRoleName("");

    router.push("/users");
  };

  /**
   * The function `getUniqueRoles` takes an array of users and returns an array of unique role names.
   * @returns The function `getUniqueRoles` returns an array containing unique role names from the
   * `users` array.
   */
  const getUniqueRoles = users => {
    const roleSet = new Set();
    users.forEach(user => roleSet.add(user.roleName));
    return Array.from(roleSet);
  };
  const uniqueRoles = getUniqueRoles(users);

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
          Users Management
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            autoFocus
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <FormControl fullWidth margin="normal" required variant="outlined">
            <InputLabel id="role-label">Role Name</InputLabel>
            <Select
              labelId="role-label"
              id="roleName"
              value={roleName}
              onChange={e => setRoleName(e.target.value)}
              label="Role Name"
            >
              {uniqueRoles?.map(role => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
            {!!errors.roleName && (
              <FormHelperText>{errors.roleName}</FormHelperText>
            )}
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Add / Update User"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

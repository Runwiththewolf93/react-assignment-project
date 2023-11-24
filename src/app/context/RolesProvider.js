"use client";

import { useState, useEffect } from "react";
import { fetchRoles } from "../../app/api/roles/simulatedRoles";
import { RolesContext } from "./RolesContext";

/**
 * The `RolesProvider` function is a React component that provides a context for managing roles.
 *
 * @param {Object} children - The child components wrapped by the `RolesProvider`.
 * @return {JSX.Element} The JSX element representing the `RolesProvider` component.
 */
export const RolesProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* The code `fetchRoles().then(fetchedRoles => {...})` is making an asynchronous call to fetch
    roles from an API. Once the roles are fetched, the code inside the `then` block is executed. */
    fetchRoles().then(fetchedRoles => {
      const sortedRoles = fetchedRoles.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setRoles(sortedRoles);
      setLoading(false);
    });
  }, []);

  /**
   * The `addRole` function adds a new role to an array of roles, assigns it a unique ID, and sorts the
   * array alphabetically by role name.
   */
  const addRole = newRole => {
    setRoles(prevRoles => {
      const newRoleId = prevRoles.length + 1;
      const roleWithId = { ...newRole, id: newRoleId };
      return [...prevRoles, roleWithId].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    });
  };

  /**
   * The function `updateRole` updates a role in an array of roles and sorts the array alphabetically by
   * role name.
   */
  const updateRole = updateRole => {
    setRoles(prevRoles =>
      prevRoles
        .map(role => (role.id === updateRole.id ? updateRole : role))
        .sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  return (
    <RolesContext.Provider value={{ roles, addRole, updateRole, loading }}>
      {children}
    </RolesContext.Provider>
  );
};

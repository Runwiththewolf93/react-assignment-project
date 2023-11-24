"use client";

import { useState, useEffect } from "react";
import { UsersContext } from "./UsersContext";

/**
 * The `UsersProvider` component is responsible for fetching a list of users from an API, sorting them based on their creation date in descending order, and managing the state of the users array. It also provides functions for adding and updating users in the array. The component wraps its children with a `UsersContext.Provider` to make the state and functions available to all descendants.
 *
 * @param {object} children - The children components to be wrapped by the `UsersContext.Provider`.
 * @return {JSX.Element} The component JSX.
 */
export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * The function fetches a list of users from an API, sorts them based on their creation date in
     * descending order, and sets the sorted users in state.
     */
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        const sortedUsers = data.users.sort(
          (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
        );
        setUsers(sortedUsers);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /**
   * The `addUser` function adds a new user to the `users` array, sorts the array based on creation
   * date, and handles an error if it occurs during the process.
   */
  const addUser = newUser => {
    const prevState = users;

    setUsers(prevUsers => {
      const newUserId = prevUsers.length + 1;
      const userWithId = {
        ...newUser,
        id: newUserId,
        creationDate: new Date().toISOString(),
      };

      return [userWithId, ...prevUsers].sort(
        (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
      );
    });

    // Simulate an error for optimistic update
    setTimeout(() => {
      const errorOccurred = Math.random() < 0.5;
      if (errorOccurred) {
        setError("An error occurred while adding the user");
        // Revert state to previous state
        setUsers(prevState);
      }
    }, 2000);
  };

  /**
   * The function `updateUser` updates a user in the `users` array, sorts the array based on creation
   * date, and simulates an error for optimistic update.
   */
  const updateUser = updatedUser => {
    const prevState = users;

    setUsers(prevUsers =>
      prevUsers
        .map(user => (user.id === updatedUser.id ? updatedUser : user))
        .sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
    );

    // Simulate an error for optimistic update
    setTimeout(() => {
      const errorOccurred = Math.random() < 0.5;
      if (errorOccurred) {
        setError("An error occurred while updating the user");
        // Revert state to previous state
        setUsers(prevState);
      }
    }, 2000);
  };

  return (
    <UsersContext.Provider
      value={{ loading, users, error, addUser, updateUser, setError }}
    >
      {children}
    </UsersContext.Provider>
  );
};

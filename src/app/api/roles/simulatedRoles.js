const initialRoles = [
  { id: 1, name: "Admin", description: "Administrator role" },
  {
    id: 2,
    name: "Editor",
    description: "Editor role with limited permissions",
  },
  {
    id: 3,
    name: "Viewer",
    description: "Viewer role with read-only permissions",
  },
];

/**
 * Fetches roles using a promise that resolves after a delay of 2 seconds.
 *
 * @return {Promise} A promise that resolves to the initial roles.
 */
export const fetchRoles = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(initialRoles);
    }, 2000);
  });
};

// roles
[
  {
    Name: "Moderator",
    Description:
      "Responsible for overseeing forum discussions and ensuring community guidelines are followed.",
  },
  {
    Name: "Contributor",
    Description: "Can submit content for review but cannot publish directly.",
  },
  {
    Name: "Support",
    Description:
      "Handles user queries and provides assistance with product-related issues.",
  },
  {
    Name: "Developer",
    Description: "Involved in software development and maintenance tasks.",
  },
  {
    Name: "QA",
    Description:
      "Ensures the quality of the product through rigorous testing and feedback.",
  },
  {
    Name: "Guest",
    Description: "Has limited access, primarily for viewing public content.",
  },
  {
    Name: "Marketing",
    Description: "Focuses on marketing strategies and user engagement.",
  },
  {
    Name: "HR",
    Description: "Manages human resources and employee-related functions.",
  },
];

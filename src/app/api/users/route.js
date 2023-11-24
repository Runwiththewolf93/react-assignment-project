import { NextResponse } from "next/server";
import usersData from "./users.json";

/**
 * A route designed to mimic a fetch of users from a db
 *
 * @param {Object} req - The request object
 * @return {Promise} A promise that resolves with the response
 */
export async function GET(req) {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (!usersData) {
      throw new Error("Failed to fetch users");
    }

    return NextResponse.json({ users: usersData });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

import * as AuthAdapter from '../adapters/authAdapter.js';

export const registerStudent = async (studentProfile) => {
    if (
        !studentProfile.firstName ||
        !studentProfile.lastName ||
        !studentProfile.dob ||
        !studentProfile.course ||
        !studentProfile.major ||
        !studentProfile.status
    ) {
        throw new Error("All fields are required");
    }

    return await AuthAdapter.create(studentProfile);
}
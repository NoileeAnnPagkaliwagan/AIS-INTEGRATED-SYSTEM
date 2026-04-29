import * as ProfileAdapter from "../adapters/profileAdapter.js";

export const createStudent = async (data) => {
    if(!data.firstName || !data.lastName) throw new Error("Name is required");
    return await ProfileAdapter.create(data);
};

export const getStudentProfile = async (id) => {
    if (!id || id.trim() === '') {
        throw new Error("Student id is required for retrieval.");
    }

    return await ProfileAdapter.getById(id);
};

export const listAllStudents = async () => {
    return await ProfileAdapter.getAll();
};
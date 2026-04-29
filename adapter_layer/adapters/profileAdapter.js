export const create = async (profile) => {
    const transformedProfile = {
        name: profile.firstName + " " + profile.lastName,
        birthdate: profile.dob,
        program: profile.course + " " + profile.major,
        address: profile.address,
        studentStatus: profile.status
    }

    const response = await fetch(
        'https://ais-simulated-legacy.onrender.com/api/students', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transformedProfile)
    });

    return await response.json();
};

export const getById = async (id) => {
    const response = await fetch(`https://ais-simulated-legacy.onrender.com/api/students/${id}`);
    
    if (!response.ok) {
        throw new Error("Failed to fetch data from legacy system.");
    }

    const legacyData = await response.json();

    const nameParts = legacyData.name.split(" ");
    const programParts = legacyData.program.split(" ");

    return {
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(" "),
        address: legacyData.address,
        dob: legacyData.birthdate,
        course: programParts[0],
        major: programParts.slice(1).join(" "),
        status: legacyData.studentStatus
    };
};


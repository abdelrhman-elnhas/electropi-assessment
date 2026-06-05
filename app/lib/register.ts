export async function registerUser(data: {
    name: string;
    email: string;
    password: string;
}) {
    const res = await fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            avatar: "https://i.pravatar.cc/150",
        }),
    });

    const result = await res.json();
    console.log({
        email: data.email,
        password: data.password,
    });

    if (!res.ok) {
        throw new Error(result?.message || "Registration failed");
    }

    return result;
}
// http://127.0.0.1:8000/api/v1/auth/login

/*

{
	"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE3NDE0NDE2ODUsImV4cCI6MTc0MTQ0NTI4NSwibmJmIjoxNzQxNDQxNjg1LCJqdGkiOiJrZHJ4bzQ3OEtmdkE5Z0M4Iiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ._T9LJjD3Eh9S0XL08sXJji20f7uQVnK1B0J8PA6By8w",
	"token_type": "bearer",
	"expires_in": 3600,
	"user": {
		"id": 1,
		"name": "Admin",
		"email": "admin@admin.com",
		"roles": [],
		"permissions": []
	}
}

*/

export const getUsuarioAuth = async (email, password) => {
    if (!email || !password) throw new Error("El email y password son requeridos");

    const res = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    return await res.json();

};

export const logoutAuth = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/v1/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    );
}
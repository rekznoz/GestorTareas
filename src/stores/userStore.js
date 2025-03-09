import {defineStore, mapState} from "pinia";
import {logoutAuth} from "@/helper/getUsuarioAuth.js";

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

const userStore = defineStore('userStore', {
        state: () => ({
            user: {},
            isLoggedIn: false
        }),

        actions: {
            login(user) {
                this.isLoggedIn = true
                this.user = user
            },
            logout() {
                /*
                logoutAuth().then(r => {
                        this.isLoggedIn = false
                        this.user = {}
                    }
                )
                */
                this.isLoggedIn = false
                this.user = {}
            },
        },

        persist: [
            {
                key: 'userStore',
                storage: localStorage
            }
        ]

    }
)

export default userStore;
import { createAuthClient } from 'better-auth/react';
export const authClient = createAuthClient({
	baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/auth`, // the base url of your auth server
});

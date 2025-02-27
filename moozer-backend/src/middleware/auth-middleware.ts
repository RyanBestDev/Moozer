import { Session, User } from 'better-auth/types';
import { auth } from '../handlers/auth';
import { Context } from 'elysia';

export const userMiddleware = async (request: Request) => {
	const session = await auth.api.getSession({ headers: request.headers });

	if (!session) {
		return {
			user: null,
			session: null,
		};
	}

	return {
		user: session.user,
		session: session.session,
	};
};

export const userInfo = (user: User | null, session: Session | null) => {
	return {
		user: user,
		session: session,
	};
};

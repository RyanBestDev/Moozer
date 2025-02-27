import { Elysia, Context } from 'elysia';
import { PrismaClient, User } from '@prisma/client';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { betterAuth } from 'better-auth';
import 'dotenv/config';

const prisma = new PrismaClient();

export const auth = betterAuth({
	secret: process.env.BETTER_AUTH_SECRET,
	database: prismaAdapter(prisma, {
		provider: 'mongodb',
	}),
	emailAndPassword: {
		enabled: true,
	},
	advanced: {
		defaultCookieAttributes: {
			sameSite: process.env.DEV ? undefined : 'strict',
			secure: process.env.DEV ? false : true, //production
			path: '/',
			domain: process.env.DEV ? '' : 'moozer.us',
			httpOnly: false, // used as a temp -- if real website, use true
		},
	},
	baseURL: 'http://localhost:3000',
	basePath: '/api/auth',
	trustedOrigins: [
		//
		'http://localhost:3000/api/auth',
		'http://localhost:3000',
		'http://localhost:3000',
		'http://localhost:5173',
	],
});

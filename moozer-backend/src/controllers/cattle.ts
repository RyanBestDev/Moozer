import { Context } from 'elysia';
import { User, Session } from 'better-auth/types';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

interface AuthPayload extends Context {
	user: User; // or whatever type your user is
	session: Session;
}

const createCattleSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	breed: z.string().min(1, 'Breed is required'),
	weight: z.number().positive('Weight must be a positive number'),
	age: z.number().nonnegative('Age must be non-negative'),
	gender: z.enum(['male', 'female', 'unknown', '']),
	description: z.string().min(1, 'Description is required'),
});

const cattleDataSchema = z.array(z.string());

const updateCattleSchema = z
	.object({
		cattleId: z.string({
			required_error: 'Cattle ID is required',
			invalid_type_error: 'Cattle ID must be a string',
		}),
	})
	.merge(createCattleSchema.partial()) // make all create fields optional
	.refine(
		(data) => {
			const { cattleId, ...updateFields } = data;
			return Object.keys(updateFields).length > 0;
		},
		{
			message: 'At least one field must be provided for update',
		}
	);

export const createCattle = async ({ user, session, body, set }: AuthPayload) => {
	if (!user || !session) {
		set.status = 401;
		return {
			error: 'Unauthorized',
		};
	}
	const parsed = createCattleSchema.safeParse(body);
	if (!parsed.success) {
		const error = parsed.error.issues[0].message;
		set.status = 400;
		return {
			error,
		};
	}

	const { name, breed, weight, age, gender, description } = parsed.data;
	if (!name || !breed || !weight || !age || !gender || !description) {
		set.status = 400;
		return {
			error: 'All fields are required',
		};
	}

	try {
		await prisma.user.update({
			where: { id: user.id },
			data: {
				cattle: {
					create: {
						name,
						breed,
						weight,
						age,
						gender,
						description,
					},
				},
			},
		});

		return {
			message: 'Cattle created successfully',
		};
	} catch (error) {
		set.status = 500;
		return {
			error: 'Error creating cattle: ' + error,
		};
	}
};

export const cattle = async ({ user, session, body, set }: AuthPayload) => {
	if (!user || !session) {
		set.status = 401;
		return {
			error: 'Unauthorized',
		};
	}

	const cattle = await prisma.cattle.findMany({
		where: {
			userId: user.id,
		},
	});

	if (!cattle) {
		set.status = 404;
		return {
			error: 'No cattle found',
		};
	}

	const filteredCattle = cattle.map((cattle) => {
		return {
			id: cattle.id,
			name: cattle.name,
			breed: cattle.breed,
			weight: cattle.weight,
			age: cattle.age,
			gender: cattle.gender,
		};
	});

	return {
		message: 'Cattle retrieved successfully',
		username: user.name,
		cattle: filteredCattle,
	};
};

export const newCattleData = async ({ user, session, body, set }: AuthPayload) => {
	{
		console.log(body);
		const parsed = cattleDataSchema.safeParse(body);
		let cattleId;
		if (!parsed.success) {
			const error = parsed.error.issues[0].message;
			set.status = 400;
			return {
				error: error,
			};
		}

		const error: boolean = false;

		for await (const data of parsed.data) {
			const split = data.split('_');

			if (!cattleId) {
				cattleId = split[6];
			}

			if (!cattleId) {
				set.status = 400;
				return {
					error: 'Cattle ID is required',
				};
			}

			const behaviorState = split[0];
			const temperature = Number(split[1]);
			const latitude = Number(split[2]);
			const longitude = Number(split[3]);
			const date = split[4];
			const lightLevel = Number(split[5]);

			console.log(date);

			try {
				const updated = await prisma.cattle.update({
					where: { id: cattleId },
					data: {
						cattleData: {
							create: {
								latitude,
								longitude,
								lightLevel,
								behaviorState,
								timestamp: date == 'INVALID' ? null : date,
								temperature,
							},
						},
					},
				});

				if (!updated) {
					set.status = 404;
					return {
						error: 'Cattle not found',
					};
				}
			} catch (error) {
				console.log(error);
				error = true;
			}
		}

		if (error) {
			set.status = 500;
			return {
				error: 'Error creating cattle data',
			};
		}

		return {
			message: 'Cattle data created successfully',
		};
	}
};

export const updateCattle = async ({ user, session, body, set }: AuthPayload) => {
	if (!user || !session) {
		set.status = 401;
		return {
			error: 'Unauthorized',
		};
	}

	const parsed = updateCattleSchema.safeParse(body);
	if (!parsed.success) {
		const error = parsed.error.issues[0].message;
		set.status = 400;
		return {
			error: error,
		};
	}

	const { name, breed, weight, age, gender, description, cattleId } = parsed.data;

	const getCattle = await prisma.cattle.findUnique({
		where: { id: cattleId },
	});

	if (!getCattle) {
		set.status = 404;
		return {
			error: 'Cattle not found',
		};
	}
	if (getCattle.userId !== user.id) {
		set.status = 403;
		return {
			error: 'You are not allowed to update this cattle',
		};
	}

	try {
		await prisma.cattle.update({
			where: { id: user.id },
			data: {
				name: name != '' ? name : getCattle.name,
				breed: breed != '' ? breed : getCattle.breed,
				weight: weight != 0 ? weight : getCattle.weight,
				age: age != 0 ? age : getCattle.age,
				gender: gender != '' ? gender : getCattle.gender,
				description: description != '' ? description : getCattle.description,
			},
		});
	} catch (error) {
		set.status = 500;
		return {
			error: 'Error updating cattle: ' + error,
		};
	}
	return {
		message: 'Cattle updated successfully',
	};
};

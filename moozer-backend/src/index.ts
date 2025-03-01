// server.ts

import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { helmet } from 'elysia-helmet';
import { logger } from '@rasla/logify';
import authView from './handlers/authView';
import { userMiddleware } from './middleware/auth-middleware';
import 'dotenv/config';
import { cattle, updateCattle, createCattle, newCattleData, cattleStatistics } from './controllers/cattle';

const app = new Elysia({ prefix: '/api' });

app.use(
	cors({
		//origin: ['http://localhost:5173', 'https://moozer.us'],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		exposeHeaders: ['Content-Length', 'Authorization', 'X-Powered-By'],
		allowedHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type', 'Authorization'],
		credentials: true,
		maxAge: 3600,
	})
);
app.use(helmet());
app.use(logger());

app.all('/auth/*', authView);
// import { auth } from './handlers/auth';

// import { signupRoute } from './controllers/test';

// const app = new Elysia()

// 	.use(cors())
// 	.use(logger())
// 	.all('/api/auth/*', authView)

// 	.listen(3000, () => {
// 		console.log('Minimal test server on port 3000');
// 	});

app.derive(({ request }) => userMiddleware(request));

const cattles = new Elysia({ prefix: '/cattle' })

	.get('/get', cattle)
	.post('/update-cattle', updateCattle)
	.post('/create-cattle', createCattle)
	.post('/new-cattle', newCattleData)
	.get('/cattle-statistics/:cattleId', cattleStatistics);

app.use(cattles);

// Start the server
app.listen(3000, () => {
	console.log('Backend server is running on port 3000');
});

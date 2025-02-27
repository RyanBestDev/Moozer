import { cn } from '@/lib/utils';

// Define an array of complementary colors
const meteorColors = [
	'#B08968', // Soft brown
	'#E9C46A', // Warm gold
	'#F4A261', // Muted orange
	'#2A9D8F', // Greenish teal
	'#8AB17D', // Pale green
	'#E76F51', // Soft red-orange
];

export const Meteors = ({ number = 20, className = '' }) => {
	const meteors = Array.from({ length: number });

	return (
		<>
			{meteors.map((_, idx) => {
				const color = meteorColors[Math.floor(Math.random() * meteorColors.length)]; // Pick a random color

				return (
					<span
						key={`meteor-${idx}`}
						className={cn(
							'absolute h-0.5 w-0.5 rounded-full rotate-[215deg] animate-meteor-effect',
							className
						)}
						style={{
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
							backgroundColor: color, // Meteor head color
							animationDelay: `${Math.random() * 0.6 + 0.2}s`,
							animationDuration: `${Math.random() * 8 + 2}s`,
							boxShadow: `0 0 6px 2px ${color}80`, // Slight glow effect
						}}
					>
						{/* Trail Effect */}
						<span
							className='absolute top-1/2 left-full h-0.5'
							style={{
								width: '50px',
								transform: 'translateY(-50%)',
								background: `linear-gradient(to right, ${color}, transparent)`, // Trail fades from meteor color to transparent
							}}
						/>
					</span>
				);
			})}
		</>
	);
};

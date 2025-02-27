import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { funEmoji } from '@dicebear/collection';

export default function GetAvatar(props: { name: string }) {
	const avatar = useMemo(() => {
		return createAvatar(funEmoji, {
			size: 128,
			seed: props.name,
			// ... other options
		}).toDataUri();
	}, [props.name]);

	return <img src={avatar} />;
}

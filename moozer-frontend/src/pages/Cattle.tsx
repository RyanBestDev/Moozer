import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function Cattle() {
	const { serverId } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
}

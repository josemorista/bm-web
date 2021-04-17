import React, { useEffect, useState } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import { useRouter } from 'next/router';
import { ROUTES } from '../consts';

interface IWithAuthOptions {
	strictPrivate: boolean;
	strictPublic?: boolean;
}

export const withAuth = (Component: React.ElementType, { strictPrivate, strictPublic }: IWithAuthOptions) => {
	const Wrapper = (props: unknown) => {
		const { signed } = useAuthentication();
		const router = useRouter();
		const [loading, setLoading] = useState(true);

		useEffect(() => {
			if (!signed && strictPrivate) {
				router.push(ROUTES.HOME);
			}
			if (signed && strictPublic) {
				router.push(ROUTES.MY_PATIENTS);
			}
			setLoading(false);
		}, [router, signed]);

		if (loading) return null;

		return <Component {...props} />;

	};

	return Wrapper;
};
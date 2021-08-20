import React, { useEffect } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { useRouter } from "next/router";
import { ROUTES } from "../consts";

interface IWithAuthOptions {
	strictPrivate: boolean;
	strictPublic?: boolean;
}

export const withAuth = (Component: React.ElementType, { strictPrivate, strictPublic }: IWithAuthOptions) => {
	const Wrapper = (props: unknown) => {
		const { signed } = useAuthentication();
		const router = useRouter();

		useEffect(() => {
			if (!signed && strictPrivate) {
				router.replace(ROUTES.HOME);
			}
			if (signed && strictPublic) {
				router.replace(ROUTES.MY_PATIENTS);
			}
		}, [router, signed]);

		if (!signed && strictPrivate) return null;

		if (signed && strictPublic) return null;

		return <Component {...props} />;

	};

	return Wrapper;
};
import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document<any> {
	static async getInitialProps(ctx: any) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			// wraps the collectStyles provider around our <App />.
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App: React.ElementType) => (props: Record<string, unknown>) => sheet.collectStyles(<App {...props} />),
				});

			// extract the initial props that may be present.
			const initialProps = await Document.getInitialProps(ctx);

			// returning the original props together with our styled components.
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html>
				<Head>
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap" rel="stylesheet" />
					{this.props.styleTags /*rendering the actually stylesheet*/}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
import { ThemeProvider } from 'styled-components';

import { theme } from '../styles/themes';
import { GlobalStyles } from '../styles/GlobalStyles';
import { ToastMessageProvider } from '../hooks/useToastMessage';
import { AuthenticationProvider } from '../hooks/useAuthentication';

function MyApp({ Component, pageProps }) {
	return <ThemeProvider theme={theme}>
		<GlobalStyles />
		<ToastMessageProvider>
			<AuthenticationProvider>
				<Component {...pageProps} />
			</AuthenticationProvider>
		</ToastMessageProvider>
	</ThemeProvider>;
}

export default MyApp;

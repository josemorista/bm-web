import { ThemeProvider } from 'styled-components';

import { theme } from '../styles/themes';
import { GlobalStyles } from '../styles/GlobalStyles';
import { ToastMessageProvider } from '../hooks/useToastMessage';

function MyApp({ Component, pageProps }) {
	return <ThemeProvider theme={theme}>
		<GlobalStyles />
		<ToastMessageProvider>
			<Component {...pageProps} />
		</ToastMessageProvider>
	</ThemeProvider>;
}

export default MyApp;

import { ThemeProvider } from "styled-components";

import { theme } from "../styles/themes";
import { GlobalStyles } from "../styles/GlobalStyles";
import { ToastMessageProvider } from "../hooks/useToastMessage";
import { AuthenticationProvider } from "../hooks/useAuthentication";
import { QueryClientProvider, QueryClient } from "react-query";
import { TranslationContextProvider } from "../hooks/useTranslation";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retryOnMount: true
		}
	}
});

function MyApp({ Component, pageProps }: { Component: React.ElementType, pageProps: unknown }) {
	return <QueryClientProvider client={queryClient}>
		<TranslationContextProvider>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<ToastMessageProvider>
					<AuthenticationProvider>
						<Component {...pageProps} />
					</AuthenticationProvider>
				</ToastMessageProvider>
			</ThemeProvider>
		</TranslationContextProvider>
	</QueryClientProvider>;
}

export default MyApp;

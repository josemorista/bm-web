import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import en from "./en.json";
import br from "./br.json";

type Language = "br" | "en";

const langs: Record<Language, Record<string, string>> = {
	"en": en,
	"br": br
};

const translate = (key: string, lang: Language): string => langs[lang][key] || key;

interface ITranslationContext {
	t(key: string): string;
	setLanguage(language: Language): void;
	language: Language;
}

const translationContext = createContext<ITranslationContext>({} as ITranslationContext);

export const TranslationContextProvider: FC = ({ children }) => {
	const [language, setLanguage] = useState<Language>("en");
	const t = useCallback((key: string) => translate(key, language), [language]);

	useEffect(() => {
		const userLanguage = navigator && navigator.language;
		if (userLanguage) {
			setLanguage(userLanguage === "pt-BR" ? "br" : "en");
		}
	}, []);

	return <translationContext.Provider value={{
		language,
		t,
		setLanguage
	}}>
		{children}
	</translationContext.Provider>;
};

export const useTranslation = () => useContext(translationContext);
import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import en from "./en.json";
import br from "./br.json";

type Language = "br" | "en";

const langs: Record<Language, Record<string, string>> = {
	"en": en,
	"br": br
};

const translate = (key: string, lang: Language, args: Array<string>): string => {
	let text = langs[lang][key] || key;
	for (const arg of args) {
		text = text.replace(/\$\d/, arg);
	}
	return text;
};

interface ITranslationContext {
	t(key: string, args?: Array<string>): string;
	setLanguage(language: Language): void;
	language: Language;
}

const translationContext = createContext<ITranslationContext>({} as ITranslationContext);

export const TranslationContextProvider: FC = ({ children }) => {
	const [language, setLanguage] = useState<Language>("en");
	const t = useCallback((key: string, args: Array<string> = []) => translate(key, language, args), [language]);

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
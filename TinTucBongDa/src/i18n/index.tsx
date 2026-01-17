import i18next from "i18next";
import vi from "./vi.json";
import en from "./en.json";
import fr from "./fr.json";
import es from "./es.json";

i18next.init({
    lng: "vi",
    fallbackLng: "en",
    resources: {
        vi: { translation: vi },
        en: { translation: en },
        fr: { translation: fr },
        es: { translation: es },
    },
    interpolation: {
        escapeValue: false
    }
});

export default i18next;

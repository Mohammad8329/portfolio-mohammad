/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_EMAIL_URL: string;
    readonly VITE_LINKEDIN_URL: string;
    readonly VITE_GITHUB_URL: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

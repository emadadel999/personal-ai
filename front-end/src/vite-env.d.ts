/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
    readonly MODEL1_NAME: string
    readonly MODEL1_VALUE: string
    readonly MODEL2_NAME: string
    readonly MODEL2_VALUE: string
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}
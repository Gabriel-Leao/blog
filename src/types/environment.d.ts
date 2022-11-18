export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: string
      DB_PASS: string
      DB_URI: string
      DB_NAME: string
      PORT: Number
    }
  }
}

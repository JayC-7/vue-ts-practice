export {};

declare global {
    interface Window {
        $localStorage: any,
        $alarm: any,
        utils: any,
        vue: any
    }
}
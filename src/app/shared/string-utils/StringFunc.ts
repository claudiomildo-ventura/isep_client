export class StringFunc {
    static readonly STRING_EMPTY = '';

    public static encodeBase64(data: string): string {
        return btoa(this.toBinaryString(data));
    }

    private static toBinaryString(data: string): string {
        return new TextEncoder()
            .encode(data)
            .reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    }
}
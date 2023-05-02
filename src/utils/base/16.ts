export function BASE16(number: number) {
    var base16 = "";
    var base16chars = "0123456789ABCDEF";
    while (number > 0) {
        base16 = base16chars[number % 16] + base16;
        number = Math.floor(number / 16);
    }
    return base16;
}

export function BASE8(number: number) {
    var base8 = "";
    var base8chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    while (number > 0) {
        base8 = base8chars[number % 8] + base8;
        number = Math.floor(number / 8);
    }
    return base8;
}

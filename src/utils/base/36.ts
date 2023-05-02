export function BASE36(number: number) {
    var base36 = "";
    var base36chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    while (number > 0) {
        base36 = base36chars[number % 36] + base36;
        number = Math.floor(number / 36);
    }
    return base36;
}

export function createBox(width: number, height: number): string {
    if (width < 2 || height < 2) {
        return "Width and height must be at least 2.";
    }

    const topBottom = 'o' + '='.repeat(width - 2) + 'o';
    const middle = '‖' + ' '.repeat(width - 2) + '‖';

    let result = topBottom + '\n';
    for (let i = 0; i < height - 2; i++) {
        result += middle + '\n';
    }
    result += topBottom;

    return result;
}

export function createBox2(text: string, paddingHorizontal: number = 0, paddingVertical: number = 0, width: number = 0, height: number = 0): string {
    if (width === 0) {
        width = text.length + paddingHorizontal * 2 + 2; // +2 for left and right borders
    }
    if (height === 0) {
        height = 3 + paddingVertical * 2; // 3 for top, text, and bottom rows
    }

    if (width < text.length + 2 || height < 3) {
        return "Box dimensions are too small for the given text.";
    }

    const top = '┌' + '─'.repeat(width - 2) + '┐';
    const bottom = '└' + '─'.repeat(width - 2) + '┘';

    let result = top + '\n';

    // Calculate vertical padding
    const verticalPadding = Math.floor((height - 3) / 2);

    // Add top padding
    for (let i = 0; i < verticalPadding; i++) {
        result += '│' + ' '.repeat(width - 2) + '│\n';
    }

    // Add centered text
    const textPadding = ' '.repeat(Math.floor((width - 2 - text.length) / 2));
    const textLine = '│' + textPadding + text + textPadding;
    if ((width - 2 - text.length) % 2 !== 0) {
        result += textLine + ' │\n'; // Add extra space if odd
    } else {
        result += textLine + '│\n';
    }

    // Add bottom padding
    for (let i = 0; i < height - verticalPadding - 3; i++) {
        result += '│' + ' '.repeat(width - 2) + '│\n';
    }

    result += bottom;

    return result;
}

export function createBox3(text: string, paddingHorizontal: number = 0, paddingVertical: number = 0, width: number = 0, height: number = 0): string {
    if (width === 0) {
        width = text.length + paddingHorizontal * 2 + 2; // +2 for left and right borders
    }
    if (height === 0) {
        height = 3 + paddingVertical * 2; // 3 for top, text, and bottom rows
    }

    if (width < text.length + 2 || height < 3) {
        return "Box dimensions are too small for the given text.";
    }

    let linesAdded = 0;

    const top = '┌' + '─'.repeat(width - 2) + '┐';
    const bottom = '└' + '─'.repeat(width - 2) + '┘';

    let result = top + '\n';
    linesAdded++;

    // Calculate vertical padding
    const verticalPadding = Math.floor((height - 3) / 2);

    // Add top padding
    for (let i = 0; i < verticalPadding; i++) {
        result += '│' + ' '.repeat(width - 2) + '│' + (linesAdded === 1 ? '`' : '') + '\n';
        linesAdded++;
    }

    // Add centered text
    const textPadding = ' '.repeat(Math.floor((width - 2 - text.length) / 2));
    const textLine = '│' + textPadding + text + textPadding;
    if ((width - 2 - text.length) % 2 !== 0) {
        result += textLine + ' │\n'; // Add extra space if odd
        linesAdded++;
    } else {
        result += textLine + '│\n';
        linesAdded++;
    }

    // Add bottom padding
    for (let i = 0; i < height - verticalPadding - 3; i++) {
        result += '│' + ' '.repeat(width - 2) + '│\n';
        linesAdded++;
    }

    result += bottom;
    linesAdded++;

    return result;
}
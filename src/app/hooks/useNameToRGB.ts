import { useMemo } from 'react';

function calculateAsciiSum(value: string): number {
    let sum = 0;
    for (let i = 0; i < value.length; i++) {
        sum += value.charCodeAt(i);
    }
    return sum;
}

function asciiSumToHexColor(asciiSum: number): string {
    const red = (asciiSum % 256).toString(16).padStart(2, '0');
    const green = ((asciiSum >> 8) % 256).toString(16).padStart(2, '0');
    const blue = ((asciiSum >> 16) % 256).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
}

export function useNameToRGB(email: string): string {
    const color = useMemo(() => {
        const asciiSum = calculateAsciiSum(email);
        return asciiSumToHexColor(asciiSum);
    }, [email]);

    return color;
}

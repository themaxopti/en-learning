import { WordType } from "../../state/dictionary.reducer";
import { v4 } from "uuid";

export function createMockWords(count: number): WordType[] {
    const words: WordType[] = []
    for (let i = 1; i <= count; i++) {
        const word: WordType = {
            checked: false,
            index: i,
            title: `word${i} ${v4()}`,
            translate: `translate${i}`,
            globalIndex: i,
            id: i,
            userId: 3,
        }
        words.push(word)
    }
    return words
}
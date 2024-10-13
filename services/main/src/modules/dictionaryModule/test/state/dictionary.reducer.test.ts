import {
    addManyWords, addWord, changeIndex, dictionaryInitialState, dictionaryReducer, removeSelectedItems,
    removeWord, setIsDictionaryExist, setSelectAllMode, setSelectMode
} from '../../state/dictionary.reducer';
import { createMockWords } from '../mock/dictionary.mock';

describe('dictionary reducer', () => {
    let mockWords = createMockWords(3)

    beforeEach(() => {
        mockWords = createMockWords(3)
    })

    it('setIsDictionaryExist', () => {
        const reducer = dictionaryReducer(dictionaryInitialState, setIsDictionaryExist(true))
        expect(reducer.isDictionaryExist).toEqual(true);
    });

    it('changeIndex', () => {
        const mockWords = createMockWords(3).sort((a, b) => b.index - a.index)
        const reducer = dictionaryReducer({ ...dictionaryInitialState, words: mockWords }, changeIndex({}))
        expect(reducer.words[0].index).toEqual(1);
        expect(reducer.words[1].index).toEqual(2);
        expect(reducer.words[2].index).toEqual(3);
    });

    it('setSelectAllMode checked', () => {
        let state = dictionaryReducer({ ...dictionaryInitialState, words: mockWords }, setSelectMode(true))
        state = dictionaryReducer(state, setSelectAllMode({}))

        expect(state.selectAllMode).toEqual(true);
        for (let i = 0; i < state.words.length; i++) {
            const word = state.words[i]
            expect(word.checked).toBe(true)
        }
    });

    it('addWord', () => {
        let state = dictionaryReducer(dictionaryInitialState, addWord(createMockWords(1)[0]))
        expect(state.words.length).toBe(1)
    });

    it('addManyWords', () => {
        let state = dictionaryReducer(dictionaryInitialState, addManyWords(createMockWords(2) as any))
        expect(state.words.length).toBe(2)
    });

    it('removeSelectedItems', () => {
        mockWords = mockWords.map(el => {
            return {
                ...el,
                checked: true
            }
        })

        let state = dictionaryReducer({ ...dictionaryInitialState, words: mockWords }, setSelectMode(true))
        state = dictionaryReducer(dictionaryInitialState, removeSelectedItems({}))
        expect(state.words.length).toBe(0)
    });


    it('removeItem', () => {
        // @ words length = 3 @
        let state = dictionaryReducer({ ...dictionaryInitialState, words: mockWords }, removeWord(2))
        expect(state.words.length).toBe(2)
    });

})
import React from 'react'
import { DictionaryPage } from '../../pages/DictionaryPage/DictionaryPage'
import { getStore } from '@/store/store'
import {
  setAuthLoading,
  setIsAuth,
} from '@/modules/authModule/state/auth.reducer'
import {
  addWord,
  setCurrentDictionary,
  setIsDictionaryExist,
  setWords,
  setWordsLoading,
} from '../../state/dictionary.reducer'
import { createMockWords } from '../mock/dictionary.mock'
import { v4 as uuidv4 } from 'uuid'

const authResponse = {
  statusCode: 200,
  data: {
    id: 5,
    userName: 'some',
    email: 'themaxopti@gmail.com',
  },
}


describe('Dictionary words', () => {
  it('should render', () => {
    const store = getStore()

    cy.intercept('GET', '/auth', {
      statusCode: 200,
      body: authResponse,
    }).as('auth')

    cy.mount(<DictionaryPage />, { reduxStore: store })
    cy.wait('@auth')
  })

  it('should render word after adding it', () => {
    const store = getStore()

    cy.intercept('GET', '/auth', {
      statusCode: 200,
      body: authResponse,
    }).as('auth')

    cy.intercept('POST', '/dictionary/words/changeIndex', {
      statusCode: 200,
      body: { statusCode: 200 },
    }).as('auth')

    cy.mount(<DictionaryPage />, { reduxStore: store })
    cy.wait('@auth')
    store.dispatch(addWord(createMockWords(1)[0]))
    store.dispatch(setWordsLoading(false))
    cy.get('[data-testid="word"]').should('exist')
  })

  it('should have no errors when submiting addWordForm', () => {
    const store = getStore()

    store.dispatch(setCurrentDictionary({ id: 1, title: 'some', userId: 4 }))

    cy.intercept('GET', '/auth', {
      statusCode: 200,
      body: authResponse,
    }).as('auth')

    cy.mount(<DictionaryPage />, { reduxStore: store })

    cy.get('input[data-testid="wordInput"]').type('word')
    cy.get('input[data-testid="translateInput"]').type('перевод')
    cy.get('button[data-testid="addWordButton"]').click()
  })
})

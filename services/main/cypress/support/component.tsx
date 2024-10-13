import React from 'react'
import { mount } from 'cypress/react18'
import { MemoryRouter } from 'react-router-dom'
import { getStore } from '../../src/store/store'
import { Provider } from 'react-redux'

Cypress.Commands.add('mount', (component, options = {}) => {
  const {
    reduxStore = getStore(),
    routerProps = { initialEntries: ['/login'] },
    ...mountOptions
  } = options

  const wrapped = (
    <Provider store={reduxStore}>
      <MemoryRouter {...routerProps}>{component}</MemoryRouter>
    </Provider>
  )

  return mount(wrapped, mountOptions)
})



// ====

// Cypress.Commands.add('mount', mount);
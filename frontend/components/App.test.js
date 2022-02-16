// Write your tests here
import React from 'react'; 
import { render, screen, fireEvent } from '@testing-library/react'; 

import AppClass from './AppClass'; 
import AppFunctional from './AppFunctional';


test('sanity', () => {
  expect(true).toBe(false)
})
 
test('AppClass Component Renders Without Error', () => {
  render(<AppClass />)
})

test('FunctionalClass Component Renders Without Error', () => {
  render(<AppFunctional />)
})

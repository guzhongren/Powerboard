import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Demo from '@root/components/Demo/index'

describe('test Demo component', () => {
  test('should render correct', () => {
    const {getByText} = render(<Demo/>)

    expect(getByText('Demo Component')).toBeInTheDocument()
  })
})

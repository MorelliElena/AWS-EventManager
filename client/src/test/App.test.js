import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import '@testing-library/jest-dom'
import React from 'react'
import Home from '../components/home/Home'
import App from '../components/App';

const server = setupServer(
    // capture "GET /greeting" requests
    rest.get('/http://localhost:5000/api/events/', (req, res, ctx) => {
      // respond using a mocked JSON body
      return res(ctx.json({greeting: 'hello there'}))
    }),
)
// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())

test('handles server error', async () => {
  server.use(
      // override the initial "GET /greeting" request handler
      // to return a 500 Server Error
      rest.get('http://localhost:5000/api/events/', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
  )

})


/*test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/

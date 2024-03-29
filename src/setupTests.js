// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

class ResizeObserverMock {
    // Mock resizeObserver for chart.js
    observe() {
        jest.fn()
    }
    unobserve() {
        jest.fn()
    }
}

global.ResizeObserver = ResizeObserverMock

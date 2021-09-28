import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('Dashboard page', () => {
    test('Should render sidebar correctly', () => {
        render(<App />)

        screen.getByText('Dashboard')
        screen.getByText('Saved Candidates')
        screen.getByText('Todos')
    })

    test('Should render correct section in dashboard page', () => {
        render(<App />)

        screen.getByText('Statistics')
        screen.getByText('Candidate List')
    })

    test('Should return candidate list data from API', async () => {
        render(<App />)

        await screen.findByText('No.', undefined, { timeout: 5000 })

        screen.getAllByText('Details')
        screen.getAllByText('Accept')
        screen.getAllByText('Decline')
    })

    test('Should go to saved candidate page when user click the saved candidates button in dashboard page', async () => {
        render(<App />)

        const savedCandidateButton = screen.getByText('Saved Candidates')
        fireEvent.click(savedCandidateButton)

        const sampleSavedCandidate = screen.queryByTestId('savedCandidate')
        const emptySavedCandidate = screen.queryByTestId('emptySavedCandidate')

        expect(sampleSavedCandidate).not.toBeInTheDocument()
        expect(emptySavedCandidate).toBeInTheDocument()
    })

    test('Should go to detail page when user click the detail button in dashboard page', async () => {
        render(<App />)

        const dashboardButton = screen.getByText('Dashboard')
        fireEvent.click(dashboardButton)

        await screen.findByText('No.', undefined, { timeout: 5000 })

        const candidateDetailButton = await screen.queryAllByTestId('detailButton', undefined, {
            timeout: 5000,
        })

        fireEvent.click(candidateDetailButton[0])

        await screen.findByText('Candidate ID', { timeout: 5000 })

        screen.getByText('Candidate Username')
        screen.getByText('Candidate Email')
        screen.getByText('Candidate Phone')
        screen.getByText('Candidate Website')
        screen.getByText('Candidate Past Company')
        screen.getByText('Candidate Address')
        screen.getByText('Candidate Locations')

        screen.getByRole('button', { name: 'Accept Candidate' })
        screen.getByRole('button', { name: 'Decline Candidate' })
        const saveButton = screen.getByRole('button', { name: 'Save this candidate' })

        fireEvent.click(saveButton)
    })
})

describe('Favorite page', () => {
    test('Should be able to show saved candidates properly', () => {
        render(<App />)

        const savedCandidateButton = screen.getByText('Saved Candidates')
        fireEvent.click(savedCandidateButton)

        const sampleSavedCandidate = screen.queryByTestId('savedCandidate')
        const emptySavedCandidate = screen.queryByTestId('emptySavedCandidate')

        expect(sampleSavedCandidate).toBeInTheDocument()
        expect(emptySavedCandidate).not.toBeInTheDocument()
    })

    test('Should be able to click the favorite candidate card, and render detail page', async () => {
        render(<App />)

        const candidateDetailButton = await screen.queryAllByTestId('savedCandidate', undefined, {
            timeout: 5000,
        })

        fireEvent.click(candidateDetailButton[0])

        await screen.findByText('Candidate ID', { timeout: 5000 })

        screen.getByText('Candidate Username')
        screen.getByText('Candidate Email')
        screen.getByText('Candidate Phone')
        screen.getByText('Candidate Website')
        screen.getByText('Candidate Past Company')
        screen.getByText('Candidate Address')
        screen.getByText('Candidate Locations')

        screen.getByRole('button', { name: 'Accept Candidate' })
        screen.getByRole('button', { name: 'Decline Candidate' })
        screen.getByRole('button', { name: 'Save this candidate' })
    })
})

describe('Todo page', () => {
    test('Should render correct section in todo page', () => {
        render(<App />)

        const todoButton = screen.getByText('Todos')
        fireEvent.click(todoButton)

        screen.getByText('Statistics')
        screen.getByText('Todo List')
    })

    test('Should render todo list data from API', async () => {
        render(<App />)

        await screen.findByText('No.', undefined, { timeout: 5000 })

        screen.getAllByText('Incomplete')
        screen.getAllByText('Completed')
    })

    test('Should render pagination buttons', () => {
        render(<App />)

        screen.getByText('Previous')
        screen.getByText('Next')
    })
})

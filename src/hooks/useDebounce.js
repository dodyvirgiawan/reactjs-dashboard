import { useState } from 'react'

export default function useDebounce(state) {
    const [searchedState, setSearchedState] = useState([])
    const [isSearchingState, setSearchingState] = useState(false)

    function stateSearch(e) {
        const query = e.target.value.toLowerCase()
        query.trim() ? setSearchingState(true) : setSearchingState(false)

        const results = state.filter((eachState) => eachState.title.toLowerCase().includes(query))

        setSearchedState(results)
    }

    return [searchedState, isSearchingState, setSearchingState, stateSearch]
}

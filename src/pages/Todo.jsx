// ~~~~~~~~~~~~~~~~~~ React ~~~~~~~~~~~~~~~~~~
import { useState, useEffect } from 'react'

// ~~~~~~~~~~~~~~~~~~ Redux ~~~~~~~~~~~~~~~~~~
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos } from '../store/todos/action'

// ~~~~~~~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~
import Sidebar from '../components/Sidebar'
import HeaderTitle from '../components/HeaderTitle'
import TodoGraph from '../components/TodoGraph'
import Loading from '../components/Loading'
import ReactPaginate from 'react-paginate'
import Footer from '../components/Footer'

// ~~~~~~~~~~~~~~~~~~ Hooks & Helpers ~~~~~~~~~~~~~~~~~~
import useDebounce from '../hooks/useDebounce'
import debounce from '../helpers/debounce'

export default function Todo() {
    const dispatch = useDispatch()

    const { todos, loadingTodos } = useSelector((state) => state.todo)

    const [pageNumber, setPageNumber] = useState(0) // eslint-disable-next-line
    const [perPage, setPerPage] = useState(10) // eslint-disable-next-line
    const [totalTodosData, setTotalTodosData] = useState(200) //* Source: JSONPlaceholder API
    const [totalPages, setTotalPages] = useState(0)

    const [searchedTodos, isSearchingTodos, setIsSearchingTodos, searchTodoFunction] =
        useDebounce(todos)

    const searchTodo = debounce(searchTodoFunction)

    useEffect(() => {
        const URLParams = new URLSearchParams({
            _start: pageNumber * perPage,
            _limit: perPage,
        })

        dispatch(fetchTodos(URLParams.toString()))
    }, [dispatch, pageNumber, perPage])

    useEffect(() => {
        setTotalPages(Math.ceil(totalTodosData / perPage))
    }, [todos, perPage, totalTodosData])

    return (
        <div className="container mx-auto md:flex md:flex-row shadow-2xl rounded-lg">
            <Sidebar />

            <div className="md:w-5/6 rounded-tr-lg rounded-br-lg p-5 h-screen overflow-auto">
                <HeaderTitle title={'Statistics'} />

                <TodoGraph />

                <HeaderTitle title={'Todo List'} />

                <div className="container">
                    {loadingTodos ? (
                        <Loading />
                    ) : (
                        <div className="container">
                            <input
                                type="text"
                                className="mt-5 p-3 mx-auto rounded-full border-0 bg-gray-100"
                                placeholder="search todo by title..."
                                onChange={(e) => {
                                    searchTodo(e)
                                }}
                            ></input>

                            <div className="bg-gray-100 p-3 rounded-xl mt-5 container overflow-auto shadow-2xl">
                                <table className="w-full mt-5 text-center">
                                    <thead className="text-gray-700">
                                        <tr>
                                            <th>No.</th>
                                            <th>Title</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm text-gray-600">
                                        {isSearchingTodos ? (
                                            <>
                                                {searchedTodos.map((eachTodo, idx) => {
                                                    return (
                                                        <tr className="mt-3" key={'todo' + idx}>
                                                            <td>{eachTodo.id}.</td>
                                                            <td>{eachTodo.title}</td>
                                                            <td>
                                                                {eachTodo.completed ? (
                                                                    <p className="btn-green cursor-pointer">
                                                                        Completed
                                                                    </p>
                                                                ) : (
                                                                    <p className="btn-red cursor-pointer">
                                                                        Incomplete
                                                                    </p>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </>
                                        ) : (
                                            <>
                                                {todos.map((eachTodo, idx) => {
                                                    return (
                                                        <tr className="mt-3" key={'todo' + idx}>
                                                            <td>{eachTodo.id}.</td>
                                                            <td>{eachTodo.title}</td>
                                                            <td>
                                                                {eachTodo.completed ? (
                                                                    <p className="btn-green cursor-pointer">
                                                                        Completed
                                                                    </p>
                                                                ) : (
                                                                    <p className="btn-red cursor-pointer">
                                                                        Incomplete
                                                                    </p>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        forcePage={pageNumber}
                        pageCount={totalPages}
                        onPageChange={({ selected }) => {
                            setPageNumber(selected)
                            setIsSearchingTodos(false)
                        }}
                        containerClassName={'paginationContainer'}
                        activeClassName={'paginationActive'}
                    />
                </div>

                <Footer />
            </div>
        </div>
    )
}

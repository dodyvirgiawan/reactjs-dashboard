import Sidebar from '../components/Sidebar'
import HeaderTitle from '../components/HeaderTitle'
import TodoGraph from '../components/TodoGraph'
import ReactLoading from 'react-loading'
import ReactPaginate from 'react-paginate'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchTodos } from '../store/todos/action'

export default function Todo() {
    const dispatch = useDispatch()

    const { todos, loadingTodos } = useSelector((state) => state.todo)

    const [pageNumber, setPageNumber] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const [totalTodosData, setTotalTodosData] = useState(200) //* Source: JSONPlaceholder API
    const [totalPages, setTotalPages] = useState(0)

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
        <div className="container mx-auto flex flex-row shadow-2xl rounded-lg">
            <Sidebar />

            <div className="w-5/6 rounded-tr-lg rounded-br-lg p-5 h-screen overflow-auto">
                <HeaderTitle title={'Statistics'} />

                <TodoGraph />

                <HeaderTitle title={'Todo List'} />

                <div className="container">
                    {loadingTodos ? (
                        <ReactLoading
                            type={'spinningBubbles'}
                            color={'black'}
                            height={90}
                            width={90}
                            className="mx-auto mt-32 mb-32"
                        />
                    ) : (
                        <div className="bg-gray-100 p-3 rounded-xl mt-5">
                            <table className="w-full mt-5 text-center">
                                <thead className="text-gray-700">
                                    <tr>
                                        <th>No.</th>
                                        <th>Title</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
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
                                </tbody>
                            </table>
                        </div>
                    )}

                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        forcePage={pageNumber}
                        pageCount={totalPages}
                        onPageChange={({ selected }) => setPageNumber(selected)}
                        containerClassName={'paginationContainer'}
                        activeClassName={'paginationActive'}
                    />
                </div>
            </div>
        </div>
    )
}

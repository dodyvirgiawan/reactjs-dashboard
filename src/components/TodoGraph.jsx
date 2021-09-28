// ~~~~~~~~~~~~~~~~~~ React ~~~~~~~~~~~~~~~~~~
import { useState, useEffect } from 'react'

// ~~~~~~~~~~~~~~~~~~ Redux ~~~~~~~~~~~~~~~~~~
import { useSelector } from 'react-redux'

// ~~~~~~~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~
import { Doughnut } from 'react-chartjs-2'

export default function TodoGraph() {
    const { todos } = useSelector((state) => state.todo)

    const [totalCompletedTodo, setTotalCompletedTodo] = useState(0)
    const [totalIncompleteTodo, setTotalIncompleteTodo] = useState(0)

    useEffect(() => {
        const completedTodo = todos.filter((todo) => todo.completed)
        const incompleteTodo = todos.filter((todo) => !todo.completed)

        setTotalCompletedTodo(completedTodo.length)
        setTotalIncompleteTodo(incompleteTodo.length)
    }, [todos])

    const data = {
        labels: ['Completed', 'Incomplete'],
        datasets: [
            {
                label: 'Todo Statistics',
                data: [totalCompletedTodo, totalIncompleteTodo],
                backgroundColor: ['rgb(185, 235, 193)', 'rgb(255, 179, 179)'],
                hoverOffset: 4,
            },
        ],
    }

    return (
        <div className="container w-96 mx-auto">
            <Doughnut
                data={data}
                options={{
                    responsive: true,
                    mantainAspectRatio: true,
                }}
            />
        </div>
    )
}

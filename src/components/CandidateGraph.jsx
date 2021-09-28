import { Line } from 'react-chartjs-2'

import { useSelector } from 'react-redux'

export default function CandidateGraph() {
    const { acceptedCandidates, declinedCandidates } = useSelector((state) => state.candidate)

    const data = {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
        ],
        datasets: [
            {
                label: 'Accepted Candidates',
                data: [5, 4, 8, 5, 9, 6, 6, 4, acceptedCandidates.length],
                fill: true,
                backgroundColor: 'rgb(185, 235, 193)',
                borderColor: 'rgb(185, 235, 193)',
            },
            {
                label: 'Declined Candidates',
                data: [10, 6, 9, 8, 11, 8, 8, 6, declinedCandidates.length],
                fill: true,
                backgroundColor: 'rgb(255, 179, 179)',
                borderColor: 'rgb(255, 179, 179)',
            },
        ],
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    }

    return (
        <div className="container">
            <Line data={data} options={options} width={100} height={20} />
        </div>
    )
}

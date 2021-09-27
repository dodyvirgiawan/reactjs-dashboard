import { Link } from 'react-router-dom'

import { BsFillPersonFill } from 'react-icons/bs'

export default function CandidateCard({ candidate }) {
    return (
        <Link to={`/candidates/${candidate.id}`}>
            <div className="container bg-gray-200 w-72 p-3 rounded-xl flex flex-row ml-3">
                <div className="container w-1/3 my-auto">
                    <BsFillPersonFill className="mt-1 w-10 h-10 mx-auto" />
                </div>
                <div className="container w-2/3 flex flex-col">
                    <h3 className="font-bold">{candidate.name}</h3>
                    <h3 className="text-gray-600">{candidate.company.name}</h3>
                </div>
            </div>
        </Link>
    )
}

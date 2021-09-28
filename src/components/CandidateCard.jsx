// ~~~~~~~~~~~~~~~~~~ Routers ~~~~~~~~~~~~~~~~~~
import { Link } from 'react-router-dom'

// ~~~~~~~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~
import { BsFillPersonFill } from 'react-icons/bs'

export default function CandidateCard({ candidate }) {
    return (
        <Link to={`/candidates/${candidate.id}`}>
            <div
                className="container bg-gray-200 w-72 p-3 rounded-xl md:flex md:flex-row md:ml-3 mx-auto mt-5 h-full shadow-xl"
                data-testid="savedCandidate"
            >
                <div className="container md:w-1/3 m-auto">
                    <BsFillPersonFill className="mt-1 w-10 h-10 mx-auto" />
                </div>
                <div className="container md:w-2/3 flex flex-col text-center my-auto">
                    <h3 className="font-bold text-gray-800">{candidate.name}</h3>
                    <h3 className="text-gray-600">{candidate.company.name}</h3>
                </div>
            </div>
        </Link>
    )
}

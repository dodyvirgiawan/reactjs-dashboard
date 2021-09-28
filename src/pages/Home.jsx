import { useEffect } from 'react'
import { useHistory } from 'react-router'

import { useDispatch, useSelector } from 'react-redux'
import { fetchCandidates, acceptCandidate, declineCandidate } from '../store/candidates/action'

import ReactLoading from 'react-loading'
import Sidebar from '../components/Sidebar'
import HeaderTitle from '../components/HeaderTitle'
import Graph from '../components/Graph'

export default function Home() {
    const dispatch = useDispatch()
    const history = useHistory()

    const { loadingCandidates, candidates } = useSelector((state) => state.candidate)

    useEffect(() => {
        dispatch(fetchCandidates())
    }, [dispatch])

    return (
        <div className="container mx-auto flex flex-row shadow-2xl rounded-lg">
            <Sidebar />

            <div className="w-5/6 rounded-tr-lg rounded-br-lg p-5 h-screen overflow-auto">
                <HeaderTitle title={'Statistics'} />

                <Graph />

                <HeaderTitle title={'Candidate List'} />

                <div className="container">
                    {loadingCandidates ? (
                        <ReactLoading
                            type={'spinningBubbles'}
                            color={'black'}
                            height={90}
                            width={90}
                            className="mx-auto mt-32"
                        />
                    ) : (
                        <div className="bg-gray-100 p-3 rounded-xl mt-5">
                            <table className="w-full mt-5 text-center">
                                <thead className="text-gray-700">
                                    <tr>
                                        <th>No.</th>
                                        <th>Name</th>
                                        <th>Domicile</th>
                                        <th>Phone</th>
                                        <th>Past Company</th>
                                        <th>Detail</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-gray-600">
                                    {candidates.map((candidate, idx) => {
                                        return (
                                            <tr className="mt-3" key={'candidate' + idx}>
                                                <td>{idx + 1}.</td>
                                                <td>{candidate.name}</td>
                                                <td>{candidate.address.city}</td>
                                                <td>{candidate.phone}</td>
                                                <td>{candidate.company.name}</td>
                                                <td>
                                                    <button
                                                        className="btn-black"
                                                        onClick={() =>
                                                            history.push(
                                                                `/candidates/${candidate.id}`
                                                            )
                                                        }
                                                    >
                                                        Details
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn-green"
                                                        onClick={() =>
                                                            dispatch(acceptCandidate(candidate))
                                                        }
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        className="btn-red"
                                                        onClick={() =>
                                                            dispatch(declineCandidate(candidate))
                                                        }
                                                    >
                                                        Decline
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

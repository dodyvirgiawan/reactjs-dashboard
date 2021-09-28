// ~~~~~~~~~~~~~~~~~~ React ~~~~~~~~~~~~~~~~~~
import { useEffect } from 'react'
import { useHistory } from 'react-router'

// ~~~~~~~~~~~~~~~~~~ Redux ~~~~~~~~~~~~~~~~~~
import { useDispatch, useSelector } from 'react-redux'
import { fetchCandidates, acceptCandidate, declineCandidate } from '../store/candidates/action'

// ~~~~~~~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~
import Loading from '../components/Loading'
import Sidebar from '../components/Sidebar'
import HeaderTitle from '../components/HeaderTitle'
import CandidateGraph from '../components/CandidateGraph'
import Footer from '../components/Footer'

export default function Home() {
    const dispatch = useDispatch()
    const history = useHistory()

    const { loadingCandidates, candidates } = useSelector((state) => state.candidate)

    useEffect(() => {
        dispatch(fetchCandidates())
    }, [dispatch])

    return (
        <div className="container mx-auto md:flex md:flex-row shadow-2xl rounded-lg">
            <Sidebar />

            <div className="md:w-5/6 rounded-t-lg rounded-b-lg p-5 h-screen overflow-auto">
                <HeaderTitle title={'Statistics'} />

                <CandidateGraph />

                <HeaderTitle title={'Candidate List'} />

                <div className="container">
                    {loadingCandidates ? (
                        <Loading />
                    ) : (
                        <div className="bg-gray-100 p-3 rounded-xl mt-5 mb-12 container overflow-auto shadow-2xl">
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
                                            <tr className="mt-3 border-b-2" key={'candidate' + idx}>
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
                                                        data-testid="detailButton"
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

                <Footer />
            </div>
        </div>
    )
}

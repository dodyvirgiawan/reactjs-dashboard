import { useEffect } from 'react'
import { useHistory } from 'react-router'

import { useDispatch, useSelector } from 'react-redux'
import { fetchCandidates } from '../store/action'

import { MdDashboard } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'

import ReactLoading from 'react-loading'

export default function Home() {
    const dispatch = useDispatch()
    const history = useHistory()

    const { loadingCandidates, candidates } = useSelector((state) => state)

    useEffect(() => {
        dispatch(fetchCandidates())
    }, [dispatch])

    return (
        <div className="container mx-auto flex flex-row shadow-2xl rounded-lg">
            <div className="w-1/6 bg-gray-200 rounded-tl-lg rounded-bl-lg p-5">
                <h1 className="text-lg font-semibold mt-5 text-gray-800">Candidate Dashboard</h1>
                <hr className="border-1 border-black opacity-20 mt-5"></hr>

                <div className="container mt-5 p-2">
                    <div className="container flex flex-row">
                        <div class="container w-1/4 mx-auto">
                            <MdDashboard className="mx-auto mt-1" />
                        </div>
                        <div className="container w-3/4 text-gray-500">Dashboard</div>
                    </div>
                    <div className="container flex flex-row mt-3">
                        <div class="container w-1/4 mx-auto">
                            <CgProfile className="mx-auto mt-1" />
                        </div>
                        <div className="container w-3/4 text-gray-500">Saved Candidates</div>
                    </div>
                </div>
            </div>

            <div className="w-5/6 rounded-tr-lg rounded-br-lg p-5 h-screen overflow-auto">
                <h2 className="text-lg font-semibold mt-5 text-gray-600">Candidate list</h2>
                <hr className="border-1 border-black opacity-20 mt-5"></hr>

                <div className="container">Disini isi graph</div>

                <h2 className="text-lg font-semibold mt-5 text-gray-600">Candidate list</h2>
                <hr className="border-1 border-black opacity-20 mt-5"></hr>

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
                                                <button className="btn-black">Details</button>
                                            </td>
                                            <td>
                                                <button className="btn-green">Accept</button>
                                                <button className="btn-red">Decline</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    )
}

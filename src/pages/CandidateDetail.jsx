import Sidebar from '../components/Sidebar'

import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { fetchCandidateById } from '../store/action'

import HeaderTitle from '../components/HeaderTitle'
import ReactLoading from 'react-loading'

export default function CandidateDetail() {
    const dispatch = useDispatch()
    const { id } = useParams()

    const { candidateDetails, loadingCandidateDetails } = useSelector((state) => state)

    useEffect(() => {
        dispatch(fetchCandidateById(id))
    }, [dispatch, id])

    return (
        <div className="container mx-auto flex flex-row shadow-2xl rounded-lg">
            <Sidebar />

            <div className="w-5/6 rounded-tr-lg rounded-br-lg p-5 h-screen overflow-auto">
                {loadingCandidateDetails ? (
                    <ReactLoading
                        type={'spinningBubbles'}
                        color={'black'}
                        height={90}
                        width={90}
                        className="mx-auto mt-32"
                    />
                ) : (
                    <>
                        <HeaderTitle title={'Candidate Details'} />

                        <div className="container mt-5 bg-gray-100 p-5 rounded-xl">
                            <div className="container bg-gray-200 p-3 rounded-xl mt-2">
                                <h3 className="text-sm text-gray-600">Candidate Fullname</h3>
                                <p>{candidateDetails[0]?.name}</p>
                            </div>
                            <div className="container bg-gray-200 p-3 rounded-xl mt-2">
                                <h3 className="text-sm text-gray-600">Candidate ID</h3>
                                <p>{candidateDetails[0]?.id}</p>
                            </div>
                            <div className="container bg-gray-200 p-3 rounded-xl mt-2">
                                <h3 className="text-sm text-gray-600">Candidate Username</h3>
                                <p>{candidateDetails[0]?.username}</p>
                            </div>
                            <div className="container bg-gray-200 p-3 rounded-xl mt-2">
                                <h3 className="text-sm text-gray-600">Candidate Email</h3>
                                <p>{candidateDetails[0]?.email}</p>
                            </div>
                            <div className="container bg-gray-200 p-3 rounded-xl mt-2">
                                <h3 className="text-sm text-gray-600">Candidate Phone</h3>
                                <p>{candidateDetails[0]?.phone}</p>
                            </div>
                            <div className="container bg-gray-200 p-3 rounded-xl mt-2">
                                <h3 className="text-sm text-gray-600">Candidate Website</h3>
                                <p>{candidateDetails[0]?.website}</p>
                            </div>
                            <div className="container bg-gray-200 p-3 rounded-xl mt-2">
                                <h3 className="text-sm text-gray-600">Candidate Past Company</h3>
                                <p>{candidateDetails[0]?.company.name}</p>
                                <p>{candidateDetails[0]?.company.catchPhrase}</p>
                            </div>
                            <div className="container bg-gray-200 p-3 rounded-xl mt-2">
                                <h3 className="text-sm text-gray-600">Candidate Address</h3>
                                <p>
                                    {candidateDetails[0]?.address?.suite},{' '}
                                    {candidateDetails[0]?.address?.street},{' '}
                                    {candidateDetails[0]?.address?.city}
                                </p>
                                <p>Zipcode: {candidateDetails[0]?.address.zipcode}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

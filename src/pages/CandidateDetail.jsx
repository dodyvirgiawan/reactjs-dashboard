// ~~~~~~~~~~~~~~~~~~ React ~~~~~~~~~~~~~~~~~~
import { useEffect } from 'react'
import { useParams } from 'react-router'

// ~~~~~~~~~~~~~~~~~~ Redux ~~~~~~~~~~~~~~~~~~
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchCandidateById,
    acceptCandidate,
    declineCandidate,
    saveCandidate,
} from '../store/candidates/action'

// ~~~~~~~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~
import HeaderTitle from '../components/HeaderTitle'
import MapMarker from '../components/MapMarker'
import Loading from '../components/Loading'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

// ~~~~~~~~~~~~~~~~~~ Google Maps ~~~~~~~~~~~~~~~~~~
import GoogleMapReact from 'google-map-react'

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

export default function CandidateDetail() {
    const dispatch = useDispatch()
    const { id } = useParams()

    const { candidateDetails, loadingCandidateDetails } = useSelector((state) => state.candidate)

    useEffect(() => {
        const URLParams = new URLSearchParams({ id })

        dispatch(fetchCandidateById(URLParams.toString()))
    }, [dispatch, id])

    return (
        <div className="container mx-auto md:flex md:flex-row shadow-2xl rounded-lg">
            <Sidebar />

            <div className="md:w-5/6 rounded-tr-lg rounded-br-lg p-5 h-screen overflow-auto">
                {loadingCandidateDetails ? (
                    <Loading />
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
                            <div className="container bg-gray-200 p-3 rounded-xl mt-2">
                                <h3 className="text-sm text-gray-600">Candidate Locations</h3>
                                <div className="w-full h-96 mt-3">
                                    <GoogleMapReact
                                        bootstrapURLKeys={{
                                            key: GOOGLE_MAPS_API_KEY,
                                        }}
                                        defaultCenter={{
                                            lat: -6.2358453, //* Notes: JSONPlaceholder return invalid lat and longitude
                                            lng: 106.9227696, //* Notes: JSONPlaceholder return invalid lat and longitude
                                        }}
                                        defaultZoom={15}
                                    >
                                        <MapMarker
                                            lat={-6.2358453} //* Notes: JSONPlaceholder return invalid lat and longitude
                                            lng={106.9227696} //* Notes: JSONPlaceholder return invalid lat and longitude
                                            text="Candidate Location"
                                        />
                                    </GoogleMapReact>
                                </div>
                            </div>
                            <div className="container mt-3">
                                <div className="container md:flex md:flex-row">
                                    <div className="container md:w-1/2 mt-3">
                                        <button
                                            className="btn-green w-full"
                                            onClick={() =>
                                                dispatch(acceptCandidate(candidateDetails[0]))
                                            }
                                        >
                                            Accept Candidate
                                        </button>
                                    </div>
                                    <div className="container md:w-1/2 mt-3">
                                        <button
                                            className="btn-red w-full"
                                            onClick={() =>
                                                dispatch(declineCandidate(candidateDetails[0]))
                                            }
                                        >
                                            Decline Candidate
                                        </button>
                                    </div>
                                </div>
                                <button
                                    className="btn-black w-full mt-3"
                                    onClick={() => dispatch(saveCandidate(candidateDetails[0]))}
                                >
                                    Save this candidate
                                </button>
                            </div>
                        </div>
                    </>
                )}
                <Footer />
            </div>
        </div>
    )
}

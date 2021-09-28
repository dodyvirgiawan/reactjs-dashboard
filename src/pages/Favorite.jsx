// ~~~~~~~~~~~~~~~~~~ Redux ~~~~~~~~~~~~~~~~~~
import { useSelector } from 'react-redux'

// ~~~~~~~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~
import Sidebar from '../components/Sidebar'
import CandidateCard from '../components/CandidateCard'
import HeaderTitle from '../components/HeaderTitle'
import Footer from '../components/Footer'

export default function Favorite() {
    const { savedCandidates } = useSelector((state) => state.candidate)

    return (
        <div className="container mx-auto md:flex md:flex-row shadow-2xl rounded-lg">
            <Sidebar />

            <div className="md:w-5/6 rounded-tr-lg rounded-br-lg p-5 h-screen overflow-auto">
                <HeaderTitle title={'Saved Candidates'} />

                <div className="container md:flex md:flex-row md:flex-wrap mt-3">
                    {savedCandidates.length === 0 ? (
                        <div className="h-screen">
                            <p className="text-gray-500 text-sm" data-testid="emptySavedCandidate">
                                {' '}
                                Saved Candidates list is empty
                            </p>
                        </div>
                    ) : (
                        <div>
                            {savedCandidates.map((candidate, idx) => {
                                return (
                                    <CandidateCard key={'candidate' + idx} candidate={candidate} />
                                )
                            })}
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </div>
    )
}

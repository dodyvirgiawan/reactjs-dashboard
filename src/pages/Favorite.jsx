import { useSelector } from 'react-redux'

import Sidebar from '../components/Sidebar'
import CandidateCard from '../components/CandidateCard'

import HeaderTitle from '../components/HeaderTitle'

export default function Favorite() {
    const { savedCandidates } = useSelector((state) => state)

    return (
        <div className="container mx-auto flex flex-row shadow-2xl rounded-lg">
            <Sidebar />

            <div className="w-5/6 rounded-tr-lg rounded-br-lg p-5 h-screen overflow-auto">
                <HeaderTitle title={'Saved Candidates'} />

                <div className="container flex flex-row flex-wrap mt-3">
                    {savedCandidates.map((candidate, idx) => {
                        return <CandidateCard key={'candidate' + idx} candidate={candidate} />
                    })}
                </div>
            </div>
        </div>
    )
}

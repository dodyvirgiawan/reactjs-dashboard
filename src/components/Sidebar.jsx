import { Link } from 'react-router-dom'

import { MdDashboard } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'

import SidebarButton from './SidebarButton'

export default function Sidebar() {
    return (
        <div className="w-1/6 bg-gray-200 rounded-tl-lg rounded-bl-lg p-5">
            <h1 className="text-lg font-semibold mt-5 text-gray-800">Candidate Dashboard</h1>
            <hr className="border-1 border-black opacity-20 mt-5"></hr>

            <div className="container mt-5 p-2">
                <Link to="/">
                    <SidebarButton logo={MdDashboard} text={'Dashboard'} />
                </Link>
                <Link to="/favorites">
                    <SidebarButton logo={CgProfile} text={'Saved Candidates'} />
                </Link>
            </div>
        </div>
    )
}

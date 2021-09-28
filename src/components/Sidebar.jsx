// ~~~~~~~~~~~~~~~~~~ Routers ~~~~~~~~~~~~~~~~~~
import { Link } from 'react-router-dom'

// ~~~~~~~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~
import { MdDashboard } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { RiCalendarTodoFill } from 'react-icons/ri'
import SidebarButton from './SidebarButton'

export default function Sidebar() {
    return (
        <div className="md:w-1/6 bg-gray-700 md:rounded-tl-lg md:rounded-bl-lg p-5">
            <h1 className="text-lg font-semibold mt-5 text-white">Candidate Dashboard</h1>
            <hr className="border-1 border-black opacity-20 mt-5"></hr>

            <div className="container mt-5 p-2">
                <Link to="/">
                    <SidebarButton logo={MdDashboard} text={'Dashboard'} />
                </Link>
                <Link to="/favorites">
                    <SidebarButton logo={CgProfile} text={'Saved Candidates'} />
                </Link>
                <Link to="/todos">
                    <SidebarButton logo={RiCalendarTodoFill} text={'Todos'} />
                </Link>
            </div>
        </div>
    )
}

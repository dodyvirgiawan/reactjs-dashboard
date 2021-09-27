import Sidebar from '../components/Sidebar'

export default function Favorite() {
    return (
        <div className="container mx-auto flex flex-row shadow-2xl rounded-lg">
            <Sidebar />

            <div className="w-5/6 rounded-tr-lg rounded-br-lg p-5 h-screen overflow-auto"></div>
        </div>
    )
}

import { BiCurrentLocation } from 'react-icons/bi'

export default function MapMarker(props) {
    const { text } = props

    return (
        <>
            <BiCurrentLocation />
            <div className="text-lg font-bold text-gray-800">{text}</div>
        </>
    )
}

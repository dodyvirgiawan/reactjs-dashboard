export default function HeaderTitle(props) {
    const { title } = props

    return (
        <>
            <h2 className="text-lg font-semibold mt-5 text-gray-600">{title}</h2>
            <hr className="border-1 border-black opacity-20 mt-5"></hr>
        </>
    )
}

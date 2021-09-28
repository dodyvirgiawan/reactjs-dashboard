export default function SidebarButton(props) {
    const { logo: Logo, text } = props

    return (
        <div className="container flex flex-row sidebar-btn">
            <div className="container w-1/4 mx-auto">
                <Logo className="mx-auto mt-1" style={{ color: 'white' }} />
            </div>
            <div className="container w-3/4 text-white text-sm mt-1">{text}</div>
        </div>
    )
}

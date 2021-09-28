import ReactLoading from 'react-loading'

export default function Loading() {
    return (
        <ReactLoading
            type={'spinningBubbles'}
            color={'#374151'}
            height={90}
            width={90}
            className="mx-auto mt-32"
        />
    )
}

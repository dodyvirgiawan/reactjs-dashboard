export default function isCandidateAlreadyProcessed(
    candidate,
    acceptedCandidates,
    declinedCandidates
) {
    const foundInAccepted = acceptedCandidates.find((el) => el.id === candidate.id)
    const foundInDeclined = declinedCandidates.find((el) => el.id === candidate.id)

    return foundInAccepted || foundInDeclined ? true : false
}

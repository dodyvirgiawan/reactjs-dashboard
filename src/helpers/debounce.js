export default function debounce(func) {
    let timer = null

    return function (...args) {
        const context = this
        clearTimeout(timer)
        timer = setTimeout(() => func.apply(context, args), 1000)
    }
}

export const privateRoute = () => {
    const token = localStorage.getItem('token')
    if (!token && window.location.pathname !== '/src/index.html' && window.location.pathname !== '/src' ) {
        location.href = '/src/index.html'
    }
}
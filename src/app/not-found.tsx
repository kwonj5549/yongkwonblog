// app/not-found.tsx
export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-8">
                Sorry, we couldn’t find the page you’re looking for.
            </p>
            <a
                href="/public"
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
                Go back home
            </a>
        </div>
    );
}

import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button"; // Ensure correct path

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex items-center justify-center h-screen w-full pl-8 bg-white dark:bg-slate-800  text-white px-6">
            <div className="text-center max-w-lg">
                {/* Error Code */}
                <h1 className="text-[160px] font-extrabold text-slate-700 leading-none md:text-[200px]">
                    404
                </h1>

                {/* Icon and Message */}
                <div className="flex flex-col items-center gap-4">
                    <AlertCircle className="h-16 w-16 text-red-500" />
                    <h2 className="text-4xl font-bold text-black dark:text-white">Page Not Found</h2>
                    <p className="text-lg text-slate-800 dark:text-white max-w-md">
                        Oops! We couldn't find the page you're looking for. It might have been moved or doesn't exist.
                    </p>
                </div>

                {/* Path Display */}
                <div className="bg-slate-800 py-3 px-4 rounded-md border border-slate-600 mt-4">
                    <p className="text-sm text-slate-100 font-mono dark:text-white">{location.pathname}</p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <Button asChild size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 text-black dark:text-white">
                        <Link to="/">
                            <Home className="h-4 w-4 text-black dark:text-white" />
                            Back to Home
                        </Link>
                    </Button>

                    <Button asChild variant="outline" size="lg" className="gap-2 text-black dark:text-white border-slate-400 hover:bg-slate-700">
                        <Link to="/">
                            <ArrowLeft className="h-4 w-4" />
                            Go Back
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

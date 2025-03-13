
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="quiz-container items-center justify-center">
      <div className="quiz-card text-center max-w-md mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-quiz-primary">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          Oops! This page has gone missing.
        </p>
        <Button 
          className="quiz-button-primary" 
          onClick={() => navigate("/")}
        >
          <Home className="mr-2 h-4 w-4" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

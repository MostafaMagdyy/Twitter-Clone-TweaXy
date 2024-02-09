import { CircularProgress } from '@mui/material';
import './LoadingPage.css';

const LoadingPage = () => {
    return (
        <div className="loading-page">
            <CircularProgress />
        </div>
    );
};

export default LoadingPage;

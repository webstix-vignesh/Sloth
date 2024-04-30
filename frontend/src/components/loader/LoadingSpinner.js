import '../../assets/styles/LoadingSpinner.css'; // Import your CSS file for styling
import { FadeLoader } from 'react-spinners';

const LoadingSpinner = () => {
    return (
      <div className="loading-spinner-container">
          <FadeLoader color="#3498db" />
      </div>
    );
  };
  
  export default LoadingSpinner;
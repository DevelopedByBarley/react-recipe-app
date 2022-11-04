import PulseLoader from "react-spinners/PulseLoader";
import './Spinner.css'

export function Spinner() {
  return (
    <div className="spinner">
      <PulseLoader
        color={"#c0f"}
        size={30}
        speedMultiplier={1}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
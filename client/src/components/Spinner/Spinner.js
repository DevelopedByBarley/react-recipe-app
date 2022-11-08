import MoonLoader from "react-spinners/MoonLoader";
import './Spinner.css'

export function Spinner() {
  return (
    <div className="spinner">
      <MoonLoader
        color={"#36d7b7"}
        size={50}
        speedMultiplier={1}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
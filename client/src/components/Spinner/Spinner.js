import MoonLoader from "react-spinners/MoonLoader";
import './Spinner.css'

export function Spinner() {
  return (
    <div className="spinner">
      <MoonLoader
        color={"black"}
        size={70}
        speedMultiplier={1}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
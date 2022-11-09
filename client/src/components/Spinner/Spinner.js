import ClipLoader from "react-spinners/ClipLoader";
import './Spinner.css'

export function Spinner() {
  return (
    <div className="spinner">
      <ClipLoader
        color={"#c06a29"}
        size={90}
        speedMultiplier={1}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>
  )
}
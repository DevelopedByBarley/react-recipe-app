import './SwitchTheme.css'

export function SwitchTheme({ setThemeDark}) {
    return (
        <div className="switch-theme-container">
            <button className="theme-btn theme-light-btn" onClick={() => {
                setThemeDark(false)
            }}></button>
            <button className="theme-btn theme-dark-btn" onClick={() => {
                setThemeDark(true)
            }}></button>
        </div>
    )
}
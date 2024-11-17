import { Link } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { useTheme } from "./theme-provider"
import { CitySearch } from "./Search";

const Header = () => {
    const { theme } = useTheme();
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
                <Link to={"/"}>
                    <img src={theme === "dark" ? "/logo.png" : "logo2.png"} alt="logo" className="h-14" />
                </Link>
                <div className="flex gap-2 lg:gap-4">
                    <CitySearch />
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}

export default Header 
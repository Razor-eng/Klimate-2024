import { CurrentWeather } from "@/components/CurrentWeather";
import { FavoriteCities } from "@/components/FavoriteCities";
import { HourlyTemperature } from "@/components/HourlyTemperature";
import LoadingSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import { WeatherDetails } from "@/components/WeatherDetails";
import { WeatherForecast } from "@/components/WeatherForecast";
import { useGeolocation } from "@/hooks/useGeolocation"
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/useWeather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"

const Dashboard = () => {
    const {
        coordinates,
        error: locationError,
        isLoading: locationLoading,
        getLocation,
    } = useGeolocation();

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery(coordinates);

    // Function to refresh all data
    const handleRefresh = () => {
        getLocation();
        if (coordinates) {
            weatherQuery.refetch();
            forecastQuery.refetch();
            locationQuery.refetch();
        }
    };

    if (locationLoading) {
        return <LoadingSkeleton />;
    }

    if (locationError) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>{locationError}</p>
                    <Button variant="outline" onClick={getLocation} className="w-fit">
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (!coordinates) {
        return (
            <Alert>
                <MapPin className="h-4 w-4" />
                <AlertTitle>Location Required</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Please enable location access to see your local weather.</p>
                    <Button variant="outline" onClick={getLocation} className="w-fit">
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    const locationName = locationQuery.data?.[0];

    if (weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Failed to fetch weather data. Please try again.</p>
                    <Button variant="outline" onClick={handleRefresh} className="w-fit">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Retry
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (!weatherQuery.data || !forecastQuery.data) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="space-y-4">
            <FavoriteCities />
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">My Location</h1>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRefresh}
                    disabled={weatherQuery.isFetching || forecastQuery.isFetching}
                >
                    <RefreshCw
                        className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""
                            }`}
                    />
                </Button>
            </div>

            <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CurrentWeather
                        data={weatherQuery.data}
                        locationName={locationName}
                    />
                    <HourlyTemperature data={forecastQuery.data} />
                </div>

                <div className="grid gap-6 md:grid-cols-2 items-start">
                    <WeatherDetails data={weatherQuery.data} />
                    <WeatherForecast data={forecastQuery.data} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { tripApi } from "@/api/tripApi";
import type { Trip } from "@/types/trip";
import { TripCard } from "@/components/trip/TripCard";
import { TripDialog } from "@/components/trip/CreateTripDialog";

export function TripsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    async function loadTrips() {
      try {
        const result = await tripApi.getTrips();
        setTrips(result);
      } catch (err) {
        setError("Failed to load trips");
      } finally {
        setLoading(false);
      }
    }

    loadTrips();
  }, []);

  const handleCreateTrip = () => {
    console.log("Create Trip Pressed");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="grid gap-4 p-16">
        <h1>Trips</h1>
        {trips.map((trip) => (
          <TripCard trip={trip} />
        ))}
      </div>

        <TripDialog createTrip={handleCreateTrip}/>
    </>
  );
}

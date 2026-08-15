import { useState, useEffect } from "react";
import { tripApi } from "@/api/tripApi";
import type { Trip, CreateTripRequest } from "@/types/trip";
import { TripCard } from "@/components/trip/TripCard";
import { TripDialog } from "@/components/trip/CreateTripDialog";

export function TripsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [openTripDialog, setOpenTripDialog] = useState(false);

  const loadTrips = async () => {
    try {
      setLoading(true);

      const result = await tripApi.getTrips();
      console.log(result)
      setTrips(result);
    } catch (err) {
      setError("Failed to load trips");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTrip = async (name: string) => {
    try {
      const request: CreateTripRequest = {
        name,
      };
      await tripApi.createTrip(request);
      await loadTrips();

      setOpenTripDialog(false);
    } catch (err) {
      // Keep dialog open so user can retry
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="grid gap-4 p-16">
        <h1>Trips</h1>
        {trips.map((trip, index) => (
          <TripCard key={index} trip={trip} />
        ))}
      </div>

      <TripDialog
        open={openTripDialog}
        toggleOpen={setOpenTripDialog}
        onCreateTrip={handleCreateTrip}
      />
    </>
  );
}

import type { Trip } from "@/types/trip";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TripCardProps = {
  trip: Trip;
};

export function TripCard({
  trip,
}: TripCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{trip.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <p>Status: {trip.status}</p>
      </CardContent>
    </Card>
  );
}
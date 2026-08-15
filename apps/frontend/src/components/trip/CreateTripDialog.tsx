import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type TripDialogProps = {
  open: boolean;
  toggleOpen: (open: boolean) => void;
  onCreateTrip: (name: string) => Promise<void>;
};

export function TripDialog({onCreateTrip}: TripDialogProps) {
  const [tripName, setTripName] = useState("");

const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();
  await onCreateTrip(tripName);
  setTripName("");
}

  return (
    <Dialog>
      <DialogTrigger>Create New Trip</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Trip</DialogTitle>
          <DialogDescription>Rawr</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FieldGroup>
            <Field>
              <Label>Trip Name</Label>
              <Input
                id="name"
                name="name"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
              ></Input>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

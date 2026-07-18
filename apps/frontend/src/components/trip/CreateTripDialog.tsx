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

type TripDialogProps = {
  // trip: Trip;
  createTrip: () => void;
};

export function TripDialog({ createTrip }: TripDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>Create New Trip</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Trip</DialogTitle>
          <DialogDescription>Rawr</DialogDescription>
        </DialogHeader>
        <form>
          <FieldGroup>
            <Field>
              <Label>Trip Name</Label>
              <Input id="name" name="name"></Input>
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={createTrip}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

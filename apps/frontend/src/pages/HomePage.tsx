import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getHealth } from "@/api/healthApi";

export function HomePage() {
  const [status, setStatus] = useState("");

  async function handleClick() {
    const result = await getHealth();
    setStatus(result.status);
  }

  return (
    <>
      <Button onClick={handleClick}>
        Test Backend
      </Button>

      <p>{status}</p>
    </>
  );
}
"use client";

import { useState } from "react";

import BootcampList, {
  Bootcamp,
} from "@/features/BootcampList/ui/BootcampList";

const Home = () => {
  const [selectedBootcamp, setSelectedBootcamp] = useState<Bootcamp | null>(
    null,
  );
  console.log(selectedBootcamp);
  return <BootcampList manage={false} onSelectBootcamp={setSelectedBootcamp} />;
};

export default Home;

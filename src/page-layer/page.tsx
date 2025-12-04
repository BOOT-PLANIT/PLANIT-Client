import { Button } from "@/shared/ui";

const Home = () => {
  return (
    <div>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>

      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>

      <Button variant="outline" size="lg">
        Large Outline
      </Button>

      <Button disabled>Disabled</Button>
    </div>
  );
};

export default Home;

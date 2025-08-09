import Carousel from "./(marketing)/components/Carousel";
import Card from "./(marketing)/components/Card";

export default function Home() {
  return (
    <>
      <Carousel />
      <h1 className="text-4xl text-center text-red-700 my-4">
        Top Teams
      </h1>
      <Card />
    </>
  );
}

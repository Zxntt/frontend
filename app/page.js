import Carousel from "./(marketing)/components/Carousel";
import Card from "./(marketing)/components/Card";

export default function Home() {
  return (
    <>
      <Carousel />
      <h1 className="text-4xl text-center text-blue-600 my-4 font-semibold">
        See who&apos;s at the door, from anywhere
      </h1>
      <p className="text-center text-gray-500 mb-6 max-w-xl mx-auto">
        Motion alerts, two way audio, and secure cloud storage in one smart doorbell.
      </p>
      <Card />
    </>
  );
}
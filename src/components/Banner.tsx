import { clear } from "console";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="relative w-full h-[400px] overflow-hidden">
      <Image
        src="/banner.jpg"
        alt="Banner de aventura"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Explore Aventuras Inesquecíveis</h2>
        <a
          href="#viagens"
          className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-full font-semibold"
        >
          Explorar Viagens
        </a>
      </div>
    </section>
  );
}
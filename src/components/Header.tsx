export default function Header() {
    return (
      <header className="bg-green-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Oxente Adventure</h1>
        <nav>
          <ul className="flex gap-4">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Viagens</a></li>
            <li><a href="#" className="hover:underline">Contato</a></li>
          </ul>
        </nav>
      </header>
    );
  }
  
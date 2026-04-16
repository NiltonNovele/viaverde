"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 text-gray-600 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm">
        
        <p className="text-gray-600">
          © 2026 ViaVerde. Todos os direitos reservados.
        </p>

        <p className="text-gray-600 mt-4 md:mt-0">
          Desenvolvido por{" "}
          <a
            href="https://www.synctechx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-700 font-semibold transition"
          >
            SyncTechX
          </a>
        </p>

      </div>
    </footer>
  );
}
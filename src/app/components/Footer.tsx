"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm">
        
        <p className="text-white/90">
          © 2026 ViaVerde. Todos os direitos reservados.
        </p>

        <p className="text-white/90 mt-2 md:mt-0">
          Desenvolvido por{" "}
          <a
            href="https://www.synctechx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white font-semibold"
          >
            SyncTechX
          </a>
        </p>

      </div>
    </footer>
  );
}
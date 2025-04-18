import Image from "next/image"; // <<< 1. Importar Image

export default function Banner() {
  return (
    // Container principal mantido com estilos inline
    <section style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
      {/* Imagem de Fundo - ALTERAÇÃO AQUI */}
      <Image
        src="/banner.jpg" // Certifique-se que o nome do arquivo está correto (era .png antes?)
        alt="Banner de aventura"
        layout="fill" // <<< 2. Usar layout="fill"
        objectFit="cover" // <<< 3. Usar objectFit="cover"
        priority // <<< 4. Adicionado priority (bom para LCP)
        // Estilos inline de posicionamento/tamanho removidos pois layout="fill" cuida disso
        // A propriedade zIndex é aplicada via className se necessário, mas podemos deixar no padrão ou no container
        // className="z-0" // Se precisar controlar o z-index explicitamente
      />
      {/* --- Fim da Alteração --- */}

      {/* Overlay (mantido igual) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1 // Garante que fique sobre a imagem
      }}></div>

      {/* Conteúdo (mantido igual) */}
      <div style={{
        position: 'relative', // Mantém relativo para ficar acima do overlay
        zIndex: 2, // Garante que fique sobre o overlay
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '1rem'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Descubra o poder transformador dos passeios na natureza com a Oxente Adventure!</h2>
        <a
          href="#viagens"
          style={{
            backgroundColor: '#ea580c', // Laranja padrão do Tailwind (orange-600)
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            fontWeight: 'bold',
            textDecoration: 'none',
            color: 'white'
          }}
        >
          Explorar Viagens
        </a>
      </div>
    </section>
  );
}
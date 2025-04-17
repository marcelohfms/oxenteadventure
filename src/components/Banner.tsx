export default function Banner() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
      <img
        src="/banner.jpg"
        alt="Banner de aventura"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1
      }}></div>
      <div style={{
        position: 'relative',
        zIndex: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '1rem'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Explore Aventuras Inesquecíveis</h2>
        <a
          href="#viagens"
          style={{
            backgroundColor: '#ea580c',
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

import { useState, useRef, useEffect } from "react";
import "../css/carrossel.css";

function Dashboard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const totalPages = 3;

  const updateCarousel = (index) => {
    const offset = index * -100;
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${offset}vw)`;

    }

  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : totalPages - 1));

      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prevIndex) => (prevIndex < totalPages - 1 ? prevIndex + 1 : 0));

      }

    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);

  }, []);

  useEffect(() => {
    updateCarousel(currentIndex);
    
  }, [currentIndex]);

  return (
    <main>
      <div className="carousel-wrapper">
        <button
            id="prev"
          className="nav-btn"
          aria-label="Previous Slide"
          onClick={() => setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : totalPages - 1)}
        >
          ⟨
        </button>

        <div className="carousel-container">
          <div className="carousel" ref={carouselRef}>
            {/* Página 1 */}
            <section className="carousel-page page-1" aria-labelledby="slide1">
              <div className="content">
                <div className="image-container">
                  <img src="/src/assets/veno.gif" alt="Venusaur" />
                </div>
                
                <div className="info-container">
                  <div className="info-card">
                    <h2>Venusaur</h2>
                    <div className="divider"></div>
                    <p><strong>Tipo:</strong> Grama/Veneno</p>
                    <div className="divider"></div>
                    <p><strong>Descrição:</strong> Venosauro, um Pokémon do tipo Grama/Veneno, fez sua estreia na Geração I. É a evolução de Ivysaur, ocorrendo no nível 32. Conhecido por ter uma grande flor em suas costas, Venosauro usa o poder da natureza e das toxinas para lutar. Ele é capaz de lançar sementes e venenos, criando uma defesa impenetrável ao mesmo tempo que causa dano ao adversário. É um dos Pokémon iniciais da região de Kanto, com destaque em títulos como Pokémon Red, Green, Azul, Vermelho-fogo e Verde-folha.</p>
                    <div className="divider"></div>
                    <p><strong>Ataques:</strong></p>
                    <ul>
                      <li>Solarbeam</li>
                      <li>Vine Whip</li>
                      <li>Poison Powder</li>
                      <li>Leech Seed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Página 2 */}
            <section className="carousel-page page-2" aria-labelledby="slide2">
              <div className="content">
                <div className="image-container">
                  <img src="/src/assets/bla.gif" alt="Blastoise" />
                </div>
                <div className="info-container">
                  <div className="info-card">
                    <h2>Blastoise</h2>
                    <div className="divider"></div>
                    <p><strong>Tipo:</strong> Água</p>
                    <div className="divider"></div>
                    <p><strong>Descrição:</strong> Blastoise, um Pokémon do tipo Água, foi introduzido na Geração I. Ele evolui de Wartortle no nível 36, tornando-se uma das figuras mais imponentes da região de Kanto. Com poderosos canhões de água em suas costas, Blastoise usa sua habilidade para realizar ataques de longo alcance com grande força. Sua resistência e poder de defesa o tornam uma escolha estratégica para batalhas. Ele é amplamente conhecido nos jogos Pokémon Red, Green, Azul, Vermelho-fogo e Verde-folha, onde demonstrou ser uma opção formidável para treinadores.</p>
                    <div className="divider"></div>
                    <p><strong>Ataques:</strong></p>
                    <ul>
                      <li>Hydro Pump</li>
                      <li>Water Gun</li>
                      <li>Ice Beam</li>
                      <li>Rapid Spin</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Página 3 */}
            <section className="carousel-page page-3" aria-labelledby="slide3">
              <div className="content">
                <div className="image-container">
                  <img src="/src/assets/char.gif" alt="Charizard" />
                </div>
                <div className="info-container">
                  <div className="info-card">
                    <h2>Charizard</h2>
                    <div className="divider"></div>
                    <p><strong>Tipo:</strong> Fogo/Voador</p>
                    <div className="divider"></div>
                    <p><strong>Descrição:</strong> Charizard, o imponente Pokémon do tipo Fogo, fez sua estreia na primeira geração de Pokémon, tornando-se um dos ícones da franquia. Evoluindo de Charmeleon no nível 36, Charizard se destaca como uma das três opções iniciais na região de Kanto, que foi introduzida em jogos como Pokémon Red, Green, Azul, Vermelho-fogo e Verde-folha. Com suas poderosas asas e seu fogo ardente, ele é capaz de incinerar qualquer adversário com seu golpe 'Lança-chamas'.</p>
                    <div className="divider"></div>
                    <p><strong>Ataques:</strong></p>
                    <ul>
                      <li>Flamethrower</li>
                      <li>Fire Spin</li>
                      <li>Fly</li>
                      <li>Slash</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <button
            id="next"
          className="nav-btn"
          aria-label="Next Slide"
          onClick={() => setCurrentIndex(currentIndex < totalPages - 1 ? currentIndex + 1 : 0)}
        >
          ⟩
        </button>
      </div>
    </main>
  );
}

export default Dashboard;

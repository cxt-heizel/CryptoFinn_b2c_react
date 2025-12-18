import styled from '@emotion/styled';

type IntegrationSymbol = {
  alt: string;
  src: string;
};

type ServiceHighlight = {
  title: string;
  description: string;
};

type Props = {
  symbols: IntegrationSymbol[];
  highlights: ServiceHighlight[];
  logoSrc: string;
};

export const MainIntroGraphics = ({ symbols, highlights, logoSrc }: Props) => {
  const logo = `${logoSrc}/ctf_bw_dbg_s.svg`;

  return (
    <GraphicsRoot id="main-intro-graphics">
      <div className="mobile-graphics">
        <div className="brand-wrapper">
          <svg className="wires" viewBox="0 0 100 145" style={{ height: '145px' }} preserveAspectRatio="none">
            <path className="wire" d="M6.8 27 C 10 130, 50 100, 50 145" />
            <path className="wire" d="M24 62 C 30 130, 50 80, 50 145" />
            <path className="wire" d="M38 27 C 40 130, 50 80, 50 145" />
            <path className="wire" d="M50 78 C 50 130, 50 80, 50 145" />
            <path className="wire" d="M62 27 C 60 130, 50 80, 50 145" />
            <path className="wire" d="M76 62 C 70 130, 50 85, 50 145" />
            <path className="wire" d="M93.2 27 C 90 130, 50 100, 50 145" />
          </svg>
          <ul className="symbol-list" aria-label="연동 거래소/체인">
            {symbols.map((symbol) => (
              <li key={symbol.alt}>
                <img src={symbol.src} alt={symbol.alt} />
              </li>
            ))}
          </ul>
        </div>
        <div className="service-logo" aria-label="CryptoFinn">
          <img src={logo} alt="CryptoFinn" />
        </div>
        <div className="service-wrapper">
          <svg className="wires" viewBox="0 0 100 60" style={{ height: '60px' }} preserveAspectRatio="none">
            <path className="wire" d="M50 0 C 40 30, 20 20, 20 60" />
            <path className="wire" d="M50 0 C 50 5, 50 60, 50 60" />
            <path className="wire" d="M50 0 C 60 30, 80 20, 80 60" />
          </svg>
          <ul className="service-list">
            {highlights.map((service) => (
              <li className="card" key={service.title}>
                <p>{service.description}</p>
                <div className="list-h1">{service.title}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="desktop-graphics">
        <div className="brand-wrapper">
          <svg className="wires" viewBox="0 0 100 410" style={{ height: '410px' }} preserveAspectRatio="none">
            <path className="wire" d="M30 35 C 80 35, 60 115, 100 205" />
            <path className="wire" d="M45 105 C 70 95, 70 195, 100 205" />
            <path className="wire" d="M10 140 C 30 140, 70 205, 100 205" />
            <path className="wire" d="M30 205 C 40 205, 80 205, 100 205" />
            <path className="wire" d="M10 270 C 30 270, 70 205, 100 205" />
            <path className="wire" d="M45 305 C 70 295, 70 215, 100 205" />
            <path className="wire" d="M30 375 C 80 375, 60 295, 100 205" />
          </svg>
          <ul className="symbol-list" aria-label="연동 거래소/체인">
            {symbols.map((symbol) => (
              <li key={symbol.alt}>
                <img src={symbol.src} alt={symbol.alt} />
              </li>
            ))}
          </ul>
        </div>
        <div className="service-logo" aria-label="CryptoFinn">
          <img src={logo} alt="CryptoFinn" />
        </div>
        <div className="service-wrapper">
          <svg className="wires" viewBox="0 0 100 410" style={{ height: '410px' }} preserveAspectRatio="none">
            <path className="wire" d="M0 205 C 40 205, 40 35, 100 30" />
            <path className="wire" d="M0 205 C 80 205, 80 205, 100 205" />
            <path className="wire" d="M0 205 C 40 205, 40 375, 100 380" />
          </svg>
          <ul className="service-list">
            {highlights.map((service) => (
              <li className="card" key={service.title}>
                <div>
                  <p>{service.description}</p>
                  <div className="list-h1">{service.title}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GraphicsRoot>
  );
};

const GraphicsRoot = styled.section`
  width: 100%;
  display: grid;
  justify-items: center;
  gap: 30px;

  .wires {
    display: block;
    width: 100%;
  }

  .brand-wrapper {
    position: relative;
  }

  .brand-wrapper > svg {
    position: absolute;
    left: 0;
  }

  .brand-wrapper ul {
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
  }

  .brand-wrapper li {
    border-radius: 50%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 30px 0 rgba(1, 33, 103, 0.2);
    z-index: 1;
    overflow: hidden;
  }

  .brand-wrapper li:nth-of-type(1) {
    background: #f8fbfc;
  }
  .brand-wrapper li:nth-of-type(2) {
    background: #093687;
  }
  .brand-wrapper li:nth-of-type(3) {
    background: #314350;
  }
  .brand-wrapper li:nth-of-type(4) {
    background: #f8fbfc;
  }
  .brand-wrapper li:nth-of-type(5) {
    background: linear-gradient(121deg, #a229c5 -8.22%, #7b3fe4 79.81%);
  }
  .brand-wrapper li:nth-of-type(6) {
    background: #314350;
  }
  .brand-wrapper li:nth-of-type(7) {
    background: #f8fbfc;
  }

  svg.wires .wire {
    fill: none;
    stroke: #4d546a;
    stroke-opacity: 0.7;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-dasharray: 6 8;
    animation: flow 15s linear infinite;
    vector-effect: non-scaling-stroke;
  }

  .service-logo {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 60px;
    background: radial-gradient(62.56% 62.56% at 0% 73.48%, rgba(33, 146, 255, 0.5) 0%, rgba(33, 146, 255, 0) 100%),
      radial-gradient(38.74% 38.74% at 93.26% 92.17%, rgba(10, 0, 186, 0.6) 0%, rgba(10, 0, 186, 0) 100%),
      radial-gradient(56.21% 56.21% at 10% 6.77%, rgba(255, 164, 232, 0.65) 0%, rgba(255, 164, 232, 0) 100%),
      radial-gradient(50% 50% at 50% 50%, #020c1c 0%, #0e4177 100%);
    box-shadow: 0 8px 30px 0 rgba(1, 33, 103, 0.3);
    display: grid;
    place-items: center;
    margin-inline: auto;
  }

  .service-logo img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  p {
    margin: 0;
  }

  @keyframes flow {
    to {
      stroke-dashoffset: -200;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .wire {
      animation: none;
    }
  }

  & > div {
    width: 100%;
  }

  .mobile-graphics {
    display: none;
    flex-direction: column;
    gap: 0;
    height: fit-content;
    min-height: 427px;
    align-items: center;
    text-align: center;
  }

  .mobile-graphics .brand-wrapper {
    width: 100%;
    height: 145px;
  }

  .mobile-graphics .service-logo {
    width: 30%;
    max-width: 110px;
    border-radius: 25px;
  }

  .mobile-graphics .service-logo img {
    width: 60%;
    height: auto;
  }

  .mobile-graphics .symbol-list {
    width: 100%;
    height: 145px;
  }

  .mobile-graphics .symbol-list li {
    width: 40px;
    height: 40px;
  }

  .mobile-graphics .symbol-list li:nth-of-type(1) {
    top: 7px;
    left: calc(6.8% - 20px);
  }

  .mobile-graphics .symbol-list li:nth-of-type(2) {
    top: 42px;
    left: calc(24% - 10px);
  }
  .mobile-graphics .symbol-list li:nth-of-type(3) {
    top: 7px;
    left: calc(38% - 20px);
  }
  .mobile-graphics .symbol-list li:nth-of-type(4) {
    top: 58px;
    left: calc(50% - 20px);
  }
  .mobile-graphics .symbol-list li:nth-of-type(5) {
    top: 7px;
    right: calc(38% - 20px);
  }
  .mobile-graphics .symbol-list li:nth-of-type(6) {
    top: 42px;
    right: calc(24% - 10px);
  }
  .mobile-graphics .symbol-list li:nth-of-type(7) {
    top: 7px;
    right: calc(6.8% - 20px);
  }

  .mobile-graphics .service-wrapper {
    width: 100%;
    position: relative;
  }

  .mobile-graphics .service-wrapper > svg {
    top: 0;
  }
  .mobile-graphics .service-wrapper > ul {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .mobile-graphics .service-list {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 15px;
  }

  .mobile-graphics .service-list .card {
    flex: 1;
    border-radius: 10px;
    padding: 15px 10px;
    text-align: center;
    color: #dadde7;
    font-size: 14px;
    line-height: 100%;
    border: 1px solid #4d546a;
    background: #1d2033;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  .mobile-graphics .service-list .card .list-h1 {
    font-size: 16px;
    color: #fff;
  }

  @media screen and (max-width: 360px) {
    .mobile-graphics .service-list {
      flex-direction: column;
    }
    .mobile-graphics .service-list .card {
      width: 100%;
    }
  }

  .desktop-graphics {
    display: grid;
    grid-template-columns: 1fr 230px 1fr;
    align-items: center;
    max-width: 1296px;
    width: 100%;
  }

  .desktop-graphics .brand-wrapper {
    height: 410px;
  }

  .desktop-graphics .brand-wrapper svg,
  .desktop-graphics .brand-wrapper ul {
    top: 0;
  }

  .desktop-graphics .symbol-list li {
    width: 70px;
    height: 70px;
  }

  .desktop-graphics .symbol-list li:nth-of-type(1) {
    top: 0px;
    left: calc(30% - 35px);
  }

  .desktop-graphics .symbol-list li:nth-of-type(2) {
    top: 70px;
    left: calc(45% - 35px);
  }
  .desktop-graphics .symbol-list li:nth-of-type(3) {
    top: 105px;
    left: calc(10% - 35px);
  }
  .desktop-graphics .symbol-list li:nth-of-type(4) {
    top: 170px;
    left: calc(30% - 35px);
  }
  .desktop-graphics .symbol-list li:nth-of-type(5) {
    top: 235px;
    left: calc(10% - 35px);
  }
  .desktop-graphics .symbol-list li:nth-of-type(6) {
    top: 270px;
    left: calc(45% - 35px);
  }
  .desktop-graphics .symbol-list li:nth-of-type(7) {
    top: 340px;
    left: calc(30% - 35px);
  }

  .desktop-graphics .service-logo {
    padding: 68px 36px;
    border-radius: 60px;
    height: 230px;
    width: 230px;
  }

  .desktop-graphics .service-logo img {
    width: 100%;
    height: auto;
  }

  .desktop-graphics .service-wrapper {
    display: grid;
    grid-template-columns: 1fr 250px;
    width: 100%;
    align-items: stretch;
  }

  .desktop-graphics .service-wrapper ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .desktop-graphics .service-wrapper li {
    padding: 20px 32px;
    display: flex;
    gap: 30px;
    color: #dadde7;
    font-size: 15px;
    border-radius: 15px;
    border: 1px solid #4d546a;
    background: #1d2033;
    box-shadow: 0 8px 30px 0 rgba(1, 33, 103, 0.15);
  }

  .desktop-graphics .service-wrapper li .list-h1 {
    color: #fff;
    font-size: 18px;
    font-weight: 500;
  }

  @media screen and (max-width: 1280px) {
    .desktop-graphics {
      display: none;
    }

    .mobile-graphics {
      display: flex;
    }
  }
`;

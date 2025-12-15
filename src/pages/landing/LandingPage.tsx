import { Box } from '@mui/material';

export const LandingPage = () => {
  const handleContactClick = () => {
    window.location.href = '/contact#tax';
  };

  return (
    <Box sx={{ mt: 4, mb: 6 }}>
      <div className="site" data-product="tax">
        <main className="white-bg layout-product">
          <div className="container">
            <div className="title-wrapper">
              <div className="service-title">
                <h1>cryptofinn tax</h1>
                <img className="desktop-only" src="/assets/images/product/d_title_tax.svg" alt="cryptofinn partners" />
                <img className="mobile-only" id="title_cryptofinn" src="/assets/images/product/m_title_cryptofinn.svg" />
                <img className="mobile-only" id="title_tax" src="/assets/images/product/m_title_tax.svg" />
              </div>
              <p className="section-h3">가상자산 세금, 더 이상 혼란은 그만</p>
              <p className="section-b2">
                패시브 투자자부터 액티프 트레이더까지 모든 개인 투자자들을 위한 최적의 세금 솔루션을 제공합니다.<br />
                복잡한 가상자산 세금 계산, 크립토핀에 맡겨주세요
              </p>
              <p className="list-b3">* 크립토핀에서는 세금 신고 대행 업무나 기장 대행 업무를 직접 수행하지 않습니다.</p>
            </div>
            <button className="black h-56 desktop-only" onClick={handleContactClick}>
              개인 세무 서비스 문의하기
            </button>
            <button className="black h-44 mobile-only" onClick={handleContactClick}>
              개인 세무 서비스 문의하기
            </button>
          </div>
        </main>

        <section className="img-bg" data-child="1"></section>

        <section className="white-bg" data-child="2">
          <div className="container">
            <div className="title-wrapper">
              <h2 className="section-h4 t-center">가상자산 세금 신고준비, 이제 필수입니다</h2>
              <p className="section-b2 t-center">
                국내 가상자산 시장은 1,600만 명 이상의 투자자가 참여하는 대규모 투자 생태계로 성장했습니다
                <br />
                하지만 과세 체계가 여전히 복잡하고 불명확해 많은 투자자들이 사전에 어떻게 대비해야 할지 어려움을 느끼고 있습니다
              </p>
            </div>
            <div id="tax-why-need">
              <div className="top">
                <div>
                  <p className="section-b3">
                    <span className="section-b1 t-bold">대한민국 국민 3명 중 1명</span>은
                    <br />
                    가상자산 투자자
                  </p>
                  <div className="icon-wrapper">
                    <img src="/assets/images/product/tax_2_1_icon.svg" />
                    <img src="/assets/images/product/tax_2_2_icon.svg" />
                    <img src="/assets/images/product/tax_2_2_icon.svg" />
                  </div>
                </div>
                <div>
                  <p className="section-b1 t-bold">2027년 과세 시행, 카운트다운</p>
                  <p className="section-b3">
                    가상자산 과세는 2027년으로 유예되었지만,
                    <br />
                    이는 시장에 준비할 시간을 부여한 것에 불과합니다.
                    <br />
                    법제화의 방향은 이미 확정된 미래입니다.
                  </p>
                </div>
              </div>
              <div className="bottom">
                <div className="card dark-bg">
                  <p className="list-h1">복잡한 세법</p>
                  <p className="list-b1">
                    계속해서 <span className="t-medium">변화하는 과세기준</span>과
                    <br />
                    <span className="t-medium">명확하지 않은 신고 방식</span>으로
                    <br />
                    많은 개인 투자자들이 혼란을 겪고 있음
                  </p>
                </div>
                <div className="card dark-bg">
                  <p className="list-h1">복잡한 거래내역</p>
                  <p className="list-b1">
                    여러 거래소와 지갑을 이용하는 개인이 직접 <span className="t-medium">거래 내역을 통합하고 시점별 시세나 환율까지 반영해
                    정리하기는 까다로움</span>
                  </p>
                </div>
                <div className="card dark-bg">
                  <p className="list-h1">해외거래 신고</p>
                  <p className="list-b1">
                    해외 거래소나 개인 지갑에서 발생한
                    <br />
                    일부 거래는 <span className="t-medium">신고 대상 여부가 불분명</span>하고
                    <br />
                    <span className="t-medium">누락 시 불이익 위험</span>이 있음
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="dark-bg" data-child="3">
          <div className="container">
            <div className="title-wrapper">
              <h2 className="section-h4 t-center">
                3단계 만으로 세금 신고 준비 끝
                <br />
                <span className="mobile-block">크립토핀 개인 세무 서비스가</span>
                가장 쉽고 정확한 해결책을 제시합니다
              </h2>
              <p className="section-b2 t-center">흩어진 거래 내역 통합부터 복잡한 과세소득 계산까지 한 번에 자동으로 처리해 드립니다</p>
            </div>
            <div id="tax-connect-step">
              <div className="text-box">
                <p className="number">1</p>
                <p className="list-h2">원클릭 연동</p>
                <p className="list-b1">국내외 거래소와 지갑을 API로 안전하고 간편하게 연결하세요. CSV 파일 업로드도 물론 가능합니다.</p>
              </div>
              <div className="text-box">
                <p className="number">2</p>
                <p className="list-h2">과세소득 계산</p>
                <p className="list-b1" style={{ letterSpacing: '-0.03em' }}>
                  거래 당시의 코인 시가와 적용되는 환율 데이터가 연동되어 정확한 과세소득 계산 결과를 제공합니다.
                </p>
              </div>
              <div className="text-box">
                <p className="number">3</p>
                <p className="list-h2">맞춤형 세금 보고서</p>
                <p className="list-b1">
                  국세청 제출 양식부터 맞춤형 분석 리포트까지
                  <br />
                  자동 생성하여 세금 납부와 투자 의사결정에
                  <br />
                  모두 활용할 수 있습니다
                </p>
              </div>
            </div>

            <section id="main-intro-graphics">
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
                    <li>
                      <img height="30px" src="/assets/images/symbol_bithumb.svg" alt="Bithumb" />
                    </li>
                    <li>
                      <img width="33px" src="/assets/images/symbol_upbit.svg" alt="Upbit" />
                    </li>
                    <li>
                      <img height="26px" src="/assets/images/symbol_binance.svg" alt="Binance" />
                    </li>
                    <li>
                      <img height="28px" src="/assets/images/symbol_ethereum.svg" alt="Ethereum" />
                    </li>
                    <li>
                      <img width="26px" src="/assets/images/symbol_polygon.svg" alt="Polygon" />
                    </li>
                    <li>
                      <img width="23px" src="/assets/images/symbol_solana.svg" alt="Solana" />
                    </li>
                    <li>
                      <img height="26px" src="/assets/images/symbol_wemix.svg" alt="Wemix" />
                    </li>
                  </ul>
                </div>

                <div className="service-logo" aria-label="CryptoFinn">
                  <img src="/assets/images/logo/ctf_bw_dbg_s.svg" alt="CryptoFinn" />
                </div>

                <div className="service-wrapper">
                  <svg className="wires" viewBox="0 0 100 60" style={{ height: '60px' }} preserveAspectRatio="none">
                    <path className="wire" d="M50 0 C 40 30, 20 20, 20 60" />
                    <path className="wire" d="M50 0 C 50 5, 50 60, 50 60" />
                    <path className="wire" d="M50 0 C 60 30, 80 20, 80 60" />
                  </svg>
                  <ul className="service-list">
                    <li className="card">
                      <p>최신규정으로 산출하여 정확한</p>
                      <div className="list-h1">세금 시뮬레이션</div>
                    </li>
                    <li className="card">
                      <p>내 거래 데이터가 반영된</p>
                      <div className="list-h1">통합 대시보드</div>
                    </li>
                    <li className="card">
                      <p>6월 해외금융 계좌신고를 위한</p>
                      <div className="list-h1">해외금융계좌 리포트</div>
                    </li>
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
                    <li>
                      <img height="30px" src="/assets/images/symbol_bithumb.svg" alt="Bithumb" />
                    </li>
                    <li>
                      <img width="33px" src="/assets/images/symbol_upbit.svg" alt="Upbit" />
                    </li>
                    <li>
                      <img height="26px" src="/assets/images/symbol_binance.svg" alt="Binance" />
                    </li>
                    <li>
                      <img height="28px" src="/assets/images/symbol_ethereum.svg" alt="Ethereum" />
                    </li>
                    <li>
                      <img width="26px" src="/assets/images/symbol_polygon.svg" alt="Polygon" />
                    </li>
                    <li>
                      <img width="23px" src="/assets/images/symbol_solana.svg" alt="Solana" />
                    </li>
                    <li>
                      <img height="26px" src="/assets/images/symbol_wemix.svg" alt="Wemix" />
                    </li>
                  </ul>
                </div>

                <div className="service-logo" aria-label="CryptoFinn">
                  <img src="/assets/images/logo/ctf_bw_dbg_s.svg" alt="CryptoFinn" />
                </div>

                <div className="service-wrapper">
                  <svg className="wires" viewBox="0 0 100 410" style={{ height: '410px' }} preserveAspectRatio="none">
                    <path className="wire" d="M0 205 C 40 205, 40 35, 100 30" />
                    <path className="wire" d="M0 205 C 80 205, 80 205, 100 205" />
                    <path className="wire" d="M0 205 C 40 205, 40 375, 100 380" />
                  </svg>
                  <ul className="service-list">
                    <li className="card">
                      <div>
                        <p>최신규정으로 산출하여 정확한</p>
                        <div className="list-h1">세금 시뮬레이션</div>
                      </div>
                    </li>
                    <li className="card">
                      <div>
                        <p>세금 시뮬레이션</p>
                        <div className="list-h1">통합 대시보드</div>
                      </div>
                    </li>
                    <li className="card">
                      <div>
                        <p>6월 해외금융계좌신고를 위한</p>
                        <div className="list-h1">해외금융계좌 리포트</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <p className="list-b3">* 크립토핀에서는 세금 신고 대행 업무나 기장 대행 업무를 직접 수행하지 않습니다.</p>
          </div>
        </section>

        <section className="white-bg" data-child="4">
          <div className="container">
            <div className="title-wrapper">
              <h2 className="section-h4 t-center">세금신고 그 이상의 가치</h2>
              <p className="section-b2 t-center">단순한 세금 계산을 넘어, 성공적인 투자를 위한 다양한 기능을 제공합니다</p>
            </div>
            <div className="card-wrapper">
              <div className="card">
                <div className="text-container">
                  <p className="list-h1">실시간 포트폴리오 현황</p>
                  <p className="section-b3">모든 자산을 한 곳에서 통합 관리하며,수익률 변화를 실시간으로 확인하세요</p>
                </div>
                <div className="img-container">
                  <img className="desktop-only" src="/assets/images/product/tax_3_1.png" />
                  <img className="mobile-only" src="/assets/images/product/tax_3_1_m.png" />
                </div>
              </div>
              <div className="card">
                <div className="text-container">
                  <p className="list-h1">해외금융계좌 리포트</p>
                  <p className="section-b3" style={{ letterSpacing: '-0.04em' }}>
                    해외금융계좌 신고 여부 판단에 필요한 핵심 정보를 그래프로 제공하며, 과세 서식에 맞춰 월말 기준 거래소별 가상자산 잔액
                    정보까지 제공합니다
                  </p>
                </div>
                <div className="img-container">
                  <img className="desktop-only" src="/assets/images/product/tax_3_2.png" />
                  <img className="mobile-only" src="/assets/images/product/tax_3_2_m.png" />
                </div>
              </div>
              <div className="card">
                <div className="text-container">
                  <p className="list-h1">
                    전문가 연계 서비스 <span>준비중</span>
                  </p>
                  <p className="section-b3">복잡한 케이스는 제휴 세무법인의 전문가와 상담하여 완벽하게 해결하세요</p>
                </div>
                <div className="img-container">
                  <img className="desktop-only" src="/assets/images/product/tax_3_3.png" />
                  <img className="mobile-only" src="/assets/images/product/tax_3_3_m.png" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grey-bg">
          <div className="container">
            <div className="title-wrapper">
              <h2 className="section-h4 t-center">자주 묻는 질문</h2>
              <p className="section-b2 t-center">서비스 이용 과정에서 자주 문의하시는 사항을 정리하여 안내드립니다.</p>
            </div>
            <ul className="accordion-list">
              <li className="accordion-item">
                <a href="#" className="accordion-link">
                  <div className="accordion-name">크립토핀은 세무 대리와 기장 대행을 직접 해주는 서비스인가요?</div>
                </a>
                <div className="accordion-desc">
                  아니요, 크립토핀에서는 직접적인 세무 대리 와 기장 대행 업무를 수행하지 않습니다. 저희 서비스는 복잡한 가상자산 거래 내역을
                  수집하고 정리하여 사용자가 세무 신고를 원활하게 진행할 수 있도록 돕는 "세무 보조 자동화 솔루션" 입니다.
                  <br />
                  <br />
                  세무 대리, 절세상담, 기장대행, 세금환급 등 세무사/회계사 자격이 필요한 업무에 대해서는 가까운 세무/회계 사무소에 문의
                  주시거나, 원하시는 경우 저희와 제휴를 맺고 있는 세무/회계 법인에 연결해 드리고 있사오니 참고부탁드립니다.
                  <br />
                </div>
              </li>
              <li className="accordion-item">
                <a href="#" className="accordion-link">
                  <div className="accordion-name">API 정보는 안전하게 관리 되나요?</div>
                </a>
                <div className="accordion-desc">
                  1. 암호화 저장 - 발급된 API 키는 평문으로 저장되지 않으며, 검증된 암호화 알고리즘을 사용해 안전하게 보관합니다.
                  <br />
                  2. 전송 구간 보호 - API 키가 네트워크를 통해 전달될 때는 TLS(HTTPS) 암호화를 적용해 중간 탈취를 방지합니다.
                  <br />
                  3. 최소 권한 원칙 - API 키는 필요한 범위에서만 사용되며, 사용 범위가 최소화됩니다.
                  <br />
                  4. 접근 통제 및 감사 로그 - API 키에 대한 사용내역은 모두 로그 처리되며 주기적으로 모니터링하여 무단 사용을 방지합니다.
                  <br />
                </div>
              </li>
              <li className="accordion-item">
                <a href="#" className="accordion-link">
                  <div className="accordion-name">투자 손실이 발생하면 세금은 어떻게 되나요?</div>
                </a>
                <div className="accordion-desc">
                  투자 손실이 발생하면 해당 연도에는 세금을 내지 않습니다. 또한, 다른 연도 간 손익통산 규정이 아직은 존재 하지 않으므로
                  이월/소급 공제는 불가합니다.
                </div>
              </li>
              <li className="accordion-item">
                <a href="#" className="accordion-link">
                  <div className="accordion-name">세금 신고를 하지 않으면 어떤 불이익이 있나요?</div>
                </a>
                <div className="accordion-desc">신고 및 납부 지연 관련 가산세가 부과될 수 있습니다.</div>
              </li>
              <li className="accordion-item">
                <a href="#" className="accordion-link">
                  <div className="accordion-name">여러 거래소에 자산이 흩어져 있는데, 취득가액은 어떻게 계산되나요?</div>
                </a>
                <div className="accordion-desc">
                  여러 거래소에 자산이 흩어져 있더라도, 시스템 상에서 우선 거래내역을 시간순서 대로 통합합니다. 거래 내역이 시스템에 빠짐
                  없이 반영되었다면, 선택하신 취득원가 계산 방식에 따라 자동으로 원가가 계산됩니다.
                </div>
              </li>
              <li className="accordion-item">
                <a href="#" className="accordion-link">
                  <div className="accordion-name">가족에게 코인을 증여했는데 이것도 과세 대상이 되나요?</div>
                </a>
                <div className="accordion-desc">가상자산 소득세 과세 대상은 아니지만, 증여세가 부과될 수 있습니다.</div>
              </li>
              <li className="accordion-item">
                <a href="#" className="accordion-link">
                  <div className="accordion-name">가상자산을 물건 구매에 사용한 경우에도 과세 대상이 되나요?</div>
                </a>
                <div className="accordion-desc">
                  네, 가상자산을 물건 구매에 사용한 경우 대물변제로 보아 실현 손익을 인식합니다 . 이 때, 물건 가격이 총 수입금액이 되어
                  과세 소득을 구하게 됩니다.
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </Box>
  );
};

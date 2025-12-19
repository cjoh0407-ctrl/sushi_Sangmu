import { useState, useEffect } from 'react';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Detail from './components/Detail';
import NotFound from './components/NotFound';
import About from './components/About';
import Title from './components/Title';
import Footer from './components/Footer';
import Cart from "./components/Cart";
import Board from "./components/Board";
import MenuPage from "./components/MenuPage";
import menuData from "./db/menuData";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Link } from 'react-router-dom';
import todayData from "./db/today.json";




function App() {

  const allMenuItems = menuData.flatMap(section => section.items || []);
  const [menu, setMenu] = useState(allMenuItems);
  const [menuSort, setMenuSort] = useState("");
  const navigate = useNavigate();
  const [visibleRows, setVisibleRows] = useState(1); // 보이는 줄 수
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showMoreRows = () => {
  setVisibleRows(prevRows => prevRows + 1);
  };

  const openModal = (item) => {
  setSelectedItem(item);
  setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const sortByName = () => {
    let sortedMenu = [...menu].sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));
    setMenu(sortedMenu);
  };

  const sortByPriceLowToHigh = () => {
    let sortedMenu = [...menu].sort((a, b) => a.price - b.price);
    setMenu(sortedMenu);
  };

  const sortByPriceHighToLow = () => {
    let sortedMenu = [...menu].sort((a, b) => b.price - a.price);
    setMenu(sortedMenu);
  };


  const sliderImages = [
    process.env.PUBLIC_URL + '/img/slider_image/1.jpg',
    process.env.PUBLIC_URL + '/img/slider_image/2.jpg',
    process.env.PUBLIC_URL + '/img/slider_image/3.jpg',
    process.env.PUBLIC_URL + '/img/slider_image/4.jpg',
    process.env.PUBLIC_URL + '/img/slider_image/5.jpg',
    process.env.PUBLIC_URL + '/img/slider_image/6.jpg',
    process.env.PUBLIC_URL + '/img/slider_image/7.jpg',
  ];


  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);


  const handleSortChange = (val) => {
    //console.log('App.js: 정렬 기준 변경 확인 ->', val);
    setMenuSort(val);
    if (val === "low") sortByPriceLowToHigh();
    if (val === "high") sortByPriceHighToLow();
    if (val === "name") sortByName();
  };

  return (
    <div className="App">
      <img src={process.env.PUBLIC_URL + "/img/header.png"} alt="헤더 이미지" className="header-image" />

      <Navbar>
        <Container>
          <Nav className="mx-auto justify-content-center menu gap-5 ">
            <Nav.Link onClick={() => { navigate('/') }}>홈으로</Nav.Link>
            <Nav.Link onClick={() => { navigate('/menu') }}>메뉴</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail/201') }}>상세페이지</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>장바구니</Nav.Link>
            <Nav.Link onClick={() => { navigate('/about') }}>회사소개</Nav.Link>
            <Nav.Link onClick={() => { navigate("/Board"); }}> 게시판</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={
          <div>

            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }} 
              autoplay={{ 
                delay: 3000, 
                disableOnInteraction: false 
              }}
              loop={true}
              speed={2000} 
              style={{ height: "800px", width: "100%" }}
            >
              {sliderImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <div 
                    className="slider"
                    style={{
                      backgroundImage: `url(${img})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <div className="slider-text-overlay">
                      <h1>제대로 만든 초밥</h1>
                      <h1>가까이 하다</h1>
                      <p style={{ letterSpacing: '-0.01rem' }}>제대로 된 초밥의 대중화를 선도하다.</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

          
            {/* 메뉴 박스들 */}
            <div className="menu-section">
              <h2>상무초밥 메뉴</h2>
              <p className="menu-description">
                상무초밥만의 특별하고 다양한 메뉴
              </p>
              
              <div className="menu-boxes-container">
                <Link to="/menu?category=전체 메뉴">
                  <div className='menu-box' 
                    style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/imgi_154_1-1.jpg'})`}}>
                    <span className="menu-box-text">초밥</span>
                  </div>
                </Link>
                
                <Link to="/menu?category=사시미">
                  <div className='menu-box' 
                    style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/imgi_157_packing_img2.jpg'})`}}>
                    <span className="menu-box-text">사시미</span>
                  </div>
                </Link>
                
                <Link to="/menu?category=사이드">
                  <div className='menu-box' 
                    style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/side_menu/601.jpg'})`}}>
                    <span className="menu-box-text">사이드</span>
                  </div>
                </Link>
              </div>
            </div>

             {/* 메뉴 박스들 end */}

            {/* 5가지 약속 */}            
            <div className="promise-section"
              style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/imgi_43_lyr4_bg.jpg'})`}}>
              <img 
                src={process.env.PUBLIC_URL + '/img/lyr4_ttl.png'} 
                alt='5가지 약속 타이틀' 
                className="promise-title" />
              
              <p className="promise-text">
                건강하고 안전한 식재료만 쓰겠습니다.<br/>
                최상급 쌀로만 밥을 짓겠습니다.<br/>
                음식에 가격 이상의 가치를 담아내겠습니다.<br/>
                대한민국 초밥 대중화를 선도하겠습니다.<br/>
                전국 최고의 초밥 브랜드가 되기 위해 목숨 걸고 노력하겠습니다.
              </p>
              
              <img 
                src={process.env.PUBLIC_URL + '/img/lyr4_logo.png'} 
                alt='5가지 약속 로고' 
                className="promise-logo" />
            </div>

            {/* 5가지 약속 end */}

            <Title />

            
            <div className="delivery-section"
              style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/imgi_44_lyr5_bg.jpg'})`}}>
              <img 
                src={process.env.PUBLIC_URL + '/img/lyr5_moto.png'} 
                alt='오토바이 이미지' 
                className="delivery-bike" />
              <p className="delivery-title">고스란히 전하다.</p>
              <p className="delivery-subtitle">
                본연의 가치를 잃지 않는<br/>
                무결의 Delivery Service.
              </p>
            </div>


            {/* 지금 상무초밥은 */}
            <div className="today-section">
              <h2 className="today-title">지금 상무초밥은</h2>
              
              <div className="today-row">
                {todayData.slice(0, 3).map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => openModal(item)}
                    className="today-card"
                  >
                    <img 
                      src={process.env.PUBLIC_URL + item.image} 
                      alt={item.title}
                      className="today-card-image"
                    />
                    <div className="today-card-content">
                      <h3 className="today-card-title">{item.title}</h3>
                      <p className="today-card-description">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {visibleRows > 1 && (
                <div className="today-row">
                  {todayData.slice(3, 6).map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => openModal(item)}
                      className="today-card"
                    >
                      <img 
                        src={process.env.PUBLIC_URL + item.image} 
                        alt={item.title}
                        className="today-card-image"
                      />
                      <div className="today-card-content">
                        <h3 className="today-card-title">{item.title}</h3>
                        <p className="today-card-description">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {visibleRows > 2 && (
                <div className="today-row">
                  {todayData.slice(6, 9).map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => openModal(item)}
                      className="today-card"
                    >
                      <img 
                        src={process.env.PUBLIC_URL + item.image} 
                        alt={item.title}
                        className="today-card-image"
                      />
                      <div className="today-card-content">
                        <h3 className="today-card-title">{item.title}</h3>
                        <p className="today-card-description">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {visibleRows < 3 && (
                <button 
                  onClick={showMoreRows}
                  className="more-button"
                >
                  + 더보기
                </button>
              )}
            </div>


            {/* 모달 창 */}
            {isModalOpen && selectedItem && (
              <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <button className="modal-close-btn" onClick={closeModal}>
                    ×
                  </button>
                  <img 
                    src={process.env.PUBLIC_URL + selectedItem.image} 
                    alt={selectedItem.title}
                    className="modal-image"
                  />
                  <div className="modal-text">
                    <h2 className="modal-title">{selectedItem.title}</h2>
                    <p className="modal-description">{selectedItem.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 지금 상무초밥은 end */}

            {/* 올곧은 재료 섹션 */}
            <div className="ingredients-section"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + '/img/section.jpg'})`
              }}>
              <img 
                src={`${process.env.PUBLIC_URL}/img/vertical.png`} 
                alt="vertical" 
                className="ingredients-vertical-image"
              />

              <div className="ingredients-text-overlay">
                <div className="ingredients-text">
                  올곧은 재료가 올곧은 품질을 만듭니다.
                  <br />
                  믿고 먹을 수 있는 신선한 식재료를 최우선합니다.
                </div>
              </div>
            </div>

            {/* 올곧은 재료 섹션 end */}

            <Footer />

          </div>} />

        <Route path="detail/:paramId" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="about" element={<About />} ></Route>

        <Route path="/board" element={<Board />} />
        <Route path="/menu" element={<MenuPage menu={menu} menuSort={menuSort} onSortChange={handleSortChange} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from 'react';
import { addItem } from '../store.js'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import menuData from '../db/menuData';




function Detail() {


    const {paramId} = useParams();
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 


    const { selproduct, allProductIds, currentIndex } = useMemo(() => {
        let foundProduct = null;
        const productIds = [];

        menuData.forEach(section => {
            if (section.items) {
                section.items.forEach(item => {
                    productIds.push(item.id);
                    if (item.id === Number(paramId)) {
                        foundProduct = item;
                    }
                });
            }
        });

        return {
            selproduct: foundProduct,
            allProductIds: productIds,
            currentIndex: productIds.indexOf(Number(paramId))
        };
    }, [paramId]);

    if (!selproduct) {
        return <div>해당 상품이 존재하지 않습니다.</div>;
    }


    const { id, name, price, description, image } = selproduct;


    // 이전 상품으로 이동
    const handlePrevClick = () => {
        if (currentIndex > 0) {
            const prevId = allProductIds[currentIndex - 1];
            navigate(`/detail/${prevId}`);
        }
    };

    // 다음 상품으로 이동
    const handleNextClick = () => {
        if (currentIndex < allProductIds.length - 1) {
            const nextId = allProductIds[currentIndex + 1];
            navigate(`/detail/${nextId}`);
        }
    };


    return (
        <div className="container" style={{marginTop:50}}>
            <div className="row">
                <div className="col-md-6" style={{ position: 'relative' }}>
                    {/* 이미지 */}
                    <img src={image} width="100%" alt={name} />
                    
                    {/* 이전 메뉴 버튼 - 왼쪽에 배치 */}
                    <button 
                        onClick={handlePrevClick}
                        disabled={currentIndex === 0}
                        style={{
                            position: 'absolute',
                            left: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            padding: '15px 20px',
                            fontSize: '1.5rem',
                            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                            opacity: currentIndex === 0 ? 0.4 : 0.8,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            if (currentIndex !== 0) {
                                e.target.style.opacity = '1';
                                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (currentIndex !== 0) {
                                e.target.style.opacity = '0.8';
                                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                            }
                        }}
                    >
                        ←
                    </button>

                    {/* 다음 메뉴 버튼 - 오른쪽에 배치 */}
                    <button 
                        onClick={handleNextClick}
                        disabled={currentIndex === allProductIds.length - 1}
                        style={{
                            position: 'absolute',
                            right: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            padding: '15px 20px',
                            fontSize: '1.5rem',
                            cursor: currentIndex === allProductIds.length - 1 ? 'not-allowed' : 'pointer',
                            opacity: currentIndex === allProductIds.length - 1 ? 0.4 : 0.8,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            if (currentIndex !== allProductIds.length - 1) {
                                e.target.style.opacity = '1';
                                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (currentIndex !== allProductIds.length - 1) {
                                e.target.style.opacity = '0.8';
                                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                            }
                        }}
                    >
                        →
                    </button>
                </div>
                
                <div className="col-md-6">
                    <h5 className="pt-5" style={{ fontSize: '2rem', padding: 30}}>{name}</h5>
                    <p style={{ fontSize: '1.1rem', fontWeight: 'light', color: '#504c4cff'}}>{description}</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', padding: 10 }}>{price.toLocaleString()}원</p>
                    
                    {/* 주문하기 버튼 */}
                    <button className="btn btn-danger"
                        variant="primary"
                        onClick={() => {
                            const imgFile = image.replace(process.env.PUBLIC_URL + '/img/', '');

                            dispatch(
                                addItem({
                                    id: id,
                                    imgurl: imgFile,
                                    name: name,
                                    count: 1,
                                    price: price
                                })
                            );
                        }}
                        style={{ marginRight: "10px", fontSize: '1.2rem' }}
                    >
                        주문하기
                    </button>
                    <Link to="/cart" >
                        <Button variant="success" style={{ fontSize: '1.2rem' }}>주문상품 확인하기</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default Detail;

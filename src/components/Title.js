const Title = () => {
    return (
        <div style={{
            width: '100%',
            height: '750px',
            backgroundImage: `url(${process.env.PUBLIC_URL + '/img/int_img4.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        }}>
            <h1 style={{
                color: '#ffffff',
                fontSize: '48px',
                textAlign: 'center',
                lineHeight: 1.5,
                letterSpacing: '0.05em',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
            }}>
                제대로 된 셰프의 <br /> 제대로 만든 초밥을 즐기다.
            </h1>
        </div>
    );
};

export default Title;

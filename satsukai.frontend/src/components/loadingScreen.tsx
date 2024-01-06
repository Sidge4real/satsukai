const LoadingScreen = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="flex items-center flex-col sm:flex-row">
        <img style={{ width: "180px" }} src='brand.png' alt='logo' />
        <p style={{fontSize:"60px", color:"#999"}} className='expr'>Satsukai</p>
      </div>
    </div>
  );
  
  export default LoadingScreen;
  
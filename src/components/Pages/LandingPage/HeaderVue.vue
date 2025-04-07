<template>
  <header class="header">
    <div class="header-bg">
      <span class="logo" style="margin-top: 50px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="189" height="78" viewBox="0 0 189 78" fill="none">
          <path
            d="M153.638 0C153.638 22.4065 132.094 35.3713 116.008 36.0759C106.724 37.4146 32.9528 38.542 0 39.0352C32.9528 39.5285 106.724 40.6558 116.079 41.9241C132.165 42.6992 153.709 55.5935 153.709 78C153.709 57.0027 168.52 40.9377 189 38.9648C168.52 37.0623 153.638 20.9973 153.638 0Z"
            fill="#C6C6D0" />
        </svg>
      </span>
      <span class="text">
        <h1 class="title">STELLAR</h1>
        <p class="subtitle">L’AVENIR DU VTT EST LÀ</p>
      </span>
    </div>

    <div class="header-bg-content">
      <div class="features">

        <div class="feature-point" style="top: 20px; left: 150px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 23 23" fill="none">
            <circle cx="11" cy="11" r="11" fill="#C6C6D0" />
          </svg>
          <span>
            Légèreté
          </span>
        </div>

        <div class="feature-point" style="top: 70px; left: 80px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 23 23" fill="none">
            <circle cx="11" cy="11" r="11" fill="#C6C6D0" />
          </svg>
          <span>
            Robustesse
          </span>
        </div>

        <div class="feature-point" style="top: 120px; left: 8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 23 23" fill="none">
            <circle cx="11" cy="11" r="11" fill="#C6C6D0" />
          </svg>
          <span>
            Puissance
          </span>
        </div>

        <div class="feature-point" style="top: 170px; left: -80px;">
          <span class="line"></span>
          <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" viewBox="0 0 23 23" fill="none">
            <circle cx="11" cy="11" r="11" fill="#C6C6D0" />
          </svg>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
.header {
  z-index: 2;
  display: flex;
  flex-direction: row;
  background-image : url(../../../assets/image/pexels-pixabay-71104.jpg);
  background-size: 110%;
  background-repeat: no-repeat;

  box-shadow: 0px 0px 20px #C6C6D0;


  border-bottom-color: #C6C6D0;
}

.header-bg {
  position: relative;
  width: 50%;
  height: 820px;
  background: rgba(13, 29, 37, 0.5); /* Add transparency */
  backdrop-filter: blur(10px); /* Apply blur */
  -webkit-backdrop-filter: blur(10px); /* Safari support */

  clip-path: polygon(0 0, 100% 0, 100% 0, 0 100%);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 50px;
  color: white;

  gap: 20%;

}

.header-bg-content {
  position: relative;
  width: 50%;
  height: 820px;
  background: rgba(13, 29, 37, 0.5); /* Add transparency */
  backdrop-filter: blur(10px); /* Apply blur */
  -webkit-backdrop-filter: blur(10px); /* Safari support */

  clip-path: polygon(100% 0, 100% 0, 0 100%, 100% 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 50px;
  color: white;

  

}

.title {
  color: #C6C6D0;

  font-family: aktiv-grotesk-blackitalic, sans-serif;
  font-size: 64px;
  font-style: italic;
  font-weight: bolder;
  line-height: normal;

}

.subtitle {
  opacity: 0.5;

  font-family: PaperClip;
  font-size: 36px;
  font-style: normal;
  line-height: normal;
}

.feature-point {
  color: #C6C6D0;

  position: relative;
  display: flex;

  font-size: 16px;
  font-family: PaperClip;
  font-weight: lighter;

  gap: 50px;
}

.features {
  position: absolute;
  right: 40%;
  top: 60%;
  display: flex;
  flex-direction: column;
}



.line {
  position: absolute;
  width: 320px;

  border-top-color: #C6C6D0;
  border-top-width: 4px;
  border-top-style: solid;

  transform: rotate(-47deg);

  top: -105px;
  left: -25px;
}
</style>
<template>
  <footer class="footer">
    <h1 class="title">Stellar - <span>Plus qu'une innovation, une révolution</span></h1>
    <section>
      <div>
        <ul>
          <li class="sub-title">Contact rapide : </li>
          <ul class="sub-content">
            <li>01 23 45 67 89</li>
          </ul>
          <li class="sub-title">Suivez-nous : </li>
          <ul class="sub-content">
            <img src="/static-stuff/ig-logo.png" alt="insta" />
            <span class="divisor"></span>
            <img src="/static-stuff/fb-logo.png" alt="fb" />
            <span class="divisor"></span>
            <div class="masked-image"></div>
          </ul>
        </ul>
      </div>
      <div class="exhibit">
        <h2 class="sub-title" style="font-family: PaperClip; font-size: 34px;">www.stellar-sport.fr</h2>
      </div>
    </section>
    <section classs="separator">
      <svg xmlns="http://www.w3.org/2000/svg" width="189" height="78" viewBox="0 0 189 78" fill="none">
        <path
          d="M153.638 0C153.638 22.4065 132.094 35.3713 116.008 36.0759C106.724 37.4146 32.9528 38.542 0 39.0352C32.9528 39.5285 106.724 40.6558 116.079 41.9241C132.165 42.6992 153.709 55.5935 153.709 78C153.709 57.0027 168.52 40.9377 189 38.9648C168.52 37.0623 153.638 20.9973 153.638 0Z"
          fill="#C6C6D0" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="741" height="8" viewBox="0 0 741 8" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H737C738.933 0.5 740.5 2.067 740.5 4C740.5 5.933 738.933 7.5 737 7.5H4C2.067 7.5 0.5 5.933 0.5 4Z"
          fill="#C6C6D0" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="189" height="78" viewBox="0 0 189 78" fill="none">
        <path
          d="M35.3622 0C35.3622 22.4065 56.9055 35.3713 72.9921 36.0759C82.2756 37.4146 156.047 38.542 189 39.0352C156.047 39.5285 82.2756 40.6558 72.9213 41.9241C56.8347 42.6992 35.2914 55.5935 35.2914 78C35.2914 57.0027 20.4803 40.9377 0 38.9648C20.4803 37.0623 35.3622 20.9973 35.3622 0Z"
          fill="#C6C6D0" />
      </svg>
    </section>
    <section class="copyright">
      <p>© 2025 STELLAR. Tous droits réservés. Reproduction interdite. Innovation & Performance au service des
        passionnés.</p>
    </section>
  </footer>
</template>

<style scoped>
.copyright {
  color: #FFF;

  font-family: nunito-sans;

  font-size: 12px;
  /* font-style: normal; */
  font-weight: 400;
  /* line-height: normal; */
  margin: 15px;
}

.masked-image {
  width: 48px;
  /* or whatever size */
  height: 48px;

  background-color: #fff;
  /* The color you want behind the PNG shape */
  mask-image: url('/static-stuff/x-logo.png');
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: center;

  -webkit-mask-image: url('/static-stuff/x-logo.png');
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  -webkit-mask-position: center;

  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.title {
  font-family: aktiv-grotesk-blackitalic;
  list-style: none;

  text-transform: uppercase;

  display: flex;
  align-self: center;

}

.divisor {
  margin: 15px;
  height: 20px;

  border: 2px solid #ffffff;
}

.title span {
  margin: 15px;
  font-size: 24px;
  text-align: center;

  align-self: center;
  /* justify-self: center; */
  list-style: none;

  text-transform: none;
}

.sub-title {
  font-family: anton-regular;
  font-size: 24px;
  text-align: left;
  list-style: none;
}

.sub-content {
  font-family: PaperClip;
  font-size: 24px;
  text-align: left;
  list-style: none;

  display: flex;
  flex-direction: row;
}

li {
  list-style: none;
}

.footer {
  background: #111;
  color: white;
  /* padding: 20px; */
  height: 100%;
  /* width: 60%; */

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

}

.footer section {
  width: 70%;
  display: flex;
  flex-direction: row;
  gap: 20%;
  align-items: center;

  justify-content: center;
}
</style>
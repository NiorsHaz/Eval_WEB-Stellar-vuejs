<script>
import StellarZ from "../../Materials/StellarZLogo.vue";
import CustomButton from "../../Materials/CustomButton.vue";
import BoxContainer from "../../Materials/BoxContainer.vue"
import TextField from "../../Materials/TextField.vue";
import TextArea from "../../Materials/CustomTextarea.vue";
import Popup from "../../Materials/Popup.vue";
import DatePicker from "../../Materials/DatePicker.vue";

import { ref, computed } from "vue";

export default {
  components: {
    StellarZ,
    CustomButton,
    BoxContainer,
    TextField,
    TextArea,
    Popup,
    DatePicker,
  },
  data() {
    return {
      products: [
        { id: 1, name: "Stellar Grip", text: "Gant haute adherence pour un controle parfait", image: "/static-stuff/gloves.png" },
        { id: 2, name: "Stellar E-Ride", text: "Le vtt electrique aliant puissance et autonomie", image: "/static-stuff/ride.png" },
        { id: 3, name: "Stellar Shield", text: "Casque ultra-leger avec protection avancee", image: "/static-stuff/shield.png" }
      ],
      currentIndex: 0,
      showPopup: false,
      selectedDate: new Date(),
    };
  },
  setup() {
    const mediaList = ref([
      "/static-stuff/images.jpg",
      "/static-stuff/images (1).jpg",
      "/static-stuff/Display-Video.mp4",
    ]);

    const selectedMedia = ref(null);

    const isVideoFile = (media) => media.endsWith(".mp4") || media.endsWith(".webm");

    const isVideo = computed(() => selectedMedia.value && isVideoFile(selectedMedia.value));

    const selectMedia = (media) => {
      if (selectedMedia.value !== media) {
        selectedMedia.value = media;
        // Move selected media to the first position
        mediaList.value = [media, ...mediaList.value.filter((m) => m !== media)];
      }
    };

    return { mediaList, selectedMedia, isVideo, selectMedia, isVideoFile };
  },
  computed: {
    currentProduct() {
      return this.products[this.currentIndex];
    },
    previousProduct() {
      return this.products[(this.currentIndex - 1 + this.products.length) % this.products.length];
    },
    nextProduct() {
      return this.products[(this.currentIndex + 1) % this.products.length];
    }
  },
  methods: {
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.products.length;
    },
    previous() {
      this.currentIndex = (this.currentIndex - 1 + this.products.length) % this.products.length;
    }
  }
};
</script>

<template>
  <main>
    <Popup v-model="showPopup">
      <section class="popup-content">
        <div class="fillable">
          <h2 class="sub-title">Prenez rendez-vous</h2>
          <TextField style="width: 250px;" placeholder="example@mail.com"></TextField>
          <TextArea style="width: 300px; height: 200px;" placeholder="(Optionel) Message..."></TextArea>
        </div>
        <div>
          <DatePicker v-model="selectedDate" />
        </div>
      </section>
      <div style="margin-top: 25px;">
        <CustomButton size="small" text="Confirmer"/>
      </div>
    </Popup>
    <section class="showcase">
      <div class="pattern" style="top:0; z-index: 0;">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="1800" height="3000" viewBox="0 0 1280 1628" fill="none">
            <path
              d="M1644.05 922.155C1458.09 1124.65 1155.88 1063.1 1004.71 936.011C909.739 871.095 233.965 269.28 -67.8071 0.364567C225.779 278.195 882.839 900.387 956.815 989.452C1095.7 1129.91 1183.3 1425.16 997.335 1627.66C1171.6 1437.9 1438.73 1415.58 1640.11 1567.66C1470.89 1380.56 1469.79 1111.91 1644.05 922.155Z"
              fill="#3B3B3B" />
          </svg>
        </div>
        <!-- <img src="/static-stuff/guy.png" alt="image"> -->
      </div>
      <div class="main-content">
        <div class="image-placeholder">
          <img src="../../../assets/image/bicycle.png" alt="Velo">
          <div class="spotlight"></div>
        </div>

        <div class="features">
          <StellarZ></StellarZ>
          <div>
            <h2 class="subtitle">Audace. Innovation. Liberté.</h2>
          </div>
          <CustomButton @click="showPopup = true" text="Essayer le maintenant" size="large"></CustomButton>
        </div>
      </div>
    </section>

    <section class="media-player">
      <BoxContainer class="container">
        <!-- Display Area -->
        <div class="display">
          <template v-if="selectedMedia">
            <video v-if="isVideo" :src="selectedMedia" controls autoplay></video>
            <img v-else :src="selectedMedia" alt="Selected Media" />
          </template>
          <p v-else class="placeholder">Select a media to preview</p>
        </div>

        <!-- Media Selector -->
        <div class="selector">
          <div v-for="(media, index) in mediaList" :key="index" class="media-item" @click="selectMedia(media)">
            <video v-if="isVideoFile(media)" :src="media"></video>
            <img v-else :src="media" />
          </div>
        </div>
      </BoxContainer>
      <div class="logo" style="position:relative ;top: -75px; z-index: 1;">
        <svg xmlns="http://www.w3.org/2000/svg" width="354" height="147" viewBox="0 0 354 147" fill="none">
          <path
            d="M287.18 0.193237C287.18 42.3009 246.944 66.665 216.9 67.9892C199.561 70.5051 61.781 72.6237 0.236511 73.5506C61.781 74.4775 199.561 76.5961 217.032 78.9795C247.076 80.4361 287.312 104.668 287.312 146.775C287.312 107.316 314.974 77.1257 353.224 73.4182C314.974 69.843 287.18 39.6526 287.18 0.193237Z"
            fill="#C6C6D0" />
        </svg>
      </div>
      <div class="showlight" style=" position:relative ;top: -300px;">
      </div>
      <span class="title" style="position:relative; bottom:300px;">Autres Produits</span>
    </section>

    <section class="other-product">
      <div class="pattern" style="z-index: 0;">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="1800" height="2500" viewBox="0 0 1280 1419" fill="none">
            <path
              d="M349.58 1418.69C201.635 1186.96 338.738 910.691 500.383 797.232C587.512 722.116 1342.69 223.564 1680.09 0.97538C1336.18 213.362 566.111 688.595 461.035 737.217C289.62 835.373 -18.2252 844.205 -166.171 612.476C-27.53 829.631 -74.5668 1093.53 -273.258 1249.1C-48.9787 1133.61 210.939 1201.53 349.58 1418.69Z"
              fill="#3B3B3B" fill-opacity="0.7" />
          </svg>
        </div>
        <!-- <img src="/static-stuff/loc.png" alt="image"> -->
      </div>
      <!-- Previous Item -->
      <div class="previous-item" @click="previous">
        <img :src="previousProduct.image" :alt="previousProduct.name" />
        <p>{{ previousProduct.name }}</p>
      </div>

      <!-- Current Item with Transition -->
      <transition name="fade-slide" mode="out-in">
        <div class="current-item" :key="currentProduct.id">
          <img :src="currentProduct.image" :alt="currentProduct.name" />
          <div class="spotlight" style="width: 400px;"></div>
          <span class="item-name">{{ currentProduct.name }}</span><br />
          <div class="item-content">
            <span class="previous-button" v-on:click="previous()">
              <svg xmlns="http://www.w3.org/2000/svg" width="90" height="16" viewBox="0 0 105 16" fill="none">
                <path
                  d="M104.707 8.70711C105.098 8.31658 105.098 7.68342 104.707 7.29289L98.3431 0.928932C97.9526 0.538408 97.3195 0.538408 96.9289 0.928932C96.5384 1.31946 96.5384 1.95262 96.9289 2.34315L102.586 8L96.9289 13.6569C96.5384 14.0474 96.5384 14.6805 96.9289 15.0711C97.3195 15.4616 97.9526 15.4616 98.3431 15.0711L104.707 8.70711ZM0 9H104V7H0V9Z"
                  fill="white" />
              </svg>
            </span>
            <span class="item-description">
              {{ currentProduct.text }}
            </span>
            <span class="next-button" v-on:click="next()">
              <svg xmlns="http://www.w3.org/2000/svg" width="90" height="16" viewBox="0 0 105 16" fill="none">
                <path
                  d="M104.707 8.70711C105.098 8.31658 105.098 7.68342 104.707 7.29289L98.3431 0.928932C97.9526 0.538408 97.3195 0.538408 96.9289 0.928932C96.5384 1.31946 96.5384 1.95262 96.9289 2.34315L102.586 8L96.9289 13.6569C96.5384 14.0474 96.5384 14.6805 96.9289 15.0711C97.3195 15.4616 97.9526 15.4616 98.3431 15.0711L104.707 8.70711ZM0 9H104V7H0V9Z"
                  fill="white" />
              </svg>
            </span>
          </div>
        </div>
      </transition>

      <!-- Next Item -->
      <div class="next-item" @click="next">
        <img :src="nextProduct.image" :alt="nextProduct.name" />
        <p>{{ nextProduct.name }}</p>
      </div>
    </section>

    <section class="contact">
      <div class="contact-content" style="z-index: 1;">
        <h1 class="sub-title" style="text-align: left;">Envie d'en savoir plus ?</h1>
        <ul>
          <li class="list">Appelez nous</li>
          <ul>
            <li class="sub-list">
              <p>Contact : <span>+38 xxx xx xx xx</span></p>
              <p>Email : <span>xxxxx@xxx</span></p>
            </li>
          </ul>
          <li class="list">Rendez-vous en magasin</li>
        </ul>

        <CustomButton class="gotomagasin" text="Accéder à la liste des produits" />
      </div>
      <div class="image-placeholder" style="justify-self:center">
        <img style="position: relative; z-index: 2; bottom: 15px; left: 10px;" src="/static-stuff/localisation.png"
          alt="image placeholder">
        <div class="spotlight" style="position: absolute; width: 350px; height: 200px; z-index: 1;"></div>
      </div>
    </section>

    <section class="final">
      <BoxContainer style="padding: 20px 20px;">
        <h2 class="sub-title" style="text-align:left;">Contactez nos fournisseurs</h2>
        <div class="identifier">
          <TextField placeholder="example@mail.com" size="large" style="max-width: 600px;" />
          <TextField placeholder="Object" size="large" style="max-width: 600px;" />
          <div style="width: 400px;"></div>
        </div>

        <div class="message">
          <TextArea placeholder="Message...." size="large" style="height: 350px;"></TextArea>
          <CustomButton text="Envoyer " size="small"
            style="position: relative; justify-self: right; margin-top: 15px;" />
        </div>
      </BoxContainer>
    </section>

  </main>
</template>

<style scoped>
.popup-content {
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  gap: 50px;
}

.popup-content .fillable{
  display: flex;
  flex-direction: column;

  gap: 15px;
}
.message {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  flex-flow: column;
}

.identifier {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  flex-flow: row;

  gap: 15px;

  margin-bottom: 15px;
}

.final {
  display: flex;

  align-items: center;
  justify-content: center;
}

.list {
  list-style-position: inside;

  font-family: anton-regular;
  font-size: 24px;
  color: #FFF;

  text-align: left;
}

.sub-list {
  list-style: none;

  font-family: anton-regular;
  text-align: left;
  font-size: 24px;
  color: #FFF;

  margin-left: 50px;
}

.gotomagasin {
  margin-top: 50px;
}

.sub-list p {
  line-height: 50px;
}

.sub-list span {
  font-family: PaperClip;
  font-weight: lighter;
}

.main-content {
  position: relative;
  width: 100%;
  height: 400px;

  display: flex;
  flex-direction: row;
  /* Ensure elements are side by side */
  align-items: center;
  /* Align items vertically */
  justify-content: space-between;
  /* Push them to opposite sides */
}

.image-placeholder {
  display: flex;
  width: 50%;
  /* Adjust width */
  height: 500px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;

}

.image-placeholder img {
  width: 500px
}

.features {

  width: 50%;
  /*Adjust width */
  flex-direction: column;
  /* Stack children inside */
  align-items: center;

  right: 0;
  top: 0;
  /* display: inline; */

  gap: 90px
}

.spotlight {
  width: 550px;
  height: 100px;
  flex-shrink: 0;

  align-self: center;

  background: radial-gradient(50% 50% at 50% 50%, #D9D9D9 0%, rgba(115, 115, 115, 0.00) 86.5%);
}

.subtitle {
  position: relative;

  font-family: PaperClip;
  color: #FFF;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
}

.media-player {
  margin-top: 250px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
}

.container {
  display: flex;
  flex-direction: row;

  align-items: center;

  padding: 8px 12px;

  gap: 15px;

  z-index: 1;
}

.display {
  display: flex;
  width: 50%;
  height: 70%;

  /* background: #D9D9D9; */
  border-radius: 40px;

  align-items: center;
  justify-content: center;

}

.display video,
.display img {
  width: 100%;
  /* Make it responsive */
  height: auto;
  /* Maintain aspect ratio */
  max-width: 600px;
  /* Maximum width limit */
  max-height: 400px;
  /* Maximum height limit */
  object-fit: contain;
  /* Ensures the whole media fits */
  border-radius: 14px;

}

.selector {
  width: 50%;
  height: 70%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-grow: 200px;

  max-height: 400px;

  gap: 5px 10px;

  align-items: center;

  /* background: #D9D9D9; */
  /* border-radius: 40px; */

  overflow-y: hidden;

}

.selector video,
.selector img {
  width: 100%;
  /* Make it responsive */
  height: auto;
  /* Maintain aspect ratio */
  max-width: 600px;
  /* Maximum width limit */
  max-height: 200px;
  /* Maximum height limit */
  border-radius: 14px;

}

.showlight {
  width: 145px;
  height: 500px;
  flex-shrink: 0;
  background: linear-gradient(180deg, #D9D9D9 0%, rgba(115, 115, 115, 0.00) 100%);
  z-index: 0;
}

.other-product {
  position: relative;
  top: -200px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 70px;

  margin-bottom: 150px;
}

.previous-item,
.next-item {
  width: 300px;
  cursor: pointer;
  opacity: 0.6;
  transition: transform 0.3s, opacity 0.3s;
}

.previous-item,
.next-item p {
  position: relative;
  /* bottom: -50px; */

  font-family: aktiv-grotesk-regular;
  font-size: 24px;
  color: #FFF;

  font-weight: bolder;
  text-transform: uppercase;

}

.current-item {
  display: flex;
  flex-direction: column;
  width: 400px;
  max-height: 700px;
  max-width: 600px;
  font-weight: bold;
  transform: scale(1.1);
  overflow: hidden;

  /* justify-content: center; */
  align-items: center;
}

.current-item .item-name {
  position: relative;
  /* bottom: -50px; */

  font-family: aktiv-grotesk-regular;
  font-size: 36px;
  color: #FFF;

  font-weight: bolder;

  text-transform: uppercase;

  line-height: 25px;
}

.current-item .item-description {
  display: flex;
  width: 50%;
  max-width: 250px;
  flex-shrink: 0;

  font-family: PaperClip;
  font-size: 24px;
  color: #D9D9D9;

  /* font-weight: bolder; */

  text-transform: uppercase;
  text-align: left;

  /* margin-left: -80px; */

  line-height: 25px;
}

.item-content {
  display: flex;
  flex-direction: row;

  justify-content: space-between;
}


.item-content .previous-button {
  transform: scaleX(-1);
}

.item-content .previous-button,
.next-button {
  cursor: pointer;
}

.previous-item:hover,
.next-item:hover {
  transform: scale(1.05);
  opacity: 1;
}

img {
  width: 100%;
  border-radius: 10px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.contact {
  display: flex;
  flex-direction: row;

  justify-content: center;
}

.sub-title {
  font-family: anton-regular;
  font-size: 36px;
  color: #FFF;
}
</style>
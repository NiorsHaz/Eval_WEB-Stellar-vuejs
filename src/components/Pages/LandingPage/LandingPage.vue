<script>
import HeaderSection from "./HeaderVue.vue";
import MainContent from "./MainVue.vue";
import FooterSection from "./FooterVue.vue";
import NavBar from '../../Materials/NavBar.vue';
import Link from "@/components/Materials/Link.vue";
import CustomButton from "@/components/Materials/CustomButton.vue";
import LoginPopup from "@/components/Materials/LoginPopup.vue";

import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  components: {
    HeaderSection,
    MainContent,
    FooterSection,
    NavBar,
    Link,
    CustomButton,
    LoginPopup
  },
  data() {
    return {
      items: [
        { text: 'Facture', href: '/facture' },
        { text: 'DashBoard', href: '/Dashboard' },
        { text: 'Boutique', href: '/boutique' },
        { text: 'Acceuil', href: '/' },
      ],
      focusedIndex: null,
      showLogin: false,
    }
  },
  setup() {
    const showNav = ref(false);
    const headerRef = ref(null);

    const handleScroll = () => {
      if (headerRef.value) {
        const headerBottom = headerRef.value.getBoundingClientRect().bottom;
        showNav.value = headerBottom <= 0;
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      showNav,
      headerRef,
    };
  },
  methods: {
    handleBlur() {
      // Wait to see if focus moved to another nav-link
      setTimeout(() => {
        this.focusedIndex = null;
      }, 100);
    },
    logout() {
      this.$userManager.logout();
      window.location.reload();
    },
    async handleLogin({ email, password }) {
      console.log(email, password);

      await this.$userManager.login(email, password);

      if (this.$userManager.isLoggedIn()) {
        this.showLogin = false;
        this.loading = false;
      }
      window.location.reload();
    },
  },
  computed: {
    username() {
      if (!this.$userManager.name) {
        return false;
      }
      else {
        return this.$userManager.name;
      }
    },
  }
};
</script>

<template>
  <transition name="slide-navbar">
    <NavBar v-if="showNav">
      <div style=" position: absolute; align-self: center; right: 20px; top: 25px;">
        <CustomButton v-if="!username" text="Se Connecter" size="small" @click="showLogin = true" />
        <div v-else style="display: flex; flex-direction: row; align-items: center;">
          <h1 style="color: #fff;">{{ username }}</h1>
          <CustomButton text="Deconnecter" size="small" @click="logout()" />
        </div>
      </div>
      <div v-for="(item, i) in items" :key="i" class="nav-link" :class="{
        focused: focusedIndex === i,
        blurred: focusedIndex !== null && focusedIndex !== i
      }" tabindex="0" @focus="focusedIndex = i" @blur="handleBlur">
        <Link :text="item.text" :to="item.href" />
      </div>
    </NavBar>
  </transition>
  <div class="page-container" id="Top">
    <LoginPopup v-model="showLogin" @login="handleLogin" />
    <div style="z-index: 3;" ref="headerRef">
      <HeaderSection />
    </div>
    <section class="separator">
      <svg xmlns="http://www.w3.org/2000/svg" width="354" height="147" viewBox="0 0 354 147" fill="none">
        <path
          d="M287.18 0.193237C287.18 42.3009 246.944 66.665 216.9 67.9892C199.561 70.5051 61.781 72.6237 0.236511 73.5506C61.781 74.4775 199.561 76.5961 217.032 78.9795C247.076 80.4361 287.312 104.668 287.312 146.775C287.312 107.316 314.974 77.1257 353.224 73.4182C314.974 69.843 287.18 39.6526 287.18 0.193237Z"
          fill="#C6C6D0" />
      </svg>
    </section>
    <MainContent />
    <section class="separator">
    </section>
    <FooterSection />
  </div>
</template>

<style>
.page-container {
  z-index: 2;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  text-align: center;
  background-image: linear-gradient(180deg, #242424 0%, #3A3A3A 100%);
  /* background-image: url(/public/static-stuff/bg-static.png); */
  background-size: contain;
  background-repeat: no-repeat;
  /* color: white; */

  gap: 50px;

  /* overflow-x: hidden; */
}

.pattern {
  z-index: 0;
  width: 100%;
  z-index: 0;
  position: absolute;

  display: flex;
  /* flex-direction: column; */

  /* justify-content: center; */
  /* align-items: center; */
  overflow-x: hidden;
}

.slide-navbar-enter-active,
.slide-navbar-leave-active {
  transition: all 0.3s ease;
}

.slide-navbar-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-navbar-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-navbar-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-navbar-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.nav-link {
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: scale(1);
}

.nav-link.focused {
  transform: scale(1.3);
}

.nav-link.blurred {
  transform: scale(0.9);
  opacity: 0.6;
}
</style>
<script setup>
import { ref, onMounted } from 'vue';
import ChartComponent from '@/components/Materials/ChartComponent.vue';
import BoxContainer from '@/components/Materials/BoxContainer.vue';
import NavBar from '@/components/Materials/NavBar.vue';
import CustomButton from '@/components/Materials/CustomButton.vue';
import Link from '@/components/Materials/Link.vue';
import { bridge } from '@/api/bridge';

// Chart logic
const chartData = ref([]);
const chartData2 = ref([]);

const getProductOrderStats = (orders) => {
    const stats = {};
    orders.forEach(order => {
        (order.lines || []).forEach(line => {
            const ref = line.ref;
            const qty = parseFloat(line.qty || 1);
            if (!stats[ref]) stats[ref] = 0;
            stats[ref] += qty;
        });
    });

    return Object.entries(stats).map(([ref, total]) => ({ ref, total }));
};
const getValidOrdersStats = (orders) => {
  const stats = {};

  orders.forEach(order => {
    const dateValidation = order.date_validation;

    // Only count the orders that have been validated (non-null date_validation)
    if (dateValidation) {
      // Convert the timestamp to a date string (optional: you can format it differently)
      const dateKey = new Date(dateValidation * 1000).toLocaleDateString();

      if (!stats[dateKey]) {
        stats[dateKey] = 0;
      }
      stats[dateKey]++;
    }
  });

  // Convert stats object to an array of {date, count}
  return Object.entries(stats).map(([date, count]) => ({
    date,
    count
  }));
}

onMounted(async () => {
    const orders = await bridge.getOrder();
    chartData.value = getProductOrderStats(orders);
    const validorders = getValidOrdersStats(orders);
    console.log(validorders);
    chartData2.value = validorders;
});

// NavBar logic
const items = [
    { text: 'Acceuil', href: '/' },
    { text: 'Boutique', href: '/boutique' },
    { text: 'DashBoard', href: '/dashboard' },
];

const focusedIndex = ref(null);
const showLogin = ref(false);
const showCart = ref(false);
const username = ref(localStorage.getItem('username') || '');

const logout = () => {
    localStorage.removeItem('username');
    username.value = '';
};

const handleshowCart = () => {
    showCart.value = true;
};
</script>

<template>
    <header>
        <NavBar style="position: relative; display: flex; justify-content: center; flex-shrink: 0; gap: 30%;">
            <div style="display: flex; flex-direction: row;">
                <CustomButton size="small" style="background: none;" @click="handleshowCart">
                    <template #icon>
                        <img src="/static-stuff/panier.svg" alt="panier" width="48" />
                    </template>
                </CustomButton>

                <CustomButton v-if="!username" text="Se Connecter" size="small" @click="showLogin = true" />
                <div v-else style="display: flex; flex-direction: row; align-items: center;">
                    <h1 style="color: #fff;">{{ username }}</h1>
                    <CustomButton text="Deconnecter" size="small" @click="logout" />
                </div>
            </div>

            <span style="display: flex; flex-direction: row; max-width: 400px; gap: 80px;">
                <div v-for="(item, i) in items" :key="i" class="nav-link" :class="{
                    focused: focusedIndex === i,
                    blurred: focusedIndex !== null && focusedIndex !== i
                }" @mouseenter="focusedIndex = i" @mouseleave="focusedIndex = null">
                    <Link :text="item.text" :to="item.href" />
                </div>
            </span>
        </NavBar>
    </header>

    <main>
        <BoxContainer class="chart-container">
            <h1 class="title">Produit totale commander</h1>
            <ChartComponent v-if="chartData.length" :data="chartData" xKey="ref" yKey="total" chartType="bar" />
        </BoxContainer>

        <BoxContainer class="chart-container">
            <h1 class="title">Commande Valider</h1>
            <ChartComponent v-if="chartData2.length" :data="chartData2" xKey="date" yKey="count" chartType="line"/>
        </BoxContainer>
    </main>

    <footer>

    </footer>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    flex: 1;

    margin: 15px;

    padding: 15px 15px;
}

.chart-container {
    display: flex;
    align-items: center;

    flex-direction: column;
    justify-content: center;
}

.focused {
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
}

.blurred {
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
}
</style>

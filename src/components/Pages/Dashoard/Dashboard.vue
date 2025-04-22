<script setup>
import { ref, onMounted } from 'vue';
import ChartComponent from '@/components/Materials/ChartComponent.vue';
import BoxContainer from '@/components/Materials/BoxContainer.vue';
import NavBar from '@/components/Materials/NavBar.vue';
import CustomButton from '@/components/Materials/CustomButton.vue';
import Link from '@/components/Materials/Link.vue';
import { bridge } from '@/api/bridge';
import FooterVue from '../LandingPage/FooterVue.vue';
// Chart logic
const chartData = ref([]);
const chartData2 = ref([]);
const getProductOrderStats = (orders) => {
    let result = [{ ref: 'SP', total: 0 }];

    const stats = {};
    orders.forEach(order => {
        (order.lines || []).forEach(line => {
            const ref = line.ref;
            const qty = parseFloat(line.qty || 1);
            if (!stats[ref]) stats[ref] = 0;
            stats[ref] += qty;
        });
    });
    result = result.concat(Object.entries(stats).map(([ref, total]) => ({
        ref,
        total
    })));

    return result;

    // return Object.entries(stats).map(([ref, total]) => ({ ref, total }));
};
function getValidOrdersStats(orders) {
    const stats = {};

    // Step 1: Get the earliest validated order to determine the start year
    const earliestOrder = orders.reduce((earliest, order) => {
        const dateValidation = order.date_validation;
        if (dateValidation) {
            return (earliest === null || dateValidation < earliest) ? dateValidation : earliest;
        }
        return earliest;
    }, null);

    // If there's a valid order, use its year as the start date
    const startDate = earliestOrder ? new Date(earliestOrder * 1000).getFullYear() : new Date().getFullYear();

    // Step 2: Create the start array with the first year's start date
    let result = [{ date: `1/1/${startDate}`, count: 0 }]; // Start with the first day of the first year

    // Step 3: Calculate the stats for valid orders
    orders.forEach(order => {
        const dateValidation = order.date_validation;

        // Only count the orders that have been validated (non-null date_validation)
        if (dateValidation) {
            const dateKey = new Date(dateValidation * 1000).toLocaleDateString(); // Format the date

            // Increment the count for each valid order
            if (!stats[dateKey]) {
                stats[dateKey] = 1;
            } else {
                stats[dateKey]++;
            }
        }
    });

    // Step 4: Merge start array with stats and return
    result = result.concat(Object.entries(stats).map(([date, count]) => ({
        date,
        count
    })));

    return result;
}

onMounted(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        showLogin.value = true;
    }
    else{
        const orders = await bridge.getOrder();
        chartData.value = getProductOrderStats(orders);
        const validorders = getValidOrdersStats(orders);
        console.log(validorders);
        chartData2.value = validorders;
    }
});


async function handleLogin({ email, password }) {
    console.log(email, password);

    await this.$userManager.login(email, password);

    if (this.$userManager.isLoggedIn()) {
        this.showLogin = false;
        this.loading = false;
    }
    window.location.reload();
}
// NavBar logic
const items = [
    { text: 'Acceuil', href: '/' },
    { text: 'Boutique', href: '/boutique' },
    { text: 'DashBoard', href: '/dashboard' },
    { text: 'Facture', href: '/facture' },
];

const focusedIndex = ref(null);
const showLogin = ref(false);
const username = ref(localStorage.getItem('stellar_username'));
console.log(username.value);

const logout = () => {
    localStorage.removeItem('username');
    username.value = '';
};

const handleshowCart = () => {
    showCart.value = true;
};
</script>

<template>
    <LoginPopup v-model="showLogin" @login="handleLogin" />
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
            <ChartComponent v-if="chartData.length" :data="chartData" xKey="ref" yKey="total" chartType="bar" labelText="Quantité Commander" />
        </BoxContainer>

        <BoxContainer class="chart-container">
            <h1 class="title">Commande Valider</h1>
            <ChartComponent v-if="chartData2.length" :data="chartData2" xKey="date" yKey="count" chartType="line" labelText="commandes facturé"/>
        </BoxContainer>
    </main>

    <footer>
        <FooterVue />
    </footer>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    flex: 1;

    gap: 15px;

    margin: 15px;

    padding: 15px;
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

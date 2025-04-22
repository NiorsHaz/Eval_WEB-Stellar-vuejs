<script setup>
import { ref, onMounted } from 'vue';
import NavBar from '@/components/Materials/NavBar.vue';
import CustomButton from '@/components/Materials/CustomButton.vue';
import Link from '@/components/Materials/Link.vue';
import { bridge } from '@/api/bridge';
import FooterVue from '../LandingPage/FooterVue.vue';


// Chart logic
const chartData = [];
const od = [];
// const iddata = null;
onMounted(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        showLogin.value = true;
    }
    else {
        const orders = await bridge.getInvoice();
        const ord = await bridge.getOrder();
        console.log(ord);
        chartData.value = orders;
        od.value = ord;
        console.log(chartData.value);
    }
});

const getRefOrderViaInvoice = (orders, invoice) => {
    orders.forEach(order => {
        if (order.date_validation != "") {
            if (order.lines == invoice.lines) {
                return order.ref;
            }
        }
    })
    return null;
};

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
];

const focusedIndex = ref(null);
const showLogin = ref(false);
const username = ref(localStorage.getItem('stellar_username'));
console.log(username.value);

const logout = () => {
    localStorage.removeItem('username');
    username.value = '';
};

const generatePDF = (ref) => {
  const token = localStorage.getItem('token');
  if (token && ref) {
    const url = `http://localhost/Stellar/document.php?modulepart=facture&file=${ref}/${ref}.pdf&DOLAPIKEY=${token}`;
    window.open(url, '_blank');
  } else {
    alert('Missing token or invoice reference');
  }
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
        <div class="facture" v-for="(data, id) in chartData.value" :key="id" :id="id">
            <header>
                <h1>Facture {{ data.ref }}</h1>
                <p>Date facturation : {{ new Date(data.date_validation * 1000).toLocaleDateString() }}</p>
                <p>Date écheance : {{ !!new Date(data.date_cloture * 1000).toLocaleDateString() || new
                    Date(data.date_validation * 1000).toLocaleDateString() }}</p>
                <p>Rèf. commande : {{ data.ref.replace("IN", "SO") }} / {{ new
                    Date(data.date_validation
                    * 1000).toLocaleDateString() }}</p>
            </header>

            <div class="info">
                <div style="width: 40%;">
                    <h3>Emetteur</h3>
                    <div class="localisation">
                        <p>France</p>
                    </div>
                </div>
                <div style="width: 50%;">
                    <h3>Adressé à</h3>
                    <div class="fournisseur">
                        <h2>FRN3</h2>
                        <p>Adresse fictive</p>
                        <p>00000 Ville fictive</p>
                    </div>
                </div>
            </div>
            <div class="produits">
                <h3 style="text-align: right;">Montants exprimés en Euros</h3>
                <table border="1">
                    <tr style="padding: 50px;">
                        <td style="width:70%">Designation</td>
                        <td style="width:300px;">TVA</td>
                        <td style="width:500px">P. U. HT</td>
                        <td style="width:200px">Qté</td>
                        <td style="width:300px">Total HT</td>
                    </tr>
                    <tr v-for="(line, id) in data.lines" :key="id">

                        <td>{{ line.product_ref }} - {{ line.product_label }}</td>
                        <td>{{ new Intl.NumberFormat('fr-FR', {
                            minimumFractionDigits: 0, maximumFractionDigits: 2,
                            style: 'decimal'
                        }).format(line.tva_tx) }} %</td>
                        <td>{{ new Intl.NumberFormat('fr-FR', {
                            minimumFractionDigits: 0, maximumFractionDigits: 2,
                            style: 'decimal'
                        }).format(line.subprice) }}</td>
                        <td>{{ line.qty }}</td>
                        <td>{{ new Intl.NumberFormat('fr-FR', {
                            minimumFractionDigits: 0, maximumFractionDigits: 2,
                            style: 'decimal'
                        }).format(line.subprice * line.qty) }}</td>
                    </tr>
                </table>

            </div>
            <div class="summary"
                style="display: flex;flex-direction: column;width: 500px; justify-content: space-between;">
                <div class="info">
                    <p>TOTAL HT</p>
                    <span> {{ new Intl.NumberFormat('fr-FR', {
                        minimumFractionDigits: 0, maximumFractionDigits: 2,
                        style: 'decimal'
                    }).format(data.multicurrency_total_ht) }} </span>
                </div>
                <div class="info">
                    <p>TOTAL TVA 20 %</p>
                    <span> {{ new Intl.NumberFormat('fr-FR', {
                        minimumFractionDigits: 0, maximumFractionDigits: 2,
                        style: 'decimal'
                    }).format(data.multicurrency_total_tva) }} </span>
                </div>
                <div class="info" style="">
                    <p>TOTAL TTC {{ new Intl.NumberFormat('fr-FR', {
                        minimumFractionDigits: 0, maximumFractionDigits: 2,
                        style: 'decimal'
                    }).format(data.multicurrency_total_ttc) }}</p>
                    <span> {{ new Intl.NumberFormat('fr-FR', {
                        minimumFractionDigits: 0, maximumFractionDigits: 2,
                        style: 'decimal'
                    }).format(data.multicurrency_total_ttc) }} </span>
                </div>
            </div>

            <div class="last">
                <table>

                </table>
                <button @click="generatePDF(data.ref)">Generate PDF</button>
            </div>
        </div>
    </main>

    <footer>
        <FooterVue />
    </footer>
</template>

<style scoped>
.facture {
    height: 100%;
    width: 100%;
    background-color: white;
    color: black;

    display: flex;
    flex-direction: column;
    padding: 40px;
}

.facture .info {
    /* height: 100%; */
    width: 100%;

    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */

    gap: 50px;
    padding: 40px;
}

.facture .produit {
    /* height: 100%; */
    width: 100%;
}

.facture .produit table {
    /* height: 100%; */
    width: 100%;
}

.localisation {
    display: flex;
    /* width: 40%; */
    background-color: rgba(0, 112, 198, 0.492);

    padding: 15px;


}

.fournisseur {
    /* width: 45%; */
    border: 2px solid black;
}


.facture .info h3 {
    text-align: left;
}

.facture header {
    width: 100%;
    text-align: right;
}

.facture header h1 {
    font-weight: bold;
    line-height: 70px;
}

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

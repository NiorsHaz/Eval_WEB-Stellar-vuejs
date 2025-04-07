<script>
export default {
    props: {
        modelValue: {
            type: Date,
            default: () => new Date()
        }
    },
    emits: ['update:modelValue'],
    data() {
        const today = this.modelValue || new Date();
        return {
            selectedDate: today,
            month: today.getMonth(),
            year: today.getFullYear()
        };
    },
    computed: {
        currentMonthYear() {
            return new Date(this.year, this.month).toLocaleDateString('default', {
                month: 'long',
                year: 'numeric'
            });
        },
        daysOfWeek() {
            return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        },
        daysInMonth() {
            return new Date(this.year, this.month + 1, 0).getDate();
        },
        blankDays() {
            return new Date(this.year, this.month, 1).getDay();
        }
    },
    methods: {
        previousMonth() {
            if (this.month === 0) {
                this.month = 11;
                this.year--;
            } else {
                this.month--;
            }
        },
        nextMonth() {
            if (this.month === 11) {
                this.month = 0;
                this.year++;
            } else {
                this.month++;
            }
        },
        selectDate(day) {
            this.selectedDate = new Date(this.year, this.month, day);
            this.$emit('update:modelValue', this.selectedDate);
        },
        isSelected(day) {
            return (
                this.selectedDate.getFullYear() === this.year &&
                this.selectedDate.getMonth() === this.month &&
                this.selectedDate.getDate() === day
            );
        }
    }
};
</script>

<template>
    <div class="datepicker">
        <div class="month">
            <button @click="previousMonth">&lt;</button>
            <span>{{ currentMonthYear }}</span>
            <button @click="nextMonth">&gt;</button>
        </div>

        <div class="days">
            <div v-for="day in daysOfWeek" :key="day" class="day-header">
                {{ day }}
            </div>

            <div v-for="(blank, index) in blankDays" :key="'blank-' + index" class="day empty"></div>

            <div v-for="day in daysInMonth" :key="day" class="day" :class="{ selected: isSelected(day) }"
                @click="selectDate(day)">
                {{ day }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.datepicker {
    width: 300px;
    height: 350px;
    /* Fixed height */
    border: 1px solid #ccc;
    border-radius: 16px;
    padding: 12px;
    background-color: #fff;
    font-family: sans-serif;

    /* Enable container queries */
    container-type: size;
    container-name: height-check;

    overflow: hidden;
}

/* Regular layout */
.month {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    font-weight: bold;
    color: #111;
}

.month button {
    background: #eee;
    border: none;
    padding: 4px 10px;
    cursor: pointer;
    border-radius: 6px;
    font-size: 14px;
}

.days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 15px;
    text-align: center;
    color: #111;
}

.day,
.day-header {
    padding: 10px 0;
    border-radius: 10px;
    font-size: 14px;
}

.day:hover {
    background: #f0f0f0;
    cursor: pointer;
}

.day.selected {
    background-color: #007bff;
    color: white;
}

.day.empty {
    visibility: hidden;
}

/* 👇 Tighter layout when height is constrained */
@container height-check (max-height: 350px) {
    .month {
        font-size: 12px;
        margin-bottom: 8px;
    }

    .month button {
        padding: 2px 6px;
        font-size: 12px;
    }

    .day,
    .day-header {
        padding: 6px 0;
        font-size: 12px;
    }

    .days {
        gap: 2px;
    }
}
</style>

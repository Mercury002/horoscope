<script setup>
import {onMounted, computed, ref} from 'vue'
import axiosInstance from './axios';
import { TransitionFade } from '@morev/vue-transitions'

const horoscopeData = ref(null)
const modalData = ref(null)
const isModalOpen = ref(false)

const currentDate = computed(() => {
    const date = new Date();

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');


    return `${day}.${month}.${year}`;
})

function openModal(item) {
    modalData.value = item
    isModalOpen.value = true
}

async function fetchingData() {
    const reqBody = {
        "language": "original",
        "period": "today"
    }

    const res = await axiosInstance.post('', reqBody)

    const zodiacTranslations = {
        aries: 'Овен',
        taurus: 'Телец',
        gemini: 'Близнецы',
        cancer: 'Рак',
        leo: 'Лев',
        virgo: 'Дева',
        libra: 'Весы',
        scorpio: 'Скорпион',
        sagittarius: 'Стрелец',
        capricorn: 'Козерог',
        aquarius: 'Водолей',
        pisces: 'Рыбы'
    };

    const horoscopeArray = Object.entries(res.data.horoscope).map(([sign, prediction]) => ({
        ruSign: zodiacTranslations[sign],
        sign,
        prediction
    }));

    horoscopeData.value = horoscopeArray
}

onMounted(async () => {
    fetchingData()
})

</script>

<template>
    <div class="container">
        <h2 class="text-4xl font-bold text-center mb-4 mt-2">Гороскоп на сегодня <span class="text-2xl text-[#333]">{{ currentDate }}</span></h2>
        <div class="flex flex-col">
            <div class="p-1 flex gap-3 mb-3 rounded-lg card" v-for="(item, index) in horoscopeData" @click="openModal(item)">
                <div class="w-[120px] h-[120px]">
                    <img class="w-full h-full" :src="`/img/${item.sign}.png`" alt="">
                </div>
                <div class="w-4/5">
                    <p class="text-2xl">{{ item.ruSign }}</p>
                    <p class="ellipsis">{{ item.prediction }}</p>
                </div>
            </div>
        </div>
    </div>

    <TransitionFade>
        <div v-if="isModalOpen" class="modal">
            <div class="overlay"></div>
            <div class="content w-4/5 p-3">
                <button @click="() => isModalOpen = false" class="content__close">Закрыть</button>
                <div class="w-[240px] h-[240px] mx-auto">
                    <img class="w-full h-full" :src="`/img/${modalData.sign}.png`" alt="">
                </div>
                <div>
                    <p class="text-3xl text-center">{{ modalData.ruSign }}</p>
                    <p>{{ modalData.prediction }}</p>
                </div>
            </div>
        </div>
    </TransitionFade>
</template>

<style lang="scss">
.ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal; 
}

.card {
    transition: .3s all;
}

.modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: .3s all;

    .overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #333;
        opacity: 0.3;
    }
    
    .content {
        background-color: #fcddbe;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        overflow: hidden;

        &__close {
            position: absolute;
            right: 3%;
            top: 1%;
            background-color: #003d7d;
            color: #fff;
            border-radius: 5px;
            padding: 2px 13px;
            transition: .3s background-color;
        }

        &__close:active {
            background-color: #002955;
        }
    }
}
</style>
<script setup lang="ts">
import { ref } from 'vue'
import HeroSection from '@/components/products-view/HeroSection.vue'
import CategorySection from '@/components/products-view/CategorySection.vue'
import ProductsSection from '@/components/products-view/ProductsSection.vue'

interface Product {
  id: string
  image: string
  name: string
  description: string
  features: string[]
  buttonText: string
  buttonLink: string
}

const products = ref<Product[]>([
  {
    id: 'login-api',
    image: new URL('@/assets/sections/products/API.png', import.meta.url).href,
    name: 'A-Login API',
    description: 'A robust authentication solution built with Python Flask, providing secure login systems and comprehensive user management.',
    features: ['Python Flask', 'Secure Authentication', 'User Management', 'Easy Integration'],
    buttonText: 'GitHub',
    buttonLink: 'https://github.com/CODPEX/ALoginAPI',
  },
  {
    id: 'simple-ssh',
    image: new URL('@/assets/sections/products/SimpleSSH.png', import.meta.url).href,
    name: 'SimpleSSH',
    description: 'A modern, intuitive SSH client designed for seamless cloud server management with an elegant interface.',
    features: ['Modern UI', 'SSH Management', 'Cloud Ready', 'Cross-Platform'],
    buttonText: 'GitHub',
    buttonLink: 'https://github.com/CODPEX/SimpleSSH',
  },
])
</script>

<template>
  <div class="products-view">
    <HeroSection />
    <CategorySection />
    <ProductsSection :products="products" />
  </div>
</template>

<style scoped></style>

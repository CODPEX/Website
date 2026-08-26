<template>
  <footer class="designer-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section brand-info">
          <!-- SVG Logo with theme-aware fill color -->
          <svg
            class="brand-logo"
            height="55"
            viewBox="0 0 152.1 192.6"
            xmlns="http://www.w3.org/2000/svg"
            alt="CODPEX"
          >
            <g id="logo-paths">
              <path d="M11.6,40.8c3.5-2,6.9-4.1,10.3-6C40.8,23.8,59.7,13,78.6,2C83-0.6,87-0.7,91.4,1.9c18.3,10.7,36.7,21.3,55.1,31.9
              c6.5,3.8,7.4,10.4,2.1,15.8c-4.6,4.7-9.3,9.3-14,14c-4,3.9-7.8,4.5-12.7,1.7c-10.5-6-20.8-12.2-31.4-18C80,41.4,68.5,37.6,56.4,36
              c-14.9-2-29.4-0.3-43.5,4.8c-0.3,0.1-0.6,0.2-1,0.2C12,41.1,11.9,41,11.6,40.8z" />
              <path d="M12.7,152.4c7.3,1.9,14.4,3.8,21.7,4.5c12.9,1.4,25.6,0,38-3.7c10.2-3.1,19.4-8.2,28.6-13.6c6.8-4,13.5-7.9,20.3-11.8
              c5.5-3.2,9.4-2.6,13.9,1.9c4.2,4.2,8.3,8.7,12.8,12.7c5.2,4.7,5.2,12.7-2.3,16.9c-18.5,10.3-36.7,21.1-54.9,31.7
              c-3.9,2.3-7.6,2.2-11.5-0.1c-21.2-12.3-42.4-24.5-63.6-36.7C14.6,153.7,13.7,153,12.7,152.4z" />
              <path d="M44.5,154.5c-13.8-0.4-26.9-3.2-39.2-9.4c-1.6-0.8-2.1-1.6-1.8-3.5c3.8-22.7,12.1-43.2,28.3-60c1.8-1.8,3.8-3.5,5.7-5.2
              c0.5-0.4,1-1.1,1.7-0.8c0.8,0.3,0.5,1.2,0.5,1.8c0.4,12.9,3.6,25.1,9.7,36.6c6.8,12.8,16.4,23,28.6,30.7c0.3,0.2,0.7,0.4,1.1,0.6
              c1.6,0.9,1.4,1.6-0.3,2.2c-6.1,2.4-12.4,4.3-18.9,5.4C54.8,153.8,49.5,154.3,44.5,154.5z" />
              <path d="M0.4,138.1c-0.6-0.8-0.3-1.8-0.3-2.6c0-26.7,0-53.3-0.1-80c0-3.8,1-6,4.6-7.7c23.9-11.5,48.2-12.4,72.9-3.1
              c0.3,0.1,0.6,0.2,0.9,0.4c0.6,0.3,1.7,0.4,1.7,1.2s-1,1-1.6,1.4c-10.8,6.3-21.7,12.5-32.4,18.8C32.2,74.6,21.9,86.3,14,100.3
              c-6.3,11.3-10.4,23.4-12.8,36.1c-0.1,0.5-0.2,1-0.4,1.4C0.8,137.9,0.6,137.9,0.4,138.1z" />
            </g>
          </svg>
          <p class="brand-tagline">{{ t('footer.brand.tagline') }}</p>
        </div>

        <div class="footer-section services">
          <h4>{{ t('footer.services.title') }}</h4>
          <ul>
            <li>
              <a href="https://docs.codpex.top/">{{ t('footer.services.docs') }}</a>
            </li>
            <li>
              <a href="https://github.com/CODPEX/SimpleSSH">{{ t('footer.services.simpleSSH') }}</a>
            </li>
            <li>
              <a href="https://github.com/CODPEX/StarsAICopilot.Avalonia">{{ t('footer.services.starsAICopilot') }}</a>
            </li>
          </ul>
        </div>

        <div class="footer-section contact">
          <h4>{{ t('footer.contact.title') }}</h4>
          <ul>
            <li>
              <b>{{ t('footer.contact.emailLabel') }}</b> {{ t('footer.contact.email') }}
            </li>
          </ul>
          <Button
            :label="t('footer.contact.button')"
            icon="pi pi-users"
            class="p-button-outlined"
            link="/contact"
          />
        </div>
      </div>

      <div class="footer-bottom">
        <div class="copyright">
          <p>
            Copyright © 2023 - {{ new Date().getFullYear() }} CODPEX. All rights reserved.
          </p>
        </div>
        <div class="back-to-top">
          <button @click="scrollToTop" class="top-button">
            <span class="arrow">↑</span>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'DesignerFooter',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style scoped>
.designer-footer {
  background: var(--footer-bg);
  color: var(--text-primary);
  padding: 5rem 2rem 3rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  border-top: 1px solid var(--border-color);
  box-shadow: 0 -5px 30px var(--shadow-md);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4rem;
  margin-bottom: 3rem;
}

.footer-section h3,
.footer-section h4 {
  font-weight: 400;
  margin-bottom: 1.8rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: 1rem;
  position: relative;
  color: var(--text-primary);
}

.footer-section h3::after,
.footer-section h4::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, var(--text-primary), transparent);
}

.brand-logo {
  font-size: 2.2rem;
  font-weight: 300;
  letter-spacing: 4px;
  margin-bottom: 0.8rem;
  background: linear-gradient(90deg, var(--text-primary), var(--text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* SVG logo paths theme-aware fill */
.brand-logo g path {
  fill: var(--text-primary);
  transition: fill var(--transition-speed) ease;
}

.brand-tagline {
  font-style: italic;
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 2.5rem;
  position: relative;
  padding-left: 20px;
}

.brand-tagline::before {
  content: '"';
  position: absolute;
  left: 0;
  top: -5px;
  font-size: 2rem;
  color: var(--text-muted);
  font-style: normal;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  padding: 5px 0;
  color: var(--text-secondary);
}

.footer-section li:hover {
  transform: translateX(5px);
}

.footer-section a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  padding: 2px 0;
}

.footer-section a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--text-primary), var(--text-secondary));
  transition: width 0.4s ease;
}

.footer-section a:hover {
  color: var(--text-primary);
}

.footer-section a:hover::after {
  width: 100%;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2.5rem;
  border-top: 1px solid var(--border-color);
  position: relative;
}

.footer-bottom::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-color), transparent);
}

.copyright p {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.top-button {
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-elevated));
  border: 2px solid var(--border-color);
  color: var(--text-secondary);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px var(--shadow-md);
}

.arrow {
  transition: all 0.3s ease;
}

.top-button:hover {
  background: linear-gradient(135deg, var(--accent), #7c3aed);
  color: white;
  transform: translateY(-5px) rotate(360deg);
  border-color: var(--accent);
  box-shadow: 0 8px 25px var(--shadow-lg);
}

.top-button:hover .arrow {
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1.5rem;
  }

  .brand-logo {
    font-size: 1.8rem;
  }

  .social-links {
    justify-content: center;
  }
}
</style>

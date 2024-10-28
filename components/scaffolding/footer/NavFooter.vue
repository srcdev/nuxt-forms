<template>
  <footer>
    <ul class="footer-list">
      <li class="footer-item">
        <Icon name="material-symbols-light:mail-rounded" class="icon" />
        <span class="text">email@address.com</span>
      </li>
      <li class="footer-item">
        <Icon name="ph:building-office-light" class="icon" />
        <span class="text">Company number: 12345678</span>
      </li>
      <li class="footer-item">
        <Icon name="material-symbols:call" class="icon" />
        <span class="text">+44 (0) 1223 123 123</span>
      </li>
      <li class="footer-item">
        <Icon name="material-symbols:location-on" class="icon" />
        <span class="text">Some address, City, Postcode</span>
      </li>
    </ul>
  </footer>
</template>
<script setup lang="ts"></script>

<style lang="css">
footer {
  padding: 1rem;
  text-align: center;
  background: white;
  margin-bottom: 50px;

  .footer-list {
    display: inline-grid;
    gap: 10px;
    grid-template-columns: 280px 456px;
    margin-inline: auto;
    padding: 0;
  }

  .footer-item {
    list-style-type: none;
    gap: 10px;
    display: grid;
    grid-template-columns: 40px auto;
    align-items: center;

    .icon {
      display: block;
      font-size: 30px;
      text-align: center;
      min-width: 40px;
    }
    .text {
      font-family: 'Poppins', Sans-serif;
      font-family: var(--font-family);
      font-size: var(--step-1);
      text-align: start;
    }
  }
}
</style>

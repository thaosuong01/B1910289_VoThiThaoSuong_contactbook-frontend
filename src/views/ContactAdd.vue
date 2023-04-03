<template>
  <div class="page">
    <h4>Thêm Liên hệ</h4>
    <ContactForm :contact="contact" @submit:contact="addContact" />
    <p>{{ message }}</p>
  </div>
</template>
<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";
import { toast } from "vue3-toastify";
export default {
  components: {
    ContactForm,
  },

  data() {
    return {
      contact: {},
      message: "",
    };
  },
  methods: {
    async addContact(data) {
      try {
        await ContactService.create(data);
        this.$router.push({ name: "contactbook" });
        toast.success("Thêm liên hệ thành công.");
      } catch (error) {
        toast.error("Thêm liên hệ không thành công.");
        console.log(error);
      }
    },
  },
};
</script>

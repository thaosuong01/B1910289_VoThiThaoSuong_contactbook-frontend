<template>
  <div v-if="contact" class="page">
    <h4>Hiệu chỉnh Liên hệ</h4>
    <ContactForm
      :contact="contact"
      @submit:contact="updateContact"
      @delete:contact="deleteContact"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";
import { toast } from "vue3-toastify";
import Swal from "sweetalert2";
export default {
  components: {
    ContactForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      contact: null,
      message: "",
    };
  },
  methods: {
    async getContact(id) {
      try {
        this.contact = await ContactService.get(id);
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateContact(data) {
      try {
        await ContactService.update(this.contact._id, data);
        // this.message = "Liên hệ được cập nhật thành công.";
        this.$router.push({ name: "contactbook" });
        toast.success("Liên hệ được cập nhật thành công.");
      } catch (error) {
        toast.error("Cập nhật liên hệ không thành công.");
        console.log(error);
      }
    },
    async deleteContact() {
      Swal.fire({
        title: "Bạn có muốn xóa Liên hệ này?",
        text: "Bạn sẽ không thể khôi phục lại!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await ContactService.delete(this.contact._id);
            Swal.fire("Deleted!", "Xóa liên hệ thành công.", "success");
            this.$router.push({ name: "contactbook" });
          } catch (error) {
            Swal.fire("Fail!", "Xóa liên hệ không thành công", "error");
          }
        }
      });
    },
  },
  created() {
    this.getContact(this.id);
    this.message = "";
  },
};
</script>

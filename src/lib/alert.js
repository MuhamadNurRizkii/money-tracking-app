import Swal from "sweetalert2";

export const alertSuccess = async (message) => {
  return Swal.fire({
    title: "Success",
    icon: "success",
    text: message,
  });
};

export const alertError = async (message) => {
  return Swal.fire({
    icon: "error",
    title: "Ups!",
    text: message,
  });
};

export const alertConfirm = async () => {
  return Swal.fire({
    title: "Are you sure?",
    text: "are you sure you want to delete it?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
};

export const alertModal = async (message) => {
  return Swal.fire({
    position: "top-end",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 900,
  });
};

import Swal from 'sweetalert2';

export const swalDelete = Swal.mixin({
  type: 'warning',
  title: 'Are you sure?',
  text: `This is not reversible!`,
  showCancelButton: true,
  confirmButtonText: 'Yes',
  allowOutsideClick: !Swal.isLoading,
  allowEscapeKey: !Swal.isLoading,
  showLoaderOnConfirm: true,
});

export const swalDeleted = Swal.mixin({
  title: 'Deleted',
  type: 'success'
});

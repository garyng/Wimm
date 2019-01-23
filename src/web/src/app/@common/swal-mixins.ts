import Swal from 'sweetalert2';

export const swalWarning = Swal.mixin({
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

export const swalQuestion = Swal.mixin({
  type: 'question',
  title: 'Are you sure?',
  showCancelButton: true,
  confirmButtonText: 'Yes',
  allowOutsideClick: !Swal.isLoading,
  allowEscapeKey: !Swal.isLoading,
  showLoaderOnConfirm: true,
});

export const swalAdded = Swal.mixin({
  title: 'Added',
  type: 'success'
});


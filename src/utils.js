/* eslint-disable no-undef */
export const showDialog = (dialogId, onSuccess) => {
  const newWordModal = new bootstrap.Modal(`#${dialogId}`, {
    keyboard: false,
  });
  newWordModal.show();
  onSuccess(newWordModal);
};

export const hideDialog = (dialogHandle) => {
  if (dialogHandle) dialogHandle.hide();
};

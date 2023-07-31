/* eslint-disable no-undef */
export const showDialog = (dialogId, onSuccess) => {
  const dlg = new bootstrap.Modal(`#${dialogId}`, {
    keyboard: false,
  });
  dlg.show();
  onSuccess(dlg);
};

export const hideDialog = (dlgHandle) => {
  dlgHandle?.hide();
};

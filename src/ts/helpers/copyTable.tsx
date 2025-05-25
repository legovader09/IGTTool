export const copyTable = (el: string) => {
  const urlField = document.getElementById(el);
  const range = document.createRange();
  range.selectNode(urlField);
  window.getSelection().addRange(range);
  document.execCommand('copy');
};

export const fetchTemplate = async function (fileName) {
  try {
    const data = await fetch(`../templates/${fileName}.html`);
    const html = await data.text();
    return html;
  } catch (error) {}
};

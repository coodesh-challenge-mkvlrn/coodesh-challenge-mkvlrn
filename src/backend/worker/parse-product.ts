export const parseProduct = (doc: Document, productUrl: string) => {
  const code = doc.querySelector('#barcode_paragraph > span')?.textContent!;

  const barcode = doc
    .querySelector('#barcode_paragraph')
    ?.textContent?.replace(/\/n /g, '')
    .replace('Barcode:', '')
    .trim();

  const url = `https://world.openfoodfacts.org${productUrl
    .split('/')
    .slice(0, 3)
    .join('/')}`;

  const productName = doc.querySelector('h1')?.innerHTML.split('-')[0].trim();

  const quantity =
    doc.querySelector('#field_quantity > .field_value')?.textContent || null;

  const categories =
    doc.querySelector('#field_categories > .field_value')?.textContent || null;

  const packaging =
    doc.querySelector('#field_packaging > .field_value')?.textContent || null;

  const brands =
    doc.querySelector('#field_brands > .field_value')?.textContent || null;

  let imgPath = null;
  if (doc.head.querySelector('meta[name="twitter:image"]')) {
    imgPath = 'https://static.openfoodfacts.org/images/products/';
    if (code.toString().length > 8) {
      const slices = code.toString().match(/.{1,3}/g)!;
      const firstPart = slices.slice(0, 3).join('/');
      const secondPart = slices.slice(3).join('');

      imgPath += `${firstPart}/${secondPart}`;
    } else {
      imgPath += code.toString();
    }
    // no other way of knowing country code and image id
    const imgCheat = doc.head
      .querySelector('meta[name="twitter:image"]')
      ?.getAttribute('content')
      ?.match(/front.{0,3}\.[0-9]{1,}/g);
    imgPath += `/${imgCheat}.400.jpg`;
  }

  return {
    code,
    barcode,
    url,
    product_name: productName,
    quantity,
    categories,
    packaging,
    brands,
    image_url: imgPath,
  };
};
